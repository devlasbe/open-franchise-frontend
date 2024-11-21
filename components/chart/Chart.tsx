"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UnitUtil } from "@/utils/unit";
import { useCallback } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import getChartColor from "./getChartColor";

export type ChartColorProps = "0" | "1" | "2" | "3" | "4";
export type ChartYAxisFormatProps = "b" | "m";
export type ChartTypeProps = "bar" | "line";

type ConfigType = {
  [key: string]: {
    label: string;
    color?: ChartColorProps;
  };
};

type ChartProps = {
  type?: ChartTypeProps;
  dataList?: unknown[];
  config: ConfigType;
  xAxis: string;
  yAxiosFormat?: ChartYAxisFormatProps;
};

export default function Chart({ type, dataList = [], config, xAxis, yAxiosFormat }: ChartProps) {
  const ChartElementList = useCallback(() => {
    return Object.keys(config).map((key, idx) => {
      const color = config[key].color;
      if (type === "bar")
        return <Bar key={`chart-bar-${key}`} dataKey={key} fill={getChartColor(+(color ?? idx))} radius={4} />;
      return (
        <Line
          key={`chart-line-${key}`}
          dataKey={key}
          stroke={getChartColor(+(color ?? idx))}
          type="linear"
          strokeWidth={2}
        />
      );
    });
  }, [config, type]);

  const ChartOptions = useCallback(() => {
    return (
      <>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xAxis} tickLine={false} axisLine={false} tickMargin={8} padding={{ left: 24, right: 24 }} />
        <YAxis
          tickFormatter={(value) =>
            yAxiosFormat ? UnitUtil.formatNumberToKorean(value, yAxiosFormat) : (+value).toLocaleString()
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelClassName="px-2"
              formatter={(value) => [
                yAxiosFormat ? UnitUtil.formatNumberToKorean(value as number) : (+value).toLocaleString(),
              ]}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </>
    );
  }, [yAxiosFormat, xAxis]);

  return (
    <ChartContainer config={config} className="w-[110%] sm:w-full ml-[-20px] lg:ml-0">
      {type === "bar" ? (
        <BarChart data={dataList}>
          {ChartOptions()}
          {ChartElementList()}
        </BarChart>
      ) : (
        <LineChart data={dataList}>
          {ChartOptions()}
          {ChartElementList()}
        </LineChart>
      )}
    </ChartContainer>
  );
}
