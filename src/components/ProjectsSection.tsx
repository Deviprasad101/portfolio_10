import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Flashlight, Github, Layers, QrCode, Route } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectCaseStudy } from '../data/portfolioData';
import { FlashlightStage } from './FlashlightStage';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectsSectionProps {
  xrayMode: boolean;
}

/* ============================================================================
   BESPOKE EDITORIAL VISUAL 01: GEO TRIP PLANNER (Optical 1:1 Registration)
   ============================================================================ */
const GeoTripDiagram: React.FC<{ mode: 'base' | 'reveal' }> = ({ mode }) => {
  const isReveal = mode === 'reveal';

  return (
    <div
      className={`relative aspect-[16/11] w-full overflow-hidden border p-4 sm:p-6 flex flex-col justify-between ${
        isReveal
          ? 'border-[#F2C94C] editorial-blueprint-grid bg-[#0F1726]'
          : 'border-[rgba(243,239,230,0.2)] bg-[#101014]'
      }`}
    >
      {/* Top Bar — 1:1 glyph registration */}
      <div className="flex items-center justify-between font-mono-code text-[10px] tracking-[0.09em] uppercase">
        <span className={isReveal ? 'text-[#F2C94C]' : 'text-[#A8A296]'}>
          FIG. 02A // TIRUPATI MULTI-STOP CORRIDOR FLOW
        </span>
        <span className="text-[#F2C94C]">SWEEP TORCH FOR SCHEMA</span>
      </div>

      {/* Central SVG Route & Node Map */}
      <div className="relative my-2 flex-1">
        <svg viewBox="0 0 600 260" className="h-full w-full" fill="none" aria-hidden="true">
          <path
            d="M20 220 Q 170 150, 310 185 T 580 95"
            stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
            strokeOpacity={isReveal ? '0.32' : '0.07'}
            strokeWidth="1"
          />
          <path
            d="M10 165 Q 190 95, 340 130 T 590 45"
            stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
            strokeOpacity={isReveal ? '0.32' : '0.07'}
            strokeWidth="1"
          />

          {/* Hidden X-Ray Layer: OSRM Candidate Graph & SQL Schema Box in empty top-right/bottom-left */}
          {isReveal && (
            <g>
              <g stroke="#4A8FE7" strokeOpacity="0.65" strokeDasharray="4 4" strokeWidth="1.3">
                <line x1="82" y1="192" x2="215" y2="95" />
                <line x1="215" y1="95" x2="392" y2="98" />
                <line x1="230" y1="145" x2="375" y2="165" />
                <line x1="375" y1="165" x2="508" y2="68" />
              </g>
              <circle cx="215" cy="95" r="3.5" fill="#4A8FE7" />
              <circle cx="375" cy="165" r="3.5" fill="#4A8FE7" />

              {/* Dedicated SQL Schema Blueprint Badge in empty upper-center/right */}
              <g transform="translate(238, 12)">
                <rect
                  width="215"
                  height="52"
                  fill="#0D1525"
                  stroke="#F2C94C"
                  strokeWidth="1"
                />
                <text
                  x="10"
                  y="18"
                  fill="#F2C94C"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  SQL // pilgrim_visits + session_auth
                </text>
                <text
                  x="10"
                  y="33"
                  fill="#93C5FD"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                >
                  id | tier_id | osrm_route | qr_token
                </text>
                <text
                  x="10"
                  y="45"
                  fill="#F3EFE6"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                >
                  POST /checkin/verify → Admin Ledger
                </text>
              </g>
            </g>
          )}

          {/* Primary OSRM Selected Pilgrim Route */}
          <path
            d="M82 192 C 138 188, 175 148, 230 145 C 292 142, 325 102, 392 98 C 445 95, 472 74, 508 68"
            stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M82 192 C 138 188, 175 148, 230 145 C 292 142, 325 102, 392 98 C 445 95, 472 74, 508 68"
            stroke={isReveal ? '#E04F3E' : '#F2C94C'}
            strokeWidth="1.6"
            strokeDasharray="6 6"
          />

          {/* Stop Nodes — Identical labels for 1:1 registration */}
          {[
            { x: 82, y: 192, id: 'STOP 01', sub: 'Origin / Tier Pick' },
            { x: 230, y: 145, id: 'STOP 02', sub: 'Place Picker' },
            { x: 392, y: 98, id: 'STOP 03', sub: 'QR Temple Scan' },
            { x: 508, y: 68, id: 'ADMIN DB', sub: 'Visit Logged' },
          ].map((node, idx) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="13"
                fill="#0B0B0C"
                stroke={idx === 2 ? '#F2C94C' : isReveal ? '#4A8FE7' : '#F3EFE6'}
                strokeWidth="1.8"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="4.5"
                fill={idx === 2 ? '#F2C94C' : idx === 3 ? '#E04F3E' : '#F3EFE6'}
              />
              <text
                x={node.x}
                y={node.y + 28}
                textAnchor="middle"
                fill={isReveal ? '#F2C94C' : '#F3EFE6'}
                fontSize="9.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {node.id}
              </text>
              <text
                x={node.x}
                y={node.y + 41}
                textAnchor="middle"
                fill={isReveal ? '#93C5FD' : '#A8A296'}
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
              >
                {node.sub}
              </text>
            </g>
          ))}

          {/* Top-Left Overlay Box */}
          <g transform="translate(18, 16)">
            <rect
              width="198"
              height="68"
              fill={isReveal ? '#131D31' : '#16161B'}
              stroke={isReveal ? '#4A8FE7' : 'rgba(243,239,230,0.2)'}
              strokeWidth="1"
            />
            <text
              x="10"
              y="18"
              fill={isReveal ? '#F2C94C' : '#A8A296'}
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
            >
              BUDGET TIER &amp; PLACE PICKER
            </text>
            <text
              x="10"
              y="36"
              fill="#F3EFE6"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
            >
              ● Economy · Standard · Custom
            </text>
            <text
              x="10"
              y="52"
              fill={isReveal ? '#4A8FE7' : '#F2C94C'}
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
            >
              Leaflet + OpenStreetMap Live
            </text>
          </g>

          {/* Bottom-Right Overlay Box: QR Check-In Pass */}
          <g transform="translate(390, 172)">
            <rect
              width="192"
              height="72"
              fill={isReveal ? '#1B1A14' : '#16161B'}
              stroke={isReveal ? '#F2C94C' : 'rgba(243,239,230,0.22)'}
              strokeWidth="1"
            />
            <rect x="12" y="14" width="42" height="42" stroke="#F2C94C" strokeWidth="1.2" />
            <rect x="17" y="19" width="11" height="11" fill="#F2C94C" />
            <rect x="38" y="19" width="11" height="11" fill="#F2C94C" />
            <rect x="17" y="40" width="11" height="11" fill="#F2C94C" />
            <rect x="31" y="32" width="7" height="7" fill="#F3EFE6" />

            <text
              x="64"
              y="26"
              fill="#F2C94C"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              TEMPLE QR CHECK-IN
            </text>
            <text
              x="64"
              y="42"
              fill="#F3EFE6"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
            >
              Staff scan → Admin log
            </text>
            <text
              x="64"
              y="56"
              fill={isReveal ? '#F2C94C' : '#A8A296'}
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
            >
              Unified visitor view
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Caption */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(243,239,230,0.12)] pt-2.5 font-mono-code text-[10px] text-[#A8A296]">
        <span>STACK: PYTHON FLASK · LEAFLET · OSRM · POSTGRESQL/SQLITE</span>
        <span className={isReveal ? 'text-[#F2C94C]' : 'text-[#F3EFE6]'}>INTERACTIVE DIAGRAM</span>
      </div>
    </div>
  );
};

/* ============================================================================
   BESPOKE EDITORIAL VISUAL 02: GEO INTEL META HUB (Optical 1:1 Registration)
   ============================================================================ */
const GeoIntelDiagram: React.FC<{ mode: 'base' | 'reveal' }> = ({ mode }) => {
  const isReveal = mode === 'reveal';

  return (
    <div
      className={`relative aspect-[16/11] w-full overflow-hidden border p-4 sm:p-6 flex flex-col justify-between ${
        isReveal
          ? 'border-[#4A8FE7] editorial-blueprint-grid bg-[#0D1624]'
          : 'border-[rgba(243,239,230,0.2)] bg-[#101014]'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between font-mono-code text-[10px] tracking-[0.09em] uppercase">
        <span className={isReveal ? 'text-[#4A8FE7]' : 'text-[#A8A296]'}>
          FIG. 02B // MULTI-LAYER SPATIAL CATALOG &amp; 3D GLOBE
        </span>
        <span className={isReveal ? 'text-[#F2C94C]' : 'text-[#4A8FE7]'}>
          SWEEP TORCH FOR ETL SPEC
        </span>
      </div>

      <div className="relative my-2 flex-1">
        <svg viewBox="0 0 600 260" className="h-full w-full" fill="none" aria-hidden="true">
          {/* Isometric Geospatial Planes */}
          <polygon
            points="45,185 185,135 315,185 175,235"
            fill={isReveal ? 'rgba(74,143,231,0.18)' : 'rgba(243,239,230,0.04)'}
            stroke={isReveal ? '#4A8FE7' : 'rgba(243,239,230,0.32)'}
            strokeWidth="1.4"
          />
          <polygon
            points="45,135 185,85 315,135 175,185"
            fill={isReveal ? 'rgba(242,201,76,0.15)' : 'rgba(243,239,230,0.05)'}
            stroke={isReveal ? '#F2C94C' : 'rgba(243,239,230,0.45)'}
            strokeWidth="1.4"
          />
          <polygon
            points="45,85 185,35 315,85 175,135"
            fill={isReveal ? 'rgba(224,79,62,0.15)' : 'rgba(242,201,76,0.08)'}
            stroke={isReveal ? '#E04F3E' : '#F2C94C'}
            strokeWidth="1.6"
          />

          {[
            [155, 72],
            [178, 64],
            [202, 76],
            [168, 88],
            [192, 95],
            [140, 86],
            [222, 85],
            [182, 108],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="2.4"
              fill={isReveal ? '#F2C94C' : '#F3EFE6'}
            />
          ))}

          {/* Shared Plane Labels (1:1 identical text) */}
          <text
            x="24"
            y="72"
            fill={isReveal ? '#E04F3E' : '#F2C94C'}
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
          >
            L3: LAS &amp; 3D
          </text>
          <text
            x="24"
            y="125"
            fill={isReveal ? '#F2C94C' : '#F3EFE6'}
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
          >
            L2: VECTORS
          </text>
          <text
            x="24"
            y="177"
            fill={isReveal ? '#4A8FE7' : '#A8A296'}
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
          >
            L1: RASTERS
          </text>

          {/* Hidden Blueprint ETL Spec Badge in Dedicated Empty Space */}
          {isReveal && (
            <g transform="translate(268, 12)">
              <rect width="195" height="50" fill="#0B1322" stroke="#4A8FE7" strokeWidth="1" />
              <text
                x="9"
                y="17"
                fill="#F2C94C"
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                ETL // GDAL · PDAL · ogr2ogr
              </text>
              <text
                x="9"
                y="31"
                fill="#93C5FD"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                PostGIS GIST → GeoServer OGC
              </text>
              <text
                x="9"
                y="43"
                fill="#F3EFE6"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
              >
                GetMap (WMS) + GetFeature (WFS)
              </text>
            </g>
          )}

          {/* Connecting Ingestion Arrow */}
          <path
            d="M322 135 L 388 135"
            stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <polygon points="388,131 397,135 388,139" fill={isReveal ? '#F2C94C' : '#F3EFE6'} />
          <text
            x="356"
            y="124"
            textAnchor="middle"
            fill={isReveal ? '#F2C94C' : '#A8A296'}
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
          >
            WMS / WFS
          </text>

          {/* Right: Cesium 3D Globe Wireframe */}
          <g transform="translate(485, 132)">
            <circle
              cx="0"
              cy="0"
              r="76"
              fill={isReveal ? 'rgba(74,143,231,0.12)' : 'rgba(243,239,230,0.03)'}
              stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
              strokeOpacity={isReveal ? '0.92' : '0.45'}
              strokeWidth="1.6"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="76"
              ry="28"
              stroke={isReveal ? '#F2C94C' : '#F3EFE6'}
              strokeOpacity={isReveal ? '0.7' : '0.22'}
              strokeWidth="1.1"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="34"
              ry="76"
              stroke={isReveal ? '#4A8FE7' : '#F3EFE6'}
              strokeOpacity={isReveal ? '0.7' : '0.22'}
              strokeWidth="1.1"
            />
            {isReveal && (
              <>
                <ellipse
                  cx="0"
                  cy="0"
                  rx="60"
                  ry="54"
                  stroke="#E04F3E"
                  strokeOpacity="0.65"
                  strokeDasharray="3 3"
                  strokeWidth="1.1"
                />
                <line x1="-86" y1="0" x2="86" y2="0" stroke="#F2C94C" strokeOpacity="0.4" />
                <line x1="0" y1="-86" x2="0" y2="86" stroke="#F2C94C" strokeOpacity="0.4" />
              </>
            )}
            <rect
              x="-22"
              y="-20"
              width="44"
              height="34"
              stroke="#F2C94C"
              strokeWidth="1.6"
              fill="rgba(242,201,76,0.14)"
            />
            <circle cx="0" cy="-3" r="3.5" fill="#E04F3E" />
            <text
              x="0"
              y="96"
              textAnchor="middle"
              fill={isReveal ? '#F2C94C' : '#F3EFE6'}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              CESIUM 3D WEB VIEWER
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Caption */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(243,239,230,0.12)] pt-2.5 font-mono-code text-[10px] text-[#A8A296]">
        <span>STACK: FLASK · POSTGIS · GEOSERVER · GDAL/PDAL · CESIUM</span>
        <span className={isReveal ? 'text-[#4A8FE7]' : 'text-[#F3EFE6]'}>INTERACTIVE DIAGRAM</span>
      </div>
    </div>
  );
};

/* ============================================================================
   INDIVIDUAL CASE STUDY EDITORIAL SPREAD
   ============================================================================ */
const CaseStudyArticle: React.FC<{
  project: ProjectCaseStudy;
  index: number;
  xrayMode: boolean;
}> = ({ project, index, xrayMode }) => {
  const [activeLens, setActiveLens] = useState<'story' | 'contributions'>('story');
  const isSecond = index === 1;

  return (
    <article
      aria-labelledby={`project-heading-${project.id}`}
      className="gsap-project-article border-t border-[rgba(243,239,230,0.16)] pt-12 pb-16 sm:pt-16 sm:pb-24"
    >
      {/* Case Study Top Index Strip */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs tracking-[0.09em] uppercase">
          <span className="bg-[#F2C94C] px-2.5 py-1 font-semibold text-[#0B0B0C]">
            {project.issueNumber}
          </span>
          <span className="text-[#A8A296]">{project.category}</span>
        </div>

        <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#A8A296]">
          {index === 0 ? (
            <Route className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
          ) : (
            <Layers className="h-3.5 w-3.5 text-[#4A8FE7]" aria-hidden="true" />
          )}
          <span>VERIFIED RESUME CASE STUDY</span>
        </div>
      </div>

      {/* Distinct Editorial Layout per Project */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
        {/* Narrative Column */}
        <div className={`lg:col-span-5 ${isSecond ? 'lg:order-2' : 'lg:order-1'}`}>
          <h3
            id={`project-heading-${project.id}`}
            className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[0.98] font-extrabold tracking-[-0.02em] uppercase text-[#F3EFE6]"
          >
            {project.title}
          </h3>

          <p className="mt-4 font-editorial-serif text-xl sm:text-2xl leading-snug italic text-[#F3EFE6]/90">
            {project.subtitle}
          </p>

          {/* Framer Motion Editorial Lens Switcher */}
          <div
            role="tablist"
            aria-label={`${project.title} detail view`}
            className="mt-6 inline-flex rounded-xs border border-[rgba(243,239,230,0.18)] bg-[#121216] p-1"
          >
            {(
              [
                { key: 'story', label: 'Problem → Outcome' },
                { key: 'contributions', label: 'Engineering Role' },
              ] as const
            ).map((tab) => {
              const active = activeLens === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveLens(tab.key)}
                  className={`relative px-3.5 py-1.5 font-mono-code text-[11px] tracking-[0.06em] uppercase transition-colors cursor-pointer ${
                    active ? 'text-[#0B0B0C] font-semibold' : 'text-[#A8A296] hover:text-[#F3EFE6]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`lensPill-${project.id}`}
                      className="absolute inset-0 rounded-xs bg-[#F3EFE6]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeLens === 'story' ? (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-5"
              >
                <div className="border-l-2 border-[#E04F3E] pl-4">
                  <span className="font-mono-code text-[10px] font-semibold tracking-[0.12em] uppercase text-[#E04F3E]">
                    01 // THE FRICTION
                  </span>
                  <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-[#A8A296]">
                    {project.problem}
                  </p>
                </div>

                <div className="border-l-2 border-[#4A8FE7] pl-4">
                  <span className="font-mono-code text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4A8FE7]">
                    02 // ARCHITECTURAL SOLUTION
                  </span>
                  <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-[#F3EFE6]">
                    {project.solution}
                  </p>
                </div>

                <div className="rounded-xs border border-[rgba(242,201,76,0.3)] bg-[#161510] p-4">
                  <span className="font-mono-code text-[10px] font-semibold tracking-[0.12em] uppercase text-[#F2C94C]">
                    03 // VERIFIED OUTCOME
                  </span>
                  <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-[#F3EFE6]">
                    {project.outcome}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contributions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-3"
              >
                <p className="font-mono-code text-[10px] tracking-[0.12em] uppercase text-[#F2C94C]">
                  ACTUAL IMPLEMENTATION CONTRIBUTIONS
                </p>
                <ul className="space-y-3">
                  {project.contribution.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 border-b border-[rgba(243,239,230,0.08)] pb-3 text-sm leading-relaxed text-[#F3EFE6]/90"
                    >
                      <span className="mt-0.5 font-mono-code text-xs text-[#F2C94C]">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verified Technology Ledger */}
          <div className="mt-6">
            <span className="block font-mono-code text-[10px] tracking-[0.1em] uppercase text-[#68635A]">
              TECHNOLOGY STACK
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-[rgba(243,239,230,0.16)] bg-[#131317] px-2.5 py-1 font-mono-code text-[11px] text-[#F3EFE6]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Links Row */}
          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[rgba(243,239,230,0.12)] pt-5">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 rounded-xs bg-[#F2C94C] px-4 py-2 font-mono-code text-xs font-semibold uppercase text-[#0B0B0C]"
              >
                <span>Live Deployment</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.a>
            )}

            <motion.a
              href={project.repoUrl ?? PORTFOLIO_DATA.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xs border border-[rgba(243,239,230,0.25)] bg-[#141418] px-4 py-2 font-mono-code text-xs uppercase text-[#F3EFE6] hover:border-[#F2C94C]"
            >
              <Github className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
              <span>
                {project.repoUrl
                  ? 'View Repository'
                  : `GitHub Profile (@${PORTFOLIO_DATA.contact.githubUsername})`}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.a>
          </div>
        </div>

        {/* Visual / Interactive Blueprint Column */}
        <div className={`lg:col-span-7 ${isSecond ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="gsap-project-visual">
            <FlashlightStage
              radius={230}
              mobileRadius={155}
              forceReveal={xrayMode}
              revealContent={
                index === 0 ? <GeoTripDiagram mode="reveal" /> : <GeoIntelDiagram mode="reveal" />
              }
            >
              {index === 0 ? <GeoTripDiagram mode="base" /> : <GeoIntelDiagram mode="base" />}
            </FlashlightStage>

            <div className="mt-2.5 flex items-center justify-between font-mono-code text-[10px] text-[#A8A296]">
              <span className="inline-flex items-center gap-1.5">
                <Flashlight className="h-3 w-3 text-[#F2C94C]" aria-hidden="true" />
                <span>Move cursor or drag across diagram to inspect internal architecture</span>
              </span>
              {index === 0 ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-[#F2C94C]">
                  <QrCode className="h-3 w-3" /> QR + OSRM
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 text-[#4A8FE7]">
                  <Layers className="h-3 w-3" /> WMS / WFS / 3D
                </span>
              )}
            </div>
          </div>

          {/* 4-Stage Horizontal Storytelling Sequence Strip */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {project.architectureNodes.map((node) => (
              <div
                key={node.stage}
                className="gsap-pipeline-step border border-[rgba(243,239,230,0.14)] bg-[#111115] p-3.5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-code text-[10px] font-semibold tracking-[0.08em] text-[#F2C94C]">
                    {node.stage}
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#F3EFE6]">{node.detail}</p>
                </div>
                <p className="mt-3 border-t border-[rgba(243,239,230,0.08)] pt-2 font-mono-code text-[10px] text-[#A8A296]">
                  {node.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ xrayMode }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const articles = gsap.utils.toArray<HTMLElement>('.gsap-project-article');

        articles.forEach((article) => {
          const visual = article.querySelector('.gsap-project-visual');
          const steps = article.querySelectorAll('.gsap-pipeline-step');

          if (visual) {
            gsap.fromTo(
              visual,
              { clipPath: 'inset(0% 0% 18% 0%)', opacity: 0.25, y: 24 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 78%',
                },
              }
            );
          }

          if (steps.length > 0) {
            gsap.fromTo(
              steps,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: article,
                  start: 'top 68%',
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-section-heading"
      className="relative border-b border-[rgba(243,239,230,0.14)] bg-[#0B0B0C] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-3 flex items-center gap-3 font-mono-code text-xs tracking-[0.1em] uppercase text-[#F2C94C]">
              <span>02 // SELECTED CASE STUDIES</span>
              <span className="h-[1px] w-12 bg-[#F2C94C]/50" />
              <span className="text-[#A8A296]">GEOSPATIAL &amp; FULL-STACK SYSTEMS</span>
            </div>
            <h2
              id="projects-section-heading"
              className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] leading-[0.96] font-extrabold tracking-[-0.03em] uppercase text-[#F3EFE6]"
            >
              Field-Tested{' '}
              <span className="font-editorial-serif font-normal italic text-[#F2C94C] capitalize">
                Systems
              </span>{' '}
              <span className="text-outline-ivory-strong">&amp; Maps</span>
            </h2>
          </div>

          <p className="lg:col-span-4 text-sm sm:text-base leading-relaxed text-[#A8A296]">
            Two production-minded platforms built with Python, Flask, PostgreSQL/PostGIS, OSRM,
            GeoServer, and interactive browser cartography—turning complex spatial workflows into
            single-pane web tools.
          </p>
        </div>

        <div>
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <CaseStudyArticle
              key={project.id}
              project={project}
              index={idx}
              xrayMode={xrayMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
