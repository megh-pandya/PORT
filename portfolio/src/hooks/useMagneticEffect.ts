"use client";

import { useState, useCallback, useRef } from "react";

export function useMagneticEffect(strength = 0.35) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return { ref, pos, onMouseMove, onMouseLeave };
}
