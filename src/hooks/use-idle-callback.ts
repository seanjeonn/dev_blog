'use client';

import { useEffect, useState } from 'react';

interface UseIdleCallbackOptions {
  /**
   * Maximum wait time in milliseconds
   * @default 2000
   */
  timeout?: number;
}

/**
 * Custom hook that executes a callback when the browser is idle
 * Uses requestIdleCallback API with setTimeout fallback for unsupported browsers
 *
 * @example
 * ```tsx
 * const isIdle = useIdleCallback(() => {
 *   // Prefetch expensive component
 *   import('./heavy-component');
 * }, { timeout: 3000 });
 * ```
 */
export function useIdleCallback(
  callback: () => void,
  options: UseIdleCallbackOptions = {}
) {
  const { timeout = 2000 } = options;
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    // Feature detection
    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
      const idleCallbackId = window.requestIdleCallback(
        () => {
          setIsIdle(true);
          callback();
        },
        { timeout }
      );

      return () => {
        window.cancelIdleCallback(idleCallbackId);
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(() => {
        setIsIdle(true);
        callback();
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [callback, timeout]);

  return isIdle;
}
