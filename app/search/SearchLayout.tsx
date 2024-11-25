"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { StatisticService } from "@/services/statistic";
import { Statistic } from "@/types/apiTypes";
import { UnitUtil } from "@/utils/unit";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import SearchHeader from "./SearchHeader";
import { SortType } from "@/types/sort";

export default function SearchLayout() {
  const searchParams = useSearchParams();
  const [dataList, setDataList] = useState<Statistic[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const name = searchParams.get("name") ?? "";
  const category = searchParams.get("category") ?? "";
  const [query, setQuery] = useState({ name: name, category: category });
  const [sort, setSort] = useState<SortType>({ orderCol: "", orderSort: "" });
  useEffect(() => setQuery({ name, category }), [category, name]);
  console.log(sort);
  // 초기 호출
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setPageNo(1);
    StatisticService.getStatisticByFilter({
      name: query.name,
      category: query.category,
      pageNo: 1,
      pageSize: 20,
      orderCol: sort?.orderCol,
      orderSort: sort?.orderSort,
    })
      .then((res) => setDataList(res?.payload))
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort]);

  const getNextPage = useCallback(() => {
    if (isEnd) return;
    setIsLoading(true);
    StatisticService.getStatisticByFilter({
      name: query.name,
      category: query.category,
      pageNo: pageNo + 1,
      pageSize: 20,
      orderCol: sort?.orderCol,
      orderSort: sort?.orderSort,
    })
      .then((res) => {
        if (!res.count) setIsEnd(true);
        setDataList((prev) => [...prev, ...res.payload]);
        window.scrollTo({
          top: document.body.scrollHeight - 200,
        });
      })
      .finally(() => setIsLoading(false));
    setPageNo(pageNo + 1);
  }, [isEnd, pageNo, query.category, query.name, sort?.orderCol, sort?.orderSort]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        getNextPage();
      }
    },
    [getNextPage, isLoading]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver);
    if (triggerRef.current) observerRef.current.observe(triggerRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (triggerRef.current) observerRef.current?.unobserve(triggerRef.current);
    };
  }, [handleObserver]);

  if (!isLoading && !dataList?.length) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-subtitle1 text-neutral-300 underline decoration-wavy">데이터가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <SearchHeader current={sort} onChange={setSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 pt-12">
        {!!dataList?.length &&
          dataList.map((item) => (
            <Link key={`search-${item.brandNm}`} className="hovered-button" href={`/brand/${item.brandNm}`}>
              <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-caption1 text-neutral-400 text-ellipsis line-clamp-1">
                    {item?.corpNm ?? "-"} · {item?.brand?.majrGdsNm ?? "-"}
                  </p>
                  <p className="text-caption1 text-neutral-400 text-ellipsis line-clamp-1"></p>
                  <p className="text-subtitle3 sm:text-subtitle1 text-ellipsis line-clamp-1">{item.brandNm}</p>
                </div>
                <div className="space-y-1 bg-neutral-50 px-4 py-2 rounded-lg">
                  <Value label="점포수" value={item?.frcsCnt?.toLocaleString() + "개"} />
                  <Value label="창업금액" value={UnitUtil.formatNumberToKorean(item?.startup?.smtnAmt) + "원"} />
                  <Value label="평균매출" value={UnitUtil.formatNumberToKorean(item.avrgSlsAmt) + "원"} />
                </div>
                <div className="flex gap-2">
                  <Badge variant={"outline"}>{item.indutyLclasNm}</Badge>
                  <Badge variant={"outline"}>{item.indutyMlsfcNm}</Badge>
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
