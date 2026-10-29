import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePrefersReducedMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CollaborateSectionProps {
  onOpenContact: () => void;
}

interface StringDescriptor {
  fingerIdx: number;
  btnIdx: number;
  sag: number;
  wobble: number;
  strokeWidth: number;
}

const STRING_THREADS: StringDescriptor[] = [
  { fingerIdx: 0, btnIdx: 0, sag: 14, wobble: -8, strokeWidth: 1.45 },
  { fingerIdx: 1, btnIdx: 1, sag: -7, wobble: 10, strokeWidth: 1.25 },
  { fingerIdx: 1, btnIdx: 2, sag: 9, wobble: -6, strokeWidth: 1.0 },
  { fingerIdx: 2, btnIdx: 2, sag: 19, wobble: 11, strokeWidth: 1.3 },
  { fingerIdx: 3, btnIdx: 3, sag: 26, wobble: -9, strokeWidth: 1.15 },
  { fingerIdx: 4, btnIdx: 4, sag: 34, wobble: 8, strokeWidth: 1.05 },
];

export const CollaborateSection: React.FC<CollaborateSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const handRigRef = useRef<HTMLDivElement | null>(null);

  const fingerRefs = useRef<(SVGCircleElement | null)[]>([]);
  const btnAnchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mainPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const shadowPathRefs = useRef<(SVGPathElement | null)[]>([]);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const pointerStateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    inView: false,
    drawCompleted: false,
  });

  const computeStrings = useCallback(
    (timeSec: number) => {
      const stageEl = stageRef.current;
      if (!stageEl) return;

      const stageRect = stageEl.getBoundingClientRect();
      if (stageRect.width === 0 || stageRect.height === 0) return;

      const ps = pointerStateRef.current;
      ps.currentX += (ps.targetX - ps.currentX) * 0.12;
      ps.currentY += (ps.targetY - ps.currentY) * 0.12;

      const swayEnabled = !prefersReducedMotion && ps.drawCompleted;

      STRING_THREADS.forEach((thread, idx) => {
        const fingerEl = fingerRefs.current[thread.fingerIdx];
        const btnAnchorEl = btnAnchorRefs.current[thread.btnIdx];
        const mainPath = mainPathRefs.current[idx];
        const shadowPath = shadowPathRefs.current[idx];

        if (!fingerEl || !btnAnchorEl || !mainPath) return;

        const fRect = fingerEl.getBoundingClientRect();
        const bRect = btnAnchorEl.getBoundingClientRect();

        const fx = fRect.left + fRect.width * 0.5 - stageRect.left;
        const fy = fRect.top + fRect.height * 0.5 - stageRect.top;
        const bx = bRect.left + bRect.width * 0.5 - stageRect.left;
        const by = bRect.top + bRect.height * 0.5 - stageRect.top;

        const dx = bx - fx;
        const dy = by - fy;

        const ambientSway = swayEnabled ? Math.sin(timeSec * 1.9 + idx * 1.15) * 3.8 : 0;
        const ambientCross = swayEnabled ? Math.cos(timeSec * 1.45 + idx * 0.9) * 2.5 : 0;

        const pullX = swayEnabled ? ps.currentX * (0.14 + idx * 0.018) : 0;
        const pullY = swayEnabled ? ps.currentY * (0.18 + idx * 0.02) : 0;

        const c1x = fx + dx * 0.34 + thread.wobble * 0.65 + ambientCross + pullX * 0.75;
        const c1y = fy + dy * 0.36 + thread.sag * 0.6 + ambientSway + pullY * 0.75;

        const c2x = fx + dx * 0.68 - thread.wobble * 0.5 - ambientCross * 0.6 + pullX;
        const c2y = fy + dy * 0.72 + thread.sag * 0.42 + ambientSway * 0.8 + pullY;

        const d = `M ${fx.toFixed(1)} ${fy.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(
          1
        )}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}`;

        mainPath.setAttribute('d', d);

        if (shadowPath) {
          const dShadow = `M ${(fx + 4).toFixed(1)} ${(fy + 9).toFixed(1)} C ${(c1x + 5).toFixed(
            1
          )} ${(c1y + 12).toFixed(1)}, ${(c2x + 5).toFixed(1)} ${(c2y + 12).toFixed(1)}, ${(
            bx + 3
          ).toFixed(1)} ${(by + 7).toFixed(1)}`;
          shadowPath.setAttribute('d', dShadow);
        }
      });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    computeStrings(0);

    const ro = new ResizeObserver(() => {
      computeStrings(performance.now() * 0.001);
    });
    ro.observe(stageEl);

    return () => {
      ro.disconnect();
    };
  }, [computeStrings]);

  useGSAP(
    () => {
      computeStrings(0);

      if (prefersReducedMotion) {
        pointerStateRef.current.drawCompleted = true;
        computeStrings(0);
        return;
      }

      const tickerFn = (time: number) => {
        if (pointerStateRef.current.inView) {
          computeStrings(time);
        }
      };

      gsap.ticker.add(tickerFn);

      const viewportWatcher = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          pointerStateRef.current.inView = self.isActive;
          if (self.isActive) computeStrings(gsap.ticker.time);
        },
      });

      // Snappy entrance choreography so strings draw & lock onto the button immediately on arrival
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });

      entranceTl
        .fromTo(
          '.gsap-collab-header',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
        .fromTo(
          '.gsap-collab-hand-wrap',
          { x: -18, y: 20, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            onUpdate: () => computeStrings(gsap.ticker.time),
          },
          '-=0.35'
        )
        .fromTo(
          '.gsap-collab-btn-stage',
          { x: 16, y: -12, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            onUpdate: () => computeStrings(gsap.ticker.time),
          },
          '-=0.5'
        )
        .add(() => {
          computeStrings(gsap.ticker.time);
          const validPaths = mainPathRefs.current.filter(
            (p): p is SVGPathElement => p !== null
          );
          const validShadows = shadowPathRefs.current.filter(
            (p): p is SVGPathElement => p !== null
          );

          validPaths.forEach((p) => {
            const len = Math.max(p.getTotalLength(), 140) + 50;
            gsap.set(p, {
              strokeDasharray: len,
              strokeDashoffset: len,
              opacity: 1,
            });
          });

          gsap.set(validShadows, { opacity: 0 });

          gsap.to(validPaths, {
            strokeDashoffset: 0,
            duration: 0.62,
            stagger: 0.045,
            ease: 'power2.out',
            onComplete: () => {
              validPaths.forEach((p) => {
                p.style.strokeDasharray = 'none';
                p.style.strokeDashoffset = '0';
              });
              gsap.to(validShadows, { opacity: 1, duration: 0.35 });
              pointerStateRef.current.drawCompleted = true;
            },
          });
        }, '-=0.35');

      // Subtle, natural rhythmic hand-pulling motion
      const pullLoop = gsap.to(handRigRef.current, {
        x: -4,
        y: 5,
        rotation: -1.3,
        transformOrigin: '22% 88%',
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      return () => {
        gsap.ticker.remove(tickerFn);
        viewportWatcher.kill();
        entranceTl.kill();
        pullLoop.kill();
      };
    },
    { scope: sectionRef, dependencies: [computeStrings, prefersReducedMotion] }
  );

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    pointerStateRef.current.targetX = normX * 40;
    pointerStateRef.current.targetY = normY * 34;
  };

  const handleStagePointerLeave = () => {
    pointerStateRef.current.targetX = 0;
    pointerStateRef.current.targetY = 0;
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -py * 11,
      rotateY: px * 13,
    });
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      id="collaborate"
      ref={sectionRef}
      aria-labelledby="collaborate-heading"
      className="paper-theme relative overflow-hidden py-20 sm:py-28 text-[#111113]"
      style={{
        background:
          'radial-gradient(circle at 62% 34%, #F4F2EC 0%, #EAE8E2 58%, #DFDCD3 100%)',
      }}
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        {/* Section Editorial Header */}
        <div className="gsap-collab-header flex flex-col justify-between gap-6 border-b border-[rgba(17,17,19,0.14)] pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono-code text-xs tracking-[0.1em] uppercase text-[#111113]/75">
              <span className="inline-block h-2 w-2 rounded-full bg-[#E04F3E]" />
              <span>05 // COMMISSION &amp; ENGINEERING INQUIRIES</span>
            </div>
            <h2
              id="collaborate-heading"
              className="font-display text-3xl sm:text-5xl lg:text-[3.5rem] leading-[0.96] font-extrabold tracking-[-0.03em] uppercase text-[#111113]"
            >
              Ready to Pull the{' '}
              <span className="font-editorial-serif font-normal italic text-[#111113] underline decoration-[#F2C94C] decoration-4 underline-offset-4 capitalize">
                Next Thread?
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#111113]/75">
            Open to full-stack developer roles, Python/FastAPI/Flask API systems, and geospatial web
            platforms. Pull the strings or press the button below to open the direct dispatch desk.
          </p>
        </div>

        {/* ====================================================================
            INTERACTIVE HAND + STRINGS + GLOSSY BLACK BUTTON STAGE
            ==================================================================== */}
        <div
          ref={stageRef}
          onPointerMove={handleStagePointerMove}
          onPointerDown={handleStagePointerMove}
          onPointerLeave={handleStagePointerLeave}
          style={{ touchAction: 'pan-y', perspective: '1000px' }}
          className="relative mx-auto mt-8 h-[390px] w-full max-w-[1040px] sm:mt-12 sm:h-[460px] lg:h-[510px] select-none"
        >
          {/* Dimensional Ground Shadow Oval beneath Button */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[6%] top-[27%] h-16 w-60 rounded-full opacity-25 blur-2xl sm:right-[13%] sm:w-80"
            style={{ background: 'rgba(15, 15, 18, 0.44)' }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-2 hidden sm:block font-mono-code text-[10px] tracking-[0.1em] uppercase text-[#111113]/45"
          >
            FIG. 05 // TACTILE TENSION STAGE · TIRUPATI, IN
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-2 bottom-3 text-right font-mono-code text-[10px] tracking-[0.08em] uppercase text-[#111113]/55"
          >
            <span className="block">CLICK PILL OR PRESS ENTER TO OPEN OVERLAY</span>
            <span className="text-[#111113]/40">
              {PORTFOLIO_DATA.contact.email} · @{PORTFOLIO_DATA.contact.githubUsername}
            </span>
          </div>

          {/* 1. DYNAMIC SVG STRINGS OVERLAY (Tucked naturally beneath button rim via z-10) */}
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {/* Soft Dimensional String Cast Shadows on #EAE8E2 Paper */}
            <g fill="none">
              {STRING_THREADS.map((thread, idx) => (
                <path
                  key={`shadow-${idx}`}
                  ref={(el) => {
                    shadowPathRefs.current[idx] = el;
                  }}
                  stroke="rgba(17, 17, 19, 0.1)"
                  strokeWidth={thread.strokeWidth + 0.5}
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Primary Irregular Black Strings */}
            <g fill="none">
              {STRING_THREADS.map((thread, idx) => (
                <path
                  key={`string-${idx}`}
                  ref={(el) => {
                    mainPathRefs.current[idx] = el;
                  }}
                  stroke="#141417"
                  strokeWidth={thread.strokeWidth}
                  strokeLinecap="round"
                  style={{ opacity: prefersReducedMotion ? 1 : 0 }}
                />
              ))}
            </g>
          </svg>

          {/* 2. GLOSSY JET-BLACK PILL BUTTON (z-20 so strings tuck cleanly beneath its rim) */}
          <div className="gsap-collab-btn-stage absolute top-[8%] right-[2%] z-20 sm:top-[13%] sm:right-[11%] lg:top-[14%] lg:right-[15%]">
            <motion.button
              type="button"
              onClick={onOpenContact}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                y: isButtonHovered ? -5 : 0,
                scale: isButtonHovered ? 1.025 : 1,
              }}
              whileTap={{ scale: 0.965, y: 2 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glossy-black-pill group relative inline-flex items-center gap-2.5 sm:gap-3.5 overflow-hidden rounded-full px-6 py-4 sm:px-11 sm:py-5.5 lg:px-13 lg:py-6 cursor-pointer"
              aria-haspopup="dialog"
            >
              {/* Top Specular Studio Highlight Arc */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-[2px] h-[28%] rounded-full opacity-55"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0) 100%)',
                }}
              />

              {/* Animated Glossy Light Sweep on Hover */}
              <motion.span
                aria-hidden="true"
                initial={{ x: '-140%', skewX: -22 }}
                animate={{
                  x: isButtonHovered ? '220%' : '-140%',
                  skewX: -22,
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
              />

              {/* Status Dot */}
              <span
                aria-hidden="true"
                className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F2C94C] shadow-[0_0_10px_rgba(242,201,76,0.85)]"
              />

              {/* Button Copy */}
              <span className="relative z-10 font-display text-xs sm:text-base lg:text-lg font-extrabold tracking-[0.13em] uppercase text-[#F7F5F0]">
                LET&apos;S COLLABORATE
              </span>

              <ArrowUpRight
                className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#F2C94C] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />

              {/* Hidden Physical Tie-Points along Lower-Left Underside of Pill Rim */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[5px] left-[9%] flex w-[48%] items-center justify-between opacity-0"
              >
                {[0, 1, 2, 3, 4].map((idx) => (
                  <span
                    key={idx}
                    ref={(el) => {
                      btnAnchorRefs.current[idx] = el;
                    }}
                    className="h-1 w-1"
                  />
                ))}
              </span>
            </motion.button>
          </div>

          {/* 3. GENUINE EDITORIAL PEN-AND-INK INLINE SVG HAND (Below & Left of Button) */}
          <div className="gsap-collab-hand-wrap pointer-events-none absolute bottom-[3%] left-[0%] z-20 w-[170px] sm:bottom-[3%] sm:left-[5%] sm:w-[240px] lg:left-[10%] lg:w-[285px]">
            <div ref={handRigRef}>
              <svg
                viewBox="0 0 320 300"
                className="h-auto w-full drop-shadow-[0_14px_20px_rgba(17,17,19,0.13)]"
                fill="none"
                role="img"
                aria-label="Hand-drawn black and white editorial illustration of a hand pulling strings connected to the Let's Collaborate button"
              >
                {/* Soft Paper Ground Shadow */}
                <ellipse cx="110" cy="280" rx="82" ry="12" fill="rgba(17, 17, 19, 0.09)" />

                {/* Editorial Jacket Cuff (Bottom-Left) */}
                <path
                  d="M 12 294 L 48 220 C 70 223, 98 239, 114 263 L 88 296 Z"
                  fill="#131316"
                  stroke="#111113"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                {/* Crisp Linen Shirt Cuff */}
                <path
                  d="M 50 220 L 64 205 C 86 210, 110 226, 124 248 L 112 262 C 97 239, 70 223, 50 220 Z"
                  fill="#F8F6F0"
                  stroke="#111113"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="95" cy="238" r="3" fill="#EAE8E2" stroke="#111113" strokeWidth="1.4" />

                {/* Sculptural Pen-and-Ink Hand Silhouette Poised in a Delicately Articulated Pinch/Pull */}
                <path
                  d="M 66 205
                     C 76 184, 84 162, 92 140
                     C 98 122, 106 96, 122 80
                     C 129 73, 139 76, 138 86
                     C 137 98, 129 114, 126 126
                     C 141 101, 164 69, 185 52
                     C 193 45, 202 51, 197 62
                     C 190 78, 172 101, 159 120
                     C 178 99, 204 75, 224 64
                     C 233 59, 241 66, 234 76
                     C 224 91, 202 111, 185 130
                     C 203 116, 226 100, 244 95
                     C 253 92, 258 100, 250 109
                     C 237 122, 214 137, 196 151
                     C 211 144, 230 137, 244 137
                     C 252 137, 255 146, 246 152
                     C 230 163, 203 175, 182 190
                     C 160 205, 141 226, 123 247
                     C 108 225, 85 209, 66 205 Z"
                  fill="#F7F5EF"
                  stroke="#111113"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interior Engraving Contours & Tendon Lines */}
                <path
                  d="M 126 126 C 124 140, 129 154, 142 162"
                  stroke="#111113"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 110 175 C 127 169, 146 173, 162 186"
                  stroke="#111113"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                />
                <path
                  d="M 142 143 C 156 148, 170 158, 180 171"
                  stroke="#111113"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Dorsal Tendon Subtle Lines */}
                <path
                  d="M 104 166 L 128 134"
                  stroke="#111113"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M 118 174 L 152 132"
                  stroke="#111113"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* Knuckle & Phalanx Crease Ticks */}
                <path d="M 122 95 C 126 97, 130 98, 133 97" stroke="#111113" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 174 73 C 178 76, 182 78, 185 78" stroke="#111113" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 158 96 C 162 99, 166 101, 170 101" stroke="#111113" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 211 82 C 215 85, 219 87, 222 88" stroke="#111113" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 193 104 C 197 107, 201 109, 204 110" stroke="#111113" strokeWidth="1.15" strokeLinecap="round" />
                <path d="M 229 108 C 232 111, 235 113, 238 114" stroke="#111113" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M 230 144 C 232 147, 234 149, 236 151" stroke="#111113" strokeWidth="1.1" strokeLinecap="round" />

                {/* Fine Fingernail Linework */}
                <path d="M 125 82 C 129 79, 133 81, 134 86" stroke="#111113" strokeWidth="1.05" strokeLinecap="round" />
                <path d="M 186 54 C 191 51, 195 54, 193 60" stroke="#111113" strokeWidth="1.05" strokeLinecap="round" />
                <path d="M 225 66 C 230 64, 234 67, 231 72" stroke="#111113" strokeWidth="1.05" strokeLinecap="round" />
                <path d="M 245 97 C 249 96, 252 99, 249 104" stroke="#111113" strokeWidth="1" strokeLinecap="round" />
                <path d="M 244 139 C 248 139, 250 142, 247 147" stroke="#111113" strokeWidth="1" strokeLinecap="round" />

                {/* Woodcut Cross-Hatching Shadow along Wrist & Heel of Hand */}
                <g stroke="#111113" strokeWidth="0.95" strokeLinecap="round" opacity="0.68">
                  <line x1="82" y1="197" x2="96" y2="189" />
                  <line x1="88" y1="204" x2="104" y2="194" />
                  <line x1="95" y1="211" x2="113" y2="200" />
                  <line x1="103" y1="218" x2="122" y2="206" />
                  <line x1="110" y1="226" x2="131" y2="213" />
                  <line x1="116" y1="233" x2="139" y2="219" />
                  <line x1="146" y1="208" x2="162" y2="198" />
                  <line x1="155" y1="201" x2="171" y2="191" />
                </g>

                {/* Delicate Thread-Loop Knots & Exact Measurement Anchors on Fingertips */}
                <circle
                  ref={(el) => {
                    fingerRefs.current[0] = el;
                  }}
                  cx="132"
                  cy="78"
                  r="2.1"
                  fill="#111113"
                />
                <circle
                  ref={(el) => {
                    fingerRefs.current[1] = el;
                  }}
                  cx="194"
                  cy="50"
                  r="2.1"
                  fill="#111113"
                />
                <circle
                  ref={(el) => {
                    fingerRefs.current[2] = el;
                  }}
                  cx="234"
                  cy="64"
                  r="2.1"
                  fill="#111113"
                />
                <circle
                  ref={(el) => {
                    fingerRefs.current[3] = el;
                  }}
                  cx="252"
                  cy="97"
                  r="2.0"
                  fill="#111113"
                />
                <circle
                  ref={(el) => {
                    fingerRefs.current[4] = el;
                  }}
                  cx="250"
                  cy="141"
                  r="2.0"
                  fill="#111113"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Direct Contact Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(17,17,19,0.14)] pt-6 font-mono-code text-xs text-[#111113]/80">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="inline-flex items-center gap-2 font-semibold text-[#111113] hover:underline"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{PORTFOLIO_DATA.contact.email}</span>
            </a>
            <a
              href={PORTFOLIO_DATA.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111113] hover:underline"
            >
              GitHub / @{PORTFOLIO_DATA.contact.githubUsername}
            </a>
            <a
              href={PORTFOLIO_DATA.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111113] hover:underline"
            >
              LinkedIn / {PORTFOLIO_DATA.contact.linkedinDisplay}
            </a>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="font-semibold uppercase tracking-[0.08em] text-[#111113] underline decoration-[#111113]/40 underline-offset-4 hover:decoration-[#111113] cursor-pointer"
          >
            Open Full Contact &amp; Brief Desk →
          </button>
        </div>
      </div>
    </section>
  );
};
