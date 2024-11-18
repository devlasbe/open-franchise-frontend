import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticService } from "@/services/statistic";
import { Startup } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";

export default async function BrandStartup({ name }: { name: string }) {
  const startup = await StatisticService.getStartup(name);
  const startupData = startup?.payload;
  return (
    <Card>
      <CardHeader>
        <CardTitle>창업 비용</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row sm:flex-col p-4 rounded-lg bg-neutral-100">
          <div className="flex flex-1 flex-col sm:flex-row">
            {Object.values(startupLayout).map((item) => {
              return (
                <div
                  key={`brand-startup-header-${item}`}
                  className="flex flex-1 justify-start sm:justify-center py-1 font-normal text-body sm:text-body text-nowrap text-neutral-500"
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 flex-col sm:flex-row">
            {Object.keys(startupLayout).map((key) => {
              return (
                <div
                  key={`brand-startup-cell-${key}`}
                  className="flex flex-1 justify-end sm:justify-center py-1 text-body sm:text-textbody text-nowrap"
                >
                  {!startupData || !(key in startupData)
                    ? "-"
                    : UnitUtil.formatNumberToKorean(+startupData[key as keyof Startup])}
                  원
                </div>
              );
            })}
          </div>
        </div>
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
