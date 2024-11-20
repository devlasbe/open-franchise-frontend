const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;
export default defaultUrl;
