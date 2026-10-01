import React from 'react';
import { Camera, Upload, Layers } from 'lucide-react';

interface CarpentryBlueprintPlaceholderProps {
  category: string;
  title: string;
  material?: string;
  className?: string;
  onUploadClick?: () => void;
}

export const CarpentryBlueprintPlaceholder: React.FC<CarpentryBlueprintPlaceholderProps> = ({
  category,
  title,
  material,
  className = "w-full h-full min-h-[220px]",
  onUploadClick,
}) => {
  // Render clean vector carpentry drafting representations based on category
  const renderCarpentryDraft = () => {
    switch (category) {
      case 'doors':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#24160E" />
            {/* Outer Frame */}
            <rect x="130" y="30" width="140" height="240" fill="#3D2619" stroke="#D4A373" strokeWidth="2.5" />
            {/* Arch Top / Header */}
            <rect x="120" y="20" width="160" height="15" fill="#5A3825" stroke="#C59B27" strokeWidth="1.5" />
            {/* Door Leaf */}
            <rect x="140" y="40" width="120" height="225" fill="#2E1A11" stroke="#D4A373" strokeWidth="1.5" />
            {/* Panels */}
            <rect x="150" y="55" width="45" height="55" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            <rect x="205" y="55" width="45" height="55" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            <rect x="150" y="125" width="45" height="70" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            <rect x="205" y="125" width="45" height="70" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            <rect x="150" y="210" width="45" height="45" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            <rect x="205" y="210" width="45" height="45" rx="3" fill="#3D2619" stroke="#C59B27" strokeWidth="1" />
            {/* Brass Pull Handle & Lock */}
            <rect x="245" y="135" width="5" height="30" rx="2" fill="#E5C158" />
            <circle cx="247" cy="175" r="3" fill="#E5C158" />
            {/* Measurement Callouts */}
            <line x1="110" y1="30" x2="110" y2="270" stroke="#8A7968" strokeDasharray="3 3" />
            <text x="95" y="155" fill="#D4A373" fontSize="10" fontFamily="monospace">8 ft</text>
            <line x1="130" y1="285" x2="270" y2="285" stroke="#8A7968" strokeDasharray="3 3" />
            <text x="185" y="295" fill="#D4A373" fontSize="10" fontFamily="monospace">4 ft</text>
          </svg>
        );

      case 'wardrobes':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#24160E" />
            {/* Wardrobe Outer Carcass */}
            <rect x="60" y="30" width="280" height="240" fill="#2E1A11" stroke="#D4A373" strokeWidth="2" />
            {/* Top Loft Section */}
            <rect x="60" y="30" width="280" height="50" fill="#3D2619" stroke="#D4A373" strokeWidth="1.5" />
            <line x1="130" y1="30" x2="130" y2="80" stroke="#D4A373" strokeWidth="1" />
            <line x1="200" y1="30" x2="200" y2="80" stroke="#D4A373" strokeWidth="1" />
            <line x1="270" y1="30" x2="270" y2="80" stroke="#D4A373" strokeWidth="1" />
            {/* 3 Main Sliding Shutters with Diagonal Brass Lines */}
            <rect x="65" y="85" width="85" height="180" fill="#352014" stroke="#D4A373" strokeWidth="1" />
            <line x1="65" y1="85" x2="150" y2="265" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="65" y1="265" x2="150" y2="85" stroke="#E5C158" strokeWidth="1.5" />
            <rect x="145" y="160" width="3" height="30" rx="1.5" fill="#E5C158" />

            <rect x="157" y="85" width="85" height="180" fill="#352014" stroke="#D4A373" strokeWidth="1" />
            <line x1="157" y1="85" x2="242" y2="265" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="157" y1="265" x2="242" y2="85" stroke="#E5C158" strokeWidth="1.5" />
            <rect x="237" y="160" width="3" height="30" rx="1.5" fill="#E5C158" />

            <rect x="250" y="85" width="85" height="180" fill="#352014" stroke="#D4A373" strokeWidth="1" />
            <line x1="250" y1="85" x2="335" y2="265" stroke="#E5C158" strokeWidth="1.5" />
            <line x1="250" y1="265" x2="335" y2="85" stroke="#E5C158" strokeWidth="1.5" />
            <rect x="330" y="160" width="3" height="30" rx="1.5" fill="#E5C158" />

            {/* Bottom Plinth */}
            <rect x="60" y="265" width="280" height="10" fill="#170E08" />
            <text x="140" y="20" fill="#D4A373" fontSize="10" fontFamily="monospace">FLOOR-TO-CEILING ELEVATION</text>
          </svg>
        );

      case 'kitchens':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#192823" />
            {/* Upper Overhead Cabinets (Teal/Emerald) */}
            <rect x="50" y="30" width="300" height="70" fill="#1C3830" stroke="#488673" strokeWidth="1.5" />
            <line x1="110" y1="30" x2="110" y2="100" stroke="#488673" strokeWidth="1" />
            <line x1="170" y1="30" x2="170" y2="100" stroke="#488673" strokeWidth="1" />
            <line x1="230" y1="30" x2="230" y2="100" stroke="#488673" strokeWidth="1" />
            <line x1="290" y1="30" x2="290" y2="100" stroke="#488673" strokeWidth="1" />
            {/* Tile Splash Area */}
            <rect x="50" y="100" width="300" height="60" fill="#202F2B" stroke="#2D463F" strokeWidth="1" />
            <line x1="50" y1="130" x2="350" y2="130" stroke="#2D463F" strokeDasharray="4 4" />
            {/* Countertop */}
            <rect x="40" y="160" width="320" height="12" fill="#101916" stroke="#488673" strokeWidth="1" />
            {/* Base Drawers & Cabinets */}
            <rect x="50" y="172" width="300" height="95" fill="#1C3830" stroke="#488673" strokeWidth="1.5" />
            {/* Drawer Horizontal Lines */}
            <line x1="50" y1="200" x2="150" y2="200" stroke="#488673" strokeWidth="1" />
            <line x1="50" y1="235" x2="150" y2="235" stroke="#488673" strokeWidth="1" />
            <line x1="150" y1="172" x2="150" y2="267" stroke="#488673" strokeWidth="1.5" />
            <line x1="250" y1="172" x2="250" y2="267" stroke="#488673" strokeWidth="1.5" />
            {/* Brushed Handles */}
            <line x1="75" y1="185" x2="125" y2="185" stroke="#D4A373" strokeWidth="2.5" />
            <line x1="75" y1="217" x2="125" y2="217" stroke="#D4A373" strokeWidth="2.5" />
            <line x1="75" y1="250" x2="125" y2="250" stroke="#D4A373" strokeWidth="2.5" />
            <text x="135" y="20" fill="#75C2A7" fontSize="10" fontFamily="monospace">MODULAR KITCHEN JOINERY</text>
          </svg>
        );

      case 'tv-units':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#24160E" />
            {/* Back Focal Wall with Slat Lines */}
            <rect x="50" y="30" width="300" height="240" fill="#2D1A10" stroke="#3E291C" strokeWidth="1.5" />
            {/* Left Slats */}
            <line x1="60" y1="30" x2="60" y2="270" stroke="#3D2619" strokeWidth="3" />
            <line x1="70" y1="30" x2="70" y2="270" stroke="#3D2619" strokeWidth="3" />
            <line x1="80" y1="30" x2="80" y2="270" stroke="#3D2619" strokeWidth="3" />
            <line x1="90" y1="30" x2="90" y2="270" stroke="#3D2619" strokeWidth="3" />
            {/* Center Marble Feature Panel */}
            <rect x="110" y="45" width="180" height="135" fill="#3A2C25" stroke="#D4A373" strokeWidth="1.5" />
            <text x="160" y="115" fill="#C59B27" fontSize="11" fontFamily="monospace">[ TV SCREEN ]</text>
            {/* Right Slats */}
            <line x1="310" y1="30" x2="310" y2="270" stroke="#3D2619" strokeWidth="3" />
            <line x1="320" y1="30" x2="320" y2="270" stroke="#3D2619" strokeWidth="3" />
            <line x1="330" y1="30" x2="330" y2="270" stroke="#3D2619" strokeWidth="3" />
            {/* Floating Credenza Console */}
            <rect x="80" y="195" width="240" height="45" fill="#1C110B" stroke="#D4A373" strokeWidth="2" />
            <line x1="160" y1="195" x2="160" y2="240" stroke="#D4A373" strokeWidth="1" />
            <line x1="240" y1="195" x2="240" y2="240" stroke="#D4A373" strokeWidth="1" />
            <text x="130" y="20" fill="#D4A373" fontSize="10" fontFamily="monospace">WALL TV CREDENZA & SLATS</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#24160E" />
            {/* Technical grid */}
            <line x1="50" y1="50" x2="350" y2="50" stroke="#3D2619" strokeDasharray="4 4" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#3D2619" strokeDasharray="4 4" />
            <line x1="50" y1="250" x2="350" y2="250" stroke="#3D2619" strokeDasharray="4 4" />
            <line x1="100" y1="30" x2="100" y2="270" stroke="#3D2619" strokeDasharray="4 4" />
            <line x1="200" y1="30" x2="200" y2="270" stroke="#3D2619" strokeDasharray="4 4" />
            <line x1="300" y1="30" x2="300" y2="270" stroke="#3D2619" strokeDasharray="4 4" />
            {/* Central Woodwork Joinery Motif */}
            <rect x="120" y="70" width="160" height="150" rx="8" fill="#2E1A11" stroke="#D4A373" strokeWidth="2" />
            <rect x="140" y="90" width="120" height="110" rx="4" fill="#3D2619" stroke="#C59B27" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="145" r="24" fill="#1C110B" stroke="#D4A373" strokeWidth="1.5" />
            <text x="145" y="245" fill="#D4A373" fontSize="10" fontFamily="monospace">SUNIL WOODWORKS</text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative bg-[#1C110B] overflow-hidden flex flex-col items-center justify-center select-none ${className}`}>
      {renderCarpentryDraft()}

      {/* Overlay Information */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 flex flex-col justify-between p-4 z-10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#8A532B] text-white">
            {category}
          </span>
          <span className="text-[10px] font-mono text-[#D4A373] bg-black/60 px-2 py-0.5 rounded-sm border border-white/10">
            Real Site Project
          </span>
        </div>

        <div className="space-y-1.5 text-center px-2">
          <p className="font-serif-wood text-sm sm:text-base font-bold text-white leading-tight drop-shadow-sm line-clamp-2">
            {title}
          </p>
          {material && (
            <p className="text-[11px] text-[#D8C8B8] line-clamp-1">
              {material}
            </p>
          )}

          {onUploadClick && (
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUploadClick();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C59B27] hover:bg-[#d8ab31] text-[#140C07] text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Add Site Photo</span>
              </button>
            </div>
          )}
        </div>

        <div className="text-[10px] text-center text-[#A89888] font-mono">
          Handcrafted in Bengaluru
        </div>
      </div>
    </div>
  );
};
