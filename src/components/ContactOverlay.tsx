import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_SCOPES = [
  'Full-Stack Web App (Python / React)',
  'Geospatial & Map Platform (PostGIS / Leaflet / Cesium)',
  'REST API & Database Engineering (FastAPI / Flask / SQL)',
  'Full-Time / Engineering Role Inquiry',
];

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState(PROJECT_SCOPES[0]);
  const [senderName, setSenderName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  // Focus trap, Escape dismissal, and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.contact.email}`;
    }
  };

  const handleLaunchProjectMail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Collaboration] ${selectedScope}${senderName.trim() ? ` — ${senderName.trim()}` : ''}`
    );
    const body = encodeURIComponent(
      `Hi Devi Prasad,\n\nScope: ${selectedScope}\n${
        senderName.trim() ? `From: ${senderName.trim()}\n` : ''
      }\nProject / Role Overview:\n${
        projectBrief.trim() || 'Would love to connect regarding a project or opportunity.'
      }\n`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-overlay-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070709]/85 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Editorial Sheet */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-[780px] overflow-y-auto border border-[rgba(243,239,230,0.24)] bg-[#0F0F13] text-[#F3EFE6] shadow-2xl"
          >
            {/* Top Editorial Masthead */}
            <div className="flex items-center justify-between border-b border-[rgba(243,239,230,0.14)] bg-[#141419] px-5 py-4 sm:px-8">
              <div className="flex items-center gap-2.5 font-mono-code text-xs tracking-[0.09em] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#F2C94C]" />
                <span className="text-[#F2C94C]">DIRECT DISPATCH // COLLABORATION DESK</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close contact overlay"
                className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(243,239,230,0.24)] bg-[#0B0B0C] px-3 py-1.5 font-mono-code text-xs uppercase text-[#F3EFE6] transition-colors hover:border-[#F2C94C] hover:text-[#F2C94C] cursor-pointer"
              >
                <span>ESC</span>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-8">
              {/* Heading */}
              <div className="border-b border-[rgba(243,239,230,0.12)] pb-6">
                <h2
                  id="contact-overlay-title"
                  className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-[#F3EFE6]"
                >
                  Let&apos;s Build{' '}
                  <span className="font-editorial-serif font-normal italic text-[#F2C94C] capitalize">
                    Together
                  </span>
                </h2>
                <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#A8A296]">
                  Available for full-stack software engineering roles, Python/FastAPI/Flask backend
                  systems, React interfaces, and geospatial platform collaborations.
                </p>
              </div>

              {/* Verified Contact Channels Grid */}
              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Email Card */}
                <div className="flex flex-col justify-between border border-[rgba(243,239,230,0.18)] bg-[#14141A] p-4">
                  <div className="flex items-center justify-between font-mono-code text-[10px] uppercase text-[#F2C94C]">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> VERIFIED EMAIL
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 rounded-xs border border-[rgba(243,239,230,0.2)] px-2 py-0.5 text-[10px] text-[#F3EFE6] hover:border-[#F2C94C] cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3 w-3 text-[#F2C94C]" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                    className="mt-3 break-all font-mono-code text-sm font-semibold text-[#F3EFE6] hover:text-[#F2C94C]"
                  >
                    {PORTFOLIO_DATA.contact.email}
                  </a>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={PORTFOLIO_DATA.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between border border-[rgba(243,239,230,0.18)] bg-[#14141A] p-4 transition-colors hover:border-[#F2C94C]"
                >
                  <div className="flex items-center justify-between font-mono-code text-[10px] uppercase text-[#4A8FE7]">
                    <span className="inline-flex items-center gap-1.5">
                      <Linkedin className="h-3.5 w-3.5" /> LINKEDIN PROFILE
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="mt-3 font-mono-code text-sm font-semibold text-[#F3EFE6] group-hover:text-[#F2C94C]">
                    {PORTFOLIO_DATA.contact.linkedinDisplay}
                  </span>
                </a>

                {/* GitHub Card */}
                <a
                  href={PORTFOLIO_DATA.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between border border-[rgba(243,239,230,0.18)] bg-[#14141A] p-4 transition-colors hover:border-[#F2C94C]"
                >
                  <div className="flex items-center justify-between font-mono-code text-[10px] uppercase text-[#A8A296]">
                    <span className="inline-flex items-center gap-1.5">
                      <Github className="h-3.5 w-3.5 text-[#F3EFE6]" /> GITHUB REPOSITORIES
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="mt-3 font-mono-code text-sm font-semibold text-[#F3EFE6] group-hover:text-[#F2C94C]">
                    github.com/{PORTFOLIO_DATA.contact.githubUsername}
                  </span>
                </a>

                {/* Direct Phone & Resume Card */}
                <div className="flex flex-col justify-between border border-[rgba(243,239,230,0.18)] bg-[#14141A] p-4">
                  <div className="flex items-center justify-between font-mono-code text-[10px] uppercase text-[#A8A296]">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#E04F3E]" /> DIRECT LINE &amp; CV
                    </span>
                    <a
                      href={PORTFOLIO_DATA.identity.resumePdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#F2C94C] hover:underline"
                    >
                      <FileText className="h-3 w-3" /> PDF Resume
                    </a>
                  </div>
                  <a
                    href={`tel:${PORTFOLIO_DATA.contact.phoneRaw}`}
                    className="mt-3 font-mono-code text-sm font-semibold text-[#F3EFE6] hover:text-[#F2C94C]"
                  >
                    {PORTFOLIO_DATA.contact.phone}
                  </a>
                </div>
              </div>

              {/* "Start a Project" Interactive CTA & Brief Composer */}
              <div className="mt-6 border border-[rgba(242,201,76,0.35)] bg-[#151410] p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono-code text-[11px] font-semibold uppercase tracking-[0.09em] text-[#F2C94C]">
                      <Sparkles className="h-3.5 w-3.5" /> START A PROJECT OR INTERVIEW
                    </span>
                    <p className="mt-1 text-xs sm:text-sm text-[#A8A296]">
                      Compose a structured project brief or role inquiry directly addressed to{' '}
                      <span className="text-[#F3EFE6]">{PORTFOLIO_DATA.contact.email}</span>.
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setComposerOpen((prev) => !prev)}
                    aria-expanded={composerOpen}
                    className="inline-flex items-center gap-2 rounded-xs bg-[#F2C94C] px-4 py-2.5 font-mono-code text-xs font-semibold tracking-[0.08em] uppercase text-[#0B0B0C] cursor-pointer"
                  >
                    <span>{composerOpen ? 'Hide Brief Builder' : 'Start a Project'}</span>
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {composerOpen && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.24 }}
                      onSubmit={handleLaunchProjectMail}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 space-y-4 border-t border-[rgba(243,239,230,0.12)] pt-5">
                        <div>
                          <label
                            htmlFor="project-scope-select"
                            className="block font-mono-code text-[10px] uppercase tracking-[0.1em] text-[#A8A296]"
                          >
                            01 // Collaboration Track
                          </label>
                          <select
                            id="project-scope-select"
                            value={selectedScope}
                            onChange={(e) => setSelectedScope(e.target.value)}
                            className="mt-1.5 w-full border border-[rgba(243,239,230,0.22)] bg-[#0B0B0C] px-3 py-2.5 font-mono-code text-xs text-[#F3EFE6]"
                          >
                            {PROJECT_SCOPES.map((scope) => (
                              <option key={scope} value={scope}>
                                {scope}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="sender-name-input"
                              className="block font-mono-code text-[10px] uppercase tracking-[0.1em] text-[#A8A296]"
                            >
                              02 // Your Name / Team
                            </label>
                            <input
                              id="sender-name-input"
                              type="text"
                              value={senderName}
                              onChange={(e) => setSenderName(e.target.value)}
                              placeholder="e.g. Hiring Lead / Product Team"
                              className="mt-1.5 w-full border border-[rgba(243,239,230,0.22)] bg-[#0B0B0C] px-3 py-2 text-sm text-[#F3EFE6] placeholder:text-[#68635A]"
                            />
                          </div>

                          <div className="flex items-end">
                            <p className="font-mono-code text-[11px] leading-relaxed text-[#A8A296]">
                              Opens your default mail client pre-addressed to{' '}
                              <span className="text-[#F2C94C]">cdpreddyap@gmail.com</span>.
                            </p>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="project-brief-textarea"
                            className="block font-mono-code text-[10px] uppercase tracking-[0.1em] text-[#A8A296]"
                          >
                            03 // Goals, Stack, or Timeline
                          </label>
                          <textarea
                            id="project-brief-textarea"
                            rows={3}
                            value={projectBrief}
                            onChange={(e) => setProjectBrief(e.target.value)}
                            placeholder="Share key context about your application, API, geospatial workflow, or engineering role..."
                            className="mt-1.5 w-full border border-[rgba(243,239,230,0.22)] bg-[#0B0B0C] p-3 text-sm text-[#F3EFE6] placeholder:text-[#68635A]"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xs bg-[#F3EFE6] px-5 py-2.5 font-mono-code text-xs font-semibold uppercase tracking-[0.08em] text-[#0B0B0C] transition-colors hover:bg-[#F2C94C] cursor-pointer"
                          >
                            <span>Launch Pre-Addressed Dispatch</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Live Polite Screen-Reader Status for Clipboard */}
            <div className="sr-only" aria-live="polite">
              {copiedEmail ? 'Email address copied to clipboard' : ''}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

