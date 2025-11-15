'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Only trigger once when element enters viewport
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Skip the observer and load immediately
   * @default false
   */
  skip?: boolean;
}

/**
 * Custom hook for lazy loading using Intersection Observer API
 *
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   rootMargin: '200px',
 *   threshold: 0.1,
 * });
 *
 * return (
 *   <div ref={ref}>
 *     {isIntersecting && <ExpensiveComponent />}
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '200px', // Load 200px before entering viewport
    triggerOnce = true,
    skip = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(skip);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (skip) {
      setIsIntersecting(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Early return if already triggered once
    if (triggerOnce && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);

          // Disconnect after first intersection if triggerOnce is true
          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected, skip]);

  return { ref: elementRef, isIntersecting, hasIntersected };
}
