import SubHeader from "@/components/ui/sub-header";
import { Statistic } from "@/types/apiTypes";

export default function BrandHeader({ data }: { data: Statistic | null }) {
  return (
    <SubHeader>
      <div className="flex items-center gap-2 w-full overflow-hidden">
        <p className="text-caption1 text-neutral-400 text-nowrap">{data?.corpNm}</p>
        <p className="text-subtitle1 overflow-hidden whitespace-pre text-ellipsis">{data?.brandNm}</p>
      </div>
    </SubHeader>
  );
}
