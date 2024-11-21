import FetchBoundary from "@/components/errorBoundary/FetchBoundary";
import Layout from "./Layout";
import { SeoUtil } from "@/utils/seo";

export async function generateMetadata() {
  const metadata = SeoUtil.metadata(`검색결과`);
  return metadata;
}

export default function SearchPage() {
  return (
    <div className="flex flex-col flex-1">
      <FetchBoundary>
        <Layout />
      </FetchBoundary>
    </div>
  );
}
