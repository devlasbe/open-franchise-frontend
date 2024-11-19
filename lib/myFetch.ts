const apiDev = process.env.API_URL_DEV;
const apiOp = process.env.API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;

const myFetch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const endPoint = `${defaultUrl}/${input}`;
  const response = await fetch(endPoint, init);
  const data: T = await response.json();
  if (!response.ok) {
    const error = data as { response: { message: string } };
    console.error(endPoint, error);
    throw new Error(error?.response?.message);
  }
  return data;
};

export default myFetch;

export const clientFetch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const endPoint = `/franchise/${input}`;
  try {
    const response = await fetch(endPoint, init);
    const data: T = await response.json();
    if (!response.ok) {
      const error = data as { response: { message: string } };
      console.error(endPoint, error);
      throw new Error(error?.response?.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
