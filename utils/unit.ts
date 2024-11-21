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
    if (cut === "b") return `${(mNum / 10000).toFixed(0)}억`;
    if (cut === "m") return `${mNum}만`;
    const billion = Math.floor(mNum / 10000); // 억 단위
    const million = mNum % 10000; // 남은 만 단위

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
