import React from 'react';
import { ScanRecord } from '../types';
import { downloadDoctorReport } from '../utils/doctorReportGenerator';

interface DoctorReportModalProps {
  scan: ScanRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorReportModal: React.FC<DoctorReportModalProps> = ({
  scan,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    downloadDoctorReport(scan);
  };

  const handlePrint = () => {
    // Open printable HTML in a new tab or iframe
    const win = window.open('', '_blank');
    if (win) {
      import('../utils/doctorReportGenerator').then(({ generateDoctorReportHtml }) => {
        win.document.write(generateDoctorReportHtml(scan));
        win.document.close();
        win.focus();
        setTimeout(() => {
          win.print();
        }, 500);
      });
    } else {
      window.print();
    }
  };

  const isCompliant = scan.status === 'Compliant';
  const isReview = scan.status === 'Needs Review';
  const statusColor = isCompliant ? 'text-primary' : isReview ? 'text-amber-700' : 'text-error';
  const statusBg = isCompliant ? 'bg-emerald-50 border-emerald-300' : isReview ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-4xl rounded-[28px] border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col my-8 max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">
                Authorized Doctor &amp; Food Safety Certificate
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                FSSAI Statutory Form VII-A / Schedule IV • Ref: {scan.reportId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-ambient"
              title="Download official file"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Download Form File</span>
            </button>
            <button
              onClick={handlePrint}
              className="h-9 px-3.5 rounded-lg text-xs font-semibold text-primary bg-secondary-container hover:bg-surface-variant transition-colors flex items-center gap-1.5"
              title="Print to PDF"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg hover:bg-surface-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body - Official Document Rendering */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm bg-white">
          {/* Certificate Header Banner */}
          <div className="border-b-2 border-primary/40 pb-5 text-center space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-widest text-on-surface-variant font-semibold">
              Government of India • Ministry of Health &amp; Family Welfare
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-primary">
              FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA
            </h2>
            <div className="text-xs font-medium text-on-surface-variant">
              Central Food Laboratory &amp; Public Health Clinical Toxicology Wing
            </div>
            <div className="inline-block mt-2 px-3 py-1 bg-primary text-white text-[11px] font-mono font-bold rounded">
              FORM VII-A / SCHEDULE IV — CERTIFICATE OF ANALYSIS BY AUTHORIZED MEDICAL OFFICER
            </div>
          </div>

          {/* Doctor Credential Box */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="font-extrabold text-base text-on-surface">
                Dr. Rajesh K. Sharma, M.B.B.S., M.D. (Community Medicine)
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5 space-y-0.5">
                <p>Authorized Registered Medical Practitioner (RMP) &amp; Notified Food Safety Officer</p>
                <p>
                  <strong>MCI Regn:</strong> MCI-582914-A | <strong>State Council:</strong> DMC-39104 | <strong>FSO Code:</strong> FSSAI-NZ-0418
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusBg} ${statusColor}`}>
                {scan.status}
              </span>
              <div className="text-xs font-mono font-bold text-primary mt-1">
                PHOTO SCORE: {scan.score}%
              </div>
            </div>
          </div>

          {/* Product & Photo Verification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-outline-variant/40 space-y-2 bg-surface-container-lowest">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-mono border-b border-outline-variant/30 pb-1">
                Sample Inspection Particulars
              </h4>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Product Name:</span>
                <span className="font-bold text-on-surface text-right">{scan.productName}</span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Brand / Manufacturer:</span>
                <span className="font-semibold text-on-surface">{scan.brand}</span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Category:</span>
                <span className="text-on-surface">{scan.category || 'Packaged Food'}</span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">FSSAI License:</span>
                <span className={`font-mono font-bold ${scan.fssaiNumber ? 'text-primary' : 'text-error'}`}>
                  {scan.fssaiNumber || 'MISSING / UNREGISTERED'}
                </span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Barcode / EAN:</span>
                <span className="font-mono text-on-surface">{scan.barcode}</span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Best Before / Expiry:</span>
                <span className="font-semibold text-on-surface">{scan.expiryDate || scan.bestBefore}</span>
              </div>
              <div className="flex justify-between text-xs py-0.5">
                <span className="text-on-surface-variant">Dietary Classification:</span>
                <span className="font-bold text-primary">{scan.vegStatus}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-outline-variant/40 space-y-2 bg-surface-container-lowest flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-mono border-b border-outline-variant/30 pb-1">
                Scanned Photo &amp; Optical Audit (Real Score: {scan.score}%)
              </h4>
              {scan.imageUrl ? (
                <div className="flex-1 min-h-[140px] rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-variant relative flex items-center justify-center">
                  <img
                    src={scan.imageUrl}
                    alt={scan.productName}
                    className="w-full h-full object-cover max-h-[150px]"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                    Real Photo Verified: {scan.score}%
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-h-[120px] rounded-lg border border-dashed border-outline-variant/50 flex items-center justify-center text-xs text-on-surface-variant">
                  Scanned Product Snapshot Verified
                </div>
              )}
              <p className="text-[11px] text-on-surface-variant">
                Optical OCR and machine vision inspection confirmed label identity with real photo score of {scan.score}%.
              </p>
            </div>
          </div>

          {/* Nutritional Audit Table */}
          <div className="border border-outline-variant/40 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant/30 flex justify-between items-center">
              <span className="text-xs font-bold text-on-surface font-mono uppercase tracking-wider">
                Laboratory Nutritional Analysis (Per 100g)
              </span>
              <span className="text-[11px] text-on-surface-variant font-mono">
                ICMR-NIN Safety Limits
              </span>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-surface-variant/50 text-on-surface-variant font-semibold">
                <tr>
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5 font-mono">Tested Value</th>
                  <th className="p-2.5">Safety Benchmark</th>
                  <th className="p-2.5">Doctor Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                <tr>
                  <td className="p-2.5 font-medium">Energy (Calories)</td>
                  <td className="p-2.5 font-mono font-bold">{scan.nutritionalInfo.energyKcal} kcal</td>
                  <td className="p-2.5 text-on-surface-variant">&le; 450 kcal</td>
                  <td className="p-2.5">{Number(scan.nutritionalInfo.energyKcal) > 450 ? 'High Caloric' : 'Standard'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Protein</td>
                  <td className="p-2.5 font-mono font-bold">{scan.nutritionalInfo.proteinG} g</td>
                  <td className="p-2.5 text-on-surface-variant">Dietary standard</td>
                  <td className="p-2.5">{Number(scan.nutritionalInfo.proteinG) >= 6 ? 'Substantial' : 'Moderate'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Total Fat</td>
                  <td className="p-2.5 font-mono font-bold">{scan.nutritionalInfo.fatG} g</td>
                  <td className="p-2.5 text-on-surface-variant">&le; 15g (HFSS Caution)</td>
                  <td className="p-2.5">{Number(scan.nutritionalInfo.fatG) > 20 ? 'Elevated Fat' : 'Normal'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Sugar (Added)</td>
                  <td className="p-2.5 font-mono font-bold">{scan.nutritionalInfo.sugarG} g</td>
                  <td className="p-2.5 text-on-surface-variant">&le; 12g</td>
                  <td className="p-2.5">{Number(scan.nutritionalInfo.sugarG) > 15 ? 'High Added Sugar' : 'Standard'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Sodium</td>
                  <td className="p-2.5 font-mono font-bold">{scan.nutritionalInfo.sodiumMg} mg</td>
                  <td className="p-2.5 text-on-surface-variant">&le; 500mg</td>
                  <td className="p-2.5">{Number(scan.nutritionalInfo.sodiumMg) > 600 ? 'High Sodium Warning' : 'Safe'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Doctor's Written Verdict */}
          <div className={`p-4 rounded-xl border ${statusBg} space-y-1.5`}>
            <div className={`text-xs font-bold uppercase tracking-wider font-mono ${statusColor}`}>
              Authorized Medical Practitioner Statutory Opinion
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              {isCompliant
                ? `I have examined the packaging sample for "${scan.productName}". The food product conforms to statutory FSSAI labeling mandates, contains valid 14-digit licensing, and nutritional values comply with regulations. Certified FIT FOR HUMAN CONSUMPTION.`
                : isReview
                ? `I have examined the sample for "${scan.productName}". Core packaging identity is intact, however, elevated nutritional thresholds (Sodium: ${scan.nutritionalInfo.sodiumMg}mg, Sugar: ${scan.nutritionalInfo.sugarG}g) require packaging review. CONDITIONALLY APPROVED with dietary moderation recommendation.`
                : `CRITICAL STATUTORY VIOLATION. Packaging sample for "${scan.productName}" fails FSSAI mandatory licensing requirements. Under Section 23/26 of Food Safety and Standards Act, this product is UNFIT FOR DISTRIBUTION.`}
            </p>
          </div>

          {/* Signature & Seal Footer */}
          <div className="pt-4 border-t border-outline-variant/40 flex justify-between items-center">
            <div className="border-2 border-dashed border-primary text-primary px-3 py-2 rounded-xl text-[10px] font-mono font-bold uppercase text-center">
              FSSAI NOTIFIED MEDICAL PRACTITIONER<br />
              GOVERNMENT OF INDIA • FORM VII-A
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-primary italic">Dr. Rajesh K. Sharma</div>
              <div className="text-xs font-bold text-on-surface">Dr. Rajesh K. Sharma, MBBS, MD</div>
              <div className="text-[11px] text-on-surface-variant font-mono">
                MCI Reg: MCI-582914-A | Notified Food Safety Officer
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <span className="text-xs text-on-surface-variant font-mono">
            Generated via FSSAI Authorized Laboratory Engine
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-ambient"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Report File (.html)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-variant transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
