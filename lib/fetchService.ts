const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === 'development';
const defaultUrl = isDev ? apiDev : apiOp;

type MyFetchType = {
  path: RequestInfo | URL;
  init?: RequestInit;
  isClient?: boolean;
};

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const fetchService = async <T>({ path, init, isClient }: MyFetchType) => {
  try {
    const endPoint = isClient ? `/franchise/${path}` : `${defaultUrl}/${path}`;
    const response = await fetch(endPoint, init);
    
    if (!response.ok) {
      console.error('[ERROR]', endPoint, response.status);
      throw new ApiError('API 응답 처리 실패', response.status);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchService;
