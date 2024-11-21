import { CategoryService } from "@/services/category";

import React from "react";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default async function Menu() {
  const response = await CategoryService.getCategoryList();
  const dataList = response.payload;
  return (
    <div className="flex flex-1 justify-end md:justify-start">
      <DesktopMenu categoryList={dataList} />
      <MobileMenu categoryList={dataList} />
    </div>
  );
}
