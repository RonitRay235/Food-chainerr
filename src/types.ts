export type TabType = 'home' | 'scanner' | 'results' | 'library' | 'rules' | 'case';

export interface NutritionalInfo {
  energyKcal: number | string;
  proteinG: number | string;
  fatG: number | string;
  carbsG: number | string;
  sugarG: number | string;
  sodiumMg: number | string;
}

export interface ComplianceCheck {
  title: string;
  status: 'Passed' | 'Review' | 'Missing';
  description: string;
}

export interface Finding {
  title: string;
  description: string;
  severity: 'flagged' | 'warning' | 'info';
  expectedLocation?: string;
}

export interface ScanRecord {
  id: string;
  reportId: string;
  productName: string;
  brand: string;
  category: string;
  barcode: string;
  fssaiNumber: string;
  fssaiValid: boolean;
  bestBefore: string;
  expiryDate: string;
  isExpired: boolean;
  vegStatus: 'Veg' | 'Non-Veg' | 'Vegan';
  labelLanguage: string;
  ingredients: string;
  allergens: string[];
  nutritionalInfo: NutritionalInfo;
  score: number; // out of 100
  status: 'Compliant' | 'Needs Review' | 'Violation';
  confidence: number;
  healthTags: string[];
  findings: Finding[];
  complianceChecklist: ComplianceCheck[];
  scannedAt: string;
  imageUrl?: string;
  notes?: string;
}

export interface PriorityCase {
  caseId: string;
  title: string;
  product: string;
  priority: 'URGENT' | 'HIGH' | 'MED';
  status: 'In Review' | 'New' | 'Resolved';
  inspector: string;
  batchId: string;
  date: string;
  issueDescription: string;
  evidenceImages: string[];
}
