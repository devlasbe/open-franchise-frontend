import myFetch, { clientFetch } from "@/lib/myFetch";
import { GetBrandListReq, GetBrandListRes, GetBrandRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class BrandService {
  static async getBrandList(params: GetBrandListReq) {
    const data = await clientFetch<GetBrandListRes>(QueryParamsUtil.convert("brand", params));
    return data;
  }
  static async getBrand(name: string) {
    const data = await myFetch<GetBrandRes>(`brand/${name}`);
    return data;
  }
}
