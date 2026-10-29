import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface EditorialPortraitProps {
  variant?: 'base' | 'reveal';
}

const PORTRAIT_CANDIDATES = [
  PORTFOLIO_DATA.identity.portraitPath,
  '/portrait.jpeg',
  '/portrait.png',
  '/portrait.webp',
];

/**
 * Art-directed portrait frame with strict pixel-for-pixel optical registration
 * between `base` and `reveal` layers so feathered radial masks never ghost text.
 */
export const EditorialPortrait: React.FC<EditorialPortraitProps> = ({ variant = 'base' }) => {
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const imageAvailable = candidateIndex < PORTRAIT_CANDIDATES.length;
  const isReveal = variant === 'reveal';

  return (
    <figure
      className={`relative overflow-hidden border transition-colors ${
        isReveal
          ? 'border-[#F2C94C]/85 bg-[#121722]'
          : 'border-[rgba(243,239,230,0.22)] bg-[#111114]'
      }`}
    >
      {/* Top Archival Plate Header — Identical text in both layers for seamless optical blend */}
      <div
        className={`flex items-center justify-between border-b px-3.5 py-2 font-mono-code text-[10px] tracking-[0.1em] uppercase ${
          isReveal
            ? 'border-[#F2C94C]/45 bg-[#182030] text-[#F2C94C]'
            : 'border-[rgba(243,239,230,0.12)] bg-[#0E0E11] text-[#A8A296]'
        }`}
      >
        <span>FIG. 01 // PORTRAIT PLATE</span>
        <span className={isReveal ? 'text-[#F3EFE6]' : ''}>
          {PORTFOLIO_DATA.identity.coordinates}
        </span>
      </div>

      {/* Main Portrait Viewport */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {imageAvailable ? (
          <img
            src={PORTRAIT_CANDIDATES[candidateIndex]}
            alt={`${PORTFOLIO_DATA.identity.fullName} — ${PORTFOLIO_DATA.identity.role}`}
            decoding="async"
            onError={() => setCandidateIndex((prev) => prev + 1)}
            className={`h-full w-full object-cover object-top ${
              isReveal
                ? 'contrast-125 brightness-110 saturate-110'
                : 'contrast-108 brightness-95 grayscale-[24%]'
            }`}
          />
        ) : (
          <div
            className={`relative flex h-full w-full flex-col justify-between p-5 sm:p-6 ${
              isReveal ? 'editorial-blueprint-grid bg-[#101826]' : 'bg-[#121216]'
            }`}
          >
            {/* Topographic & Spatial Reticle SVG */}
            <svg
              viewBox="0 0 400 480"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-30 390 C 60 310, 140 340, 220 260 C 290 190, 350 210, 430 130"
                stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.6' : '0.1'}
                strokeWidth="1.2"
              />
              <path
                d="M-40 340 C 50 265, 135 290, 210 215 C 285 140, 345 165, 435 85"
                stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.75' : '0.14'}
                strokeWidth="1.3"
                strokeDasharray="6 4"
              />
              <path
                d="M-20 435 C 85 365, 160 395, 245 315 C 315 250, 365 265, 440 195"
                stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.45' : '0.08'}
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="215"
                r="106"
                stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.65' : '0.13'}
                strokeWidth="1.1"
                strokeDasharray="4 4"
              />
              <circle
                cx="200"
                cy="215"
                r="72"
                stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.6' : '0.09'}
                strokeWidth="1.1"
              />
              <line
                x1="200"
                y1="75"
                x2="200"
                y2="355"
                stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.4' : '0.07'}
                strokeWidth="1"
              />
              <line
                x1="60"
                y1="215"
                x2="340"
                y2="215"
                stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
                strokeOpacity={isReveal ? '0.4' : '0.07'}
                strokeWidth="1"
              />
              <circle cx="200" cy="215" r="4.5" fill={isReveal ? '#E04F3E' : '#F2C94C'} />

              {/* Hidden Blueprint Telemetry Callouts (Placed in empty negative space!) */}
              {isReveal && (
                <g fontFamily="JetBrains Mono, monospace" fontSize="9.5">
                  <text x="24" y="92" fill="#4A8FE7">
                    LAT 13.6288° N // LON 79.4192° E
                  </text>
                  <text x="24" y="107" fill="#F2C94C">
                    NODE: IIT TIRUPATI I-HUB (IITTNiF)
                  </text>
                  <text x="24" y="346" fill="#F2C94C">
                    &gt; PYTHON · FASTAPI · FLASK · REACT
                  </text>
                  <text x="24" y="361" fill="#93C5FD">
                    &gt; POSTGRESQL · POSTGIS · DOCKER
                  </text>
                </g>
              )}
            </svg>

            {/* Top Row — Identical height & text for clean optical registration */}
            <div className="relative z-10 flex items-start justify-between">
              <span
                className={`inline-block rounded-xs border px-2 py-0.5 font-mono-code text-[10px] uppercase tracking-[0.1em] ${
                  isReveal
                    ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0B0B0C] font-semibold'
                    : 'border-[rgba(243,239,230,0.2)] text-[#A8A296]'
                }`}
              >
                SUBJECT ARCHIVE // 01
              </span>
              <span
                className={`font-mono-code text-[10px] ${
                  isReveal ? 'text-[#F2C94C]' : 'text-[#A8A296]'
                }`}
              >
                IN · AP
              </span>
            </div>

            {/* Central Architectural Monogram — Pixel-identical placement */}
            <div className="relative z-10 my-auto text-center">
              <div
                className={`font-display text-6xl sm:text-7xl font-extrabold tracking-tighter ${
                  isReveal ? 'text-[#F2C94C]' : 'text-outline-ivory-strong'
                }`}
              >
                DPC
              </div>
              <p
                className={`mt-2 font-editorial-serif text-xl italic ${
                  isReveal ? 'text-[#F3EFE6]' : 'text-[#A8A296]'
                }`}
              >
                {PORTFOLIO_DATA.identity.fullName}
              </p>
            </div>

            {/* Bottom Slot — Identical 2-line height in both layers */}
            <div className="relative z-10 border-t border-[rgba(243,239,230,0.14)] pt-3 font-mono-code text-[10px] leading-relaxed">
              <p className={isReveal ? 'text-[#F2C94C] font-semibold' : 'text-[#F3EFE6]'}>
                PORTRAIT SLOT READY
              </p>
              <p className={isReveal ? 'text-[#F3EFE6]' : 'text-[#A8A296]'}>
                Add photo at <code className="text-[#F2C94C]">public/portrait.jpg</code> for live
                cutout framing.
              </p>
            </div>
          </div>
        )}

        {/* Editorial Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,11,12,0.06) 0%, rgba(11,11,12,0) 48%, rgba(11,11,12,0.68) 100%)',
          }}
        />

        {/* Corner Registration Ticks */}
        <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-[#F2C94C]/75" />
        <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-[#F2C94C]/75" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-[#F2C94C]/75" />
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-[#F2C94C]/75" />

        {/* When real photo is loaded, show illuminated HUD tag at top-right empty space */}
        {isReveal && imageAvailable && (
          <div className="pointer-events-none absolute top-4 left-4 right-4 rounded-xs border border-[#F2C94C]/70 bg-[#0B0B0C]/90 px-3 py-2 font-mono-code text-[10px] text-[#F2C94C]">
            VERIFIED // FULL STACK DEVELOPER @ IITTNiF
          </div>
        )}
      </div>

      {/* Editorial Caption Footer — Identical text in both layers */}
      <figcaption
        className={`flex items-center justify-between border-t px-3.5 py-2.5 font-mono-code text-[10px] tracking-[0.06em] ${
          isReveal
            ? 'border-[#F2C94C]/45 bg-[#182030] text-[#F3EFE6]'
            : 'border-[rgba(243,239,230,0.12)] bg-[#0E0E11] text-[#A8A296]'
        }`}
      >
        <span>{PORTFOLIO_DATA.identity.shortLocation}</span>
        <span className={isReveal ? 'text-[#F2C94C]' : 'text-[#E04F3E]'}>● LIVE DOSSIER</span>
      </figcaption>
    </figure>
  );
};
