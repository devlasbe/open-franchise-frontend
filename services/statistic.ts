import myFetch from "@/lib/myFetch";
import { GetStartupRes, GetStatisticByFilterReq, GetStatisticListRes } from "@/types/apiTypes";

export class StatisticService {
  static async getStatistic(name: string) {
    const dataList = await myFetch<GetStatisticListRes>(`statistic/${name}`);
    return dataList;
  }
  static async getStatisticByFilter(params: GetStatisticByFilterReq) {
    const stringParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    );
    const data = await myFetch<GetStatisticListRes>("statistic?" + new URLSearchParams(stringParams));
    return data;
  }
  static async getStartup(name: string) {
    const dataList = await myFetch<GetStartupRes>(`startups/${name}`);
    return dataList;
  }
}
