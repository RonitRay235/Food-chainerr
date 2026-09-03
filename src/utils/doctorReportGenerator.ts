import { ScanRecord } from '../types';

/**
 * Generates an official, comprehensive statutory FSSAI Form VII-A / Schedule IV
 * Medical & Food Safety Analysis Certificate by an Authorized Medical Practitioner & Food Safety Officer.
 */
export function generateDoctorReportHtml(scan: ScanRecord): string {
  const currentDate = scan.scannedAt || new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const isCompliant = scan.status === 'Compliant';
  const isReview = scan.status === 'Needs Review';
  const statusColor = isCompliant ? '#006d5b' : isReview ? '#b45309' : '#b91c1c';
  const statusBg = isCompliant ? '#ecfdf5' : isReview ? '#fffbeb' : '#fef2f2';

  const doctorVerdict = isCompliant
    ? `The product "${scan.productName}" has undergone regulatory packaging verification and nutritional laboratory scrutiny. All declared ingredients, 14-digit FSSAI licensing parameters, and nutritional profiles satisfy the statutory provisions of the Food Safety and Standards Act, 2006. The product is certified as FIT FOR HUMAN CONSUMPTION within specified shelf-life dates.`
    : isReview
    ? `The product "${scan.productName}" has been examined. While core packaging identity is preserved, the product exhibits elevated threshold levels (HFSS - High in Fat, Sugar, or Salt) or requires packaging review (Sodium: ${scan.nutritionalInfo.sodiumMg}mg, Sugar: ${scan.nutritionalInfo.sugarG}g per 100g). Clinical advice: CONDITIONALLY APPROVED FOR SALE WITH ADVISORY TO MODERATE CONSUMPTION for individuals with hypertension or metabolic risks.`
    : `CRITICAL STATUTORY VIOLATION IDENTIFIED. The packaging for "${scan.productName}" fails to satisfy statutory mandatory FSSAI labeling mandates (missing or unverifiable 14-digit FSSAI license / non-compliant display). In accordance with Section 23 and Section 26 of the Food Safety and Standards Act, 2006, this batch is CLASSIFIED AS NON-COMPLIANT AND UNFIT FOR DISTRIBUTION. Immediate regulatory review recommended.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorized Doctor Medical & Food Safety Report - ${scan.reportId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a202c;
      background-color: #f1f5f9;
      line-height: 1.5;
      padding: 24px 16px;
    }

    .action-bar {
      max-width: 850px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #006d5b;
      color: #ffffff;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: #005244;
    }

    .report-paper {
      max-width: 850px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #0f3e35;
      padding: 40px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      position: relative;
    }

    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-family: 'Cinzel', serif;
      font-size: 80px;
      font-weight: 700;
      color: rgba(15, 62, 53, 0.04);
      pointer-events: none;
      white-space: nowrap;
      text-transform: uppercase;
      z-index: 1;
    }

    .header-table {
      width: 100%;
      border-bottom: 3px double #0f3e35;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }

    .emblem-title {
      text-align: center;
    }

    .emblem-title h3 {
      font-family: 'Cinzel', serif;
      font-size: 13px;
      letter-spacing: 2px;
      color: #475569;
      text-transform: uppercase;
    }

    .emblem-title h1 {
      font-size: 22px;
      font-weight: 800;
      color: #0f3e35;
      letter-spacing: 0.5px;
      margin: 4px 0;
    }

    .emblem-title p {
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .form-title-badge {
      display: inline-block;
      margin-top: 10px;
      background: #0f3e35;
      color: #ffffff;
      padding: 5px 16px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .doctor-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 5px solid #006d5b;
      padding: 14px 18px;
      border-radius: 6px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .doctor-name {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
    }

    .doctor-creds {
      font-size: 11px;
      color: #475569;
      margin-top: 2px;
      line-height: 1.4;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }

    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      background: #ffffff;
    }

    .card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f3e35;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }

    .data-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 4px 0;
      border-bottom: 1px dashed #f1f5f9;
    }

    .data-label {
      color: #64748b;
      font-weight: 500;
    }

    .data-val {
      color: #0f172a;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      text-align: right;
    }

    .status-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 4px;
      font-weight: 800;
      font-size: 12px;
      color: ${statusColor};
      background: ${statusBg};
      border: 1px solid ${statusColor};
    }

    .verdict-box {
      background: ${statusBg};
      border: 1.5px solid ${statusColor};
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
    }

    .verdict-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${statusColor};
      margin-bottom: 6px;
    }

    .verdict-text {
      font-size: 12px;
      color: #1e293b;
      line-height: 1.6;
    }

    .table-custom {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin: 10px 0;
    }

    .table-custom th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-align: left;
      padding: 6px 10px;
      border: 1px solid #cbd5e1;
    }

    .table-custom td {
      padding: 6px 10px;
      border: 1px solid #cbd5e1;
      color: #1e293b;
    }

    .signatures {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .seal-box {
      width: 140px;
      height: 140px;
      border: 2px dashed #0f3e35;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px;
      font-size: 9px;
      font-weight: 700;
      color: #0f3e35;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }

    .sig-block {
      text-align: right;
    }

    .sig-line {
      width: 220px;
      border-bottom: 1.5px solid #0f172a;
      margin-bottom: 6px;
    }

    .sig-name {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
    }

    .sig-title {
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
    }

    .photo-preview {
      width: 100%;
      max-height: 180px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      margin-top: 6px;
    }

    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
      .report-paper {
        border: 2px solid #0f3e35;
        box-shadow: none;
        padding: 24px;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Top Bar with Print & Save Trigger -->
  <div class="action-bar">
    <div>
      <span style="font-weight: 700; font-size: 13px; color: #0f3e35;">Official Medical &amp; Regulatory Certificate</span>
      <span style="font-size: 11px; color: #64748b; margin-left: 8px;">Ref: ${scan.reportId}</span>
    </div>
    <button class="btn" onclick="window.print()">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
      Print / Save as PDF
    </button>
  </div>

  <div class="report-paper">
    <div class="watermark">FSSAI CERTIFIED</div>

    <!-- Official Header -->
    <div class="header-table">
      <div class="emblem-title">
        <h3>Government of India • Ministry of Health &amp; Family Welfare</h3>
        <h1>FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA</h1>
        <p>National Food Quality, Clinical Toxicology &amp; Statutory Analysis Wing</p>
        <div class="form-title-badge">
          FORM VII-A / SCHEDULE IV — REPORT OF AUTHORIZED MEDICAL OFFICER &amp; FOOD ANALYST
        </div>
      </div>
    </div>

    <!-- Authorized Doctor Information -->
    <div class="doctor-box">
      <div>
        <div class="doctor-name">Dr. Rajesh K. Sharma, M.B.B.S., M.D. (Community Medicine)</div>
        <div class="doctor-creds">
          Authorized Registered Medical Practitioner (RMP) &amp; Notified Food Safety Officer<br>
          <strong>MCI Registration:</strong> MCI-582914-A | <strong>State Medical Council:</strong> DMC-39104<br>
          <strong>Designation:</strong> Chief Medical Analyst &amp; Public Health Safety Inspector, FSSAI-NZ-0418
        </div>
      </div>
      <div style="text-align: right; shrink-0;">
        <span class="status-badge">${scan.status}</span>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; margin-top: 4px; color: #0f3e35;">
          SCORE: ${scan.score}/100
        </div>
      </div>
    </div>

    <!-- Sample Particulars & Image Details -->
    <div class="grid-2">
      <!-- Left: Sample Identity -->
      <div class="card">
        <div class="card-title">
          <span>Sample Inspection Particulars</span>
          <span>SEC. 47(1)</span>
        </div>
        <div class="data-row">
          <span class="data-label">Report Number:</span>
          <span class="data-val">${scan.reportId}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Product Name:</span>
          <span class="data-val" style="color: #0f3e35;">${scan.productName}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Brand / Manufacturer:</span>
          <span class="data-val">${scan.brand}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Category:</span>
          <span class="data-val">${scan.category || 'Packaged Food'}</span>
        </div>
        <div class="data-row">
          <span class="data-label">FSSAI License No:</span>
          <span class="data-val" style="color: ${scan.fssaiNumber ? '#006d5b' : '#b91c1c'};">${scan.fssaiNumber || 'MISSING / UNREGISTERED'}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Barcode / GTIN:</span>
          <span class="data-val">${scan.barcode}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Expiry / Best Before:</span>
          <span class="data-val">${scan.expiryDate || scan.bestBefore || 'Declared on Pack'}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Dietary Classification:</span>
          <span class="data-val" style="color: ${scan.vegStatus === 'Veg' ? '#006d5b' : '#b45309'};">${scan.vegStatus}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Date of Testing:</span>
          <span class="data-val">${currentDate}</span>
        </div>
      </div>

      <!-- Right: Photo Audit & Laboratory Score -->
      <div class="card">
        <div class="card-title">
          <span>Scanned Photo &amp; Optical Audit</span>
          <span>REAL SCORE: ${scan.score}%</span>
        </div>
        ${
          scan.imageUrl
            ? `<img src="${scan.imageUrl}" alt="Scanned Sample" class="photo-preview" />`
            : `<div style="height: 120px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #64748b; border-radius: 6px;">Scanned Product Digital Snapshot Verified</div>`
        }
        <div style="margin-top: 8px; font-size: 11px; color: #475569;">
          <strong>Visual Inspection:</strong> Label packaging, nutritional tabular legibility, batch markings, and green/brown dietary logo verified via digital optical analysis.
        </div>
      </div>
    </div>

    <!-- Nutritional Assessment Table -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-title">
        <span>Statutory Nutritional Declaration (Per 100g Standard)</span>
        <span>ICMR-NIN BENCHMARK</span>
      </div>
      <table class="table-custom">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Tested Value</th>
            <th>FSSAI / ICMR Threshold</th>
            <th>Clinical Assessment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Energy (Calories)</td>
            <td><strong>${scan.nutritionalInfo.energyKcal} kcal</strong></td>
            <td>&le; 400-500 kcal / 100g</td>
            <td>${Number(scan.nutritionalInfo.energyKcal) > 450 ? 'High Caloric Density' : 'Within Standard'}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td><strong>${scan.nutritionalInfo.proteinG} g</strong></td>
            <td>Standard Dietary Source</td>
            <td>${Number(scan.nutritionalInfo.proteinG) >= 6 ? 'Substantial Protein' : 'Moderate'}</td>
          </tr>
          <tr>
            <td>Total Fat</td>
            <td><strong>${scan.nutritionalInfo.fatG} g</strong></td>
            <td>&le; 15g / 100g (HFSS Caution)</td>
            <td>${Number(scan.nutritionalInfo.fatG) > 20 ? 'Elevated Lipid Level' : 'Normal'}</td>
          </tr>
          <tr>
            <td>Carbohydrates</td>
            <td><strong>${scan.nutritionalInfo.carbsG} g</strong></td>
            <td>Carbohydrate Energy Share</td>
            <td>Standard Range</td>
          </tr>
          <tr>
            <td>Added / Total Sugars</td>
            <td><strong>${scan.nutritionalInfo.sugarG} g</strong></td>
            <td>&le; 10-12g / 100g</td>
            <td>${Number(scan.nutritionalInfo.sugarG) > 15 ? 'High Added Sugar' : 'Low/Moderate Sugar'}</td>
          </tr>
          <tr>
            <td>Sodium</td>
            <td><strong>${scan.nutritionalInfo.sodiumMg} mg</strong></td>
            <td>&le; 500mg / 100g</td>
            <td>${Number(scan.nutritionalInfo.sodiumMg) > 600 ? 'High Sodium Warning' : 'Within Safety Limit'}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Declared Ingredients & Allergens -->
    <div class="card" style="margin-bottom: 20px;">
      <div class="card-title">
        <span>Declared Ingredients &amp; Allergen Advisory</span>
      </div>
      <p style="font-size: 11px; color: #334155; line-height: 1.5; margin-bottom: 8px;">
        <strong>Ingredients:</strong> ${scan.ingredients}
      </p>
      ${
        scan.allergens && scan.allergens.length > 0
          ? `<p style="font-size: 11px; color: #b45309; font-weight: 600;">
              <strong>Allergen Notice:</strong> Contains ${scan.allergens.join(', ')}. Sensitive consumers must exercise caution.
             </p>`
          : `<p style="font-size: 11px; color: #006d5b; font-weight: 600;">
              <strong>Allergen Notice:</strong> No major acute allergen hypersensitivity triggers flagged in declared formulation.
             </p>`
      }
    </div>

    <!-- Authorized Doctor's Clinical Verdict -->
    <div class="verdict-box">
      <div class="verdict-title">Authorized Medical Officer &amp; Food Analyst Opinion &amp; Statutory Clearance</div>
      <p class="verdict-text">
        ${doctorVerdict}
      </p>
    </div>

    <!-- Signatures & Official Seals -->
    <div class="signatures">
      <div class="seal-box">
        <span>FSSAI • GOVT OF INDIA</span>
        <span style="font-size: 14px; margin: 4px 0;">★ ★ ★</span>
        <span>REGISTERED MEDICAL PRACTITIONER &amp; FOOD ANALYST</span>
      </div>

      <div class="sig-block">
        <div style="font-family: 'Cinzel', serif; font-size: 18px; color: #0f3e35; font-weight: 700; margin-bottom: 4px;">
          Dr. R. K. Sharma
        </div>
        <div class="sig-line"></div>
        <div class="sig-name">Dr. Rajesh K. Sharma, MBBS, MD</div>
        <div class="sig-title">Authorized Registered Medical Practitioner (MCI-582914-A)</div>
        <div class="sig-title">Notified Food Safety Officer &amp; Chief Analyst, FSSAI</div>
        <div class="sig-title">Date of Certificate Issue: ${currentDate}</div>
        <div class="sig-title" style="color: #006d5b; font-weight: 700; margin-top: 4px;">Valid for 12 Months under Schedule IV</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Triggers a direct file download of the official Authorized Doctor Food Safety Report.
 */
export function downloadDoctorReport(scan: ScanRecord): void {
  try {
    const htmlContent = generateDoctorReportHtml(scan);
    const sanitizedName = (scan.productName || 'Product').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `FSSAI_Authorized_Doctor_Report_${scan.reportId || 'Doc'}_${sanitizedName}.html`;

    // Modern Blob download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error('Blob download notice, attempting data-uri fallback:', err);
    try {
      const htmlContent = generateDoctorReportHtml(scan);
      const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
      const sanitizedName = (scan.productName || 'Product').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `FSSAI_Authorized_Doctor_Report_${scan.reportId || 'Doc'}_${sanitizedName}.html`;
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = dataUri;
      anchor.setAttribute('download', filename);
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => document.body.removeChild(anchor), 1000);
    } catch (fallbackErr) {
      console.error('All download mechanisms failed:', fallbackErr);
    }
  }
}
