export class UnitUtil {
  // DB 숫자 1000단위
  static formatNumberToKorean(number: number, cutBillion?: boolean) {
    if (isNaN(number) || number < 0) {
      return "유효한 숫자가 아닙니다.";
    }
    if (cutBillion) return `${(number / 10000).toFixed(1)}억`;

    const billion = Math.floor(number / 10000); // 억 단위
    const million = number % 10000; // 남은 만 단위

    let result = "";
    if (billion > 0) {
      result += `${billion.toLocaleString()}억 `;
    }
    if (million > 0 || billion === 0) {
      result += `${million.toLocaleString()}만`;
    }
    return result.trim();
  }
  static formatKtoM(number: number) {
    if (number < 10) return number / 10;
    return Math.floor(number / 10);
  }
}
