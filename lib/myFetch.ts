const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;

const myFetch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  try {
    const endPoint = `${defaultUrl}/${input}`;
    const response = await fetch(endPoint, init);
    const data: T = await response.json();
    if (!response.ok) {
      console.error(endPoint, data);
      throw new Error("API 응답 처리 실패");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default myFetch;

export const clientFetch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const endPoint = `/franchise/${input}`;
  try {
    const response = await fetch(endPoint, init);
    const data: T = await response.json();
    if (!response.ok) {
      console.error(endPoint, data);
      throw new Error("API 응답 처리 실패");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
