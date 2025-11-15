"use client";

import { Component, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

/**
 * Error boundary component for comments section
 * Catches errors during comment loading and provides retry mechanism
 */
export class CommentsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Comments loading error:", error, errorInfo);

    // Optional: Send to monitoring service
    // trackError('CommentsLoadError', { error, errorInfo });
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: undefined,
      retryCount: prev.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="py-12 px-6 text-center border border-destructive/20 rounded-lg bg-destructive/5">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h3 className="text-lg font-semibold mb-2">
            댓글을 불러오지 못했습니다
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            {this.state.retryCount >= 3
              ? "댓글을 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요."
              : "댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."}
          </p>
          {this.state.retryCount < 3 && (
            <Button onClick={this.handleRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              다시 시도 ({3 - this.state.retryCount}번 남음)
            </Button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
