import FetchBoundary from "@/components/errorBoundary/FetchBoundary";
import Layout from "./Layout";

export default function SearchPage() {
  return (
    <div className="flex flex-col flex-1">
      <FetchBoundary>
        <Layout />
      </FetchBoundary>
    </div>
  );
}
