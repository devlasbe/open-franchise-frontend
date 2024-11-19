import myFetch from "@/lib/myFetch";
import { GetInteriorReq, GetInteriorRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class InteriorService {
  static async getInterior(params: GetInteriorReq) {
    const dataList = await myFetch<GetInteriorRes>(QueryParamsUtil.convert("heads", params));
    return dataList;
  }
}
