import { clientFetch } from "@/lib/myFetch";
import { GetBrandListReq, GetBrandListRes } from "@/types/apiTypes";

export class BrandService {
  static async getBrandList(params: GetBrandListReq) {
    const stringParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    );
    const data = await clientFetch<GetBrandListRes>("brand?" + new URLSearchParams(stringParams));
    return data;
  }
}
