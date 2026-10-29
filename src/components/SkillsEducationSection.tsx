import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { GraduationCap, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const SkillsEducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.gsap-skill-card',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.gsap-skills-grid',
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          '.gsap-edu-row',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.gsap-edu-ledger',
              start: 'top 82%',
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="systems"
      ref={sectionRef}
      aria-labelledby="systems-heading"
      className="relative border-b border-[rgba(243,239,230,0.14)] bg-[#0B0B0C] py-20 sm:py-28 editorial-grid-bg"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        {/* Section Header + Domain Filter */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono-code text-xs tracking-[0.1em] uppercase text-[#F2C94C]">
              <span>04 // TECHNICAL TAXONOMY &amp; ACADEMICS</span>
              <span className="h-[1px] w-12 bg-[#F2C94C]/50" />
            </div>
            <h2
              id="systems-heading"
              className="font-display text-4xl sm:text-5xl leading-[0.96] font-extrabold tracking-[-0.025em] uppercase text-[#F3EFE6]"
            >
              Capabilities{' '}
              <span className="font-editorial-serif font-normal italic text-[#F2C94C] capitalize">
                Index
              </span>
            </h2>
          </div>

          {/* Interactive Domain Spotlight Filter (Framer Motion) */}
          <div
            role="group"
            aria-label="Highlight technical domain"
            className="flex flex-wrap gap-1.5"
          >
            <button
              type="button"
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 font-mono-code text-[11px] uppercase transition-colors cursor-pointer border ${
                selectedDomain === 'all'
                  ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0B0B0C] font-semibold'
                  : 'border-[rgba(243,239,230,0.18)] bg-[#121216] text-[#A8A296] hover:text-[#F3EFE6]'
              }`}
            >
              All Domains (06)
            </button>
            {PORTFOLIO_DATA.skillGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() =>
                  setSelectedDomain((prev) => (prev === group.id ? 'all' : group.id))
                }
                className={`px-3 py-1.5 font-mono-code text-[11px] uppercase transition-colors cursor-pointer border ${
                  selectedDomain === group.id
                    ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0B0B0C] font-semibold'
                    : 'border-[rgba(243,239,230,0.18)] bg-[#121216] text-[#A8A296] hover:text-[#F3EFE6]'
                }`}
              >
                {group.code}
              </button>
            ))}
          </div>
        </div>

        {/* Meaningful Skill Groups Matrix */}
        <div className="gsap-skills-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_DATA.skillGroups.map((group) => {
            const isDimmed = selectedDomain !== 'all' && selectedDomain !== group.id;
            const isHighlighted = selectedDomain === group.id;

            return (
              <motion.div
                key={group.id}
                animate={{
                  opacity: isDimmed ? 0.42 : 1,
                  scale: isHighlighted ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`gsap-skill-card flex flex-col justify-between border p-6 transition-colors ${
                  isHighlighted
                    ? 'border-[#F2C94C] bg-[#15151B]'
                    : 'border-[rgba(243,239,230,0.16)] bg-[#111115]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[rgba(243,239,230,0.1)] pb-3 font-mono-code text-xs">
                    <span className="font-semibold text-[#F2C94C]">{group.code}</span>
                    <Terminal className="h-3.5 w-3.5 text-[#68635A]" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#F3EFE6]">
                    {group.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#A8A296]">
                    {group.editorialNote}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-[rgba(243,239,230,0.1)] pt-4">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between font-mono-code text-xs text-[#F3EFE6]"
                    >
                      <span>{skill}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F2C94C]/75" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Academic Foundation Ledger */}
        <div className="gsap-edu-ledger mt-20 border-t border-[rgba(243,239,230,0.16)] pt-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-[#F2C94C]" aria-hidden="true" />
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-[#F3EFE6]">
                Academic Foundation
              </h3>
            </div>
            <span className="font-mono-code text-xs uppercase text-[#A8A296]">
              COMPUTER SCIENCE &amp; ENGINEERING (AI &amp; ML)
            </span>
          </div>

          <div className="divide-y divide-[rgba(243,239,230,0.12)] border-y border-[rgba(243,239,230,0.16)]">
            {PORTFOLIO_DATA.education.map((edu) => (
              <div
                key={edu.degree}
                className="gsap-edu-row grid grid-cols-1 items-center gap-3 py-5 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-2 font-mono-code text-xs font-semibold text-[#F2C94C]">
                  {edu.period}
                </div>
                <div className="sm:col-span-5">
                  <h4 className="font-display text-lg font-bold text-[#F3EFE6]">{edu.degree}</h4>
                </div>
                <div className="sm:col-span-3 text-sm text-[#A8A296]">
                  {edu.institution} · <span className="text-[#F3EFE6]/75">{edu.location}</span>
                </div>
                <div className="sm:col-span-2 sm:text-right font-mono-code text-xs font-semibold text-[#F3EFE6]">
                  <span className="inline-block border border-[rgba(243,239,230,0.2)] bg-[#141418] px-2.5 py-1">
                    {edu.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

