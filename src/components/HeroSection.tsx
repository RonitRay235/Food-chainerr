import React from 'react';
import { TabType } from '../types';

interface HeroSectionProps {
  onStartScan: () => void;
  onViewLibrary: () => void;
  onViewRules: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartScan,
  onViewLibrary,
  onViewRules
}) => {
  return (
    <div className="flex flex-col gap-16 py-6 md:py-10">
      {/* Hero Header Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-high/80 px-4 py-1.5 rounded-full border border-outline-variant/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wide">
              FSSAI Compliance Engine Active · Problem 34
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.15] tracking-tight">
            Know what’s inside.<br />
            <span className="text-primary">Know what’s allowed.</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Instant label scans, expiry checks, and health insights. Screen for FSSAI compliance 
            with India's versioned ruleset in seconds, returning a verified score out of 100.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="hero-scan-btn"
              onClick={onStartScan}
              className="bg-primary hover:bg-primary-container text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-ambient hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">document_scanner</span>
              <span>Scan a Food Label</span>
            </button>
            <button
              id="hero-library-btn"
              onClick={onViewLibrary}
              className="bg-surface-variant/80 hover:bg-secondary-container text-primary px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>Browse Product Library</span>
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-on-surface-variant border-t border-outline-variant/30">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span>14-Digit FSSAI Validation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
              <span>Veg / Non-Veg Detection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">health_and_safety</span>
              <span>Health Score / 100</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="flex-1 w-full relative z-10">
          <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-ambient border border-[#17221d]/10 bg-surface-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9qN1GLBgCjWVvgZZ0uqXpiga4WOVvwiCm96ai2DEpIr7biiQLJcFj-ZMSDWJiLzBm_gvEIzJDGkyzdiX1h9otP9bBsDRioCoFUdOm7ioeGGZ5j6uN1W8P-q23hLx4MK86aFvYmboLAf7TWrnuBQVND5d5vljDwAPGLXzyQgFB2mpeNntTOh8XKB6YmJ8m8z8qGuWEHZtmO2BFmtITJ5ehag9tSQdB7mIpxVbrjB3y54UM6nqk2e1dSDzXa2vIrDAc-SQ"
              alt="Indian packaged food items collection including Saffola Oats, Maggi, Amul milk, Bisleri, and Haldirams"
              className="w-full h-full object-cover"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Glassmorphism Floating Badge */}
            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/60 shadow-ambient flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  verified
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface leading-tight">Scan Complete</p>
                <p className="text-[11px] font-mono font-semibold text-primary">100% FSSAI Compliant</p>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span>Vision OCR Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Callout */}
      <section className="py-6 border-y border-outline-variant/30 text-center">
        <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-1.5">
          Built specifically for
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Indian Packaged-Food Labels & Security
        </h2>
        <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto mt-1">
          Standardized under Food Safety and Standards (Packaging and Labelling) Regulations, 2011 &amp; amendments.
        </p>
      </section>

      {/* Compliance Toolkit Bento Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface">
              Compliance Toolkit
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              End-to-end optical verification, adulteration screening, and regulatory score calculation.
            </p>
          </div>
          <button
            onClick={onViewRules}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View Active Ruleset v3.1</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Scan & Extract (Large 8 cols) */}
          <div 
            onClick={onStartScan}
            className="md:col-span-8 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 overflow-hidden group hover:shadow-ambient transition-all cursor-pointer flex flex-col md:flex-row"
          >
            <div className="p-8 flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[24px]">
                  document_scanner
                </span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">
                Scan &amp; Extract
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Advanced OCR technology instantly extracts critical data from complex food labels, 
                structuring barcodes, FSSAI licenses, expiry dates, and ingredient lists for immediate analysis.
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                <span>Launch Scanner</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
            <div className="flex-1 bg-surface-variant/40 relative min-h-[180px] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9zAQIRxWfyQxt0d46K7G459I_yhaBWfxX_Pv0-6ujCpawfQLJoWTBzVBiXQO_o_PqF2GQVc6Mi2iWQRG4z2LQYKAUPUY3B0Cn4XpuSBCPWNyE9jFs3xxInnsXJ4TYBD7tJ7gCIdILbsAHmGBBN3y0h54nM4G2HgAK7RZGK2q8Gwv17tUR0TNSj2So6MPePZ87KKvNe1XJ2WnvRKqt-Br_bcPHmw9Vm_uh_FZeKB9WEnVMrETfH7U0zg"
                alt="3D data extraction visualization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: Health Snapshot (4 cols) */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-7 group hover:shadow-ambient transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[24px]">
                  health_and_safety
                </span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">
                Health Snapshot
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Instant nutritional scoring (0-100), allergen alerts, and HFSS (high fat, sugar, salt) indicators based on extracted nutrition panels.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-mono text-[11px]">
                Score / 100
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-mono text-[11px]">
                Nutri-Grade
              </span>
            </div>
          </div>

          {/* Card 3: Expiry Check (4 cols) */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-7 group hover:shadow-ambient transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[24px]">
                  event_busy
                </span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">
                Expiry Check
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Automated validation of 'Best Before' and 'Use By' dates against production timelines and current dates to prevent expired distribution.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Shelf-Life Quarantine Guard</span>
            </div>
          </div>

          {/* Card 4: Compliance Review (4 cols) */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-7 group hover:shadow-ambient transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[24px]">
                  fact_check
                </span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">
                Compliance Review
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Rigorous screening against the latest FSSAI checklist to ensure full regulatory adherence.
              </p>
            </div>
            {/* Micro UI element */}
            <div className="bg-surface-variant/40 rounded-xl p-3 border border-outline-variant/30 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <span className="font-mono text-[11px] text-on-surface">14-Digit FSSAI Format Valid</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <span className="font-mono text-[11px] text-on-surface">Allergens Declared in Bold</span>
              </div>
            </div>
          </div>

          {/* Card 5: Download Reports (4 cols) */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-7 group hover:shadow-ambient transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-[24px]">
                  download
                </span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">
                Download Reports
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Generate official inspection audit certificates, PDF laboratory memos, and digital audit trails for supply chain traceability.
              </p>
            </div>
            <button
              onClick={onStartScan}
              className="mt-6 text-primary font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              <span>Scan to Generate Certificate</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
