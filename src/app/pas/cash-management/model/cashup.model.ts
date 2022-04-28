export class CashUp {
  id: string;
  cashUpDate: Date;
  cashUpStatus: string;
  cashUpTimeIndicator: string;
  reason: string;
  reasonAddedBy: string;
  restaurantId: string;

  sales: [
    {
      foodPayment: number;
      drinksPayment: number;
      takeAwayPayment: number;
      otherPayment: number;
      serviceCharges: number;
      creditCardTip: number;
      taxInfo: Tax[];
    }
  ];
  cashnPdq: {
    pettyCashs: PettyCash[];
    tillSystems: Till[];
    pdqSystems: PDQ[];
    wageAdvances: Wages[];
  };
  thirdPartyInfo: ThirdParty[];
  kpi: {
    kpiCovers: KpiCovers[];
    complaints: Complaints[];
    breakDownDetails: BreakDownDetails[];
  };
  safeSummary: {
    safeTillAmount: number;
    safeCount: number;
    bankedAmount: number;
    witnessId: number;
  };

  cashtotal: number;
  epostotal: number;
  deliverytotal: number;
  pdqtotal: number;
  kpitotal: number;
  difference: number;
}

export class Till {
  amount: number;
  name: string;
}

export class PettyCash {
  amount: number;
  pettyCashName: string;
  documents: Document[];
}

export class PDQ {
  amount: number;
  cardName: string;
  name: string;
}

export class ThirdParty {
  amount: number;
  name: string;
}

export class Complaints {
  complaintName: string;
  description: string;
}

export class KpiCovers {
  amount: number;
  kpiName: string;
}

export class Document {
  url: string;
}

export class BreakDownDetails {
  name: string;
  billNumber: number;
  breakDownReason: string;
  amount: number;
  document: Document;
}

export class Wages {
  // employeeId: number;
  employeeId: string;
  amount: number;
}
export class Tax {
  name: string;
  amount: number;
}
