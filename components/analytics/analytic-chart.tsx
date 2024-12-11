"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import React from "react";

const chartConfig = {
  order: {
    label: "Order",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Data = {
  day: string;
  count: number;
};
type AnalyticChartProps = {
  data: Data[];
};

const AnalyticChart = ({ data }: AnalyticChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Chart</CardTitle>
        <CardDescription>
          {data[0].day} / {data[data.length - 1].day}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: "white",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticChart;
