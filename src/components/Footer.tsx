import React from 'react';
import { ArrowUp, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[rgba(243,239,230,0.14)] bg-[#0B0B0C] py-12 text-[#A8A296]">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[0.06em] uppercase text-[#F3EFE6]">
              {PORTFOLIO_DATA.identity.fullName}
            </p>
            <p className="mt-1 font-mono-code text-xs text-[#A8A296]">
              {PORTFOLIO_DATA.identity.role} · {PORTFOLIO_DATA.identity.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono-code text-xs">
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              aria-label="Send email"
              className="inline-flex items-center gap-1.5 text-[#A8A296] transition-colors hover:text-[#F2C94C]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Email</span>
            </a>

            <a
              href={PORTFOLIO_DATA.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-1.5 text-[#A8A296] transition-colors hover:text-[#F2C94C]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center gap-1.5 text-[#A8A296] transition-colors hover:text-[#F2C94C]"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PORTFOLIO_DATA.identity.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A8A296] transition-colors hover:text-[#F2C94C]"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Resume PDF</span>
            </a>

            <a
              href="#dispatch"
              aria-label="Return to top of portfolio"
              className="inline-flex items-center gap-1 rounded-xs border border-[rgba(243,239,230,0.2)] px-2.5 py-1 text-[#F3EFE6] transition-colors hover:border-[#F2C94C] hover:text-[#F2C94C]"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(243,239,230,0.08)] pt-6 font-mono-code text-[11px] text-[#68635A]">
          <span>COLOPHON // EDITORIAL INTERACTIVE PORTFOLIO · VERIFIED AGAINST SUPPLIED CV</span>
          <span>COORDINATES: {PORTFOLIO_DATA.identity.coordinates}</span>
        </div>
      </div>
    </footer>
  );
};

