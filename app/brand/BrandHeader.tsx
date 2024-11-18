import { Statistic } from "@/types/apiTypes";

export default function BrandHeader({ data }: { data: Statistic | null }) {
  return (
    <nav className="z-10 fixed top-16 left-0 flex items-center w-full h-12 px-4 sm:px-16 bg-white bg-opacity-50 backdrop-blur-sm border-t shadow-md">
      <div className="flex items-center gap-2">
        <p className="text-caption1 text-neutral-400">{data?.corpNm}</p>
        <p className="text-subtitle1">{data?.brandNm}</p>
      </div>
    </nav>
  );
}
