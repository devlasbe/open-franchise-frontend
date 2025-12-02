'use client';

import { useEffect, useState } from 'react';
import { AdminService } from '@/services/admin';
import { BrandService } from '@/services/brand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Brand, RejectedBrand } from '@/types/apiTypes';

export default function AdminPage() {
  // --- OpenAPI 데이터 수집 State ---
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // --- 브랜드 차단 관리 State ---
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Brand[]>([]);
  const [rejectedBrands, setRejectedBrands] = useState<RejectedBrand[]>([]);
  const [rejectionLoading, setRejectionLoading] = useState(false);

  // --- OpenAPI 데이터 수집 Handlers ---
  const handleApiCall = async (apiName: string, apiFn: (yr: number) => Promise<unknown>) => {
    if (!year) {
      setResult('연도를 입력해주세요.');
      return;
    }

    setLoading(true);
    setResult(`${apiName} 데이터 수집 요청 중...`);

    try {
      await apiFn(parseInt(year));
      setResult(`${apiName} 데이터 수집 요청 성공! 백그라운드에서 실행됩니다.`);
    } catch (error) {
      console.error(error);
      setResult(`${apiName} 요청 실패. 콘솔을 확인하세요.`);
    } finally {
      setLoading(false);
    }
  };

  // --- 브랜드 차단 관리 Handlers ---
  const fetchRejectedBrands = async () => {
    try {
      const res = await BrandService.getRejectedBrandList({
        pageNo: 1,
        pageSize: 100, // 일단 많이 가져오기
      });
      if (res?.payload) {
        setRejectedBrands(res.payload);
      }
    } catch (error) {
      console.error('차단 브랜드 목록 로딩 실패:', error);
    }
  };

  const handleSearchBrand = async () => {
    if (!searchKeyword) return;
    setRejectionLoading(true);
    try {
      const res = await BrandService.getBrandList({
        pageNo: 1,
        pageSize: 10,
        name: searchKeyword,
      });
      if (res?.payload) {
        setSearchResults(res.payload);
      }
    } catch (error) {
      console.error('브랜드 검색 실패:', error);
    } finally {
      setRejectionLoading(false);
    }
  };

  const handleAddRejection = async (brandNm: string) => {
    if (!confirm(`${brandNm} 브랜드를 차단하시겠습니까?`)) return;
    try {
      await BrandService.addRejectedBrand(brandNm);
      alert('차단되었습니다.');
      fetchRejectedBrands(); // 목록 갱신
    } catch (error) {
      console.error('차단 추가 실패:', error);
      alert('차단 추가 실패');
    }
  };

  const handleDeleteRejection = async (brandNm: string) => {
    if (!confirm(`${brandNm} 차단을 해제하시겠습니까?`)) return;
    try {
      await BrandService.deleteRejectedBrand(brandNm);
      alert('차단이 해제되었습니다.');
      fetchRejectedBrands(); // 목록 갱신
    } catch (error) {
      console.error('차단 해제 실패:', error);
      alert('차단 해제 실패');
    }
  };

  useEffect(() => {
    fetchRejectedBrands();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-h1 font-bold">관리자 대시보드</h1>

      {/* 섹션 1: OpenAPI 데이터 수집 */}
      <Card>
        <CardHeader>
          <CardTitle>OpenAPI 데이터 수집</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-bold w-20">기준 연도:</label>
            <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-32" />
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button onClick={() => handleApiCall('브랜드', AdminService.callBrand)} disabled={loading}>
              브랜드 정보 수집
            </Button>
            <Button onClick={() => handleApiCall('통계', AdminService.callStatistic)} disabled={loading}>
              통계 정보 수집
            </Button>
            <Button onClick={() => handleApiCall('창업', AdminService.callStartup)} disabled={loading}>
              창업 정보 수집
            </Button>
          </div>

          {result && (
            <Alert className="mt-4">
              <AlertTitle>실행 결과</AlertTitle>
              <AlertDescription>{result}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 섹션 2: 브랜드 차단 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>브랜드 차단 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 검색 영역 */}
          <div className="flex gap-4">
            <Input
              placeholder="차단할 브랜드 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchBrand()}
              className="max-w-sm"
            />
            <Button onClick={handleSearchBrand} disabled={rejectionLoading}>
              검색
            </Button>
          </div>

          {/* 검색 결과 테이블 */}
          {searchResults.length > 0 && (
            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">검색 결과</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>브랜드명</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead className="w-[100px] text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((brand) => (
                    <TableRow key={brand.brandNm}>
                      <TableCell>{brand.brandNm}</TableCell>
                      <TableCell>{brand.indutyMlsfcNm}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleAddRejection(brand.brandNm)}>
                          차단
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* 차단된 브랜드 목록 */}
          <div className="border rounded-md p-4">
            <h3 className="font-bold mb-2">차단된 브랜드 목록</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>브랜드명</TableHead>
                  <TableHead className="w-[100px] text-right">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejectedBrands.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4">
                      차단된 브랜드가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  rejectedBrands.map((item) => (
                    <TableRow key={item.brandNm}>
                      <TableCell>{item.brandNm}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDeleteRejection(item.brandNm)}>
                          해제
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
