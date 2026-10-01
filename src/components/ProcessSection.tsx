import React, { useState, useRef } from 'react';
import { MessageSquareText, PencilRuler, Wrench, CheckCircle, Play, Pause, Compass, Volume2, VolumeX } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
  deliverable: string;
}

export const ProcessSection: React.FC = () => {
  const steps: StepItem[] = [
    {
      number: "01",
      title: "On-Site Measurement & Consultation",
      icon: MessageSquareText,
      tag: "Laser Site Visit",
      videoSrc: "/phase-1-consultation.mp4",
      posterSrc: "/src/assets/images/real_carpenter_visit_1790657954905.jpg",
      description:
        "We visit your property with precision laser distance meters and steel tapes to inspect wall levels, ceiling heights, and plumbing points, discussing your layout preferences.",
      deliverable: "Accurate mm-level dimensions & personalized design brief.",
    },
    {
      number: "02",
      title: "Planning & Quotation",
      icon: PencilRuler,
      tag: "Drafting & Quote",
      videoSrc: "/phase-2-planning.mp4",
      posterSrc: "/src/assets/images/step2_drafting_table_1790658701621.jpg",
      description:
        "We share detailed elevation drawings, material samples (BWP marine ply, laminates, veneer), and an itemized quote with clear hardware specs (Blum/Hettich).",
      deliverable: "Transparent estimate with zero hidden costs.",
    },
    {
      number: "03",
      title: "Workshop Crafting & Joinery",
      icon: Wrench,
      tag: "Workshop Joinery",
      videoSrc: "/phase-3-workshop.mp4",
      posterSrc: "/src/assets/images/step3_table_saw_1790658744263.jpg",
      description:
        "Modules, carcases, shutters, and solid teak frames are precision-cut and assembled in our workshop. This keeps on-site mess, sawdust, and noise in your home to a minimum.",
      deliverable: "Pre-fabricated units ready for clean on-site assembly.",
    },
    {
      number: "04",
      title: "On-Site Installation & Handover",
      icon: CheckCircle,
      tag: "Fitting & Handover",
      videoSrc: "/phase-4-installation.mp4",
      posterSrc: "/src/assets/images/step4_drill_hinges_1790658777267.jpg",
      description:
        "Our carpentry team fits the units, aligns all doors with spirit levels, verifies smooth soft-close movement on all drawers, cleans up, and conducts a walkthrough.",
      deliverable: "Neat installation, level alignment, and final walkthrough.",
    },
  ];

  // Independent playback state for each of the 4 phase cards
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleVideoPlayback = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[idx];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPlayingStates((prev) => ({ ...prev, [idx]: true }));
    } else {
      vid.pause();
      setPlayingStates((prev) => ({ ...prev, [idx]: false }));
    }
  };

  const toggleGlobalMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = newMuteState;
    });
  };

  return (
    <section id="process" className="scroll-mt-24 py-16 sm:py-24 bg-white text-[#1C110B] border-b border-[#E8DECE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#8A532B]" />
              <span>How We Work</span>
            </div>
            <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-4 [text-wrap:balance]">
              Our 4-Step Carpentry Process
            </h2>
            <p className="text-base text-[#554C43] leading-relaxed">
              Every phase is executed with craftsmanship and transparency—watch how each step unfolds directly inside our process cards below.
            </p>
          </div>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleGlobalMute}
            className="self-start md:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E8DECE] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#8A532B] transition-colors cursor-pointer shrink-0"
            title={isMuted ? "Unmute all videos" : "Mute all videos"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#8A532B]" /> : <Volume2 className="w-3.5 h-3.5 text-[#8A532B]" />}
            <span>{isMuted ? "Audio Muted" : "Audio Active"}</span>
          </button>
        </div>

        {/* 4 Steps Grid: All 4 phases have their own in-box video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isPlaying = playingStates[idx] ?? true;

            return (
              <div
                key={step.number}
                className="bg-[#FAF7F2] rounded-xl border border-[#E8DECE] hover:border-[#8A532B] shadow-2xs flex flex-col justify-between overflow-hidden group transition-all duration-300"
              >
                {/* Constrained In-Box Video Header - Strictly contained in this box */}
                <div className="relative w-full aspect-16/10 bg-[#2E1A11] overflow-hidden border-b border-[#E8DECE]">
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={step.videoSrc}
                    poster={step.posterSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover object-center block"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

                  {/* On-Card Play / Pause Control */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => toggleVideoPlayback(idx, e)}
                      className="w-6 h-6 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      title={isPlaying ? "Pause phase video" : "Play phase video"}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                    </button>
                  </div>

                  {/* Top Phase Tag */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-semibold text-[#D4A373] border border-white/10 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{step.tag}</span>
                  </div>

                  {/* Bottom Video Badge */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-[11px] pointer-events-none">
                    <span className="font-medium text-white/90 truncate">
                      Phase {step.number} Video
                    </span>
                    <span className="text-[10px] text-[#D4A373] font-mono shrink-0">Live Clip</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-serif-wood text-3xl font-bold text-[#8A532B] font-mono">
                        {step.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DECE] flex items-center justify-center text-[#8A532B] shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-serif-wood text-lg sm:text-xl font-bold text-[#1C110B] mb-2 leading-snug group-hover:text-[#8A532B] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DECE] text-[11px] text-[#6B6258]">
                    <span className="font-semibold text-[#1C110B]">Milestone: </span>
                    <span className="text-[#554C43]">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
