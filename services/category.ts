import myFetch from "@/lib/myFetch";
import { GetCategoryListRes } from "@/types/apiTypes";

export class CategoryService {
  static async getCategoryList() {
    const dataList = await myFetch<GetCategoryListRes>("category");
    return dataList;
  }
}
