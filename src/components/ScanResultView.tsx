import React, { useState } from 'react';
import { ScanRecord } from '../types';
import { downloadDoctorReport } from '../utils/doctorReportGenerator';
import { DoctorReportModal } from './DoctorReportModal';

interface ScanResultViewProps {
  scan: ScanRecord;
  onBackToScanner: () => void;
  onSaveProduct: (scan: ScanRecord) => void;
  isSavedInLibrary?: boolean;
}

export const ScanResultView: React.FC<ScanResultViewProps> = ({
  scan,
  onBackToScanner,
  onSaveProduct,
  isSavedInLibrary = false
}) => {
  const [isSaved, setIsSaved] = useState(isSavedInLibrary);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // SVG Circular progress math (circumference for r=42 is 263.89)
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scan.score / 100) * circumference;

  const scoreColor =
    scan.score >= 80 ? '#006d5b' : scan.score >= 60 ? '#c27803' : '#ba1a1a';

  const handleSave = () => {
    onSaveProduct(scan);
    setIsSaved(true);
    setSaveNotice(`"${scan.productName}" and its scanned photo have been added to your Library!`);
    setTimeout(() => setSaveNotice(null), 4000);
  };

  const handleDownloadReport = () => {
    downloadDoctorReport(scan);
    setShowDoctorModal(true);
  };

  return (
    <div className="flex flex-col gap-6 py-4 font-sans">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full font-semibold">
              {scan.category || 'Packaged Food'}
            </span>
            <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[15px]">calendar_today</span>
              <span>Scanned: {scan.scannedAt}</span>
            </span>
            <span className="font-mono text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
              Report ID: {scan.reportId}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight font-display">
            {scan.productName}
          </h1>
          <p className="text-base text-on-surface-variant font-medium mt-1 font-sans">
            Brand: <span className="font-bold text-on-surface">{scan.brand}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onBackToScanner()}
            className="h-10 px-4 rounded-xl text-xs md:text-sm font-semibold text-primary bg-secondary-container hover:bg-surface-variant transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>New Scan</span>
          </button>
          <button
            id="download-doctor-report-btn"
            onClick={handleDownloadReport}
            className="h-10 px-4 rounded-xl text-xs md:text-sm font-semibold text-white bg-primary hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-ambient cursor-pointer active:scale-98"
            title="Download official FSSAI Authorized Doctor & Food Safety Report"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Download Doctor Report</span>
          </button>
          <button
            id="save-product-btn"
            onClick={handleSave}
            className={`h-10 px-5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-ambient cursor-pointer active:scale-98 ${
              isSaved
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white ring-2 ring-emerald-400/30'
                : 'bg-surface-container-highest hover:bg-primary hover:text-white text-on-surface border border-outline-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSaved ? 'check_circle' : 'bookmark_add'}
            </span>
            <span>{isSaved ? 'Saved to Library' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {saveNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs md:text-sm flex items-center justify-between shadow-soft animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700 text-[20px]">check_circle</span>
            <span className="font-semibold">{saveNotice}</span>
          </div>
          <button onClick={() => setSaveNotice(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Status, Checklist, Findings (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Overall Status Card */}
          <div className="bg-surface-container-low rounded-[24px] border border-outline-variant/30 p-6 md:p-7 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-soft">
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`material-symbols-outlined text-[30px] ${
                    scan.status === 'Compliant'
                      ? 'text-primary'
                      : scan.status === 'Needs Review'
                      ? 'text-amber-700'
                      : 'text-error'
                  }`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {scan.status === 'Compliant' ? 'verified' : 'warning'}
                </span>
                <h2 className="text-2xl font-bold text-on-surface font-display">
                  {scan.status}
                </h2>
                {/* Real Percentage of scanned photo instead of confidence percentage */}
                <span
                  className={`font-mono text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                    scan.status === 'Compliant'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : scan.status === 'Needs Review'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-red-100 text-red-900 border border-red-200'
                  }`}
                >
                  Scanned Photo Score: {scan.score}%
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed font-sans">
                {scan.status === 'Compliant'
                  ? 'The scan confirmed that product identity, 14-digit FSSAI regulatory license, and nutritional declarations conform to current standards.'
                  : scan.status === 'Needs Review'
                  ? `Real scanned photo audit score is ${scan.score}%. Minor packaging issues or nutrient thresholds (such as sodium, trans fats, or ingredient order) require packaging advisory review.`
                  : 'Critical non-compliance detected. FSSAI License details appear to be missing or illegible on the packaging label.'}
              </p>
            </div>

            <div className="relative z-10 shrink-0 bg-white p-3.5 rounded-2xl shadow-ambient border border-outline-variant/30 flex items-center gap-4">
              <div className="flex flex-col items-end pr-3 border-r border-outline-variant/30">
                <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  REAL PHOTO SCORE
                </span>
                <span className="text-2xl font-black font-mono" style={{ color: scoreColor }}>
                  {scan.score}%
                </span>
              </div>
              <div className="text-primary pr-1">
                <span className="material-symbols-outlined text-[26px]">verified</span>
              </div>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 flex flex-col overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-outline-variant/30 bg-secondary-container/20">
              <h3 className="text-lg font-bold text-on-surface">
                Compliance Checklist
              </h3>
            </div>

            <div className="p-6 divide-y divide-outline-variant/20">
              {scan.complianceChecklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.status === 'Passed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {item.status === 'Passed'
                        ? 'check_circle'
                        : item.status === 'Review'
                        ? 'visibility'
                        : 'error'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-on-surface">
                      {item.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-md shrink-0 ${
                      item.status === 'Passed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Findings Detail (with Visual Crop & Expected Location Highlight) */}
          {scan.findings && scan.findings.length > 0 ? (
            <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 flex flex-col overflow-hidden shadow-xs">
              <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">policy</span>
                  <h3 className="text-base font-bold text-on-surface">
                    Finding: {scan.findings[0].title}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-error bg-error-container px-2.5 py-0.5 rounded-full border border-error/20">
                  Flagged
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      ANALYSIS RESULT
                    </span>
                    <p className="text-xs text-on-surface mt-1 leading-relaxed">
                      {scan.findings[0].description}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      REAL PHOTO AUDIT SCORE
                    </span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${scan.score}%`, backgroundColor: scoreColor }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold font-mono text-on-surface">
                        {scan.score}%
                      </span>
                    </div>
                  </div>

                  {scan.findings[0].expectedLocation && (
                    <div className="mt-auto pt-2">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        EXPECTED LOCATION
                      </span>
                      <p className="text-xs font-medium text-on-surface mt-0.5">
                        {scan.findings[0].expectedLocation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Scanned crop with digital highlight */}
                <div className="rounded-xl overflow-hidden border border-outline-variant/50 relative bg-surface-variant min-h-[170px] flex items-center justify-center">
                  <img
                    src={
                      scan.imageUrl ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB6QgfUETRuqwPXdlJQj4moeBx3EEZVdwTaSN3yi_cmGGGN35xv0CeqfapRKORcXEdYgz4aHZUs5dxVNQZ_7mI9k2jFOenKs04I6UhcYuTVkmuIzP59_Kmb0YXQzrI_RICyE_0Trz8pmq1To38ln_YXoYUwnBs1N5Em9kZGRp8WYhqfCYHr-qnjct1QRFUxvbTO4h824MrCK_2WIFXd67jLfQX3y36xMsrJ7KtA4b6YPiCR7tfJ7j1w'
                    }
                    alt="Scanned label crop"
                    className="w-full h-full object-cover opacity-85"
                  />
                  {/* Digital Highlight Box */}
                  <div className="absolute inset-4 border-[2.5px] border-error/80 rounded-lg pointer-events-none flex items-center justify-center">
                    <span className="bg-error/90 text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                      {scan.findings[0].title.includes('FSSAI') ? 'Expected FSSAI Location' : 'Inspection ROI'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">No Critical Packaging Defects</h4>
                <p className="text-xs text-on-surface-variant">All mandatory FSSAI display panels, license tags, and shelf life parameters verified.</p>
              </div>
            </div>
          )}

          {/* Ingredients & Allergens Card */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-on-surface mb-2 font-mono uppercase tracking-wider">
              Declared Ingredients &amp; Additives
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              {scan.ingredients}
            </p>

            {scan.allergens && scan.allergens.length > 0 && (
              <div className="pt-3 border-t border-outline-variant/20">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase font-semibold block mb-1.5">
                  Allergen Advisory:
                </span>
                <div className="flex flex-wrap gap-2">
                  {scan.allergens.map((alg, i) => (
                    <span
                      key={i}
                      className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      <span>{alg}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Snapshots & Nutrition (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Health Snapshot Card with Circular Score out of 100 */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-6 flex flex-col items-center text-center shadow-xs">
            <h3 className="text-lg font-bold text-on-surface self-start mb-4">
              Health Snapshot
            </h3>

            <div className="relative w-36 h-36 my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-surface-variant"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={scoreColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-on-surface tracking-tighter" style={{ color: scoreColor }}>
                  {scan.score}
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">
                  / 100
                </span>
              </div>
            </div>

            <div className="text-xs font-semibold text-on-surface mb-3 mt-1">
              {scan.score >= 80 ? 'Grade A · High Safety & Quality' : scan.score >= 60 ? 'Grade B · Moderate Ingredients' : 'Grade C · Non-Compliant / High Risk'}
            </div>

            {/* Health Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 w-full">
              {scan.healthTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium text-primary bg-surface-container-high px-2.5 py-1 rounded-full border border-outline-variant/30 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {tag.toLowerCase().includes('sugar')
                      ? 'water_drop'
                      : tag.toLowerCase().includes('sodium')
                      ? 'warning'
                      : tag.toLowerCase().includes('protein')
                      ? 'fitness_center'
                      : 'eco'}
                  </span>
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Expiry Card */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-5 flex items-center justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 mb-1 text-primary">
                <span className="material-symbols-outlined text-[18px]">
                  {scan.isExpired ? 'event_busy' : 'verified_user'}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {scan.isExpired ? 'EXPIRED BATCH' : 'SAFE TO CONSUME'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Best Before: <strong className="text-on-surface">{scan.expiryDate || scan.bestBefore}</strong>
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>

          {/* Nutrition Panel */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 flex flex-col overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 border-b border-outline-variant/30 bg-secondary-container/20">
              <h3 className="text-base font-bold text-on-surface">Nutrition Panel</h3>
              <p className="font-mono text-[10px] text-on-surface-variant mt-0.5">
                Per 100g serving standard
              </p>
            </div>

            <div className="flex flex-col divide-y divide-outline-variant/20 text-xs">
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Energy</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.energyKcal} kcal</span>
              </div>
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Protein</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.proteinG} g</span>
              </div>
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Fat (Total)</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.fatG} g</span>
              </div>
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Carbohydrates</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.carbsG} g</span>
              </div>
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Sugar</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.sugarG} g</span>
              </div>
              <div className="flex justify-between items-center px-5 py-2.5 hover:bg-surface-container-low transition-colors">
                <span className="text-on-surface font-medium">Sodium</span>
                <span className="font-bold text-on-surface font-mono">{scan.nutritionalInfo.sodiumMg} mg</span>
              </div>
            </div>
          </div>

          {/* Packaging Details Summary */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-5 shadow-xs text-xs space-y-2">
            <h4 className="font-bold text-on-surface font-mono uppercase text-[11px] tracking-wider mb-2">
              Registration &amp; Barcode
            </h4>
            <div className="flex justify-between py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant">FSSAI Lic. No:</span>
              <span className="font-mono font-bold text-on-surface">
                {scan.fssaiNumber || 'NOT DETECTED'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant">Barcode:</span>
              <span className="font-mono text-on-surface">{scan.barcode}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">Dietary Classification:</span>
              <span className="font-bold text-primary">{scan.vegStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Doctor & Food Safety Official Form Modal */}
      <DoctorReportModal
        scan={scan}
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
      />
    </div>
  );
};
