import { StatisticService } from "@/services/statistic";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UnitUtil } from "@/utils/unit";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Link from "next/link";

type RankProps = {
  category: string;
  title: string;
};

export default async function Rank({ category, title }: RankProps) {
  const chickenList = await StatisticService.getStatisticByFilter({
    category,
    pageNo: 1,
    pageSize: 10,
    yr: "2023",
    orderCol: "arUnitAvrgSlsAmt",
    orderSort: "desc",
  });
  return (
    <div className="space-y-4">
      <h3 className="text-h3">{title}</h3>
      <div className="px-16">
        <Carousel className="w-full">
          <CarouselContent>
            {!!chickenList?.payload.length &&
              chickenList.payload.map((item, idx) => (
                <CarouselItem key={`main-chicken-${item.brandNm}`} className="md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <Card className="p-4 hovered-button">
                      <Link href={`/brand/${item.brandNm}`}>
                        <p className="text-h1 mb-2">{idx + 1}</p>
                        <p className="text-caption1 text-neutral-400 overflow-hidden whitespace-nowrap text-ellipsis">
                          {item.corpNm}
                        </p>
                        <p className="text-subtitle2 overflow-hidden whitespace-nowrap text-ellipsis">{item.brandNm}</p>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <p className="text-caption1 text-neutral-400">면적당 매출</p>
                          <p className="text-caption1 text-neutral-700">
                            {UnitUtil.formatNumberToKorean(item.arUnitAvrgSlsAmt)}원
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-caption1 text-neutral-400">평균 매출</p>
                          <p className="text-caption1 text-neutral-700">
                            {UnitUtil.formatNumberToKorean(item.avrgSlsAmt)}원
                          </p>
                        </div>
                      </Link>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
