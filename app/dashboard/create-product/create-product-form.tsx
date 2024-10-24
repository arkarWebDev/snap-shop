"use client";
import React, { use, useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/types/product-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Tiptap from "./tip-tap";
import { useAction } from "next-safe-action/hooks";
import { getSingleProduct, updateProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const CreateProductForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit_id");
  const [editProduct, setEditProduct] = useState<string>("");

  const isProductExist = async (id: number) => {
    if (isEditMode) {
      const response = await getSingleProduct(id);
      if (response.error) {
        toast.error(response.error);
        router.push("/dashboard/products");
        return;
      }
      if (response.success) {
        setEditProduct(response?.success?.title);
        form.setValue("title", response?.success?.title);
        form.setValue("description", response?.success?.description);
        form.setValue("price", response?.success?.price);
        form.setValue("id", response?.success?.id);
      }
    }
  };

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { execute, status, result } = useAction(updateProduct, {
    onSuccess({ data }) {
      if (data?.error) {
        console.log(data?.error);

        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        form.reset();
        router.push("/dashboard/products");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const { title, id, description, price } = values;
    execute({ title, id, description, price });
  };

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  useEffect(() => {
    if (isEditMode) {
      isProductExist(Number(isEditMode));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit" : "Create"} Product</CardTitle>
        <CardDescription>
          {isEditMode
            ? `Edit your product : ${editProduct}`
            : "Create a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        placeholder="Price must shown in MMK"
                        {...field}
                        step={100}
                        min={0}
                        type="number"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>{" "}
    </Card>
  );
};

export default CreateProductForm;
