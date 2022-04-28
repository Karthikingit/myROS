// export default class Report {
//     id: string;
//     reportName: string;
//     reportDate: string;
//     fromDate: string;
//     toDate: string;
//     userName: string;
//     eposSegment:
//         {
//             eposChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         };
//     cashnPdqSegment:
//         {
//             eposChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         };
//     thirdPartySegment:
//         {
//             eposChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         };
//     kpiSegment:
//         {
//             eposChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         };
//     safeSummerySegment:
//         {
//             eposChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         };
// }

// export default class Report {
//     id: string;
//     reportName: string;
//     reportDate: string;
//     fromDate: string;
//     toDate: string;
//     userName: string;
//     segment: [
//         {
//             segmentName: string,
//             segmentChecked: boolean,
//             section: [
//                 {
//                     sectionName: string,
//                     sectionChecked: boolean,
//                     field: [
//                         {
//                             fieldName: string,
//                             fieldChecked: boolean,
//                         }
//                     ],
//                 }
//             ];
//         }
//     ];
// }

export default class Report {
    id: string;
    reportName: string;
    reportDate: string;
    fromDate: string;
    toDate: string;
    userName: string;
    //segment
    segmentList: [{
        segmentName: string;
        isChecked: boolean;
    }];
    //sectors
    sales: {
        ischecked: boolean;
        foodPayment: string;
        drinksPayment: string;
        takeAwayPayment: string;
        otherPayment: string;
    };
    taxInfo: {
        isChecked: boolean;
        tax: Tax[];
    };
    tips: {
        isChecked: boolean;
        serviceCharges: string;
        creditCardTip: string;
    };
    cashnPdq: {
        isChecked: boolean;
        pettyCashs: PettyCash[];
        tillSystems: Till[];
        pdqSystems: PDQ[];
        wageAdvances: Wages[];
    };
    thirdPartyInfo: {
        isChecked: boolean;
        thirdParty: ThirdParty[];
    };
    kpi: {
        isChecked: boolean;
        kpiCovers: KpiCovers[];
        complaints: Complaints[];
        breakDownDetails: BreakDownDetails[];
    };
    safeSummary: {
        isChecked: boolean;
        safeCount: string;
        safeTillAmount: string;
        bankedAmount: string;
        witnessId: string;
    };
    pendingDepo: {
        isChecked: boolean;
        pendingDeposit: string;
    };
    banking: {
        isChecked: boolean;

        giroSlipNumber: number;
        bankingTotal: number;
        bankedTotal: number;
        cashupSheetDate: number;
        sealedBy: number;
    };
    // budget:string;
}

export class Segment {
    segmentName: string;
    isChecked: boolean;
}

export class Tax {
    name: string;
    // amount: number;
}

export class PettyCash {
    // amount: number;
    pettyCashName: string;
    // documents: Document[];
}

export class Till {
    // amount: number;
    name: string;
}

export class PDQ {
    // amount: number;
    cardName: string;
    name: string;
}

export class Wages {
    employeeId: string;
    // amount: number;
}

export class ThirdParty {
    // amount: number;
    name: string;
}
export class Complaints {
    complaintName: string;
    // description: string;
}

export class KpiCovers {
    // amount: number;
    kpiName: string;
}

export class BreakDownDetails {
    name: string;
    // billNumber: number;
    // breakDownReason: string;
    // amount: number;
    // document: Document;
}


let sirsReportJSON = [
    {
        id: 1,
        report_date: new Date(2021, 2, 29),
        report_name: "PDQ Report Febuary",
        user_name: "Krishna Kumar",
        EposConfig:
        {
            section: [
                {
                    sectionName: "Sales",
                    isChecked: true,
                    field: [
                        {
                            fieldName: "Food",
                            isChecked: true,
                        },
                        {
                            fieldName: "Drinks",
                            isChecked: true,
                        },
                    ],
                },
                {
                    sectionName: "Tax",
                    isChecked: true,
                    field: [
                        {
                            fieldName: "Vat",
                            isChecked: true,
                        },
                        {
                            fieldName: "GST",
                            isChecked: true,
                        },
                    ],
                },
            ],
        },
        cashnPdqConfig:
        {
            section: [
                {
                    sectionName: "Sales",
                    isChecked: true,
                    field: [
                        {
                            fieldName: "Food",
                            isChecked: true,
                        },
                        {
                            fieldName: "Drinks",
                            isChecked: true,
                        },
                    ],
                },
                {
                    sectionName: "Tax",
                    isChecked: true,
                    field: [
                        {
                            fieldName: "Vat",
                            isChecked: true,
                        },
                        {
                            fieldName: "GST",
                            isChecked: true,
                        },
                    ],
                },
            ],
        },

    },
];

let reportJSON = [
    {
        id: 1,
        report_date: new Date(2021, 2, 29),
        report_name: "PDQ Report Febuary",
        user_name: "Krishna Kumar",
        segment: [
            {
                segmentName: "EPOS",
                isChecked: true,
                section: [
                    {
                        sectionName: "Sales",
                        isChecked: true,
                        field: [
                            {
                                fieldName: "Food",
                                isChecked: true,
                            },
                            {
                                fieldName: "Drinks",
                                isChecked: true,
                            },
                        ],
                    },
                    {
                        sectionName: "Tax",
                        isChecked: true,
                        field: [
                            {
                                fieldName: "Vat",
                                isChecked: true,
                            },
                            {
                                fieldName: "GST",
                                isChecked: true,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];


class ShowDiv {
    Epos: boolean;
    food: boolean;
    drinks: boolean;
    takeAway: boolean;
    others: boolean;
    vat: boolean;
    seviceCharges: boolean;
    creditCardTips: boolean;


    PettyCash: boolean;
    foodDrink: boolean;
    repair: boolean;
    maintenance: boolean;
    sundries: boolean;


    Pdq: boolean;
    debit: boolean;
    visa: boolean;
    amex: boolean;


    ThirdPartyTakings: boolean;
    zomato: boolean;
    delivaro: boolean;


    PendingDeposit: boolean;


    BankingDetails: boolean;
    giroSlipNumber: boolean;
    bankingTotal: boolean;
    bankedTotal: boolean;
    cashupSheetDate: boolean;
    sealedBy: boolean;

}