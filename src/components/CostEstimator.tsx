import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/businessInfo';

type ProjectType = 'wardrobe' | 'kitchen' | 'tvunit' | 'bed' | 'dining' | 'doors';
type SizeTier = 'compact' | 'standard' | 'large';
type MaterialTier = 'commercial-laminate' | 'bwp-laminate' | 'veneer-polish' | 'solid-wood';
type HardwareTier = 'standard' | 'premium';

export const CostEstimator: React.FC = () => {
  const [projectType, setProjectType] = useState<ProjectType>('wardrobe');
  const [sizeTier, setSizeTier] = useState<SizeTier>('standard');
  const [materialTier, setMaterialTier] = useState<MaterialTier>('bwp-laminate');
  const [hardwareTier, setHardwareTier] = useState<HardwareTier>('standard');

  const basePricing: Record<ProjectType, Record<SizeTier, { base: number; unitLabel: string }>> = {
    wardrobe: {
      compact: { base: 38000, unitLabel: "Approx. 6 ft x 7 ft (2-3 doors)" },
      standard: { base: 65000, unitLabel: "Approx. 8 ft x 8 ft (3-4 doors + lofts)" },
      large: { base: 110000, unitLabel: "Approx. 12 ft+ Full Wall / Walk-in" },
    },
    kitchen: {
      compact: { base: 75000, unitLabel: "Compact Galley (Up to 8-10 ft running)" },
      standard: { base: 135000, unitLabel: "Standard L-Shape / Parallel (12-16 ft)" },
      large: { base: 220000, unitLabel: "Full U-Shape or Island Kitchen" },
    },
    tvunit: {
      compact: { base: 18000, unitLabel: "Floating Console (5-6 ft)" },
      standard: { base: 36000, unitLabel: "Console with Slat Wall Panel (8-10 ft)" },
      large: { base: 68000, unitLabel: "Full Accent Wall Unit with Niches" },
    },
    bed: {
      compact: { base: 26000, unitLabel: "Queen Bed with Box Storage" },
      standard: { base: 42000, unitLabel: "King Bed with Smooth Hydraulic Lift" },
      large: { base: 65000, unitLabel: "King Bed + Extended Fluted Headboard Wall" },
    },
    dining: {
      compact: { base: 28000, unitLabel: "4-Seater Solid Wood Dining Table" },
      standard: { base: 48000, unitLabel: "6-Seater Solid Wood Dining Table + Chairs" },
      large: { base: 85000, unitLabel: "8-Seater Premium Solid Teak Dining Set" },
    },
    doors: {
      compact: { base: 16000, unitLabel: "1 Single Internal Door + Frame Fitting" },
      standard: { base: 38000, unitLabel: "Solid Main Door with Seasoned Frame" },
      large: { base: 72000, unitLabel: "Grand Teak Main Door + Brass Inlays" },
    },
  };

  const materialMultipliers: Record<MaterialTier, number> = {
    'commercial-laminate': 1.0,
    'bwp-laminate': 1.25,
    'veneer-polish': 1.55,
    'solid-wood': 1.9,
  };

  const hardwareAddons: Record<HardwareTier, number> = {
    standard: 0,
    premium: 8500,
  };

  const estimate = useMemo(() => {
    const baseObj = basePricing[projectType][sizeTier];
    const matMultiplier = materialMultipliers[materialTier];
    const hwAddon = hardwareAddons[hardwareTier];

    const rawTotal = baseObj.base * matMultiplier + hwAddon;
    const low = Math.round((rawTotal * 0.92) / 1000) * 1000;
    const high = Math.round((rawTotal * 1.1) / 1000) * 1000;

    return { low, high, unitLabel: baseObj.unitLabel };
  }, [projectType, sizeTier, materialTier, hardwareTier]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const projectLabels: Record<ProjectType, string> = {
    wardrobe: "Fitted Wardrobe",
    kitchen: "Modular Kitchen",
    tvunit: "Living Room TV Unit",
    bed: "Bed & Storage Frame",
    dining: "Dining Table & Chairs",
    doors: "Door & Wooden Frame",
  };

  const materialLabels: Record<MaterialTier, string> = {
    'commercial-laminate': "Commercial Plywood + Quality Laminate",
    'bwp-laminate': "Waterproof Plywood + Textured/Matte Laminate",
    'veneer-polish': "Waterproof Plywood + Natural Wood Veneer & Polish",
    'solid-wood': "Solid Teak Wood / Hardwood (Hand Polished)",
  };

  const whatsappMessage = `Hi Sunil Woodworks, I calculated an estimate on your website for ${projectLabels[projectType]} (${sizeTier.toUpperCase()} size) with ${materialLabels[materialTier]} and ${hardwareTier === 'premium' ? 'Premium Soft-Close' : 'Standard Soft-Close'} hardware. Estimated range: ${formatINR(estimate.low)} - ${formatINR(estimate.high)}. I would like to schedule a site measurement.`;

  return (
    <section id="estimator" className="py-12 sm:py-16 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#C59B27]" />
            <span>Interactive Cost Guide</span>
          </div>
          <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-4 [text-wrap:balance]">
            Woodwork Budget Estimator
          </h2>
          <p className="text-base text-[#554C43] leading-relaxed">
            Select your project parameters to get a realistic budget ballpark based on actual carpentry labor and material costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E8DECE] space-y-6 shadow-sm">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A532B] block mb-2.5">
                1. Select Project Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(projectLabels) as ProjectType[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProjectType(key)}
                    className={`p-3 text-left rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      projectType === key
                        ? 'bg-[#2E1A11] text-white border-[#2E1A11] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    {projectLabels[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size / Scale */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A532B] block mb-2.5">
                2. Project Size & Scope
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compact', label: 'Compact', desc: 'Smaller room or single unit' },
                  { id: 'standard', label: 'Standard', desc: 'Most common apartment size' },
                  { id: 'large', label: 'Large / Premium', desc: 'Full-wall or luxury scope' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSizeTier(s.id as any)}
                    className={`p-3 text-left rounded-lg transition-all border cursor-pointer ${
                      sizeTier === s.id
                        ? 'bg-[#2E1A11] text-white border-[#2E1A11] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{s.label}</div>
                    <div className={`text-[10px] mt-0.5 ${sizeTier === s.id ? 'text-white/80' : 'text-[#6B6258]'}`}>
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Material Specification */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A532B] block mb-2.5">
                3. Wood & Surface Material Grade
              </label>
              <div className="space-y-2">
                {(Object.keys(materialLabels) as MaterialTier[]).map((matKey) => (
                  <label
                    key={matKey}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                      materialTier === matKey
                        ? 'bg-[#FAF7F2] border-[#8A532B] shadow-2xs font-semibold text-[#1C110B]'
                        : 'bg-white border-[#E8DECE] text-[#554C43] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="materialTier"
                        checked={materialTier === matKey}
                        onChange={() => setMaterialTier(matKey)}
                        className="text-[#8A532B] focus:ring-[#8A532B]"
                      />
                      <span>{materialLabels[matKey]}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Hardware Grade */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8A532B] block mb-2.5">
                4. Hinges & Drawer Runners Hardware
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHardwareTier('standard')}
                  className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                    hardwareTier === 'standard'
                      ? 'bg-[#2E1A11] text-white border-[#2E1A11] font-semibold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <div className="font-semibold">Standard Soft-Close</div>
                  <div className={`text-[10px] mt-0.5 ${hardwareTier === 'standard' ? 'text-white/80' : 'text-[#6B6258]'}`}>
                    Reliable soft-close hinges & channels
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHardwareTier('premium')}
                  className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                    hardwareTier === 'premium'
                      ? 'bg-[#2E1A11] text-white border-[#2E1A11] font-semibold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <div className="font-semibold">Heavy-Duty Branded</div>
                  <div className={`text-[10px] mt-0.5 ${hardwareTier === 'premium' ? 'text-white/80' : 'text-[#6B6258]'}`}>
                    Smooth whisper-glide tandem runners
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#2E1A11] text-white p-6 sm:p-8 rounded-xl shadow-xl border border-[#432719]">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#D4A373] mb-2">
              Estimated Budget Ballpark
            </div>
            
            <h3 className="font-serif-wood text-2xl font-bold mb-1">
              {projectLabels[projectType]}
            </h3>
            
            <p className="text-xs text-[#FAF7F2]/80 mb-6">
              Includes material fabrication, edge banding, hardware fittings, and complete on-site installation by our carpentry team.
            </p>

            {/* Price Box */}
            <div className="bg-[#1C110B] p-5 rounded-lg border border-[#432719] mb-6">
              <span className="text-[11px] text-[#D4A373] uppercase tracking-wider block font-semibold mb-1">
                Estimated Price Range (INR)
              </span>
              <div className="text-3xl sm:text-4xl font-serif-wood font-bold text-white tabular-nums tracking-tight">
                {formatINR(estimate.low)} – {formatINR(estimate.high)}
              </div>
              <span className="text-[11px] text-[#FAF7F2]/60 mt-1 block">
                *Final quotation is provided after free on-site measurement and selecting exact finishes.
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/90 pb-6 border-b border-white/10 mb-6">
              <div className="flex justify-between">
                <span className="text-[#FAF7F2]/60">Selected Scope:</span>
                <span className="font-semibold text-right">{estimate.unitLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAF7F2]/60">Material Grade:</span>
                <span className="font-semibold text-right max-w-[60%]">{materialLabels[materialTier]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAF7F2]/60">Hardware Grade:</span>
                <span className="font-semibold">{hardwareTier === 'premium' ? 'Heavy-Duty Branded' : 'Standard Soft-Close'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAF7F2]/60">Installation Labor:</span>
                <span className="text-[#25D366] font-semibold">Included</span>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1b9d4c] rounded-lg transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss This Estimate on WhatsApp</span>
            </a>

            <div className="text-center mt-3">
              <span className="text-[11px] text-[#FAF7F2]/60">
                No obligations. Speak directly with lead carpenter Sunil.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
