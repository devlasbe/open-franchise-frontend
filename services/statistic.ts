import myFetch from "@/lib/myFetch";
import { GetStartupRes, GetStatisticByFilterReq, GetStatisticListRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class StatisticService {
  static async getStatistic(name: string) {
    const dataList = await myFetch<GetStatisticListRes>({ path: `statistic/${name}` });
    return dataList;
  }
  static async getStatisticByFilter(params: GetStatisticByFilterReq) {
    const data = await myFetch<GetStatisticListRes>({ path: QueryParamsUtil.convert("statistic", params) });
    return data;
  }
  static async getStartup(name: string) {
    const dataList = await myFetch<GetStartupRes>({ path: `startups/${name}` });
    return dataList;
  }
}
