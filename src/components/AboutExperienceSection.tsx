import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase, CheckCircle2, Globe2, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AboutExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.gsap-about-block',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gsap-about-grid',
              start: 'top 78%',
            },
          }
        );

        gsap.fromTo(
          '.gsap-exp-row',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gsap-exp-container',
              start: 'top 78%',
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
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative border-b border-[rgba(243,239,230,0.14)] bg-[#0E0E11] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        {/* PART A: EDITORIAL ABOUT & WORKING APPROACH */}
        <div className="gsap-about-grid grid grid-cols-1 gap-12 border-b border-[rgba(243,239,230,0.14)] pb-20 lg:grid-cols-12">
          <div className="gsap-about-block lg:col-span-5">
            <div className="mb-3 flex items-center gap-3 font-mono-code text-xs tracking-[0.1em] uppercase text-[#F2C94C]">
              <span>03A // EDITORIAL PROFILE</span>
              <span className="h-[1px] w-10 bg-[#F2C94C]/50" />
            </div>

            <h2
              id="experience-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[0.98] font-extrabold tracking-[-0.025em] uppercase text-[#F3EFE6]"
            >
              Engineering{' '}
              <span className="font-editorial-serif font-normal italic text-[#F2C94C] capitalize">
                Approach
              </span>{' '}
              &amp; Practice
            </h2>

            <p className="mt-6 font-editorial-serif text-2xl sm:text-[1.65rem] leading-snug text-[#F3EFE6]">
              &ldquo;{PORTFOLIO_DATA.about.headline}&rdquo;
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#A8A296]">
              {PORTFOLIO_DATA.about.leadParagraph}
            </p>

            {/* Location & Spoken Languages Metadata */}
            <div className="mt-7 grid grid-cols-1 gap-3 border-t border-[rgba(243,239,230,0.12)] pt-5 sm:grid-cols-2 font-mono-code text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E04F3E]" aria-hidden="true" />
                <div>
                  <span className="block text-[10px] uppercase text-[#68635A]">BASE LOCATION</span>
                  <span className="text-[#F3EFE6]">{PORTFOLIO_DATA.identity.shortLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4A8FE7]" aria-hidden="true" />
                <div>
                  <span className="block text-[10px] uppercase text-[#68635A]">
                    LANGUAGES KNOWN
                  </span>
                  <span className="text-[#F3EFE6]">
                    {PORTFOLIO_DATA.identity.languages.join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: 3 Working Principles */}
          <div className="gsap-about-block lg:col-span-7 flex flex-col justify-between space-y-4">
            {PORTFOLIO_DATA.about.workingApproach.map((item) => (
              <div
                key={item.code}
                className="border border-[rgba(243,239,230,0.14)] bg-[#121217] p-5 sm:p-6 transition-colors hover:border-[rgba(242,201,76,0.45)]"
              >
                <div className="flex items-center justify-between gap-2 font-mono-code text-[11px] tracking-[0.09em] text-[#F2C94C]">
                  <span>{item.code}</span>
                  <span className="text-[#68635A]">METHODOLOGY</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#F3EFE6]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A8A296]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PART B: VERIFIED PROFESSIONAL EXPERIENCE */}
        <div className="gsap-exp-container pt-16 sm:pt-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono-code text-xs tracking-[0.1em] uppercase text-[#F2C94C]">
                03B // VERIFIED EXPERIENCE RECORD
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] uppercase text-[#F3EFE6]">
                Production Tenure
              </h3>
            </div>
            <span className="font-mono-code text-xs uppercase text-[#A8A296]">
              SOURCE: SUPPLIED CURRICULUM VITAE
            </span>
          </div>

          {PORTFOLIO_DATA.experience.map((exp) => (
            <div
              key={exp.id}
              className="gsap-exp-row border border-[rgba(243,239,230,0.2)] bg-[#121216] p-6 sm:p-9"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Metadata Column */}
                <div className="lg:col-span-4 border-b border-[rgba(243,239,230,0.12)] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                  <div className="inline-flex items-center gap-2 bg-[#F2C94C] px-2.5 py-1 font-mono-code text-xs font-semibold text-[#0B0B0C]">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>

                  <h4 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F3EFE6]">
                    {exp.role}
                  </h4>

                  <p className="mt-2 font-editorial-serif text-xl italic text-[#F2C94C]">
                    {exp.organization}
                  </p>

                  <p className="mt-3 font-mono-code text-xs text-[#A8A296]">{exp.location}</p>

                  <p className="mt-4 text-sm leading-relaxed text-[#A8A296]">{exp.summary}</p>
                </div>

                {/* Right Contributions & Stack */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <span className="font-mono-code text-[11px] tracking-[0.1em] uppercase text-[#F2C94C]">
                      KEY ENGINEERING CONTRIBUTIONS
                    </span>
                    <ul className="mt-4 space-y-3.5">
                      {exp.highlights.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-[#F3EFE6]"
                        >
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-[#F2C94C]"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-t border-[rgba(243,239,230,0.12)] pt-5">
                    <span className="block font-mono-code text-[10px] tracking-[0.1em] uppercase text-[#68635A]">
                      TECHNOLOGIES APPLIED AT {exp.shortOrg.toUpperCase()}
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[rgba(243,239,230,0.16)] bg-[#0D0D10] px-2.5 py-1 font-mono-code text-[11px] text-[#F3EFE6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

