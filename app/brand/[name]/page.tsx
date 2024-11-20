"use client";

import { StatisticService } from "@/services/statistic";
import BrandHeader from "../BrandHeader";
import BrandStartup from "./BrandStartup";
import BrandStatistic from "./BrandStatistic";
import FetchBoundary from "@/components/errorBoundary/FetchBoundary";
import BrandHead from "./BrandHead";
import { BrandService } from "@/services/brand";
import BrandInterior from "./BrandInterior";
import { useEffect, useState } from "react";
import { GetBrandRes, Statistic } from "@/types/apiTypes";
import { useParams } from "next/navigation";

export default function BrandPage() {
  return (
    <FetchBoundary>
      <Layout />
    </FetchBoundary>
  );
}
const Layout = () => {
  const { name } = useParams<{ name: string }>();
  const [brandResponse, setBrandResponse] = useState<GetBrandRes>();
  const [statisticDataList, setStatisticDataList] = useState<Statistic[]>();
  const headData = brandResponse?.payload?.head;
  const brandData = statisticDataList?.length ? statisticDataList[0] : null;
  useEffect(() => {
    if (!name) return;
    BrandService.getBrand(name).then((res) => setBrandResponse(res));
    StatisticService.getStatistic(name).then((res) => setStatisticDataList(res.payload));
  }, [name]);
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
