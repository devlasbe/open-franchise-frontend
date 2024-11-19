import myFetch from "@/lib/myFetch";
import { GetHeadReq, GetHeadRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class HeadService {
  static async getHead(params: GetHeadReq) {
    const dataList = await myFetch<GetHeadRes>(QueryParamsUtil.convert("heads", params));
    return dataList;
  }
}
