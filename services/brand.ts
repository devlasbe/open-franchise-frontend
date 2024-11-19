import { clientFetch } from "@/lib/myFetch";
import { GetBrandListReq, GetBrandListRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class BrandService {
  static async getBrandList(params: GetBrandListReq) {
    const data = await clientFetch<GetBrandListRes>(QueryParamsUtil.convert("brand", params));
    return data;
  }
}
