"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { BrandService } from "@/services/brand";
import { Brand } from "@/types/apiTypes";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

export default function Layout() {
  const searchParams = useSearchParams();
  const [dataList, setDataList] = useState<Brand[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const name = searchParams.get("name") ?? "";
  const category = searchParams.get("category") ?? "";
  const [query, setQuery] = useState({ name: name, category: category });
  useEffect(() => setQuery({ name, category }), [category, name]);

  // 초기 호출
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    BrandService.getBrandList({
      name: query.name,
      category: query.category,
      pageNo,
      pageSize: 20,
    })
      .then((res) => setDataList(res?.payload))
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getNextPage = useCallback(() => {
    if (isEnd) return;
    setIsLoading(true);
    BrandService.getBrandList({
      name: query.name,
      category: query.category,
      pageNo: pageNo + 1,
      pageSize: 20,
    })
      .then((res) => {
        if (!res.count) setIsEnd(true);
        setDataList((prev) => [...prev, ...res.payload]);
      })
      .finally(() => setIsLoading(false));
    setPageNo(pageNo + 1);
  }, [isEnd, pageNo, query.category, query.name]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {!!dataList?.length &&
          dataList.map((item) => (
            <Link key={`search-${item.brandNm}`} className="hovered-button" href={`/brand/${item.brandNm}`}>
              <Card className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-caption1 text-neutral-400 text-ellipsis line-clamp-1">{item.majrGdsNm ?? "-"}</p>
                  <p className="text-subtitle3 sm:text-subtitle1 text-ellipsis line-clamp-1">{item.brandNm}</p>
                </div>
                <Separator className="border-t" />
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
