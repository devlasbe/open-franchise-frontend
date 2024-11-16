"use client";

import { ErrorBoundary } from "react-error-boundary";
import FetchBoundaryFallback from "./FetchBoundaryFallback";
import { Suspense } from "react";
import SuspenseFallback from "./SuspenseFallback";

type FetchBoundaryType = {
  children: React.ReactNode;
};

export default function FetchBoundary({ children }: FetchBoundaryType) {
  return (
    <ErrorBoundary FallbackComponent={FetchBoundaryFallback}>
      <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
