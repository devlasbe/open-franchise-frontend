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

    const billion = Math.floor(mNum / 10000);
    const million = mNum % 10000;

    if (cut === "b") return `${billion.toLocaleString()}억`;
    if (cut === "m") return `${million.toLocaleString()}만`;

    let result = "";
    if (billion > 0) {
      result += `${billion.toLocaleString()}억 `;
    }
    if (million > 0 || billion === 0) {
      result += `${million.toLocaleString()}만`;
    }
    return result.trim();
  }
}
