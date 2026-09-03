import React, { useState } from 'react';
import { ScanRecord } from '../types';
import { downloadDoctorReport } from '../utils/doctorReportGenerator';

interface LibraryViewProps {
  scans: ScanRecord[];
  onSelectScan: (scan: ScanRecord) => void;
  onNewScan: () => void;
  onDeleteScan: (id: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  scans,
  onSelectScan,
  onNewScan,
  onDeleteScan
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [fssaiFilter, setFssaiFilter] = useState('');
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  const handleDelete = (id: string, productName: string) => {
    onDeleteScan(id);
    setDeleteNotice(`Removed "${productName}" from library.`);
    setTimeout(() => setDeleteNotice(null), 3000);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
  };

  const handleBrandChange = (val: string) => {
    setBrandFilter(val);
  };

  const handleFssaiChange = (val: string) => {
    setFssaiFilter(val);
  };

  // Filtering logic
  const filteredScans = scans.filter((item) => {
    const matchSearch =
      searchTerm === '' ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);

    const matchStatus =
      statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();

    const matchBrand =
      brandFilter === 'all' || item.brand.toLowerCase() === brandFilter.toLowerCase();

    const matchFssai =
      fssaiFilter === '' || item.fssaiNumber.includes(fssaiFilter);

    return matchSearch && matchStatus && matchBrand && matchFssai;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setBrandFilter('all');
    setFssaiFilter('');
  };

  const uniqueBrands = Array.from(new Set(scans.map(s => s.brand)));

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-mono font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>National Audit Registry · 100-Point Food Security</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight font-display">
            Product &amp; Report Library
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant mt-1 max-w-2xl font-sans">
            Browse, filter, and inspect verified FSSAI packaging audits and authorized medical certificates across Indian FMCG brands.
          </p>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto">
          <button
            onClick={onNewScan}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-primary-container transition-all shadow-ambient hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            <span>Scan New Item</span>
          </button>
        </div>
      </header>

      {/* Temporary Delete Notice Banner */}
      {deleteNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between font-medium shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{deleteNotice}</span>
          </div>
          <button onClick={() => setDeleteNotice(null)} className="text-emerald-800/70 hover:text-emerald-800 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <section className="bg-surface-container-lowest rounded-[24px] p-4 md:p-5 border border-outline-variant/30 shadow-soft flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          {/* Primary Search */}
          <div className="relative w-full lg:flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search products, brands, barcodes, or report IDs..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-high/60 border border-outline-variant/30 rounded-xl text-xs md:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-0.5 rounded cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2.5 w-full lg:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="flex-1 min-w-[140px] bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="compliant">Compliant (Passed)</option>
              <option value="needs review">Needs Review (Advisory)</option>
              <option value="violation">Violation (Flagged)</option>
            </select>

            {/* Brand Filter */}
            <select
              value={brandFilter}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="flex-1 min-w-[130px] bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans cursor-pointer"
            >
              <option value="all">All Brands ({uniqueBrands.length})</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* FSSAI Filter */}
            <input
              type="text"
              placeholder="FSSAI Lic..."
              value={fssaiFilter}
              onChange={(e) => handleFssaiChange(e.target.value)}
              className="flex-1 min-w-[120px] bg-surface-container-high/60 border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs text-on-surface placeholder:text-outline font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            {/* Clear Filters */}
            {(searchTerm || statusFilter !== 'all' || brandFilter !== 'all' || fssaiFilter) && (
              <button
                onClick={clearFilters}
                title="Clear Filters"
                className="px-3 py-2 text-xs text-error hover:bg-error/10 transition-colors flex items-center justify-center rounded-xl border border-error/20 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] mr-1">close</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Badges and Match Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-outline-variant/20 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-on-surface-variant text-[11px] font-semibold mr-1">FILTER:</span>
            <button
              onClick={() => handleStatusChange('all')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
              }`}
            >
              All ({scans.length})
            </button>
            <button
              onClick={() => handleStatusChange('compliant')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                statusFilter === 'compliant'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              Compliant ({scans.filter(s => s.status === 'Compliant').length})
            </button>
            <button
              onClick={() => handleStatusChange('needs review')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                statusFilter === 'needs review'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Needs Review ({scans.filter(s => s.status === 'Needs Review').length})
            </button>
            <button
              onClick={() => handleStatusChange('violation')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                statusFilter === 'violation'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
              }`}
            >
              Violations ({scans.filter(s => s.status === 'Violation').length})
            </button>
          </div>

          <div className="text-on-surface-variant text-[11px]">
            Found: <strong className="text-on-surface">{filteredScans.length}</strong> audited records
          </div>
        </div>
      </section>

      {/* Results Grid */}
      {filteredScans.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredScans.map((item) => (
                <article
                  key={item.id}
                  onClick={() => onSelectScan(item)}
                  className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 overflow-hidden flex flex-col group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image thumbnail container */}
                  <div className="h-44 relative bg-surface-container overflow-hidden">
                    <img
                      src={
                        item.imageUrl ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDewCj5lTJ305RHzu41MuZrmskXtX3YEm_34RgUWrQP0MJk2TNoCDL1996k4xOctT4ByJhyBHNFdNZuJVOa_lH4VwbVrXtMwlYBIbR72zZnHLLPHJC1tPyN7eger56jPPuP3slHYfx2WCMu9GF3fkxeWiX5gUYuW43ZFudKeFk7EzsGUFjGT38Cr4618fmhputBGorQ9NU3OSioQbGnbnXb6YSLtvIf1ubzXW9yCdfmN0-mkr3DpHcG3w'
                      }
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Small Top-Left Delete Button */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.productName);
                        }}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white/90 hover:text-white backdrop-blur-xs flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        title={`Delete "${item.productName}" data`}
                        aria-label={`Delete "${item.productName}" data`}
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md shadow-xs ${
                          item.status === 'Compliant'
                            ? 'bg-emerald-600/90 text-white'
                            : item.status === 'Needs Review'
                            ? 'bg-amber-600/90 text-white'
                            : 'bg-red-600/90 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {item.status === 'Compliant' ? 'check_circle' : 'warning'}
                        </span>
                        <span>{item.status}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Score: {item.score}/100</span>
                    </div>

                    {item.vegStatus && (
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs p-1 rounded border border-gray-200 shadow-xs flex items-center justify-center">
                        <div className={`w-3.5 h-3.5 border ${item.vegStatus === 'Veg' ? 'border-emerald-600' : 'border-red-600'} flex items-center justify-center`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${item.vegStatus === 'Veg' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1 text-[11px] font-mono text-on-surface-variant">
                      <span className="opacity-75 font-semibold">{item.reportId}</span>
                      <span>{item.scannedAt}</span>
                    </div>

                    <h3 className="text-sm font-bold text-on-surface mb-0.5 line-clamp-1 group-hover:text-primary transition-colors font-display">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-3 font-medium font-sans">
                      {item.brand}
                    </p>

                    <div className="flex flex-col gap-1.5 mb-4 mt-auto pt-3 border-t border-outline-variant/20 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant text-[11px]">FSSAI Lic:</span>
                        <span className={`text-[11px] font-semibold tabular-nums ${item.fssaiNumber ? 'text-on-surface' : 'text-red-600'}`}>
                          {item.fssaiNumber || 'MISSING / UNVERIFIED'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant text-[11px]">Best Before:</span>
                        <span className="text-[11px] text-on-surface tabular-nums">
                          {item.expiryDate || item.bestBefore}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectScan(item);
                        }}
                        className="flex-1 py-2 px-3 bg-surface-container-high hover:bg-primary hover:text-white text-on-surface text-xs font-semibold rounded-xl transition-all text-center cursor-pointer font-sans"
                      >
                        View Report
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadDoctorReport(item);
                        }}
                        className="p-2 bg-transparent border border-outline-variant/40 text-on-surface rounded-xl hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                        title="Download Authorized Doctor Medical Certificate"
                        aria-label="Download Authorized Doctor Medical Certificate"
                      >
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.productName);
                        }}
                        className="p-2 bg-transparent border border-outline-variant/40 text-on-surface-variant hover:text-error hover:bg-error/10 hover:border-error/40 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                        title={`Remove "${item.productName}" data`}
                        aria-label={`Remove "${item.productName}" data`}
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
        </section>
      ) : (
        <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 py-16 px-6 text-center flex flex-col items-center justify-center shadow-soft">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
            <span className="material-symbols-outlined text-[32px]">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface font-display">No matching products found</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mt-1 mb-4 font-sans">
            Try adjusting your search keywords or resetting filters to see all audited food packages.
          </p>
          <button
            onClick={clearFilters}
            className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer shadow-xs hover:bg-primary-container transition-colors font-sans"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Registry Count Footer */}
      <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4 mt-2 text-xs font-mono">
        <div className="text-on-surface-variant flex items-center gap-2">
          <span>
            Showing <strong className="text-on-surface tabular-nums">{filteredScans.length}</strong> of{' '}
            <strong className="text-on-surface tabular-nums">{scans.length}</strong> recorded items
          </span>
        </div>
      </div>
    </div>
  );
};
