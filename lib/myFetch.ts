const apiDev = process.env.API_URL_DEV;
const apiOp = process.env.API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;

const myFetch = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const endPoint = `${defaultUrl}/${input}`;
  console.log(endPoint);
  const response = await fetch(endPoint, init);
  const data: T = await response.json();
  return data;
};

export default myFetch;
