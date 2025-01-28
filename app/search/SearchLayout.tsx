'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import { UnitUtil } from '@/utils/unit';
import Link from 'next/link';
import SearchHeader from './SearchHeader';
import { useSearchInfiniteScroll } from '@/hooks/useSearchInfiniteScroll';
import { useQueryString } from '@/hooks/useQueryString';
import { SortType } from '@/types/sort';
import { useCallback, useMemo } from 'react';

export default function SearchLayout() {
  const { dataList, isLoading, triggerRef } = useSearchInfiniteScroll();
  const { getQuery, setQueries } = useQueryString();
  const searchHeaderCurrent = useMemo(
    () => ({ orderCol: getQuery('orderCol'), orderSort: getQuery('orderSort') }) as SortType,
    [getQuery],
  );
  const handleChangeHeader = useCallback(
    (value: SortType) => setQueries({ orderCol: value.orderCol, orderSort: value.orderSort }),
    [setQueries],
  );
  if (!isLoading && !dataList?.length) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-subtitle1 text-neutral-300 underline decoration-wavy">데이터가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <SearchHeader current={searchHeaderCurrent} onChange={handleChangeHeader} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 pt-12">
        {!!dataList?.length &&
          dataList.map((item) => (
            <Link key={`search-${item.brandNm}`} className="hovered-button" href={`/brand/${item.brandNm}`}>
              <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-caption1 text-neutral-400 text-ellipsis line-clamp-1">
                    {item?.corpNm ?? '-'} · {item?.brand?.majrGdsNm ?? '-'}
                  </p>
                  <p className="text-subtitle3 sm:text-subtitle1 text-ellipsis line-clamp-1">{item.brandNm}</p>
                </div>
                <div className="space-y-1 bg-neutral-50 px-4 py-2 rounded-lg">
                  <Value label="점포수" value={item?.frcsCnt?.toLocaleString() + '개'} />
                  <Value label="창업금액" value={UnitUtil.formatNumberToKorean(item?.startup?.smtnAmt) + '원'} />
                  <Value label="평균매출" value={UnitUtil.formatNumberToKorean(item.avrgSlsAmt) + '원'} />
                </div>
                <div className="flex gap-2">
                  <Badge variant={'outline'}>{item.indutyLclasNm}</Badge>
                  <Badge variant={'outline'}>{item.indutyMlsfcNm}</Badge>
                </div>
              </Card>
            </Link>
          ))}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loading />
        </div>
      )}
      <div className="h-2" ref={triggerRef} />
    </div>
  );
}

const Value = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <p className="text-caption1 text-neutral-400">{label}</p>
      <p className="text-caption1 text-neutral-700">{value}</p>
    </div>
  );
};
