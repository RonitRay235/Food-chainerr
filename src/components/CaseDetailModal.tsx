import React, { useState } from 'react';
import { PriorityCase } from '../types';

interface CaseDetailModalProps {
  caseItem: PriorityCase | null;
  onClose: () => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ caseItem, onClose }) => {
  const [status, setStatus] = useState<string>('Pending Action');
  const [noticeSent, setNoticeSent] = useState(false);

  if (!caseItem) return null;

  const handleIssueNotice = () => {
    setNoticeSent(true);
    setStatus('Notice Issued to Brand');
  };

  const handleQuarantine = () => {
    setStatus('Batch Quarantined');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 shadow-ambient w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-surface-container-low border-b border-outline-variant/30 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-on-surface-variant bg-white px-2 py-0.5 rounded border border-outline-variant/30">
                {caseItem.caseId}
              </span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  caseItem.priority === 'URGENT'
                    ? 'text-error bg-error-container'
                    : caseItem.priority === 'HIGH'
                    ? 'text-amber-800 bg-amber-100'
                    : 'text-secondary bg-surface-variant'
                }`}
              >
                {caseItem.priority} PRIORITY
              </span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-on-surface">{caseItem.title}</h2>
            <p className="text-xs text-on-surface-variant mt-0.5 font-medium">
              Product Affected: <span className="text-on-surface font-semibold">{caseItem.product}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-2">
            <h4 className="font-mono uppercase font-bold text-[11px] text-on-surface-variant tracking-wider">
              Violation Summary
            </h4>
            <p className="text-on-surface leading-relaxed text-xs">
              {caseItem.details}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-outline-variant/30">
              <span className="text-on-surface-variant block text-[10px] font-mono">Date Reported</span>
              <span className="font-bold text-on-surface">{caseItem.timestamp}</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-outline-variant/30">
              <span className="text-on-surface-variant block text-[10px] font-mono">FSSAI Regulation</span>
              <span className="font-bold text-on-surface">Sec 23(1) FSSR</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-outline-variant/30">
              <span className="text-on-surface-variant block text-[10px] font-mono">Enforcement Zone</span>
              <span className="font-bold text-on-surface">Zone 4 (North)</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-outline-variant/30">
              <span className="text-on-surface-variant block text-[10px] font-mono">AI Verification</span>
              <span className="font-bold text-emerald-800">97% Confirmed</span>
            </div>
          </div>

          {noticeSent && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">mark_email_read</span>
              <div>
                <p className="font-bold">Regulatory Legal Notice Dispatched</p>
                <p className="text-[11px] text-emerald-800">
                  Electronic notice forwarded to the manufacturer's registered FSSAI nodal officer.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Dismiss
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuarantine}
              className="px-4 py-2 bg-error-container text-on-error-container hover:bg-error/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">block</span>
              <span>Quarantine Batch</span>
            </button>
            <button
              onClick={handleIssueNotice}
              className="px-5 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-ambient transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">outgoing_mail</span>
              <span>Issue FSSAI Notice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
