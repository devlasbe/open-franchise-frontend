import { StatisticService } from '@/services/statistic';
import BrandHeader from '../BrandHeader';
import BrandStartup from './BrandStartup';
import BrandStatistic from './BrandStatistic';
import FetchBoundary from '@/components/errorBoundary/FetchBoundary';
import BrandHead from './BrandHead';
import { BrandService } from '@/services/brand';
import BrandInterior from './BrandInterior';
import { SeoUtil } from '@/utils/seo';

type BrandPageParams = {
  params: {
    name: string;
  };
};

const filterList = ['%EB%9F%B0%EB%8D%98%EB%B2%A0%EC%9D%B4%EA%B8%80%EB%AE%A4%EC%A7%80%EC%97%84'];
const getIsRejectedBrand = (name: string) => filterList.includes(name);

export async function generateMetadata({ params: { name } }: BrandPageParams) {
  try {
    const brandResponse = await BrandService.getBrand(name);
    const { brand, head } = brandResponse?.payload;
    const metadata = getIsRejectedBrand(name)
      ? SeoUtil.metadata()
      : SeoUtil.metadata(`${brand?.brandNm} - ${head.jnghdqrtrsConmNm}`, true);
    return metadata;
  } catch (error) {
    console.error(error);
    return SeoUtil.metadata();
  }
}

const RejectedBrand = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">업체 측의 요청으로 인해 브랜드 정보가 비공개 처리되었습니다.</div>
      </div>
    </div>
  );
};

export default function BrandPage({ params: { name } }: BrandPageParams) {
  if (getIsRejectedBrand(name)) {
    return (
      <FetchBoundary>
        <RejectedBrand />
      </FetchBoundary>
    );
  }

  return (
    <FetchBoundary>
      <Layout name={name} />
    </FetchBoundary>
  );
}

const Layout = async ({ name }: { name: string }) => {
  const brandResponse = await BrandService.getBrand(name);
  const statisticDataList = (await StatisticService.getStatistic(name)).payload;
  const headData = brandResponse?.payload?.head;
  const brandData = statisticDataList?.length ? statisticDataList[0] : null;

  const isRejectedBrand = filterList.includes(name);

  if (isRejectedBrand) {
    return (
      <FetchBoundary>
        <RejectedBrand />
      </FetchBoundary>
    );
  }

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
