import React from 'react';
import { TabType } from '../types';

interface TopNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <nav className="bg-surface border-b border-outline-variant sticky top-0 z-50 shadow-xs">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-[1280px] mx-auto w-full">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <span 
            className="material-symbols-outlined text-primary text-[28px] group-hover:scale-105 transition-transform" 
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            qr_code_scanner
          </span>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight font-sans">
              Food Chainer
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#53625c] -mt-1 hidden sm:block">
              FSSAI Security Engine · SIH 34
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-6">
          <button
            id="nav-scanner-btn"
            onClick={() => onSelectTab('scanner')}
            className={`font-medium text-sm transition-all pb-1 border-b-2 ${
              currentTab === 'scanner' || currentTab === 'results'
                ? 'text-primary border-primary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Scanner
          </button>
          <button
            id="nav-library-btn"
            onClick={() => onSelectTab('library')}
            className={`font-medium text-sm transition-all pb-1 border-b-2 ${
              currentTab === 'library'
                ? 'text-primary border-primary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Library
          </button>
          <button
            id="nav-rules-btn"
            onClick={() => onSelectTab('rules')}
            className={`font-medium text-sm transition-all pb-1 border-b-2 ${
              currentTab === 'rules'
                ? 'text-primary border-primary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Regulation Rules
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              id="top-search-input"
              type="text"
              placeholder="Search EAN / FSSAI / Brand..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary w-52"
            />
          </div>

          <button
            id="nav-new-scan-pill"
            onClick={() => onSelectTab('scanner')}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
            <span>Scan Packet</span>
          </button>

          <button 
            id="nav-notifications-btn"
            title="Notifications"
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>

          {/* User Profile */}
          <div className="relative group cursor-pointer" id="user-profile-badge">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center text-primary font-semibold text-xs">
              <span>FC</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full p-0.5 shadow-xs">
              <span className="material-symbols-outlined text-[10px] block">verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub Navigation Bar */}
      <div className="flex md:hidden justify-around border-t border-outline-variant/30 py-2 bg-surface-container-lowest text-xs">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center ${currentTab === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>Home</span>
        </button>
        <button
          onClick={() => onSelectTab('scanner')}
          className={`flex flex-col items-center ${currentTab === 'scanner' || currentTab === 'results' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[18px]">document_scanner</span>
          <span>Scanner</span>
        </button>
        <button
          onClick={() => onSelectTab('library')}
          className={`flex flex-col items-center ${currentTab === 'library' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>Library</span>
        </button>
        <button
          onClick={() => onSelectTab('rules')}
          className={`flex flex-col items-center ${currentTab === 'rules' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[18px]">gavel</span>
          <span>Rules</span>
        </button>
      </div>
    </nav>
  );
};
