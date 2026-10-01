/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
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
import { GalleryPage } from './components/GalleryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      return hash === '#gallery-page' || hash === '#all-photos' ? 'gallery' : 'home';
    }
    return 'home';
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState<string | undefined>(undefined);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');

  // Handle URL hash changes for browser back/forward and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#gallery-page' || hash === '#all-photos') {
        setCurrentPage('gallery');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToGallery = (category?: string) => {
    setGalleryCategory(category);
    setCurrentPage('gallery');
    window.location.hash = '#gallery-page';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentPage('home');
    if (sectionId && sectionId !== 'home') {
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'process', 'about', 'contact'];
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
      {currentPage === 'gallery' ? (
        <GalleryPage
          onNavigateHome={() => navigateToHome()}
          onOpenQuote={handleOpenQuote}
          onOpenLookbook={() => setIsLookbookModalOpen(true)}
          initialCategory={galleryCategory}
        />
      ) : (
        <>
          {/* Top Navigation */}
          <Navbar
            onOpenQuote={() => handleOpenQuote()}
            onOpenLookbook={() => setIsLookbookModalOpen(true)}
            onOpenFeedback={() => setIsFeedbackModalOpen(true)}
            onNavigateToGallery={navigateToGallery}
            onNavigateToHome={navigateToHome}
            currentPage={currentPage}
            activeSection={activeSection}
          />

          <main className="flex-1">
            {/* Hero Section */}
            <Hero
              onOpenQuote={() => handleOpenQuote()}
              onExploreWork={navigateToGallery}
              onOpenLookbook={() => setIsLookbookModalOpen(true)}
            />

            {/* Why Choose Sunil Woodworks - 6 Core Pillars */}
            <WhyChooseUs />

            {/* Services Showcase */}
            <ServicesSection
              onEnquire={(serviceTitle) => handleOpenQuote(serviceTitle)}
              onNavigateToGallery={navigateToGallery}
            />

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

          {/* Mobile Sticky Quick Action Bar */}
          <MobileQuickBar
            onOpenQuote={() => handleOpenQuote()}
            onOpenLookbook={() => setIsLookbookModalOpen(true)}
          />
        </>
      )}

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

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
