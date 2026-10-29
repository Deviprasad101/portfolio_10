import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Flashlight, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  xrayMode: boolean;
  onToggleXray: () => void;
  onOpenContact: () => void;
}

const NAV_ITEMS = [
  { id: 'dispatch', code: '01', label: 'Dispatch' },
  { id: 'projects', code: '02', label: 'Case Studies' },
  { id: 'experience', code: '03', label: 'Experience' },
  { id: 'systems', code: '04', label: 'Systems & Ed.' },
  { id: 'collaborate', code: '05', label: 'Collaborate' },
];

export const Navbar: React.FC<NavbarProps> = ({ xrayMode, onToggleXray, onOpenContact }) => {
  const [activeSection, setActiveSection] = useState<string>('dispatch');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top - 140) };
      });

      const closest = offsets.reduce((prev, curr) => (curr.top < prev.top ? curr : prev));
      if (closest && closest.top !== Infinity) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#0B0B0C]/95 border-b border-[rgba(243,239,230,0.14)] backdrop-blur-sm'
          : 'bg-[#0B0B0C]/80 border-b border-[rgba(243,239,230,0.09)]'
      }`}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 py-3 sm:px-8">
        {/* Brand Masthead */}
        <a
          href="#dispatch"
          className="group flex items-center gap-3 text-left focus:outline-none"
          aria-label="Devi Prasad Chinthamreddy — Return to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xs border border-[rgba(243,239,230,0.28)] bg-[#141418] font-mono-code text-xs font-semibold tracking-tight text-[#F3EFE6] transition-colors group-hover:border-[#F2C94C] group-hover:text-[#F2C94C]">
            DP
          </span>
          <div className="leading-tight">
            <span className="block font-display text-xs font-extrabold tracking-[0.14em] uppercase text-[#F3EFE6]">
              Devi Prasad
            </span>
            <span className="block font-mono-code text-[10px] tracking-[0.08em] text-[#A8A296]">
              DOSSIER // FULL STACK DEV
            </span>
          </div>
        </a>

        {/* Primary Desktop Editorial Nav */}
        <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3.5 py-2 font-mono-code text-xs tracking-[0.06em] uppercase transition-colors ${
                  isActive ? 'text-[#F3EFE6]' : 'text-[#A8A296] hover:text-[#F3EFE6]'
                }`}
              >
                <span className="mr-1.5 text-[10px] text-[#F2C94C]/85">{item.code}</span>
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="editorialNavIndicator"
                    className="absolute right-3 bottom-0.5 left-3 h-[2px] bg-[#F2C94C]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Torch / X-Ray Accessible Toggle + Resume + Collaborate */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            type="button"
            onClick={onToggleXray}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            aria-pressed={xrayMode}
            title={
              xrayMode
                ? 'Switch back to interactive cursor torchlight beam'
                : 'Reveal all hidden blueprint annotations simultaneously'
            }
            className={`inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1.5 font-mono-code text-[11px] tracking-[0.06em] uppercase transition-colors cursor-pointer ${
              xrayMode
                ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0B0B0C] font-semibold'
                : 'border-[rgba(243,239,230,0.22)] bg-[#141418] text-[#F3EFE6] hover:border-[#F2C94C]/70'
            }`}
          >
            {xrayMode ? (
              <>
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">X-Ray: Full</span>
                <span className="sm:hidden">X-Ray</span>
              </>
            ) : (
              <>
                <Flashlight className="h-3.5 w-3.5 text-[#F2C94C]" aria-hidden="true" />
                <span className="hidden sm:inline">Torch: Active</span>
                <span className="sm:hidden">Torch</span>
              </>
            )}
          </motion.button>

          <a
            href={PORTFOLIO_DATA.identity.resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xs border border-[rgba(243,239,230,0.2)] px-2.5 py-1.5 font-mono-code text-[11px] tracking-[0.06em] uppercase text-[#A8A296] transition-colors hover:border-[#F3EFE6] hover:text-[#F3EFE6]"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Resume</span>
          </a>

          <motion.button
            type="button"
            onClick={onOpenContact}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center gap-1 rounded-xs bg-[#F3EFE6] px-3 py-1.5 font-mono-code text-[11px] font-semibold tracking-[0.07em] uppercase text-[#0B0B0C] transition-colors hover:bg-[#F2C94C] cursor-pointer"
          >
            <span>Hire / Contact</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-editorial-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-xs border border-[rgba(243,239,230,0.22)] bg-[#141418] text-[#F3EFE6]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-editorial-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[rgba(243,239,230,0.14)] bg-[#0E0E11] lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col px-5 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[rgba(243,239,230,0.08)] py-3 font-mono-code text-xs tracking-[0.08em] uppercase text-[#F3EFE6]"
                >
                  <span>
                    <span className="mr-2.5 text-[#F2C94C]">{item.code}</span>
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#A8A296]" />
                </a>
              ))}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href={PORTFOLIO_DATA.identity.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xs border border-[rgba(243,239,230,0.26)] px-3.5 py-2 font-mono-code text-xs uppercase text-[#F3EFE6]"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open Resume PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xs bg-[#F2C94C] px-4 py-2 font-mono-code text-xs font-semibold uppercase text-[#0B0B0C]"
                >
                  <span>Let&apos;s Collaborate</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

