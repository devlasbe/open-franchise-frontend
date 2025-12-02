import { FallbackProps } from 'react-error-boundary';
import { Button } from '../ui/button';

export default function FetchBoundaryFunction({ resetErrorBoundary }: FallbackProps) {
  const errorMessage = '예기치 못한 에러가 발생했습니다';

  const handleReset = () => {
    resetErrorBoundary();
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4 min-h-24 p-4 text-center rounded-lg">
      <p className="text-overflow-oneline text-body">{errorMessage}</p>
      <Button asChild onClick={handleReset}>
        <a href="/">메인 화면으로 이동하기</a>
      </Button>
    </div>
  );
}
