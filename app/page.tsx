import SearchInput from "@/components/SearchInput";
import Rank from "../components/Rank";
import FetchBoundary from "@/components/errorBoundary/FetchBoundary";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col flex-1 gap-4 sm:gap-8 justify-center items-center p-8 sm:p-12 max-h-[200px] sm:max-h-[300px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
        <div className="space-y-2 text-center text-white">
          <p className="font-[900] sm:font-[900] text-subtitle1 sm:text-h1">궁금한 프랜차이즈 정보를 한눈에</p>
          <p className="text-subtitle3 sm:text-h3">가맹정보부터 매출액까지 무료로 확인하세요</p>
        </div>
        <div className="sm:max-w-[600px] w-full bg-white shadow-md rounded-full">
          <FetchBoundary>
            <SearchInput />
          </FetchBoundary>
        </div>
      </div>
      <FetchBoundary>
        <Rank category="치킨" title="🍗 치킨 TOP10" />
      </FetchBoundary>
      <FetchBoundary>
        <Rank category="편의점" title="🏪 편의점 TOP10" />
      </FetchBoundary>
      <FetchBoundary>
        <Rank category="커피" title="☕️ 카페 TOP10" />
      </FetchBoundary>
      <FetchBoundary>
        <Rank category="아이스크림/빙수" title="🍦 아이스크림 TOP10" />
      </FetchBoundary>
      <FetchBoundary>
        <Rank category="주점" title="🍺 주점 TOP10" />
      </FetchBoundary>
      <FetchBoundary>
        <Rank category="피자" title="🍕 피자 TOP10" />
      </FetchBoundary>
    </div>
  );
}
