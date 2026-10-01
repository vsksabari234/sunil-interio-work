import React from 'react';
import { IndianRupee, Leaf, Clock, Users, ShieldCheck } from 'lucide-react';

interface FeatureCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  renderIcon: () => React.ReactNode;
}

export const WhyChooseUs: React.FC = () => {
  const cards: FeatureCard[] = [
    {
      title: "Skilled Craftsmanship",
      subtitle: "Experienced Local Carpenters",
      description:
        "Our skilled team brings years of hands-on experience, ensuring precision, durability and a perfect finish in every project.",
      image: "/src/assets/images/why_skilled_craftsmanship_1790661266911.jpg",
      renderIcon: () => (
        /* Crossed tools icon matching reference */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          <path d="m4 20 4-4" />
          <path d="m15 4 5 5" />
        </svg>
      ),
    },
    {
      title: "100% Custom Made",
      subtitle: "Built Specifically to Your Room Dimensions",
      description:
        "No standard sizes. Every piece is designed according to your space, style and needs — with perfect measurements and smart storage.",
      image: "/src/assets/images/why_custom_made_1790661279396.jpg",
      renderIcon: () => (
        /* Octagram star badge with inner ring matching reference */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 4.26 18.91 4.54 20.24 8.16 23 10.83 22.09 14.54 23.36 18.23 19.82 19.82 17.5 22.84 13.73 22.18 10.27 22.18 6.5 22.84 4.18 19.82 0.64 18.23 1.91 14.54 1 10.83 3.76 8.16 5.09 4.54 8.91 4.26 12 2" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      ),
    },
    {
      title: "Transparent Pricing",
      subtitle: "Clear Pricing for Materials, Labour & Installation",
      description:
        "Get honest workshop rates without unnecessary middleman markup. You pay for quality, not unnecessary overheads.",
      image: "/src/assets/images/why_transparent_pricing_1790661291771.jpg",
      renderIcon: () => (
        <IndianRupee className="w-5 h-5 text-white" strokeWidth={2.4} aria-hidden="true" />
      ),
    },
    {
      title: "Quality Materials & Hardware",
      subtitle: "Durable. Reliable. Long Lasting.",
      description:
        "We use quality plywood, laminates and reliable hardware to ensure your furniture stands the test of time.",
      image: "/src/assets/images/why_quality_materials_1790661304618.jpg",
      renderIcon: () => (
        <Leaf className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
      ),
    },
    {
      title: "Reliable Timelines",
      subtitle: "On-Time Delivery, Every Time",
      description:
        "We follow a clear process with regular updates, ensuring your project is completed on schedule without compromising quality.",
      image: "/src/assets/images/why_reliable_timelines_1790661319349.jpg",
      renderIcon: () => (
        <Clock className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
      ),
    },
    {
      title: "Personalized Support",
      subtitle: "From Consultation to Completion",
      description:
        "We guide you at every step — from choosing designs to final installation. Your satisfaction is our priority.",
      image: "/src/assets/images/why_personalized_support_1790661330294.jpg",
      renderIcon: () => (
        <Users className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
      ),
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Consistent with Site Architecture */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8A532B]" />
              <span>Craftsmanship & Trust Standards</span>
            </div>

            <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-3 [text-wrap:balance]">
              Built on Skill. Backed by Trust.
            </h2>

            <p className="text-base text-[#554C43] leading-relaxed">
              Every piece of woodwork is designed to your exact floor plan, fabricated inside our Timber Yard Layout workshop, and installed with millimeter laser precision.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="text-xs font-mono text-[#554C43] bg-white px-3.5 py-2.5 rounded-lg border border-[#E8DECE] shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8A532B]" />
              <span>Direct Carpenter Pricing · No Middlemen</span>
            </div>
          </div>
        </div>

        {/* Dynamic Architectural Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          
          {/* Marquee Bento Card (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8DECE] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row group hover:border-[#8A532B]/50">
            <div className="md:w-1/2 relative bg-[#2E1A11] overflow-hidden min-h-[240px] md:min-h-full">
              <img
                src="/src/assets/images/why_transparent_pricing_1790661291771.jpg"
                alt="Direct Workshop Fabrication at Sunil Woodworks"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-600"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A532B] mb-2 font-semibold">
                  01 · Workshop Direct Model
                </div>
                <h3 className="font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] mb-3 leading-snug">
                  Direct Workshop Pricing, Zero Showroom Markup
                </h3>
                <p className="text-sm text-[#554C43] leading-relaxed mb-4">
                  Commercial interior firms charge 25%–35% markups to cover franchise commissions and expensive showroom rentals. With Sunil Woodworks, your entire budget goes directly into certified hardwood, marine plywood, and craftsman labor.
                </p>
                <div className="space-y-2 pt-2 border-t border-[#E8DECE]/80 text-xs text-[#1C110B]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A532B]" />
                    <span>Transparent material invoices with brand certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A532B]" />
                    <span>Client visits welcome during off-site fabrication</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DECE]/60 flex items-center justify-between text-xs text-[#6B6258]">
                <span className="font-semibold text-[#8A532B]">25%–35% Typical Client Savings</span>
                <span className="font-mono">Timber Yard Layout</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 100% Custom Dimensions */}
          <div className="bg-white rounded-2xl border border-[#E8DECE] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-[#8A532B]/50">
            <div className="relative aspect-16/10 bg-[#2E1A11] overflow-hidden">
              <img
                src="/src/assets/images/why_custom_made_1790661279396.jpg"
                alt="Custom carpentry measurements"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A532B] mb-1.5 font-semibold">
                  02 · Bespoke Engineering
                </div>
                <h3 className="font-serif-wood text-xl sm:text-2xl font-bold text-[#1C110B] mb-2 leading-snug">
                  Tailored to Every Millimeter
                </h3>
                <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed">
                  No standard modular boxes or filler gaps. Every wardrobe, loft, and kitchen counter is scribed to your exact ceiling beams and room angles.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DECE]/80 text-[11px] text-[#8A532B] font-medium">
                Floor-to-Ceiling · Zero Dead Space
              </div>
            </div>
          </div>

          {/* Bento Card 3: Quality Materials */}
          <div className="bg-white rounded-2xl border border-[#E8DECE] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-[#8A532B]/50">
            <div className="relative aspect-16/10 bg-[#2E1A11] overflow-hidden">
              <img
                src="/src/assets/images/why_quality_materials_1790661304618.jpg"
                alt="Quality wood joinery and marine ply"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A532B] mb-1.5 font-semibold">
                  03 · Certified Woods
                </div>
                <h3 className="font-serif-wood text-xl sm:text-2xl font-bold text-[#1C110B] mb-2 leading-snug">
                  100% IS:710 Marine Grade Ply
                </h3>
                <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed">
                  Calibrated Boiling Water Proof (BWP) marine ply, authentic seasoned teak, and architectural natural veneers. Absolutely zero commercial particle board.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DECE]/80 text-[11px] text-[#8A532B] font-medium">
                Termite Resistant · Swell-Proof Joinery
              </div>
            </div>
          </div>

          {/* Bento Card 4: Precision Hardware & Timelines (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8DECE] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row group hover:border-[#8A532B]/50">
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A532B] mb-2 font-semibold">
                  04 · Hardware & Timelines
                </div>
                <h3 className="font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] mb-3 leading-snug">
                  Reliable Milestones & German Hardware
                </h3>
                <p className="text-sm text-[#554C43] leading-relaxed mb-4">
                  We integrate certified soft-close fittings from Blum, Hettich, and Hafele for whisper-quiet drawer travel. Our detailed project milestones ensure on-time handover without cutting corners.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E8DECE]/80 text-xs">
                  <div>
                    <span className="block font-bold text-[#1C110B]">Blum / Hettich</span>
                    <span className="text-[#6B6258] text-[11px]">Certified Tandem Drawers</span>
                  </div>
                  <div>
                    <span className="block font-bold text-[#1C110B]">Off-Site Crafting</span>
                    <span className="text-[#6B6258] text-[11px]">80% Noise Kept in Shop</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DECE]/60 flex items-center justify-between text-xs text-[#6B6258]">
                <span className="font-semibold text-[#8A532B]">Dedicated Handover Walkthrough</span>
                <span className="font-mono">Milestone Guaranteed</span>
              </div>
            </div>

            <div className="md:w-1/2 relative bg-[#2E1A11] overflow-hidden min-h-[240px] md:min-h-full order-1 md:order-2">
              <img
                src="/src/assets/images/why_skilled_craftsmanship_1790661266911.jpg"
                alt="Skilled Joinery Craftsmanship"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-600"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
