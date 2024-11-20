import { clientFetch } from "@/lib/myFetch";
import { GetHeadReq, GetHeadRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class HeadService {
  static async getHead(jnghdqrtrsMnno: string) {
    const year = process.env.NEXT_PUBLIC_DEFAULT_YEAR;
    if (!year) throw new Error("NEXT_PUBLIC_DEFAULT_YEAR does not exist");
    const params: GetHeadReq = {
      jnghdqrtrsMnno,
      jngBizCrtraYr: year,
    };
    const dataList = await clientFetch<GetHeadRes>(QueryParamsUtil.convert("heads", params));
    return dataList;
  }
}
