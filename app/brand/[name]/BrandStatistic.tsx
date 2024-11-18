import Chart, { ChartColorProps, ChartTypeProps } from "@/components/chart/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticService } from "@/services/statistic";
import { Statistic } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";

export default async function BrandStatistic({ name }: { name: string }) {
  const data = await StatisticService.getStatistic(name);
  const brandData = data?.payload?.length ? data.payload[0] : null;
  return (
    <>
      {statisticList.map((item, idx) => (
        <div key={`brand-statistic-${idx}`} className="flex flex-1 flex-col sm:flex-row gap-4">
          {Object.keys(item.line).map((key, idx2) => {
            const obj = item.line[key];
            if (!brandData || !(key in brandData)) return;
            return (
              <Card key={`brand-statistic-${idx}-${idx2}`} className="flex-1">
                <CardHeader>
                  <CardTitle>{obj.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-8 pt-4">
                  <Chart
                    type={obj.chart.type}
                    dataList={data?.payload}
                    xAxis={obj.chart.xAxis}
                    isBillion={obj.chart.isBillion}
                    config={{
                      [key]: {
                        label: obj.label,
                        color: obj.chart.color,
                      },
                    }}
                  />
                  <div className="flex flex-row sm:flex-col p-4 rounded-lg bg-neutral-100">
                    <div className="flex flex-1 flex-col sm:flex-row">
                      {data?.payload?.map((item) => (
                        <div
                          key={`brand-startup-header-${item}`}
                          className="flex flex-1 justify-start sm:justify-center py-1 text-body sm:text-body text-nowrap text-neutral-500"
                        >
                          {item.yr}년
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-1 flex-col sm:flex-row">
                      {data?.payload?.map((item) => {
                        return (
                          <div
                            key={`brand-startup-cell-${key}`}
                            className="flex flex-1 justify-end sm:justify-center py-1 text-body sm:text-textbody text-nowrap"
                          >
                            {obj.chart.isBillion
                              ? UnitUtil.formatNumberToKorean(+item[key as keyof Statistic])
                              : (+item[key as keyof Statistic]).toLocaleString()}
                            {obj.unit}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ))}
    </>
  );
}

type LineList = {
  [key: string]: {
    title: string;
    label: string;
    unit: string;
    chart: {
      type?: ChartTypeProps;
      xAxis: string;
      color: ChartColorProps;
      isBillion?: boolean;
    };
  };
};

type StatisticListType = {
  line: LineList;
};

const statisticList: StatisticListType[] = [
  {
    line: {
      avrgSlsAmt: {
        title: "연도별 평균매출",
        label: "평균매출",
        unit: "원",
        chart: { type: "bar", xAxis: "yr", color: "0", isBillion: true },
      },
      arUnitAvrgSlsAmt: {
        title: "연도별 면적당 평균매출",
        label: "면적당 평균매출",
        unit: "원",
        chart: { type: "bar", xAxis: "yr", color: "0", isBillion: true },
      },
    },
  },
  {
    line: {
      frcsCnt: {
        title: "가맹점 수",
        label: "가맹점 수",
        unit: "개",
        chart: { type: "bar", xAxis: "yr", color: "1" },
      },
      newFrcsRgsCnt: {
        title: "신규 가맹점 수",
        label: "신규 가맹점 수",
        unit: "개",
        chart: { type: "bar", xAxis: "yr", color: "1" },
      },
    },
  },
  {
    line: {
      ctrtEndCnt: {
        title: "계약종료수",
        label: "계약종료수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
      ctrtCncltnCnt: {
        title: "계약해지수",
        label: "계약해지수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
      nmChgCnt: {
        title: "명의변경수",
        label: "명의변경수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
    },
  },
];
