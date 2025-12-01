import fetchService from '@/lib/fetchService';
import { GetBrandListReq, GetBrandListRes, GetBrandRes } from '@/types/apiTypes';
import { QueryParamsUtil } from '@/utils/queryParams';

export class BrandService {
  static async getBrandList(params: GetBrandListReq, isServer?: boolean) {
    const data = await fetchService<GetBrandListRes>({
      path: QueryParamsUtil.convert('brand', params),
      isClient: !isServer,
    });
    return data;
  }
  static async getBrand(name: string) {
    const data = await fetchService<GetBrandRes>({ path: `brand/${name}` });
    return data;
  }
}
