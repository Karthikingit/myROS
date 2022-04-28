import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormService {
  constructor() {}

  setDecimal($event) {
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }

  a = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    cashUpDate: "2020-05-17T12:21:36.795Z",
    cashUpStatus: "DRAFT",
    cashUpTimeIndicator: "PM",
    sales: [
      {
        foodPayment: 12,
        drinksPayment: 110,
        takeAwayPayment: 20,
        otherPayment: 30,
        serviceCharges: 10,
        creditCardTip: 10,
        taxInfo: [
          {
            name: "Vat",
            amount: 10,
          },
        ],
      },
    ],
    cashnPdq: {
      pettyCashs: [
        {
          amount: 10,
          documents: [
            {
              url: "string",
            },
          ],
          pettyCashName: "Food & Drinks",
        },
      ],
      tillSystems: [
        {
          amount: 20,
          name: "Till 1",
        },
      ],
      pdqSystems: [
        {
          amount: 10,
          cardName: "Amex",
          name: "iZettle",
        },
      ],
      wageAdvances: [
        {
          amount: 20,
          employeeId: "E100",
        },
      ],
    },
    thirdPartyInfo: [
      {
        amount: 20,
        name: "Zomato",
      },
    ],
    kpi: {
      kpiCovers: [
        {
          amount: 20,
          kpiName: "Covers",
        },
      ],
      complaints: [
        {
          complaintName: "COMPLAINT1",
          description: "string",
        },
      ],
      breakDownDetails: [
        {
          name: "refund_breakdown",
          billNumber: 10,
          breakDownReason: "REASON1",
          amount: 29,
          document: {
            url: "string",
          },
        },
      ],
    },
    safeSummary: {
      safeTillAmount: 30,
      safeCount: 20,
      bankedAmount: 20,
      witnessId: 30,
    },
    reason: "27 June",
    reasonAddedBy: "John Doe",
    restaurantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };
}
