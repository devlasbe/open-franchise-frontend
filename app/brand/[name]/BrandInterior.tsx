import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Summary from "@/components/ui/summary";
import { InteriorService } from "@/services/interior";
import { GetInteriorRes } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";
import { useEffect, useState } from "react";

export default function BrandInterior({ brandMnno }: { brandMnno: string }) {
  const [interiorData, setInteriorData] = useState<GetInteriorRes>();
  useEffect(() => {
    if (!brandMnno) return;
    InteriorService.getInterior(brandMnno).then((res) => setInteriorData(res));
  }, [brandMnno]);
  const convertInteriorPay = (pay?: string) => {
    if (!pay?.includes("~")) return "-";
    const data = pay.split("~");
    return `${UnitUtil.formatNumberToKorean(+data[0])}원~${UnitUtil.formatNumberToKorean(+data[1])}원`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>🎨 인테리어 비용</CardTitle>
      </CardHeader>
      <CardContent>
        <Summary.Container>
          <Summary.Wrapper>
            <Summary.Header>기준면적</Summary.Header>
            <Summary.Header>평당 금액</Summary.Header>
            <Summary.Header>총 금액</Summary.Header>
          </Summary.Wrapper>
          <Summary.Wrapper>
            <Summary.Content>{interiorData?.payload?.storCrtraAr ?? "-"}평</Summary.Content>
            <Summary.Content>{convertInteriorPay(interiorData?.payload?.unitArIntrrAmtScopeVal)}</Summary.Content>
            <Summary.Content>{convertInteriorPay(interiorData?.payload?.intrrAmtScopeVal)}</Summary.Content>
          </Summary.Wrapper>
        </Summary.Container>
      </CardContent>
    </Card>
  );
}
