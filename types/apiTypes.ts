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
  /** 법인명 */
  corpNm: string;
  /** 브랜드명 */
  brandNm: string;
  /** 업종대분류명 */
  indutyLclasNm: string;
  /** 업종중분류명 */
  indutyMlsfcNm: string;
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
