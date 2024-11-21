import myFetch from "@/lib/myFetch";
import { GetBrandListReq, GetBrandListRes, GetBrandRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class BrandService {
  static async getBrandList(params: GetBrandListReq, isServer?: boolean) {
    const data = await myFetch<GetBrandListRes>({
      path: QueryParamsUtil.convert("brand", params),
      isClient: !isServer,
    });
    return data;
  }
  static async getBrand(name: string) {
    const data = await myFetch<GetBrandRes>({ path: `brand/${name}` });
    return data;
  }
}
