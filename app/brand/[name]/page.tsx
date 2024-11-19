import { StatisticService } from "@/services/statistic";
import BrandHeader from "../BrandHeader";
import BrandStartup from "./BrandStartup";
import BrandStatistic from "./BrandStatistic";
import FetchBoundary from "@/components/errorBoundary/FetchBoundary";
import BrandHead from "./BrandHead";
import { BrandService } from "@/services/brand";
import BrandInterior from "./BrandInterior";

type BrandPageParams = {
  params: {
    name: string;
  };
};

export default async function BrandPage({ params: { name } }: BrandPageParams) {
  try {
    const brandResponse = await BrandService.getBrand(name);
    const headData = brandResponse?.payload?.head;
    const statisticDataList = (await StatisticService.getStatistic(name)).payload;
    const brandData = statisticDataList?.length ? statisticDataList[0] : null;
    return (
      <div className="flex-1">
        <div className="flex flex-col flex-1 gap-4 pt-12">
          {!!headData && (
            <FetchBoundary>
              <BrandHead headData={headData} />
            </FetchBoundary>
          )}
          <FetchBoundary>
            <BrandHeader data={brandData} />
          </FetchBoundary>
          <FetchBoundary>
            <BrandStartup name={name} />
          </FetchBoundary>
          <FetchBoundary>
            <BrandInterior brandMnno={brandResponse?.payload?.brand?.brandMnno} />
          </FetchBoundary>
          <FetchBoundary>
            <BrandStatistic statisticDataList={statisticDataList} />
          </FetchBoundary>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
