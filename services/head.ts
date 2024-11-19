import myFetch from "@/lib/myFetch";
import { GetHeadReq, GetHeadRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class HeadService {
  static async getHead(jnghdqrtrsMnno: string) {
    const year = process.env.DEFAULT_YEAR;
    if (!year) throw new Error("DEFAULT_YEAR does not exist");
    const params: GetHeadReq = {
      jnghdqrtrsMnno,
      jngBizCrtraYr: year,
    };
    const dataList = await myFetch<GetHeadRes>(QueryParamsUtil.convert("heads", params));
    return dataList;
  }
}
