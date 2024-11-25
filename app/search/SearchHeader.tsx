import { Separator } from "@/components/ui/separator";
import { SortType } from "@/types/sort";

type SearchHeaderType = {
  current?: SortType;
  onChange: (value: SortType) => void;
};

export default function SearchHeader({ current, onChange }: SearchHeaderType) {
  return (
    <div className="z-10 fixed top-16 left-0 flex justify-center items-center w-full h-12 px-4 sm:px-16 bg-white bg-opacity-50 backdrop-blur-sm border-t shadow-md">
      <div className="flex items-center gap-2 max-w-screen-xl w-full overflow-x-scroll scrollbar-hide">
        <SortButton isCurrent={!current?.orderCol} onClick={() => onChange({ orderCol: "", orderSort: "" })}>
          기본
        </SortButton>
        <Separator orientation="vertical" className="border-r h-4" />
        {dataList.map((item) => (
          <SortButton
            key={`search-button-${item.label}`}
            isCurrent={current?.orderCol === item.value.orderCol}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </SortButton>
        ))}
      </div>
    </div>
  );
}

const SortButton = ({
  children,
  isCurrent,
  ...rest
}: { children: React.ReactNode; isCurrent?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`${isCurrent ? "bg-blue-500 text-white" : "bg-transparent text-black"} px-4 py-1 hover:opacity-60 rounded-full border text-nowrap text-caption1 font-normal`}
    >
      {children}
    </button>
  );
};

type DataListType = { label: string; value: SortType }[];
const dataList: DataListType = [
  { label: "많은 가맹점 순", value: { orderCol: "frcsCnt", orderSort: "desc" } },
  { label: "많은 매출 순", value: { orderCol: "avrgSlsAmt", orderSort: "desc" } },
  { label: "적은 창업금액 순", value: { orderCol: "smtnAmt", orderSort: "asc" } },
];
