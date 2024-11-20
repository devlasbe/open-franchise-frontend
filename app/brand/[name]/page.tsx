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

export default function BrandPage({ params: { name } }: BrandPageParams) {
  return (
    <FetchBoundary>
      <Layout name={name} />
    </FetchBoundary>
  );
}
const Layout = async ({ name }: { name: string }) => {
  console.log(name);
  const brandResponse = await BrandService.getBrand(name);
  const statisticDataList = (await StatisticService.getStatistic(name)).payload;
  const headData = brandResponse?.payload?.head;
  const brandData = statisticDataList?.length ? statisticDataList[0] : null;

  return (
    <div className="flex-1">
      <div className="flex flex-col flex-1 gap-4 pt-12">
        {!!headData && (
          <FetchBoundary>
            <BrandHead headData={headData} />
          </FetchBoundary>
        )}
        {!!brandData && (
          <FetchBoundary>
            <BrandHeader data={brandData} />
          </FetchBoundary>
        )}
        {!!name && (
          <FetchBoundary>
            <BrandStartup name={name} />
          </FetchBoundary>
        )}
        {!!brandResponse?.payload?.brand?.brandMnno && (
          <FetchBoundary>
            <BrandInterior brandMnno={brandResponse?.payload?.brand?.brandMnno} />
          </FetchBoundary>
        )}
        {statisticDataList && (
          <FetchBoundary>
            <BrandStatistic statisticDataList={statisticDataList} />
          </FetchBoundary>
        )}
      </div>
    </div>
  );
};
