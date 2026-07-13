"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends HTMLElement>(onEnter: () => void) {
  const ref = useRef<T | null>(null);
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasFired) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasFired(true);
          onEnter();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFired]);

  return ref;
}
