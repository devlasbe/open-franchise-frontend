/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Statistic {
  /** 브랜드명 */
  brandNm: string;
  /** 법인명 */
  corpNm: string;
  /** 기준년도 */
  yr: string;
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
  /** 가맹점수 */
  frcsCnt: number;
  /** 신규가맹점등록수 */
  newFrcsRgsCnt: number;
  /** 계약종료수 */
  ctrtEndCnt: number;
  /** 계약해지수 */
  ctrtCncltnCnt: number;
  /** 명의변경수 */
  nmChgCnt: number;
  /** 평균매출금액 */
  avrgSlsAmt: number;
  /** 면적단위평균매출금액 */
  arUnitAvrgSlsAmt: number;
}

export interface GetStatisticListRes {
  /** 응답 데이터 */
  payload: Statistic[];
  /** 호출된 URI */
  request: string;
  /** payload 배열의 length */
  count: number;
}

export interface GetStatisticByFilterReq {
  /**
   * 페이지 번호
   * @example 1
   */
  pageNo: number;
  /**
   * 가져올 데이터 수
   * @example 10
   */
  pageSize: number;
  /** 정렬할 컬럼명 */
  orderCol?: string;
  /**
   * 정렬 방법
   * @example "asc | desc"
   */
  orderSort?: string;
  /**
   * 연도
   * @example "2023"
   */
  yr: string;
  /**
   * 카테고리
   * @example "치킨"
   */
  category: string;
}

export interface Category {
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
}

export interface GetCategoryListRes {
  /** 응답 데이터 */
  payload: Category[];
  /** 호출된 URI */
  request: string;
  /** payload 배열의 length */
  count: number;
}

export interface GetBrandListReq {
  /**
   * 페이지 번호
   * @example 1
   */
  pageNo: number;
  /**
   * 가져올 데이터 수
   * @example 10
   */
  pageSize: number;
  /** 정렬할 컬럼명 */
  orderCol?: string;
  /**
   * 정렬 방법
   * @example "asc | desc"
   */
  orderSort?: string;
  /**
   * 브랜드 명
   * @example "놀부"
   */
  name?: string;
  /** 카테고리 */
  category?: string;
}

export interface Brand {
  /** 브랜드관리번호 */
  brandMnno: string;
  /** 가맹본부관리번호 */
  jnghdqrtrsMnno: string;
  /** 사업자등록번호 */
  brno: string;
  /** 법인등록번호 */
  crno: string;
  /** 가맹본부대표자명 */
  jnghdqrtrsRprsvNm: string;
  /** 브랜드명 */
  brandNm: string;
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
  /** 주요상품명 */
  majrGdsNm: string;
  /** 가맹사업개시일자 */
  jngBizStrtDate: string;
  /** 가맹사업기준년도 */
  jngBizCrtraYr: string;
}

export interface GetBrandListRes {
  /** 응답 데이터 */
  payload: Brand[];
  /** 호출된 URI */
  request: string;
  /** payload 배열의 length */
  count: number;
}

export interface GetBrandRes {
  /** 응답 데이터 */
  payload: Brand;
  /** 호출된 URI */
  request: string;
}

export interface Startup {
  /** 브랜드명 */
  brandNm: string;
  /** 법인명 */
  corpNm: string;
  /** 기준년도 */
  yr: string;
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
  /** 가맹금액 */
  jngBzmnJngAmt: number;
  /** 교육금액 */
  jngBzmnEduAmt: number;
  /** 기타금액 */
  jngBzmnEtcAmt: number;
  /** 보증금액 */
  jngBzmnAssrncAmt: number;
  /** 합계금액 */
  smtnAmt: number;
}

export interface GetStartupRes {
  /** 응답 데이터 */
  payload: Startup;
  /** 호출된 URI */
  request: string;
}

export interface GetInteriorReq {
  /** 가맹사업기준년도 */
  jngBizCrtraYr: string;
  /** 브랜드관리번호 */
  brandMnno: string;
}

export interface Interior {
  /** 브랜드명 */
  brandNm: string;
  /** 화폐단위코드명 */
  crrncyUnitCdNm: string;
  /** 가맹사업기준년도 */
  jngBizCrtraYr?: string;
  /** 브랜드관리번호 */
  brandMnno: string;
  /** 가맹본부관리번호 */
  jnghdqrtrsMnno?: string;
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
  /** 단위면적인테리어금액범위값 (편차 5%) */
  unitArIntrrAmtScopeVal?: string;
  /** 점포기준면적 */
  storCrtraAr?: number;
  /** 인테리어금액범위값 (편차 5%) */
  intrrAmtScopeVal?: string;
}

export interface GetInteriorRes {
  /** 응답 데이터 */
  payload: Interior;
  /** 호출된 URI */
  request: string;
}

export interface GetHeadReq {
  /** 가맹사업기준년도 */
  jngBizCrtraYr: string;
  /** 가맹본부관리번호 */
  jnghdqrtrsMnno: string;
}

export interface Head {
  /** 홈페이지주소 */
  hmpgUrladr: string;
  /** 지역명 */
  areaNm: string;
  /** 가맹사업기준년도 */
  jngBizCrtraYr: string;
  /** 가맹본부관리번호 */
  jnghdqrtrsMnno: string;
  /** 가맹본부 상호명 */
  jnghdqrtrsConmNm: string;
  /** 사업자등록번호 */
  brno: string;
  /** 법인등록번호 */
  crno: string;
  /** 개인법인구분코드 (10: 개인, 11: 법인) */
  indvdlCorpSeCd: string;
  /** 사업자등록일자 */
  bzmnRgsDate: string;
  /** 법인등기일자 */
  corpRgDate: string;
  /** 가맹본부대표전화번호 */
  jnghdqrtrsRprsTelno: string;
  /** 가맹본부대표팩스번호 */
  jnghdqrtrsRprsFxno: string;
  /** 가맹본부대표자명 */
  jnghdqrtrsRprsvNm: string;
  /** 가맹본부구우편번호 */
  jnghdqrtrsOzip: string;
  /** 소재지주소 */
  lctnAddr: string;
  /** 소재지상세주소 */
  lctnDaddr: string;
  /** 브랜드수 */
  brandCnt: number;
  /** 계열회사수 */
  affltsCnt: number;
  /** 가맹기관명 */
  jngInstNm: string;
  /** 기업규모명 */
  entScaleNm: string;
}

export interface GetHeadRes {
  /** 응답 데이터 */
  payload: Head;
  /** 호출된 URI */
  request: string;
}
