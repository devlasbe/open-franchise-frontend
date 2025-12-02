'use client';

import { useState } from 'react';
import { AdminService } from '@/services/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminPage() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleApiCall = async (
    apiName: string,
    apiFn: (yr: number) => Promise<any>
  ) => {
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

  return (
    <div className="space-y-6">
      <h1 className="text-h1 font-bold">관리자 대시보드</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>OpenAPI 데이터 수집</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-bold w-20">기준 연도:</label>
            <Input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              className="w-32"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button 
              onClick={() => handleApiCall('브랜드', AdminService.callBrand)}
              disabled={loading}
            >
              브랜드 정보 수집
            </Button>
            <Button 
              onClick={() => handleApiCall('통계', AdminService.callStatistic)}
              disabled={loading}
            >
              통계 정보 수집
            </Button>
            <Button 
              onClick={() => handleApiCall('창업', AdminService.callStartup)}
              disabled={loading}
            >
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
    </div>
  );
}


