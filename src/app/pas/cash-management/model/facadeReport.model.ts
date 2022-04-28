export default class FacadeReport {
    id: number;
    ReportName: string;
    DATE: Date;
    FromDATE: Date;
    ToDATE: Date;
    UserName: string;
    showDiv: ShowDiv;
}

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