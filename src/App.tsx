/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';
import { LookbookModal } from './components/LookbookModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { FeedbackModal } from './components/FeedbackModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'gallery', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleExploreWork = () => {
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C110B] flex flex-col font-sans selection:bg-[#C59B27]/30 selection:text-[#1C110B] pb-14 md:pb-0">
      {/* Top Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenLookbook={() => setIsLookbookModalOpen(true)}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onExploreWork={handleExploreWork}
          onOpenLookbook={() => setIsLookbookModalOpen(true)}
        />

        {/* Why Choose Sunil Woodworks - 6 Core Pillars */}
        <WhyChooseUs />

        {/* Services Showcase */}
        <ServicesSection
          onEnquire={(serviceTitle) => handleOpenQuote(serviceTitle)}
        />

        {/* Full Gallery with Filtering & Sorting */}
        <GallerySection />

        {/* 4-Step Craftsmanship Process */}
        <div id="process">
          <ProcessSection />
        </div>

        {/* Client Testimonials & Reviews */}
        <TestimonialsSection />

        {/* About Us & Workshop Approach */}
        <AboutSection />

        {/* Contact Form & Workshop Info */}
        <ContactSection
          initialService={selectedServiceForQuote}
        />

        {/* Final Conversion CTA */}
        <FinalCTASection
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar
        onOpenQuote={() => handleOpenQuote()}
        onOpenLookbook={() => setIsLookbookModalOpen(true)}
      />

      {/* Interactive Free Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preSelectedService={selectedServiceForQuote}
      />

      {/* Project Catalog Modal */}
      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
      />

      {/* Client Feedback & Review Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}
