import myFetch from "@/lib/myFetch";
import { GetStartupRes, GetStatisticListRes } from "@/types/apiTypes";

export class StatisticService {
  static async getStatistic(name: string) {
    const dataList = await myFetch<GetStatisticListRes>(`statistic/${name}`);
    return dataList;
  }
  static async getStartup(name: string) {
    const dataList = await myFetch<GetStartupRes>(`startups/${name}`);
    return dataList;
  }
}
