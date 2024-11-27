"use client";

import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import _ from "lodash";
import { Brand } from "@/types/apiTypes";
import { BrandService } from "@/services/brand";
import { useRouter } from "next/navigation";
import { closeDialog } from "@/components/ui/alert-dialog";

export default function SearchInput() {
  const [name, setName] = useState("");
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!value) return setBrandList([]);

    const response = await BrandService.getBrandList({ pageNo: 1, pageSize: 5, name: value });
    setBrandList([]);
    if (response?.payload?.length) setBrandList(response.payload);
  };
  // 경로 변경하며 모바일에서 dialog 닫는 로직 추가
  const handleChangePath = (path: string) => {
    router.push(path);
    closeDialog();
  };
  const debouncedChange = useMemo(() => _.debounce(handleChange, 300), []);
  const handleBlur = () => setTimeout(() => setIsFocus(false), 300);

  return (
    <div
      id="search"
      className="relative flex items-center px-4 py-2 h-[44px] border rounded-full group focus-within:border-neutral-400"
      onFocus={() => setIsFocus(true)}
      onBlur={handleBlur}
    >
      <input
        className="w-full bg-transparent text-textbody text-neutral-500 outline-none focus:ring-0 placeholder:text-center"
        type="text"
        placeholder="궁금했던 브랜드 검색"
        onChange={debouncedChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name) handleChangePath(`/search?name=${name}`);
        }}
      />
      <button onClick={() => handleChangePath(`/search?name=${name}`)}>
        <SearchIcon className="stroke-neutral-400" width={20} height={20} />
      </button>
      {isFocus && !!brandList.length && (
        <div className="z-30 absolute top-12 left-0 flex flex-col p-4 w-full rounded-md shadow-md bg-white border">
          {brandList.map((item) => (
            <button
              key={`search-input-${item.brandNm}`}
              onClick={() => handleChangePath(`/brand/${item.brandNm}`)}
              className="rounded-md hover:bg-neutral-100 p-2 text-neutral-500 overflow-hidden text-body text-nowrap text-ellipsis"
            >
              {item.brandNm}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
