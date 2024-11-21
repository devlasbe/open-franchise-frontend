export class UnitUtil {
  static formatKtoM(number: number) {
    if (number < 10) return number / 10;
    return Math.floor(number / 10);
  }
  // DB 숫자 1000단위
  static formatNumberToKorean(number: number, cut?: "b" | "m") {
    if (isNaN(number) || number < 0) {
      return "유효한 숫자가 아닙니다.";
    }

    const mNum = this.formatKtoM(number);

    const billion = mNum / 10000;
    const million = mNum % 10000;
    console.log(million, million.toLocaleString());
    if (cut === "b") return `${billion.toFixed(1).toLocaleString()}억`;
    if (cut === "m") return `${million.toLocaleString()}만`;
    console.log(billion, +billion.toFixed(0));
    let result = "";
    if (Math.floor(billion) > 0) {
      result += `${billion.toFixed(0).toLocaleString()}억 `;
    }
    if (million > 0) {
      result += `${million.toLocaleString()}만`;
    }
    if (!result) result = "0";
    return result.trim();
  }
}
