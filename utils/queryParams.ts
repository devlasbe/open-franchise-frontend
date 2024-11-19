export class QueryParamsUtil {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static convert(path: string, params: any) {
    const stringParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    );
    return `${path}?${new URLSearchParams(stringParams)}`;
  }
}
