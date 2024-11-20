import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Summary from "@/components/ui/summary";
import { Head } from "@/types/apiTypes";
import { Link1Icon } from "@radix-ui/react-icons";

export default function BrandHead({ headData }: { headData: Head }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>🏢 본사 정보</p>
          {!!headData?.hmpgUrladr && (
            <a
              href={headData.hmpgUrladr.startsWith("http") ? headData.hmpgUrladr : `http://${headData.hmpgUrladr}`}
              target="_blank"
              className="hovered-button flex items-center gap-1 mt-[-4px] px-2 py-1 hover:bg-neutral-100 border rounded-lg text-neutral-400 text-caption1"
            >
              <Link1Icon width={20} height={20} />
              <p>홈페이지</p>
            </a>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Summary.Container>
          <Summary.Wrapper>
            {Object.values(headLayout).map((item) => {
              return <Summary.Header key={`brand-head-header-${item + ""}`}>{item}</Summary.Header>;
            })}
          </Summary.Wrapper>
          <Summary.Wrapper>
            {Object.keys(headLayout).map((key) => {
              return (
                <div
                  key={`brand-head-cell-${key}`}
                  className="flex flex-1 justify-end sm:justify-center py-1 text-body sm:text-textbody text-nowrap"
                >
                  {headData[key as keyof Head] ?? "-"}
                </div>
              );
            })}
          </Summary.Wrapper>
        </Summary.Container>
      </CardContent>
    </Card>
  );
}

const headLayout: Partial<Record<keyof Head, string>> = {
  jnghdqrtrsConmNm: "본사",
  jnghdqrtrsRprsvNm: "대표",
  bzmnRgsDate: "사업자등록일",
  entScaleNm: "기업규모",
  areaNm: "소재지",
};
