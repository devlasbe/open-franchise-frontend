export class UnitUtil {
  static formatKtoM(number: number) {
    if (number < 10) return number / 10;
    return Math.floor(number / 10);
  }
  // DB 숫자 1000단위
  static formatNumberToKorean(number?: number | null, cut?: "b" | "m") {
    if (number === null || number === undefined) {
      return "-";
    }

    const mNum = this.formatKtoM(number);

    const billion = mNum / 10000;
    const million = mNum % 10000;
    if (cut === "b") return `${Math.floor(billion * 10) / 10}억`;
    if (cut === "m") return `${million.toLocaleString()}만`;
    let result = "";
    if (Math.floor(billion) > 0) {
      result += `${Math.floor(billion).toLocaleString()}억 `;
    }
    if (million > 0) {
      result += `${million.toLocaleString()}만`;
    }
    if (!result) result = "0";
    return result.trim();
  }
}
