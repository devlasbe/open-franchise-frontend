import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Summary from "@/components/ui/summary";
import { StatisticService } from "@/services/statistic";
import { Startup } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";
import { useEffect, useState } from "react";

export default function BrandStartup({ name }: { name: string }) {
  const [startupData, setStartupData] = useState<Startup>();
  useEffect(() => {
    StatisticService.getStartup(name).then((res) => setStartupData(res?.payload));
  }, [name]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>💵 창업 비용</CardTitle>
      </CardHeader>
      <CardContent>
        <Summary.Container>
          <Summary.Wrapper>
            {Object.values(startupLayout).map((item) => {
              return <Summary.Header key={`brand-startup-header-${item + ""}`}>{item}</Summary.Header>;
            })}
          </Summary.Wrapper>
          <Summary.Wrapper>
            {Object.keys(startupLayout).map((key) => {
              return (
                <Summary.Content key={`brand-startup-cell-${key}`}>
                  {!startupData || !(key in startupData)
                    ? "-"
                    : UnitUtil.formatNumberToKorean(+startupData[key as keyof Startup])}
                  원
                </Summary.Content>
              );
            })}
          </Summary.Wrapper>
        </Summary.Container>
      </CardContent>
    </Card>
  );
}

const startupLayout = {
  jngBzmnJngAmt: "가맹금액",
  jngBzmnEduAmt: "교육금액",
  jngBzmnEtcAmt: "기타금액",
  jngBzmnAssrncAmt: "보증금액",
  smtnAmt: "합계금액",
};
