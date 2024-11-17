import { StatisticService } from "@/services/statistic";
import BrandHeader from "../BrandHeader";

import BrandStartup from "./BrandStartup";
import BrandStatistic from "./BrandStatistic";
import FetchBoundary from "@/components/errorBoundary/FetchBoundary";

type BrandPageParams = {
  params: {
    name: string;
  };
};

export default async function BrandPage({ params: { name } }: BrandPageParams) {
  const data = await StatisticService.getStatistic(name);
  const brandData = data?.payload?.length ? data.payload[0] : null;
  return (
    <div className="flex-1">
      <BrandHeader data={brandData} />
      <div className="flex flex-col flex-1 gap-4 pt-12">
        <FetchBoundary>
          <BrandStartup name={name} />
        </FetchBoundary>
        <BrandStatistic name={name} />
      </div>
    </div>
  );
}
