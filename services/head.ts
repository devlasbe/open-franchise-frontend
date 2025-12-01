import fetchService from '@/lib/fetchService';
import { GetHeadRes } from '@/types/apiTypes';
import { QueryParamsUtil } from '@/utils/queryParams';

export class HeadService {
  static async getHead(jnghdqrtrsMnno: string) {
    const params = {
      jnghdqrtrsMnno,
    };
    const dataList = await fetchService<GetHeadRes>({ path: QueryParamsUtil.convert('heads', params) });
    return dataList;
  }
}
