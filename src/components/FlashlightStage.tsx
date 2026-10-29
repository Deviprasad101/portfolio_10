import React from 'react';
import { useFlashlight } from '../hooks/useFlashlight';

export interface FlashlightStageProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  radius?: number;
  mobileRadius?: number;
  forceReveal?: boolean;
  ambientPreviewOnMount?: boolean;
  className?: string;
}

/**
 * Reusable interactive torchlight stage.
 * Uses CSS radial-gradient masks driven by rAF + CSS custom properties (--torch-x / --torch-y)
 * to genuinely reveal `revealContent` registered over/under `children` with zero React re-renders.
 */
export const FlashlightStage: React.FC<FlashlightStageProps> = ({
  children,
  revealContent,
  radius = 275,
  mobileRadius = 175,
  forceReveal = false,
  ambientPreviewOnMount = false,
  className = '',
}) => {
  const { containerRef } = useFlashlight<HTMLDivElement>({
    radius,
    mobileRadius,
    disabled: forceReveal,
    ambientPreviewOnMount,
  });

  return (
    <div
      ref={containerRef}
      className={`flashlight-stage select-none sm:select-auto ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Primary readable editorial layer */}
      <div className="relative z-10">{children}</div>

      {/* Masked underlying X-Ray / Blueprint editorial layer */}
      <div
        className={`flashlight-reveal-layer ${forceReveal ? 'is-xray-open' : ''}`}
        aria-hidden={!forceReveal}
      >
        {revealContent}
      </div>

      {/* Subtle feathered optical glow */}
      {!forceReveal && <div className="flashlight-optical-beam" aria-hidden="true" />}
    </div>
  );
};

