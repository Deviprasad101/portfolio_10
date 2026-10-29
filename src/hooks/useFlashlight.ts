import { useCallback, useEffect, useRef, useState } from 'react';
import { isLowPowerDevice, usePrefersReducedMotion } from '../utils/motion';

export interface UseFlashlightOptions {
  radius?: number;
  mobileRadius?: number;
  smoothing?: number;
  disabled?: boolean;
  ambientPreviewOnMount?: boolean;
}

export function useFlashlight<T extends HTMLElement = HTMLDivElement>({
  radius = 270,
  mobileRadius = 175,
  smoothing = 0.2,
  disabled = false,
  ambientPreviewOnMount = false,
}: UseFlashlightOptions = {}) {
  const containerRef = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const stateRef = useRef({
    targetX: -999,
    targetY: -999,
    currentX: -999,
    currentY: -999,
    active: false,
    rafId: 0 as number,
    lowPower: false,
  });

  useEffect(() => {
    stateRef.current.lowPower = isLowPowerDevice();
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const applyVars = useCallback(
    (x: number, y: number, active: boolean) => {
      const el = containerRef.current;
      if (!el) return;
      const effectiveRadius =
        typeof window !== 'undefined' && window.innerWidth < 768 ? mobileRadius : radius;
      el.style.setProperty('--torch-x', `${x.toFixed(1)}px`);
      el.style.setProperty('--torch-y', `${y.toFixed(1)}px`);
      el.style.setProperty('--torch-radius', `${effectiveRadius}px`);
      el.style.setProperty('--torch-opacity', active ? '1' : '0');
    },
    [mobileRadius, radius]
  );

  const stopLoop = useCallback(() => {
    if (stateRef.current.rafId) {
      cancelAnimationFrame(stateRef.current.rafId);
      stateRef.current.rafId = 0;
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    const instant = prefersReducedMotion || s.lowPower;
    const factor = instant ? 1 : smoothing;

    s.currentX += (s.targetX - s.currentX) * factor;
    s.currentY += (s.targetY - s.currentY) * factor;

    applyVars(s.currentX, s.currentY, s.active);

    const dx = Math.abs(s.targetX - s.currentX);
    const dy = Math.abs(s.targetY - s.currentY);

    if (dx > 0.35 || dy > 0.35) {
      s.rafId = requestAnimationFrame(tick);
    } else {
      s.currentX = s.targetX;
      s.currentY = s.targetY;
      applyVars(s.currentX, s.currentY, s.active);
      s.rafId = 0;
    }
  }, [applyVars, prefersReducedMotion, smoothing]);

  const scheduleTick = useCallback(() => {
    if (!stateRef.current.rafId) {
      stateRef.current.rafId = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) {
      applyVars(-999, -999, false);
      return;
    }

    // Optional subtle initial focal position so touch/first-glance visitors notice the beam
    if (ambientPreviewOnMount && !prefersReducedMotion) {
      const rect = el.getBoundingClientRect();
      const initX = rect.width * 0.68;
      const initY = rect.height * 0.42;
      stateRef.current.currentX = initX;
      stateRef.current.currentY = initY;
      stateRef.current.targetX = initX;
      stateRef.current.targetY = initY;
      stateRef.current.active = true;
      applyVars(initX, initY, true);
    }

    const updateFromClientCoords = (clientX: number, clientY: number, snap = false) => {
      const rect = el.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      const s = stateRef.current;

      if (!s.active || snap || s.currentX < -500) {
        s.currentX = localX;
        s.currentY = localY;
      }

      s.targetX = localX;
      s.targetY = localY;
      s.active = true;
      scheduleTick();
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') setIsTouchDevice(true);
      updateFromClientCoords(e.clientX, e.clientY, true);
    };

    const onPointerMove = (e: PointerEvent) => {
      updateFromClientCoords(e.clientX, e.clientY, false);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setIsTouchDevice(true);
        updateFromClientCoords(e.clientX, e.clientY, false);
      }
    };

    const onPointerLeave = (e: PointerEvent) => {
      // Keep last tapped torch spot visible on touch devices so users can read revealed content
      if (e.pointerType === 'touch') return;
      stateRef.current.active = false;
      applyVars(stateRef.current.currentX, stateRef.current.currentY, false);
      stopLoop();
    };

    el.addEventListener('pointerenter', onPointerEnter, { passive: true });
    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      stopLoop();
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [ambientPreviewOnMount, applyVars, disabled, prefersReducedMotion, scheduleTick, stopLoop]);

  return {
    containerRef,
    isTouchDevice,
    prefersReducedMotion,
  };
}

