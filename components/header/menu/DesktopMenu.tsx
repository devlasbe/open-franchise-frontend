import SearchInput from "@/components/SearchInput";
import { ListItem } from "@/components/ui/listItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Category } from "@/types/apiTypes";

export default function DesktopMenu({ categoryList }: { categoryList: Category[] }) {
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
      <SearchInput />
    </NavigationMenu>
  );
}
