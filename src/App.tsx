import React, { useState } from 'react';
import { TabType, ScanRecord, PriorityCase } from './types';
import { SAMPLE_PRODUCTS } from './data/sampleProducts';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ScannerView } from './components/ScannerView';
import { ScanResultView } from './components/ScanResultView';
import { LibraryView } from './components/LibraryView';
import { RulesManagementView } from './components/RulesManagementView';
import { CaseDetailModal } from './components/CaseDetailModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  // Only show food products that the user has explicitly saved from their scans
  const [scans, setScans] = useState<ScanRecord[]>(() => {
    try {
      const saved = localStorage.getItem('user_saved_food_scans');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeScanResult, setActiveScanResult] = useState<ScanRecord | null>(null);
  const [selectedCase, setSelectedCase] = useState<PriorityCase | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Handle Scan completion: displays the scan report without adding to library
  // Scanned photo & product is ONLY added to the library when the user clicks 'Save Product'
  const handleScanComplete = (newScan: ScanRecord) => {
    setActiveScanResult(newScan);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle selecting a scan from Library
  const handleSelectScan = (scan: ScanRecord) => {
    setActiveScanResult(scan);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle deleting a scan from Library
  const handleDeleteScan = (id: string) => {
    setScans(prev => {
      const updated = prev.filter(s => s.id !== id);
      try {
        localStorage.setItem('user_saved_food_scans', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to update localStorage:', err);
      }
      return updated;
    });
    if (activeScanResult?.id === id) {
      setActiveScanResult(null);
    }
    fetch(`/api/scans/${id}`, { method: 'DELETE' }).catch(err => {
      console.warn('Failed to delete scan on server:', err);
    });
  };

  // Save product from result view into the library
  const handleSaveProduct = (scan: ScanRecord) => {
    setScans(prev => {
      const idx = prev.findIndex(s => s.id === scan.id);
      const updated = idx >= 0
        ? prev.map((s, i) => (i === idx ? scan : s))
        : [scan, ...prev];
      try {
        localStorage.setItem('user_saved_food_scans', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save to localStorage:', err);
      }
      return updated;
    });
    fetch('/api/scans/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scan)
    }).catch(err => {
      console.warn('Failed to persist saved product:', err);
    });
  };

  // Global search handler
  const handleSearchChange = (query: string) => {
    setGlobalSearchQuery(query);
    if (query.trim().length > 0 && currentTab !== 'library') {
      setCurrentTab('library');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans selection:bg-primary/20 selection:text-primary">
      {/* Sticky Top Navbar */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={globalSearchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-8">
        {currentTab === 'home' && (
          <HeroSection
            onStartScan={() => {
              setCurrentTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewLibrary={() => {
              setCurrentTab('library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewRules={() => {
              setCurrentTab('rules');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'scanner' && (
          <ScannerView
            onScanComplete={handleScanComplete}
          />
        )}

        {currentTab === 'results' && activeScanResult && (
          <ScanResultView
            scan={activeScanResult}
            onBackToScanner={() => {
              setCurrentTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSaveProduct={handleSaveProduct}
            isSavedInLibrary={scans.some(s => s.id === activeScanResult.id)}
          />
        )}

        {currentTab === 'library' && (
          <LibraryView
            scans={scans}
            onSelectScan={handleSelectScan}
            onNewScan={() => {
              setCurrentTab('scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeleteScan={handleDeleteScan}
          />
        )}

        {currentTab === 'rules' && (
          <RulesManagementView />
        )}
      </main>

      {/* Case Detail Modal (Priority Alert Inspection) */}
      <CaseDetailModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
      />

      {/* Universal Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
