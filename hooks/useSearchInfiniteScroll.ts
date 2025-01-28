'use client';

import { StatisticService } from '@/services/statistic';
import { Statistic } from '@/types/apiTypes';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useQueryString } from './useQueryString';

export const useSearchInfiniteScroll = () => {
  const [dataList, setDataList] = useState<Statistic[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { getQuery } = useQueryString();

  const name = getQuery('name') || '';
  const category = getQuery('category') || '';
  const orderCol = getQuery('orderCol') || '';
  const orderSort = getQuery('orderSort') || '';

  // 초기호출
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setPageNo(1);
    StatisticService.getStatisticByFilter({
      name,
      category,
      pageNo: 1,
      pageSize: 20,
      orderCol,
      orderSort,
    })
      .then((res) => setDataList(res?.payload))
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCol, orderSort]);

  const getNextPage = useCallback(() => {
    if (isEnd) return;
    setIsLoading(true);
    StatisticService.getStatisticByFilter({
      name,
      category,
      pageNo: pageNo + 1,
      pageSize: 20,
      orderCol,
      orderSort,
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
  }, [category, isEnd, name, orderCol, orderSort, pageNo]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        getNextPage();
      }
    },
    [getNextPage, isLoading],
  );

  useEffect(() => {
    const currentTrigger = triggerRef.current;

    observerRef.current = new IntersectionObserver(handleObserver);
    if (currentTrigger) observerRef.current.observe(currentTrigger);

    return () => {
      if (currentTrigger) observerRef.current?.unobserve(currentTrigger);
    };
  }, [handleObserver]);

  return { dataList, isLoading, triggerRef };
};
