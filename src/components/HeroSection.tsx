import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Flashlight, Github, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { FlashlightStage } from './FlashlightStage';
import { EditorialPortrait } from './EditorialPortrait';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroSectionProps {
  xrayMode: boolean;
  onOpenContact: () => void;
}

interface HeroLayerProps {
  mode: 'base' | 'reveal';
  onOpenContact: () => void;
}

/**
 * Shared deterministic editorial grid for both `base` and `reveal` layers.
 * - Shared text elements match 1:1 in glyphs and coordinates so feathered radial masks
 *   illuminate typography cleanly with zero ghosted/overlapping characters.
 * - Hidden X-Ray blueprint annotations occupy dedicated reserved channels that are
 *   transparent in `base` mode and materialize cleanly under the torchlight beam.
 */
const HeroEditorialGrid: React.FC<HeroLayerProps> = ({ mode, onOpenContact }) => {
  const isReveal = mode === 'reveal';

  return (
    <div
      className={`relative mx-auto max-w-[1380px] px-4 pt-24 pb-16 sm:px-8 sm:pt-28 lg:pt-32 lg:pb-24 ${
        isReveal ? 'editorial-blueprint-grid' : ''
      }`}
    >
      {/* Top Editorial Issue Bar */}
      <div
        className={`gsap-hero-rule mb-6 flex flex-wrap items-center justify-between gap-3 border-y py-2.5 font-mono-code text-[11px] tracking-[0.09em] uppercase origin-left ${
          isReveal
            ? 'border-[#F2C94C]/60 text-[#F2C94C]'
            : 'border-[rgba(243,239,230,0.16)] text-[#A8A296]'
        }`}
      >
        <div className="gsap-hero-meta flex items-center gap-2.5">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isReveal ? 'bg-[#4A8FE7]' : 'bg-[#E04F3E]'
            }`}
          />
          <span>VOL. 01 // INTERACTIVE EDITORIAL PORTFOLIO</span>
        </div>

        <div className="gsap-hero-meta hidden md:flex items-center gap-6">
          <span>ROLE: {PORTFOLIO_DATA.identity.role.toUpperCase()}</span>
          <span>LOC: {PORTFOLIO_DATA.identity.shortLocation.toUpperCase()}</span>
        </div>

        <div className="gsap-hero-meta flex items-center gap-1.5 text-[10px]">
          <Flashlight className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
          <span className="text-[#F2C94C]">SWEEP CURSOR / TAP TO REVEAL</span>
        </div>
      </div>

      {/* Main 12-Column Editorial Composition */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left 8 Columns: Monumental Expressive Typography & Narrative */}
        <div className="lg:col-span-8 flex flex-col justify-between min-w-0">
          {/* Small Monospaced Kicker + Hidden Torch Annotation Badge */}
          <div className="gsap-hero-meta mb-4 flex flex-wrap items-center justify-between gap-3 font-mono-code text-xs tracking-[0.08em] uppercase">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-2 py-0.5 font-semibold ${
                  isReveal ? 'bg-[#4A8FE7] text-[#0B0B0C]' : 'bg-[#F2C94C] text-[#0B0B0C]'
                }`}
              >
                DISPATCH 01
              </span>
              <span className={isReveal ? 'text-[#F2C94C]' : 'text-[#A8A296]'}>
                FULL-STACK &amp; GEOSPATIAL WEB SYSTEMS
              </span>
            </div>

            {/* Dedicated Negative-Space Secret Tag — Only visible under Torchlight / X-Ray! */}
            <span
              className={`border border-[#F2C94C]/70 bg-[#141A29] px-2.5 py-0.5 text-[10px] text-[#F2C94C] ${
                isReveal ? 'opacity-100' : 'opacity-0'
              }`}
            >
              TORCH REVEAL // IITTNiF · B.TECH CSE (AIML)
            </span>
          </div>

          {/* Monumental Display Headline — Sized so all 13 wide Syne glyphs fit cleanly */}
          {isReveal ? (
            <div aria-hidden="true" className="space-y-1.5">
              <div className="overflow-hidden">
                <div className="gsap-hero-line font-display text-[clamp(2.25rem,5.6vw,5.1rem)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase text-[#F3EFE6]">
                  {PORTFOLIO_DATA.identity.firstName}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="gsap-hero-line font-display text-[clamp(1.28rem,3.65vw,3.42rem)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase text-[#F2C94C]">
                  {PORTFOLIO_DATA.identity.lastName}
                </div>
              </div>
              <div className="overflow-hidden pt-2">
                <p className="gsap-hero-line font-editorial-serif text-[clamp(1.55rem,3.2vw,2.65rem)] leading-[1.14] italic text-[#F2C94C]">
                  Building full-stack web systems &amp; geospatial platforms with clarity.
                </p>
              </div>
            </div>
          ) : (
            <h1 className="space-y-1.5">
              <span className="block overflow-hidden">
                <span className="gsap-hero-line block font-display text-[clamp(2.25rem,5.6vw,5.1rem)] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase text-[#F3EFE6]">
                  {PORTFOLIO_DATA.identity.firstName}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="gsap-hero-line block font-display text-[clamp(1.28rem,3.65vw,3.42rem)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase text-outline-ivory-strong">
                  {PORTFOLIO_DATA.identity.lastName}
                </span>
              </span>
              <span className="block overflow-hidden pt-2">
                <span className="gsap-hero-line block font-editorial-serif text-[clamp(1.55rem,3.2vw,2.65rem)] leading-[1.14] font-normal italic text-[#F3EFE6]/90">
                  Building full-stack web systems &amp; geospatial platforms with clarity.
                </span>
              </span>
            </h1>
          )}

          {/* Hidden Blueprint Strip in Dedicated Channel (Invisible in base; revealed by Torch!) */}
          <div
            className={`mt-5 rounded-xs border px-3.5 py-2.5 font-mono-code text-[11px] leading-relaxed ${
              isReveal
                ? 'border-[#4A8FE7]/75 bg-[#0F1726] text-[#F3EFE6] opacity-100'
                : 'border-transparent bg-transparent opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-[#F2C94C]">
                BLUEPRINT // VERIFIED PRODUCTION &amp; GEOSPATIAL PIPELINE
              </span>
              <span className="text-[#4A8FE7]">11/2025 – 09/2026 @ IITTNiF</span>
            </div>
            <p className="mt-1 text-[#93C5FD]">
              FastAPI &amp; Flask APIs → PostgreSQL / PostGIS → GeoServer (WMS/WFS) · OSRM / Leaflet
              · Cesium 3D → Dockerized Deployment
            </p>
          </div>

          {/* Field Summary & Core Architecture Two-Column Editorial Strip */}
          <div
            className={`mt-5 grid grid-cols-1 gap-5 border-l-2 pl-4 sm:grid-cols-2 ${
              isReveal ? 'border-[#F2C94C]' : 'border-[rgba(243,239,230,0.22)]'
            }`}
          >
            <div>
              <p className="font-mono-code text-[10px] tracking-[0.1em] uppercase text-[#F2C94C]">
                FIELD SUMMARY
              </p>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${
                  isReveal ? 'text-[#F3EFE6]' : 'text-[#A8A296]'
                }`}
              >
                {PORTFOLIO_DATA.identity.summary}
              </p>
            </div>

            <div className="flex flex-col justify-between border-t border-[rgba(243,239,230,0.1)] pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
              <div>
                <p
                  className={`font-mono-code text-[10px] tracking-[0.1em] uppercase ${
                    isReveal ? 'text-[#4A8FE7]' : 'text-[#A8A296]'
                  }`}
                >
                  CORE ARCHITECTURE
                </p>
                <p
                  className={`mt-1.5 font-mono-code text-xs leading-relaxed ${
                    isReveal ? 'text-[#F2C94C]' : 'text-[#F3EFE6]/85'
                  }`}
                >
                  Python · FastAPI · Flask · REST APIs · PostgreSQL · JavaScript · React.js · Docker
                </p>

                {/* Extra Hidden Torch Sub-note in negative space below Core Architecture */}
                <div className={`mt-3 ${isReveal ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="font-mono-code text-[10px] uppercase tracking-[0.08em] text-[#4A8FE7]">
                    + HIDDEN SPATIAL &amp; AI TOOLING:
                  </p>
                  <p className="mt-0.5 font-mono-code text-[11px] text-[#F3EFE6]">
                    PostGIS · GeoServer · GDAL/PDAL · Cesium · Cursor · Antigravity · Claude AI
                  </p>
                </div>
              </div>

              {/* Hand-drawn editorial SVG squiggle underline */}
              <svg viewBox="0 0 220 14" className="mt-3 h-3 w-44" fill="none" aria-hidden="true">
                <path
                  d="M2 9.5 C 48 3, 94 12.5, 146 6.5 C 176 3.5, 198 8.5, 218 5"
                  stroke={isReveal ? '#F2C94C' : 'rgba(243,239,230,0.22)'}
                  strokeWidth={isReveal ? '2.2' : '1.2'}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Primary Editorial Action Bar */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-3.5 ${
              isReveal ? 'pointer-events-none invisible' : 'gsap-hero-cta'
            }`}
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xs bg-[#F2C94C] px-5 py-3 font-mono-code text-xs font-semibold tracking-[0.08em] uppercase text-[#0B0B0C] transition-colors hover:bg-[#ffd859]"
            >
              <span>Explore Case Studies</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>

            <motion.button
              type="button"
              onClick={onOpenContact}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xs border border-[rgba(243,239,230,0.3)] bg-[#141418] px-5 py-3 font-mono-code text-xs font-medium tracking-[0.08em] uppercase text-[#F3EFE6] transition-colors hover:border-[#F3EFE6] cursor-pointer"
            >
              <Mail className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
              <span>Let&apos;s Collaborate</span>
            </motion.button>

            <motion.a
              href={PORTFOLIO_DATA.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`GitHub profile (${PORTFOLIO_DATA.contact.githubUsername})`}
              className="inline-flex items-center gap-2 rounded-xs border border-[rgba(243,239,230,0.18)] px-4 py-3 font-mono-code text-xs tracking-[0.06em] text-[#A8A296] transition-colors hover:border-[#F3EFE6] hover:text-[#F3EFE6]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>@{PORTFOLIO_DATA.contact.githubUsername}</span>
            </motion.a>
          </div>
        </div>

        {/* Right 4 Columns: Art-Directed Portrait Composition + Margin Notes */}
        <div className="lg:col-span-4">
          <div className="gsap-hero-portrait mx-auto max-w-[390px] lg:max-w-none">
            <EditorialPortrait variant={mode} />

            {/* Below-portrait documentary index strip */}
            <div
              className={`mt-3 grid grid-cols-3 border text-center font-mono-code text-[10px] uppercase ${
                isReveal
                  ? 'border-[#F2C94C]/55 bg-[#141A28] text-[#F2C94C]'
                  : 'border-[rgba(243,239,230,0.14)] bg-[#0F0F13] text-[#A8A296]'
              }`}
            >
              <div className="border-r border-[rgba(243,239,230,0.12)] px-2 py-2">
                <span className="block text-[9px] text-[#68635A]">EXPERIENCE</span>
                <span className="mt-0.5 block font-semibold text-[#F3EFE6]">IITTNiF</span>
              </div>
              <div className="border-r border-[rgba(243,239,230,0.12)] px-2 py-2">
                <span className="block text-[9px] text-[#68635A]">DEGREE</span>
                <span className="mt-0.5 block font-semibold text-[#F3EFE6]">CSE (AIML)</span>
              </div>
              <div className="px-2 py-2">
                <span className="block text-[9px] text-[#68635A]">CASE FILES</span>
                <span className="mt-0.5 block font-semibold text-[#F2C94C]">02 VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ xrayMode, onOpenContact }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          '.gsap-hero-rule',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.04 }
        )
          .fromTo(
            '.gsap-hero-meta',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
            '-=0.45'
          )
          .fromTo(
            '.gsap-hero-line',
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.78, stagger: 0.08 },
            '-=0.35'
          )
          .fromTo(
            '.gsap-hero-portrait',
            { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.2, y: 16 },
            { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 0.9 },
            '-=0.65'
          )
          .fromTo(
            '.gsap-hero-cta',
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            '-=0.45'
          );

        // Subtle editorial parallax on portrait plate during scroll
        gsap.to('.gsap-hero-portrait', {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="dispatch"
      ref={sectionRef}
      aria-label="Introduction and Editorial Dispatch"
      className="relative overflow-hidden border-b border-[rgba(243,239,230,0.14)] bg-[#0B0B0C] editorial-grid-bg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[460px] w-[460px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(242,201,76,0.16) 0%, transparent 70%)',
        }}
      />

      <FlashlightStage
        radius={290}
        mobileRadius={180}
        forceReveal={xrayMode}
        ambientPreviewOnMount={true}
        revealContent={<HeroEditorialGrid mode="reveal" onOpenContact={onOpenContact} />}
      >
        <HeroEditorialGrid mode="base" onOpenContact={onOpenContact} />
      </FlashlightStage>
    </section>
  );
};
