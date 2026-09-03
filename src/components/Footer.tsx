import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-16 pt-12 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3">
            <div 
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span 
                className="material-symbols-outlined text-primary text-[26px]" 
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                qr_code_scanner
              </span>
              <span className="text-xl font-bold text-primary tracking-tight font-sans">
                Food Chainer
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Smart India Hackathon (SIH) Problem Statement 34: Optical AI scanner for Indian packaged food security, FSSAI compliance verification, and dynamic health scoring out of 100.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-[11px] text-on-surface-variant font-medium">
                National Engine Online v3.1
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <button onClick={() => onSelectTab('scanner')} className="hover:text-primary transition-colors">
                  Label Scanner &amp; OCR
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('library')} className="hover:text-primary transition-colors">
                  Product &amp; Report Library
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('rules')} className="hover:text-primary transition-colors">
                  Regulation Ruleset
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
              Compliance Standard
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <a href="#fssai" onClick={(e) => { e.preventDefault(); onSelectTab('rules'); }} className="hover:text-primary transition-colors">
                  FSSAI Act 2006 &amp; 2011 Regulations
                </a>
              </li>
              <li>
                <a href="#veg" onClick={(e) => { e.preventDefault(); onSelectTab('rules'); }} className="hover:text-primary transition-colors">
                  Mandatory Veg / Non-Veg Emblems
                </a>
              </li>
              <li>
                <a href="#hfss" onClick={(e) => { e.preventDefault(); onSelectTab('rules'); }} className="hover:text-primary transition-colors">
                  HFSS Warning Limits (Sugar/Fat/Salt)
                </a>
              </li>
              <li>
                <a href="#allergens" onClick={(e) => { e.preventDefault(); onSelectTab('rules'); }} className="hover:text-primary transition-colors">
                  Schedule II Allergen Declarations
                </a>
              </li>
            </ul>
          </div>

          {/* National Security Mission */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
              SIH Problem 34
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Addressing food security, counterfeit packaging detection, and nutritional transparency for 1.4 billion Indian citizens.
            </p>
            <div className="bg-surface-container-high/60 p-3 rounded-xl border border-outline-variant/30 text-[11px] font-mono text-on-surface">
              <span>National Safety Score Heuristic:</span>
              <div className="font-bold text-primary mt-0.5">Scale: 0 - 100 Safety Index</div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant">
          <p>© 2026 Food Chainer · Smart India Hackathon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer">Security Policy</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer">FSSAI API Nodal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
