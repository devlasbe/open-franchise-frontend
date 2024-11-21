import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Category } from "@/types/apiTypes";
import { SearchIcon } from "lucide-react";
import SearchInput from "@/components/SearchInput";

export default function MobileMenu({ categoryList }: { categoryList: Category[] }) {
  const largeList = Array.from(new Set(categoryList.map((item) => item.indutyLclasNm)));
  return (
    <nav className="flex gap-4 md:hidden items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <SearchIcon width={25} height={25} />
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-auto h-full border-none">
          <AlertDialogTitle />
          <h2 className="text-center text-h3">브랜드 이름으로 검색</h2>
          <div className="py-50">
            <SearchInput />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>닫기</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <HamburgerMenuIcon width={28} height={28} />
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-auto h-full border-none">
          <AlertDialogTitle />
          {largeList.map((item) => {
            const subList = categoryList
              .filter((data) => data.indutyLclasNm === item)
              .sort((a, b) => a.indutyMlsfcNm.localeCompare(b.indutyMlsfcNm));
            return (
              <div key={`mobile-menu-${item}`} className="space-y-4">
                <h2 className="font-extrabold text-center text-subtitle1 underline decoration-blue-700 decoration-wavy">
                  {item}
                </h2>
                <div className="grid grid-cols-3 gap-1">
                  {subList.map((sub) => (
                    <AlertDialogCancel asChild key={`mobile-sub-menu-${sub.indutyMlsfcNm}`} className="m-0">
                      <a
                        href={`/search?category=${sub.indutyMlsfcNm}`}
                        className="py-1 border rounded-md text-center text-caption1 sm:text-body text-ellipsis line-clamp-1"
                      >
                        {sub.indutyMlsfcNm}
                      </a>
                    </AlertDialogCancel>
                  ))}
                </div>
              </div>
            );
          })}
          <AlertDialogFooter>
            <AlertDialogCancel>닫기</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
