import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutExperienceSection } from './components/AboutExperienceSection';
import { SkillsEducationSection } from './components/SkillsEducationSection';
import { CollaborateSection } from './components/CollaborateSection';
import { ContactOverlay } from './components/ContactOverlay';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#0B0B0C] text-[#F3EFE6]">
        {/* Keyboard Skip Link */}
        <a href="#main-editorial-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Subtle Atmospheric Film Grain */}
        <div className="film-grain-overlay" aria-hidden="true" />

        {/* Editorial Masthead & Accessible X-Ray Layer Switch */}
        <Navbar
          xrayMode={xrayMode}
          onToggleXray={() => setXrayMode((prev) => !prev)}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Main Documentary Narrative */}
        <main id="main-editorial-content">
          <HeroSection
            xrayMode={xrayMode}
            onOpenContact={() => setContactOpen(true)}
          />

          <ProjectsSection xrayMode={xrayMode} />

          <AboutExperienceSection />

          <SkillsEducationSection />

          <CollaborateSection onOpenContact={() => setContactOpen(true)} />
        </main>

        <Footer />

        {/* Accessible Contact & Project Brief Overlay */}
        <ContactOverlay
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>
    </MotionConfig>
  );
};

export default App;

