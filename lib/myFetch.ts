const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === 'development';
const defaultUrl = isDev ? apiDev : apiOp;

type MyFetchType = {
  path: RequestInfo | URL;
  init?: RequestInit;
  isClient?: boolean;
};

const myFetch = async <T>({ path, init, isClient }: MyFetchType) => {
  try {
    const endPoint = isClient ? `/franchise/${path}` : `${defaultUrl}/${path}`;
    const response = await fetch(endPoint, init);
    const data: T = await response.json();
    if (!response.ok) {
      console.error('[ERROR]', endPoint);
      throw new Error('API 응답 처리 실패');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default myFetch;
