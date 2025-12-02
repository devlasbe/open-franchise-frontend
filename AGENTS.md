# Frontend Agent Guidelines

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + shadcn/ui
- **Package Manager**: pnpm

## 프로젝트 구조

```
app/                    # Next.js App Router (페이지)
components/
  ├── ui/              # shadcn/ui 기본 컴포넌트
  └── [feature]/       # 기능별 컴포넌트
services/              # API 서비스 레이어
lib/                   # 유틸리티 (cn 함수 등)
types/                 # TypeScript 타입
```

## 컴포넌트 정의 패턴

### 기본 구조 (shadcn/ui 스타일)

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

const Component = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('base-classes', className)} {...props} />,
);
Component.displayName = 'Component';

export { Component };
```

**핵심 규칙:**

- `React.forwardRef` 사용
- `cn()` 유틸리티로 className 병합
- `displayName` 설정 필수

### Variant 패턴 (CVA)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { default: 'h-9 px-4', sm: 'h-8 px-3' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
));
```

### Server vs Client Component

**Server Component (기본):**

```typescript
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**Client Component (인터랙션 필요 시):**

```typescript
'use client';
import { useState } from 'react';

export default function Component() {
  const [value, setValue] = useState('');
  // ...
}
```

## 컴포넌트 재사용 패턴

### 1. UI 컴포넌트 (`components/ui/`)

- shadcn/ui 기반 기본 컴포넌트
- 높은 재사용성, Variant 패턴 지원
- 예: `Button`, `Card`, `Input`

### 2. 기능 컴포넌트 (`components/`)

- 특정 기능을 가진 재사용 컴포넌트
- 예: `SearchInput`, `Rank`, `Chart`

### 3. 페이지 컴포넌트 (`app/[route]/`)

- 페이지 전용 컴포넌트
- 예: `app/brand/[name]/BrandHeader.tsx`

## 스타일링

- `cn()` 유틸리티로 className 병합
- 커스텀 폰트: `text-h1`, `text-h2`, `text-subtitle1`, `text-body`
- 커스텀 색상: `primary`, `secondary`, `muted`, `destructive`
- 반응형: 모바일 우선 (`sm:`, `lg:`)

## 데이터 페칭

### 서비스 레이어 패턴

```typescript
// services/brand.ts
export class BrandService {
  static async getBrandList(params: GetBrandListReq) {
    return await myFetch<GetBrandListRes>({ path: 'brand', ... });
  }
}
```

### 사용

- **Server Component**: `const data = await BrandService.getBrandList(...)`
- **Client Component**: `useEffect` 내에서 호출

## 에러 처리

```tsx
<FetchBoundary>
  <Component />
</FetchBoundary>
```

- `ErrorBoundary` + `Suspense`로 에러/로딩 처리

## 주요 명령어

```bash
pnpm dev          # 개발 서버
pnpm build        # 빌드
pnpm lint         # 린트
pnpm test:e2e     # E2E 테스트
```

## 컴포넌트 작성 체크리스트

1. **위치**: UI → `components/ui/`, 기능 → `components/`, 페이지 → `app/[route]/`
2. **Server/Client**: 인터랙션 필요 시만 `"use client"` 추가
3. **타입**: Props 타입 명시, `React.HTMLAttributes` 확장
4. **스타일**: `cn()` 사용, Tailwind 클래스
5. **에러**: `FetchBoundary`로 감싸기

## 주의사항

1. **pnpm 사용 필수** (npm/yarn 금지)
2. **shadcn/ui는 `components/ui/`에만**
3. **Server Component에서 직접 데이터 페칭** (useEffect 지양)
4. **Client Component는 필요한 경우에만**
5. **타입 안정성 유지** (any 지양)
6. **반응형 디자인** (모바일 우선)
