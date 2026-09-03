import { ScanRecord, PriorityCase } from '../types';

export const INITIAL_SCANS: ScanRecord[] = [
  {
    id: 'scan-1',
    reportId: 'REP-9102',
    productName: 'Kurkure Masala Munch',
    brand: 'PepsiCo India',
    category: 'Snacks & Savouries',
    barcode: '8901491101258',
    fssaiNumber: '10014031001025',
    fssaiValid: true,
    bestBefore: '6 Months from MFD',
    expiryDate: 'Oct 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Rice Meal (42.8%), Edible Vegetable Oil (Palmolein), Corn Meal (19.8%), Gram Meal (3.3%), Spices & Condiments (Chilli Powder, Onion Powder, Garlic Powder, Coriander Powder, Turmeric Powder), Salt, Sugar, Tartaric Acid (334).',
    allergens: ['Contains added natural & nature identical flavouring substances'],
    nutritionalInfo: {
      energyKcal: 561,
      proteinG: 5.8,
      fatG: 35.7,
      carbsG: 54.2,
      sugarG: 2.1,
      sodiumMg: 890
    },
    score: 68,
    status: 'Needs Review',
    confidence: 96,
    healthTags: ['High Sodium', 'Palmolein Oil', 'Trans Fat Monitored'],
    findings: [
      {
        title: 'High Sodium Threshold Alert',
        description: 'Sodium concentration is 890mg per 100g, which exceeds the FSSAI front-of-pack green standard.',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'All ingredients declared in descending order by weight with quantitative declaration.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'Valid 14-digit license number 10014031001025 verified.'
      },
      {
        title: 'Vegetarian Logo Location',
        status: 'Passed',
        description: 'Green circle inside green square displayed conspicuously on primary display panel.'
      },
      {
        title: 'Nutritional Declaration Panel',
        status: 'Review',
        description: 'Nutritional facts present; sodium levels require cautionary high-sodium labelling.'
      }
    ],
    scannedAt: 'Oct 26, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDewCj5lTJ305RHzu41MuZrmskXtX3YEm_34RgUWrQP0MJk2TNoCDL1996k4xOctT4ByJhyBHNFdNZuJVOa_lH4VwbVrXtMwlYBIbR72zZnHLLPHJC1tPyN7eger56jPPuP3slHYfx2WCMu9GF3fkxeWiX5gUYuW43ZFudKeFk7EzsGUFjGT38Cr4618fmhputBGorQ9NU3OSioQbGnbnXb6YSLtvIf1ubzXW9yCdfmN0-mkr3DpHcG3w'
  },
  {
    id: 'scan-2',
    reportId: 'REP-9101',
    productName: 'Premium Green Tea',
    brand: 'Tata',
    category: 'Beverages / Tea',
    barcode: '8901203100007',
    fssaiNumber: '10012031000071',
    fssaiValid: true,
    bestBefore: '12 Months from MFD',
    expiryDate: 'Oct 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Green Tea Leaves (Camellia sinensis) 100% natural, rich in flavonoids and antioxidants.',
    allergens: ['None detected'],
    nutritionalInfo: {
      energyKcal: 2,
      proteinG: 0.2,
      fatG: 0.0,
      carbsG: 0.1,
      sugarG: 0.0,
      sodiumMg: 2
    },
    score: 92,
    status: 'Compliant',
    confidence: 98,
    healthTags: ['Low Sugar', 'Natural Ingredients', 'Antioxidants', 'Zero Fat'],
    findings: [],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'All required ingredient lists and product identity markers are present and correctly formatted.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'FSSAI 14-digit registration verified against central database.'
      },
      {
        title: 'Vegetarian Logo Location',
        status: 'Passed',
        description: 'The green dot is present on primary display panel.'
      },
      {
        title: 'Nutritional Panel',
        status: 'Passed',
        description: 'Per 100g and per serving energy, protein, fat, carbohydrates declared.'
      }
    ],
    scannedAt: 'Oct 25, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB6QgfUETRuqwPXdlJQj4moeBx3EEZVdwTaSN3yi_cmGGGN35xv0CeqfapRKORcXEdYgz4aHZUs5dxVNQZ_7mI9k2jFOenKs04I6UhcYuTVkmuIzP59_Kmb0YXQzrI_RICyE_0Trz8pmq1To38ln_YXoYUwnBs1N5Em9kZGRp8WYhqfCYHr-qnjct1QRFUxvbTO4h824MrCK_2WIFXd67jLfQX3y36xMsrJ7KtA4b6YPiCR7tfJ7j1w'
  },
  {
    id: 'scan-3',
    reportId: 'REP-9099',
    productName: 'Amul Malai Paneer',
    brand: 'Amul',
    category: 'Dairy Products',
    barcode: '8901262010156',
    fssaiNumber: '',
    fssaiValid: false,
    bestBefore: '6 Months from MFD',
    expiryDate: 'May 28, 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English Only',
    ingredients: 'Milk Solids, Citric Acid, Purified Water.',
    allergens: ['Contains Milk Solids'],
    nutritionalInfo: {
      energyKcal: 314,
      proteinG: 18.0,
      fatG: 25.0,
      carbsG: 4.5,
      sugarG: 3.2,
      sodiumMg: 120
    },
    score: 54,
    status: 'Violation',
    confidence: 95,
    healthTags: ['High Protein', 'Rich in Calcium', 'Missing Regulatory Code'],
    findings: [
      {
        title: 'Missing FSSAI License Number',
        description: 'The system scanned the back panel where regulatory information is typically located. No valid 14-digit FSSAI license number pattern was detected.',
        severity: 'flagged',
        expectedLocation: 'Back panel lower section'
      },
      {
        title: 'Vegetarian Logo Location Defect',
        description: 'The green dot is present but its contrast against background does not meet minimum visibility requirements.',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'Milk solids standard conformant.'
      },
      {
        title: 'Vegetarian Logo Location',
        status: 'Review',
        description: 'The green dot is present but its location may not meet primary display panel requirements.'
      },
      {
        title: 'FSSAI License Number',
        status: 'Missing',
        description: 'Required regulatory license number is missing from the scanned label area.'
      },
      {
        title: 'Allergen Advisory',
        status: 'Review',
        description: 'Lactose / dairy allergen declaration is non-bold.'
      }
    ],
    scannedAt: 'Oct 23, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCT6CxKB-o69pVK3N_HNRE7aghmEaZXNiaCkpJufgMnipyCZcSQEzD1NYlZqS6kKJ920rqVX1O02sgMYvn1oZ9L-aG4txmi7VOkBds51HJ6lJbbuG0p_o0PSJa2jTRtldeh2j1OBh6TCuCdmZwi4UiqlUpScytulz5xYvlWx3YezN6mwsttqShbgsuJ591-HNd-_XDgBGYiIsv5jDigZx8WahccoJKTpDyu8kZSaVaiqupEsVTlMQhYQ'
  },
  {
    id: 'scan-4',
    reportId: 'REP-9100',
    productName: 'Maggi 2-Minute Noodles',
    brand: 'Nestlé',
    category: 'Instant Foods',
    barcode: '8901058852332',
    fssaiNumber: '10012011000168',
    fssaiValid: true,
    bestBefore: '9 Months from MFD',
    expiryDate: 'Oct 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Wheat Flour (Maida), Palm Oil, Salt, Wheat Gluten, Mineral (Calcium Carbonate), Thickener (508, 412), Acidity Regulators (501(i), 500(i)). Tastemaker: Mixed Spices (25.6%), Sugar, Hydrolysed Groundnut Protein, Flavour Enhancer (635).',
    allergens: ['Contains Wheat & Nut', 'May contain Mustard, Milk, and Soy'],
    nutritionalInfo: {
      energyKcal: 427,
      proteinG: 8.0,
      fatG: 15.7,
      carbsG: 63.5,
      sugarG: 3.5,
      sodiumMg: 1020
    },
    score: 62,
    status: 'Needs Review',
    confidence: 94,
    healthTags: ['High Sodium (>1000mg)', 'Contains Refined Flour', 'Fortified with Iron'],
    findings: [
      {
        title: 'Excessive Sodium Per Serving',
        description: 'Exceeds recommended 500mg sodium limit per 100g (actual: 1020mg).',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'Tastemaker and noodle breakdown conform to FSSAI guidelines.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'License 10012011000168 detected and verified.'
      },
      {
        title: 'Vegetarian Logo Symbol',
        status: 'Passed',
        description: 'Compliant green square box with solid green circle.'
      },
      {
        title: 'Allergen Advisory Warning',
        status: 'Passed',
        description: 'Allergens declared in contrasting bold font.'
      }
    ],
    scannedAt: 'Oct 24, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkXUO9J06cZBey9O1BK792awex36klDKrwsUQz0Tb3weLozy2yxFGBqNQCyyCPP57csZLtHUY8E7v2z5q7sNxX6hdKuNzYvFOs0iEXVtC8ZIH4ZF3YsrjMXY1TKv8G7wWVnyr9z3zzMfGLq3rRI9K9L-o1dXNJubhuSMwVDXeWzBc_klTiPw2Dc2GDh109nWSFUEd27twAm11pF3Tn67WKfyNhYnyfYB3oe3e6rzDvfDHlcPXq8rRhmw'
  },
  {
    id: 'scan-5',
    reportId: 'REP-9103',
    productName: 'Saffola Masala Oats Classic',
    brand: 'Marico Limited',
    category: 'Breakfast Cereals',
    barcode: '8901088004523',
    fssaiNumber: '10012022000258',
    fssaiValid: true,
    bestBefore: '9 Months from MFD',
    expiryDate: 'Nov 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Rolled Oats (73.6%), Spices & Condiments (Onion, Turmeric, Pepper, Cumin, Garlic, Fenugreek, Clove, Nutmeg), Salt, Sugar, Dried Vegetables (Carrots 1.6%, Green Peas 1.1%, French Beans), Hydrolysed Vegetable Protein, Edible Vegetable Oil (Rice Bran).',
    allergens: ['Contains Oats (Gluten)', 'May contain traces of Wheat and Soy'],
    nutritionalInfo: {
      energyKcal: 389,
      proteinG: 9.4,
      fatG: 7.2,
      carbsG: 66.8,
      sugarG: 4.8,
      sodiumMg: 710
    },
    score: 86,
    status: 'Compliant',
    confidence: 97,
    healthTags: ['Rich in Fiber', 'Contains Beta-Glucan', '100% Wholegrain Oats'],
    findings: [],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'Grain percentages and quantitative ingredient declarations compliant with FSSAI regulations.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'Valid 14-digit license number 10012022000258 verified.'
      },
      {
        title: 'Vegetarian Logo Symbol',
        status: 'Passed',
        description: 'Green circle and square symbol prominently positioned on the principal display panel.'
      },
      {
        title: 'Nutritional Declaration Panel',
        status: 'Passed',
        description: 'Energy, wholegrain carbohydrate, and fiber values accurately stated per 100g.'
      }
    ],
    scannedAt: 'Oct 28, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9zAQIRxWfyQxt0d46K7G459I_yhaBWfxX_Pv0-6ujCpawfQLJoWTBzVBiXQO_o_PqF2GQVc6Mi2iWQRG4z2LQYKAUPUY3B0Cn4XpuSBCPWNyE9jFs3xxInnsXJ4TYBD7tJ7gCIdILbsAHmGBBN3y0h54nM4G2HgAK7RZGK2q8Gwv17tUR0TNSj2So6MPePZ87KKvNe1XJ2WnvRKqt-Br_bcPHmw9Vm_uh_FZeKB9WEnVMrETfH7U0zg'
  },
  {
    id: 'scan-6',
    reportId: 'REP-9104',
    productName: 'Haldiram Aloo Bhujia Namkeen',
    brand: 'Haldiram Snacks',
    category: 'Snacks & Savouries',
    barcode: '8904004400128',
    fssaiNumber: '10013051000572',
    fssaiValid: true,
    bestBefore: '6 Months from MFD',
    expiryDate: 'Dec 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Potatoes (44%), Edible Vegetable Oil (Palmolein / Cottonseed), Bengal Gram Flour, Tepary Beans Flour, Edible Starch, Spices & Condiments (Coriander, Cumin, Red Chilli, Black Pepper, Ginger, Clove, Cardamom), Salt, Mango Powder, Citric Acid (330).',
    allergens: ['Contains added natural & nature identical flavouring substances'],
    nutritionalInfo: {
      energyKcal: 588,
      proteinG: 8.5,
      fatG: 42.0,
      carbsG: 44.0,
      sugarG: 1.5,
      sodiumMg: 780
    },
    score: 72,
    status: 'Needs Review',
    confidence: 95,
    healthTags: ['High Total Fat (42g)', 'High Sodium', 'Palmolein Oil Blend'],
    findings: [
      {
        title: 'Elevated Total Fat Content',
        description: 'Total fat is 42g per 100g, triggering FSSAI cautionary front-of-pack labeling advisory.',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'Potato and flour components clearly identified in descending proportion.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: '14-Digit central FSSAI license 10013051000572 verified.'
      },
      {
        title: 'Vegetarian Logo Symbol',
        status: 'Passed',
        description: 'Green veg symbol displayed conspicuously on front.'
      }
    ],
    scannedAt: 'Nov 02, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9qN1GLBgCjWVvgZZ0uqXpiga4WOVvwiCm96ai2DEpIr7biiQLJcFj-ZMSDWJiLzBm_gvEIzJDGkyzdiX1h9otP9bBsDRioCoFUdOm7ioeGGZ5j6uN1W8P-q23hLx4MK86aFvYmboLAf7TWrnuBQVND5d5vljDwAPGLXzyQgFB2mpeNntTOh8XKB6YmJ8m8z8qGuWEHZtmO2BFmtITJ5ehag9tSQdB7mIpxVbrjB3y54UM6nqk2e1dSDzXa2vIrDAc-SQ'
  },
  {
    id: 'scan-7',
    reportId: 'REP-9105',
    productName: '100% Pure Squeezy Honey',
    brand: 'Dabur India',
    category: 'Spreads & Honey',
    barcode: '8901207010487',
    fssaiNumber: '10012011000618',
    fssaiValid: true,
    bestBefore: '18 Months from MFD',
    expiryDate: 'Mar 2027',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English, Hindi, Bengali (Multilingual)',
    ingredients: '100% Natural Honey. NMR (Nuclear Magnetic Resonance) tested for pure origin with zero added inverted sugar syrup.',
    allergens: ['Zero Allergen Ingredients'],
    nutritionalInfo: {
      energyKcal: 320,
      proteinG: 0.3,
      fatG: 0.0,
      carbsG: 80.0,
      sugarG: 78.0,
      sodiumMg: 15
    },
    score: 95,
    status: 'Compliant',
    confidence: 99,
    healthTags: ['NMR Tested', 'Zero Added Cane Sugar', 'Natural Antioxidants', 'Zero Fat'],
    findings: [],
    complianceChecklist: [
      {
        title: 'NMR Authenticity Certification',
        status: 'Passed',
        description: 'Complies with statutory FSSAI Gazette notification for C4/C3 sugar purity parameters.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'License 10012011000618 confirmed and active.'
      },
      {
        title: 'Nutritional Declaration Panel',
        status: 'Passed',
        description: 'Natural fructose and glucose split accurately labeled.'
      }
    ],
    scannedAt: 'Nov 05, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB6QgfUETRuqwPXdlJQj4moeBx3EEZVdwTaSN3yi_cmGGGN35xv0CeqfapRKORcXEdYgz4aHZUs5dxVNQZ_7mI9k2jFOenKs04I6UhcYuTVkmuIzP59_Kmb0YXQzrI_RICyE_0Trz8pmq1To38ln_YXoYUwnBs1N5Em9kZGRp8WYhqfCYHr-qnjct1QRFUxvbTO4h824MrCK_2WIFXd67jLfQX3y36xMsrJ7KtA4b6YPiCR7tfJ7j1w'
  },
  {
    id: 'scan-8',
    reportId: 'REP-9106',
    productName: 'Parle-G Original Gluco Biscuits',
    brand: 'Parle Products',
    category: 'Bakery & Biscuits',
    barcode: '8901719101018',
    fssaiNumber: '10013022002253',
    fssaiValid: true,
    bestBefore: '6 Months from MFD',
    expiryDate: 'Jul 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Wheat Flour (67%), Sugar (23.5%), Edible Vegetable Oil (Palm Oil), Invert Sugar Syrup, Raising Agents (503(ii), 500(ii)), Salt, Milk Solids (0.6%), Emulsifier (Diacetyl Tartaric Acid Esters of Mono- and Diglycerides), Dough Conditioner (223).',
    allergens: ['Contains Wheat, Milk and Sulphites'],
    nutritionalInfo: {
      energyKcal: 454,
      proteinG: 6.5,
      fatG: 13.0,
      carbsG: 77.8,
      sugarG: 25.5,
      sodiumMg: 280
    },
    score: 79,
    status: 'Needs Review',
    confidence: 96,
    healthTags: ['Fortified with Minerals', 'Moderate Sugar (25.5%)', 'Traditional Heritage Biscuit'],
    findings: [
      {
        title: 'High Added Sugar Warning',
        description: 'Sugar exceeds 20g per 100g (actual: 25.5g). Moderate consumption recommended for children.',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Product Identity & Ingredients',
        status: 'Passed',
        description: 'Wheat flour percentage (67%) clearly declared as required by bakery standards.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'FSSAI License 10013022002253 validated.'
      },
      {
        title: 'Allergen Advisory Warning',
        status: 'Passed',
        description: 'Sulphite and gluten allergens declared.'
      }
    ],
    scannedAt: 'Nov 09, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDewCj5lTJ305RHzu41MuZrmskXtX3YEm_34RgUWrQP0MJk2TNoCDL1996k4xOctT4ByJhyBHNFdNZuJVOa_lH4VwbVrXtMwlYBIbR72zZnHLLPHJC1tPyN7eger56jPPuP3slHYfx2WCMu9GF3fkxeWiX5gUYuW43ZFudKeFk7EzsGUFjGT38Cr4618fmhputBGorQ9NU3OSioQbGnbnXb6YSLtvIf1ubzXW9yCdfmN0-mkr3DpHcG3w'
  },
  {
    id: 'scan-9',
    reportId: 'REP-9107',
    productName: 'Good Day Butter & Cashew Cookies',
    brand: 'Britannia Industries',
    category: 'Bakery & Biscuits',
    barcode: '8901063012011',
    fssaiNumber: '10015043001129',
    fssaiValid: true,
    bestBefore: '8 Months from MFD',
    expiryDate: 'Nov 2026',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Refined Wheat Flour (Maida), Sugar, Edible Vegetable Oil (Palm Oil), Butter (2.5%), Cashew Bits (2.2%), Invert Sugar Syrup, Milk Solids, Raising Agents (503(ii), 500(ii)), Iodised Salt, Emulsifiers (322, 471).',
    allergens: ['Contains Wheat, Milk, Nuts (Cashew), and Soy'],
    nutritionalInfo: {
      energyKcal: 498,
      proteinG: 7.0,
      fatG: 22.0,
      carbsG: 68.0,
      sugarG: 22.0,
      sodiumMg: 350
    },
    score: 74,
    status: 'Needs Review',
    confidence: 95,
    healthTags: ['Contains Real Butter & Cashew', 'High Sugar (22g)', 'Palm Oil Based'],
    findings: [],
    complianceChecklist: [
      {
        title: 'Nut Declaration & Nut Count',
        status: 'Passed',
        description: 'Cashew nut percentage (2.2%) declared quantitatively.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: '14-Digit central registration 10015043001129 valid.'
      },
      {
        title: 'Vegetarian Logo Symbol',
        status: 'Passed',
        description: 'Conspicuous green veg dot on front panel.'
      }
    ],
    scannedAt: 'Nov 12, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkXUO9J06cZBey9O1BK792awex36klDKrwsUQz0Tb3weLozy2yxFGBqNQCyyCPP57csZLtHUY8E7v2z5q7sNxX6hdKuNzYvFOs0iEXVtC8ZIH4ZF3YsrjMXY1TKv8G7wWVnyr9z3zzMfGLq3rRI9K9L-o1dXNJubhuSMwVDXeWzBc_klTiPw2Dc2GDh109nWSFUEd27twAm11pF3Tn67WKfyNhYnyfYB3oe3e6rzDvfDHlcPXq8rRhmw'
  },
  {
    id: 'scan-10',
    reportId: 'REP-9108',
    productName: 'Fresh Tomato Ketchup 950g',
    brand: 'Kissan (HUL)',
    category: 'Sauces & Condiments',
    barcode: '8901030383120',
    fssaiNumber: '10013022001897',
    fssaiValid: true,
    bestBefore: '12 Months from MFD',
    expiryDate: 'Jan 2027',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Water, Tomato Paste (26%), Sugar, Salt, Acidity Regulator (260), Thickeners (1422, 415), Onion Powder, Garlic Powder, Preservative (211), Mixed Spices.',
    allergens: ['Contains Permitted Class II Preservatives (Sodium Benzoate)'],
    nutritionalInfo: {
      energyKcal: 135,
      proteinG: 1.2,
      fatG: 0.1,
      carbsG: 32.4,
      sugarG: 28.0,
      sodiumMg: 820
    },
    score: 67,
    status: 'Needs Review',
    confidence: 94,
    healthTags: ['High Sugar (28g/100g)', 'High Sodium', 'Class II Preservative 211'],
    findings: [
      {
        title: 'High Added Sugar & Preservative Notice',
        description: 'Sugar content is 28g per 100g; Class II preservative E211 is present within permissible statutory limits (750ppm).',
        severity: 'warning'
      }
    ],
    complianceChecklist: [
      {
        title: 'Tomato Solid Minimum Quantity',
        status: 'Passed',
        description: 'Tomato paste concentration meets minimum 25% FSSAI requirement.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'License 10013022001897 verified.'
      },
      {
        title: 'Preservative Class Declaration',
        status: 'Passed',
        description: 'Permitted Class II preservative declared explicitly in bold.'
      }
    ],
    scannedAt: 'Nov 15, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCT6CxKB-o69pVK3N_HNRE7aghmEaZXNiaCkpJufgMnipyCZcSQEzD1NYlZqS6kKJ920rqVX1O02sgMYvn1oZ9L-aG4txmi7VOkBds51HJ6lJbbuG0p_o0PSJa2jTRtldeh2j1OBh6TCuCdmZwi4UiqlUpScytulz5xYvlWx3YezN6mwsttqShbgsuJ591-HNd-_XDgBGYiIsv5jDigZx8WahccoJKTpDyu8kZSaVaiqupEsVTlMQhYQ'
  },
  {
    id: 'scan-11',
    reportId: 'REP-9109',
    productName: 'Table Salt & Black Pepper Sprinkler',
    brand: 'Catch (DS Group)',
    category: 'Spices & Seasonings',
    barcode: '8901233020014',
    fssaiNumber: '10012051000096',
    fssaiValid: true,
    bestBefore: '24 Months from MFD',
    expiryDate: 'Oct 2027',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Vacuum Evaporated Iodised Salt, Potassium Iodate (Iodine >= 15ppm), Black Pepper Powder (20%), Anti-caking Agent (551).',
    allergens: ['Zero Allergen Warning'],
    nutritionalInfo: {
      energyKcal: 52,
      proteinG: 2.1,
      fatG: 0.6,
      carbsG: 9.8,
      sugarG: 0.0,
      sodiumMg: 31200
    },
    score: 93,
    status: 'Compliant',
    confidence: 98,
    healthTags: ['Iodised Salt Mandate Passed', 'Natural Piperine', 'Zero Added Sugar'],
    findings: [],
    complianceChecklist: [
      {
        title: 'Iodine Fortification Standard',
        status: 'Passed',
        description: 'Iodine level certified >= 15ppm at consumer level under Universal Salt Iodisation mandate.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'Central license 10012051000096 verified.'
      },
      {
        title: 'Anti-Caking Agent Limits',
        status: 'Passed',
        description: 'INS 551 within statutory 2.0% ceiling.'
      }
    ],
    scannedAt: 'Nov 18, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB6QgfUETRuqwPXdlJQj4moeBx3EEZVdwTaSN3yi_cmGGGN35xv0CeqfapRKORcXEdYgz4aHZUs5dxVNQZ_7mI9k2jFOenKs04I6UhcYuTVkmuIzP59_Kmb0YXQzrI_RICyE_0Trz8pmq1To38ln_YXoYUwnBs1N5Em9kZGRp8WYhqfCYHr-qnjct1QRFUxvbTO4h824MrCK_2WIFXd67jLfQX3y36xMsrJ7KtA4b6YPiCR7tfJ7j1w'
  },
  {
    id: 'scan-12',
    reportId: 'REP-9110',
    productName: 'Pasteurized Toned Fresh Cow Milk',
    brand: 'Mother Dairy',
    category: 'Dairy Products',
    barcode: '8901648001019',
    fssaiNumber: '10014011001895',
    fssaiValid: true,
    bestBefore: '48 Hours from Packaging',
    expiryDate: 'Nov 22, 2025',
    isExpired: false,
    vegStatus: 'Veg',
    labelLanguage: 'English & Hindi (Bilingual)',
    ingredients: 'Standardized Toned Milk, Vitamin A (Retinyl Acetate), Vitamin D2 (Ergocalciferol). Minimum 3.0% Fat, 8.5% SNF (Solids Not Fat).',
    allergens: ['Contains Milk Solids & Lactose'],
    nutritionalInfo: {
      energyKcal: 59,
      proteinG: 3.2,
      fatG: 3.0,
      carbsG: 4.8,
      sugarG: 4.8,
      sodiumMg: 50
    },
    score: 97,
    status: 'Compliant',
    confidence: 99,
    healthTags: ['Fortified with Vitamin A & D (+F Logo)', 'Minimum 3.0% Milk Fat', '8.5% Milk SNF'],
    findings: [],
    complianceChecklist: [
      {
        title: '+F Fortification Endorsement',
        status: 'Passed',
        description: 'Certified under FSSAI Food Fortification Resource Centre (+F) guidelines.'
      },
      {
        title: 'Pasteurization Temperature Check',
        status: 'Passed',
        description: 'HTST (High Temperature Short Time) pasteurization parameters validated.'
      },
      {
        title: 'FSSAI License & Logo',
        status: 'Passed',
        description: 'License 10014011001895 verified in national dairy registry.'
      }
    ],
    scannedAt: 'Nov 20, 2025',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9qN1GLBgCjWVvgZZ0uqXpiga4WOVvwiCm96ai2DEpIr7biiQLJcFj-ZMSDWJiLzBm_gvEIzJDGkyzdiX1h9otP9bBsDRioCoFUdOm7ioeGGZ5j6uN1W8P-q23hLx4MK86aFvYmboLAf7TWrnuBQVND5d5vljDwAPGLXzyQgFB2mpeNntTOh8XKB6YmJ8m8z8qGuWEHZtmO2BFmtITJ5ehag9tSQdB7mIpxVbrjB3y54UM6nqk2e1dSDzXa2vIrDAc-SQ'
  }
];

export const SAMPLE_PRODUCTS: ScanRecord[] = INITIAL_SCANS;

export const SAMPLE_PACKETS_FOR_SCANNER = [
  {
    id: 'sample-green-tea',
    name: 'Tata Tea Premium Green Tea',
    brand: 'Tata',
    category: 'Beverages / Tea',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtB6QgfUETRuqwPXdlJQj4moeBx3EEZVdwTaSN3yi_cmGGGN35xv0CeqfapRKORcXEdYgz4aHZUs5dxVNQZ_7mI9k2jFOenKs04I6UhcYuTVkmuIzP59_Kmb0YXQzrI_RICyE_0Trz8pmq1To38ln_YXoYUwnBs1N5Em9kZGRp8WYhqfCYHr-qnjct1QRFUxvbTO4h824MrCK_2WIFXd67jLfQX3y36xMsrJ7KtA4b6YPiCR7tfJ7j1w',
    fssai: '10012031000071',
    barcode: '8901203100007',
    expectedScore: 92,
    badge: '100% Compliant'
  },
  {
    id: 'sample-paneer',
    name: 'Amul Malai Paneer 200g',
    brand: 'Amul',
    category: 'Dairy Products',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCT6CxKB-o69pVK3N_HNRE7aghmEaZXNiaCkpJufgMnipyCZcSQEzD1NYlZqS6kKJ920rqVX1O02sgMYvn1oZ9L-aG4txmi7VOkBds51HJ6lJbbuG0p_o0PSJa2jTRtldeh2j1OBh6TCuCdmZwi4UiqlUpScytulz5xYvlWx3YezN6mwsttqShbgsuJ591-HNd-_XDgBGYiIsv5jDigZx8WahccoJKTpDyu8kZSaVaiqupEsVTlMQhYQ',
    fssai: '',
    barcode: '8901262010156',
    expectedScore: 54,
    badge: 'Missing FSSAI Flag'
  },
  {
    id: 'sample-kurkure',
    name: 'Kurkure Masala Munch 90g',
    brand: 'PepsiCo India',
    category: 'Snacks & Savouries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDewCj5lTJ305RHzu41MuZrmskXtX3YEm_34RgUWrQP0MJk2TNoCDL1996k4xOctT4ByJhyBHNFdNZuJVOa_lH4VwbVrXtMwlYBIbR72zZnHLLPHJC1tPyN7eger56jPPuP3slHYfx2WCMu9GF3fkxeWiX5gUYuW43ZFudKeFk7EzsGUFjGT38Cr4618fmhputBGorQ9NU3OSioQbGnbnXb6YSLtvIf1ubzXW9yCdfmN0-mkr3DpHcG3w',
    fssai: '10014031001025',
    barcode: '8901491101258',
    expectedScore: 68,
    badge: 'High Sodium Warning'
  },
  {
    id: 'sample-maggi',
    name: 'Maggi 2-Minute Masala Noodles',
    brand: 'Nestlé',
    category: 'Instant Foods',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkXUO9J06cZBey9O1BK792awex36klDKrwsUQz0Tb3weLozy2yxFGBqNQCyyCPP57csZLtHUY8E7v2z5q7sNxX6hdKuNzYvFOs0iEXVtC8ZIH4ZF3YsrjMXY1TKv8G7wWVnyr9z3zzMfGLq3rRI9K9L-o1dXNJubhuSMwVDXeWzBc_klTiPw2Dc2GDh109nWSFUEd27twAm11pF3Tn67WKfyNhYnyfYB3oe3e6rzDvfDHlcPXq8rRhmw',
    fssai: '10012011000168',
    barcode: '8901058852332',
    expectedScore: 62,
    badge: 'HFSS Caution'
  }
];

export const PRIORITY_CASES: PriorityCase[] = [
  {
    caseId: '#FC-8924',
    title: 'Missing Allergen Tag',
    product: 'Amul Malai Paneer',
    priority: 'URGENT',
    status: 'In Review',
    inspector: 'Dr. Rajesh Kumar',
    batchId: 'B-2901-AM',
    date: 'Oct 24, 2026',
    issueDescription: 'Missing Allergen Tag detected on recent batch scan. Review evidence and update compliance status.',
    evidenceImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCT6CxKB-o69pVK3N_HNRE7aghmEaZXNiaCkpJufgMnipyCZcSQEzD1NYlZqS6kKJ920rqVX1O02sgMYvn1oZ9L-aG4txmi7VOkBds51HJ6lJbbuG0p_o0PSJa2jTRtldeh2j1OBh6TCuCdmZwi4UiqlUpScytulz5xYvlWx3YezN6mwsttqShbgsuJ591-HNd-_XDgBGYiIsv5jDigZx8WahccoJKTpDyu8kZSaVaiqupEsVTlMQhYQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDewCj5lTJ305RHzu41MuZrmskXtX3YEm_34RgUWrQP0MJk2TNoCDL1996k4xOctT4ByJhyBHNFdNZuJVOa_lH4VwbVrXtMwlYBIbR72zZnHLLPHJC1tPyN7eger56jPPuP3slHYfx2WCMu9GF3fkxeWiX5gUYuW43ZFudKeFk7EzsGUFjGT38Cr4618fmhputBGorQ9NU3OSioQbGnbnXb6YSLtvIf1ubzXW9yCdfmN0-mkr3DpHcG3w'
    ]
  },
  {
    caseId: '#FC-8919',
    title: 'Expired Batch Detected',
    product: 'DairyKing Yogurt 400g',
    priority: 'HIGH',
    status: 'New',
    inspector: 'Sarah Jenkins',
    batchId: 'DK-YOG-88',
    date: 'Oct 24, 2026',
    issueDescription: 'Batch shelf life expired 14 days ago. Quarantine order recommended.',
    evidenceImages: []
  },
  {
    caseId: '#FC-8902',
    title: 'Label Smudge on Expiry Date',
    product: 'GreenFarm Spinach Frozen Pack',
    priority: 'MED',
    status: 'In Review',
    inspector: 'Praveen Sharma',
    batchId: 'GF-SP-109',
    date: 'Oct 23, 2026',
    issueDescription: 'Best before date print is illegible under standard optical character verification.',
    evidenceImages: []
  }
];
