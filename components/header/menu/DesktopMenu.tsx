'use client';

import SearchInput from '@/components/SearchInput';
import { ListItem } from '@/components/ui/listItem';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/hooks/useAuth';
import { Category } from '@/types/apiTypes';
import Link from 'next/link';

export default function DesktopMenu({ categoryList }: { categoryList: Category[] }) {
  const { isLoggedIn, isAdmin, isLoading, logout } = useAuth();
  const largeList = Array.from(new Set(categoryList.map((item) => item.indutyLclasNm)));
  return (
    <NavigationMenu className="hidden md:flex flex-1 justify-between max-w-full">
      <div className="flex">
        {largeList.map((item) => {
          const subList = categoryList
            .filter((data) => data.indutyLclasNm === item)
            .sort((a, b) => a.indutyMlsfcNm.localeCompare(b.indutyMlsfcNm));
          return (
            <NavigationMenuList key={`menu-${item}`}>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">{item}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[800px] grid-cols-4">
                    {subList.map((sub) => (
                      <ListItem
                        key={`sub_category-${sub.indutyMlsfcNm}`}
                        title={sub.indutyMlsfcNm}
                        href={`/search?category=${sub.indutyMlsfcNm}`}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        {isLoading ? null : isLoggedIn ? (
          <>
            {isAdmin && (
              <Link href="/admin" className="text-gray-400 font-bold text-sm hover:underline">
                관리자
              </Link>
            )}
            <Link href="/mypage" className="text-gray-400 font-bold text-sm hover:underline">
              마이페이지
            </Link>
            <button onClick={logout} className="text-gray-400 font-bold text-sm hover:underline">
              로그아웃
            </button>
          </>
        ) : (
          <Link href="/login" className="text-gray-400 font-bold text-sm hover:underline">
            로그인
          </Link>
        )}
        <SearchInput />
      </div>
    </NavigationMenu>
  );
}
