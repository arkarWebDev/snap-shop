"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>View your all products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className=" fill-primary text-primary" />
          <Input
            placeholder="Filter your products with title"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end gap-2 my-5">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant={"outline"}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant={"outline"}
          >
            Next
            <ChevronRight className="w-5 h-5 mr-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
