import Chart, { ChartColorProps, ChartTypeProps, ChartYAxisFormatProps } from "@/components/chart/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Summary from "@/components/ui/summary";
import { Statistic } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";

export default function BrandStatistic({ statisticDataList }: { statisticDataList: Statistic[] }) {
  const brandData = statisticDataList?.length ? statisticDataList[0] : null;
  return (
    <>
      {statisticLayoutList.map((item, idx) => (
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
                    dataList={statisticDataList}
                    xAxis={obj.chart.xAxis}
                    yAxiosFormat={obj.chart.yAxisFormat}
                    config={{
                      [key]: {
                        label: obj.label,
                        color: obj.chart.color,
                      },
                    }}
                  />
                  <Summary.Container>
                    <Summary.Wrapper>
                      {statisticDataList.map((item) => (
                        <Summary.Header key={`brand-statistic-header-${obj.title}-${item.yr}`}>
                          {item.yr}년
                        </Summary.Header>
                      ))}
                    </Summary.Wrapper>
                    <Summary.Wrapper>
                      {statisticDataList.map((item) => {
                        const value = item![key as keyof Statistic];
                        return (
                          <Summary.Content key={`brand-statistic-cell-${obj.title}-${item.yr}`}>
                            {!!item && obj.chart.yAxisFormat
                              ? UnitUtil.formatNumberToKorean(+(value as string))
                              : (+(value as string)).toLocaleString()}
                            {obj.unit}
                          </Summary.Content>
                        );
                      })}
                    </Summary.Wrapper>
                  </Summary.Container>
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
      yAxisFormat?: ChartYAxisFormatProps;
    };
  };
};

type StatisticLayoutListType = {
  line: LineList;
};

const statisticLayoutList: StatisticLayoutListType[] = [
  {
    line: {
      avrgSlsAmt: {
        title: "📋 평균매출",
        label: "평균매출",
        unit: "원",
        chart: { type: "bar", xAxis: "yr", color: "0", yAxisFormat: "b" },
      },
      arUnitAvrgSlsAmt: {
        title: "📐 면적(평)당 평균매출",
        label: "면적(평)당 평균매출",
        unit: "원",
        chart: { type: "bar", xAxis: "yr", color: "0", yAxisFormat: "m" },
      },
    },
  },
  {
    line: {
      frcsCnt: {
        title: "🏠 가맹점 수",
        label: "가맹점 수",
        unit: "개",
        chart: { type: "bar", xAxis: "yr", color: "1" },
      },
      newFrcsRgsCnt: {
        title: "🎉 신규 가맹점 수",
        label: "신규 가맹점 수",
        unit: "개",
        chart: { type: "bar", xAxis: "yr", color: "1" },
      },
    },
  },
  {
    line: {
      ctrtEndCnt: {
        title: "🎬 계약종료수",
        label: "계약종료수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
      ctrtCncltnCnt: {
        title: "✂️ 계약해지수",
        label: "계약해지수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
      nmChgCnt: {
        title: "🔄 명의변경수",
        label: "명의변경수",
        unit: "개",
        chart: { xAxis: "yr", color: "2" },
      },
    },
  },
];
