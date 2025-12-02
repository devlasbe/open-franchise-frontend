'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
// prettier-ignore
import { AlertDialog,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogTitle,AlertDialogTrigger } from "../../ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Category } from '@/types/apiTypes';
import { SearchIcon } from 'lucide-react';
import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function MobileMenu({ categoryList }: { categoryList: Category[] }) {
  const { isLoggedIn, isAdmin, isLoading, logout } = useAuth();
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
          <AlertDialogTitle>메뉴</AlertDialogTitle>
          <AlertDialogDescription />
          <Accordion type="single" collapsible>
            {largeList.map((item) => {
              const subList = categoryList
                .filter((data) => data.indutyLclasNm === item)
                .sort((a, b) => a.indutyMlsfcNm.localeCompare(b.indutyMlsfcNm));
              return (
                <AccordionItem key={`mobile-menu-${item}`} value={`item-${item}`}>
                  <AccordionTrigger>{item}</AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2 gap-1">
                    {subList.map((sub) => (
                      <AlertDialogCancel asChild key={`mobile-sub-menu-${sub.indutyMlsfcNm}`} className="m-0">
                        <Link
                          href={`/search?category=${sub.indutyMlsfcNm}`}
                          className="py-1 border rounded-md text-center text-caption1 sm:text-body text-ellipsis line-clamp-1"
                        >
                          {sub.indutyMlsfcNm}
                        </Link>
                      </AlertDialogCancel>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <AlertDialogFooter>
            <AlertDialogCancel>닫기</AlertDialogCancel>
            {isLoading ? null : isLoggedIn ? (
              <>
                {isAdmin && (
                  <AlertDialogCancel asChild>
                    <Link href="/admin">관리자</Link>
                  </AlertDialogCancel>
                )}
                <AlertDialogCancel asChild>
                  <Link href="/mypage">마이페이지</Link>
                </AlertDialogCancel>
                <AlertDialogCancel onClick={logout}>로그아웃</AlertDialogCancel>
              </>
            ) : (
              <AlertDialogCancel asChild>
                <Link href="/login">로그인</Link>
              </AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
