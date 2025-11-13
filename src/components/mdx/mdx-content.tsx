import * as React from "react";

import * as runtime from "react/jsx-runtime";

interface MDXContentProps {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ code, components = {} }: MDXContentProps) {
  // Velite는 MDX를 함수로 컴파일합니다
  const Component = React.useMemo(() => {
    try {
      const fn = new Function(code);
      return fn({ ...runtime }).default;
    } catch (error) {
      console.error("MDX 렌더링 에러:", error);
      return () => <div>콘텐츠를 로드할 수 없습니다.</div>;
    }
  }, [code]);

  return <Component components={components} />;
}
