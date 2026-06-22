"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Landing } from "@/components/sections/Landing";
import { Projects } from "@/components/sections/Projects";
import { TechArsenal } from "@/components/sections/TechArsenal";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { NightSkyBackground } from "@/components/ui/NightSkyBackground";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { ScrollTracker } from "@/components/ui/ScrollTracker";
import { PageLoader } from "@/components/ui/PageLoader";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { FocusSection } from "@/components/ui/FocusSection";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Home() {
  const { isOpen, open, close } = useCommandPalette();

  return (
    <ThemeProvider>
      {/* Premium Loader Sequence */}
      <PageLoader />

      {/* Night Sky Background (Behind everything) */}
      <NightSkyBackground />

      {/* Trailing cursor overlay */}
      <MagneticCursor />

      {/* Animated film grain overlay */}
      <FilmGrain />

      {/* Sticky Scroll Progress Tracker */}
      <ScrollTracker />

      {/* Interactive Unfolding Resume Modal */}
      <ResumeModal />

      {/* Global command palette overlay */}
      <CommandPalette isOpen={isOpen} onClose={close} />

      {/* Navigation */}
      <Navbar onOpenCommandPalette={open} />

      {/* Page sections */}
      <main style={{ paddingTop: "60px", overflowX: "hidden" }}>
        <FocusSection>
          <Landing />
        </FocusSection>
        
        <FocusSection>
          <Projects />
        </FocusSection>
        
        <FocusSection>
          <TechArsenal />
        </FocusSection>
        
        <FocusSection>
          <Journey />
        </FocusSection>
        
        <FocusSection>
          <Contact />
        </FocusSection>
      </main>

      <Footer />
    </ThemeProvider>
  );
}


