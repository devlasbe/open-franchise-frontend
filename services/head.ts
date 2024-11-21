import myFetch from "@/lib/myFetch";
import { GetHeadRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class HeadService {
  static async getHead(jnghdqrtrsMnno: string) {
    const params = {
      jnghdqrtrsMnno,
    };
    const dataList = await myFetch<GetHeadRes>({ path: QueryParamsUtil.convert("heads", params) });
    return dataList;
  }
}
