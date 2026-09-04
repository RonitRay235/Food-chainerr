import React, { useState } from 'react';

export const RulesManagementView: React.FC = () => {
  const [autoFlagging, setAutoFlagging] = useState(true);
  const [rules, setRules] = useState([
    {
      version: 'FSSAI v3.1 (Current)',
      effectiveDate: 'Jan 01, 2026',
      status: 'Active',
      lastUpdated: 'Oct 15, 2025 by System'
    },
    {
      version: 'FSSAI v3.0',
      effectiveDate: 'Jun 15, 2024',
      status: 'Archived',
      lastUpdated: 'Jun 10, 2024 by Admin User'
    },
    {
      version: 'FSSAI v3.2 (Draft)',
      effectiveDate: 'TBD',
      status: 'Draft',
      lastUpdated: 'Today by Current User'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');

  const toggleAutoFlag = async () => {
    const next = !autoFlagging;
    setAutoFlagging(next);
    try {
      await fetch('/api/rules/toggle-autoflag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: next })
      });
    } catch (e) {
      console.warn('Auto-flag toggle notice:', e);
    }
  };

  const handleAddVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersionName.trim()) return;
    setRules(prev => [
      ...prev,
      {
        version: newVersionName.trim(),
        effectiveDate: 'Planned 2027',
        status: 'Draft',
        lastUpdated: 'Just now by Inspector'
      }
    ]);
    setNewVersionName('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight">
          Regulation Rules Management
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant">
          Configure and update regulatory compliance frameworks applied across the food supply chain in India.
        </p>
      </header>

      {/* Control Panel: High-Risk Auto-Flagging */}
      <div className="bg-surface-container-lowest rounded-[24px] p-6 border border-outline-variant/30 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-on-background">
            High-Risk Auto-Flagging Engine
          </h3>
          <p className="font-mono text-xs text-on-surface-variant/80">
            Automatically quarantine food items violating critical safety thresholds (missing FSSAI, expired lot, high toxins).
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoFlagging}
            onChange={toggleAutoFlag}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span className="ml-3 text-xs font-bold text-on-background">
            {autoFlagging ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      </div>

      {/* Data Table Card: FSSAI Rulesets */}
      <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden border border-outline-variant/30 shadow-xs flex flex-col">
        <div className="bg-surface-container-low p-5 border-b border-outline-variant/30 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              gavel
            </span>
            <h2 className="text-sm font-bold text-on-background uppercase font-mono tracking-wider">
              FSSAI Rulesets
            </h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors"
          >
            + Add Version
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-[11px] font-mono text-on-surface-variant uppercase tracking-wider">
                <th className="p-4">Version</th>
                <th className="p-4">Effective Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs">
              {rules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-semibold text-on-background font-mono">
                    {rule.version}
                  </td>
                  <td className="p-4 text-on-surface-variant font-mono">
                    {rule.effectiveDate}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        rule.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rule.status === 'Draft'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {rule.lastUpdated}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      className="text-on-surface-variant hover:text-primary transition-colors p-1"
                      title="Edit Rule"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threshold Parameter Settings Card (Locked Statutory FSSAI Reference Standards) */}
      <div className="bg-surface-container-lowest rounded-[24px] p-6 border border-outline-variant/30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-on-background">
              Safety &amp; HFSS Alert Thresholds (Front-of-Pack Labelling)
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full font-semibold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Statutory FSSAI Norms · Locked</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Max Sodium Threshold */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Max Sodium Threshold</span>
                <span className="material-symbols-outlined text-outline text-[16px]" title="Read-only statutory standard">lock</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-1">
                <span className="text-3xl font-extrabold font-mono text-primary">500</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant">mg / 100g</span>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20 leading-relaxed">
              Packets exceeding 500mg/100g trigger mandatory high-sodium HFSS warning alerts under FSSAI norms.
            </p>
          </div>

          {/* Max Added Sugar */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Max Added Sugar</span>
                <span className="material-symbols-outlined text-outline text-[16px]" title="Read-only statutory standard">lock</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-1">
                <span className="text-3xl font-extrabold font-mono text-primary">10</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant">grams / 100g</span>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20 leading-relaxed">
              Statutory ceiling for health drinks, baked goods, breakfast cereals, and confectionery.
            </p>
          </div>

          {/* Max Trans Fat Limit */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Max Trans Fat Limit</span>
                <span className="material-symbols-outlined text-outline text-[16px]" title="Read-only statutory standard">lock</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-1">
                <span className="text-3xl font-extrabold font-mono text-primary">0.2</span>
                <span className="font-mono text-xs font-bold text-on-surface-variant">grams / 100g</span>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20 leading-relaxed">
              FSSAI strict 0.2g limit per 100g food portion (zero trans-fat standard for industrial trans fats).
            </p>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md border border-outline-variant shadow-ambient">
            <h3 className="text-base font-bold text-on-background mb-3">Add Ruleset Draft</h3>
            <form onSubmit={handleAddVersion} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-background mb-1">
                  Ruleset Name &amp; Version
                </label>
                <input
                  type="text"
                  placeholder="e.g. FSSAI v3.3 (2027 Update)"
                  value={newVersionName}
                  onChange={(e) => setNewVersionName(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2 text-xs"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-on-surface-variant hover:bg-surface-variant rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-primary-container"
                >
                  Create Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
