import FetchBoundary from "@/components/errorBoundary/FetchBoundary";
import SearchLayout from "./SearchLayout";
import { SeoUtil } from "@/utils/seo";

export async function generateMetadata() {
  const metadata = SeoUtil.metadata(`검색결과`);
  return metadata;
}

export default function SearchPage() {
  return (
    <div className="flex flex-col flex-1">
      <FetchBoundary>
        <SearchLayout />
      </FetchBoundary>
    </div>
  );
}
