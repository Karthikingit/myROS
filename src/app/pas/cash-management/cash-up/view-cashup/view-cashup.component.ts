import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { DownloadService } from "../../../../shared/services/download.service";
import { AuthFacadeService } from "../../../auth/facade/auth-facade.service";
import { CashupFacadeService } from "../../facade/cashup-facade.service";
@Component({
  selector: "ngx-view-cashup",
  templateUrl: "./view-cashup.component.html",
  styleUrls: ["./view-cashup.component.scss"],
})
export class ViewCashupComponent implements OnInit {
  downloadOptions: boolean = false;
  cashupsDownObj = [];
  cash_obj;
  currSym;
  code;
  view_obj;
  configurations;
  pdq_cards;
  pdqs;
  date;
  Epos_Talkings;
  Tills;
  PdqSystems;
  Wages;
  Petty;
  Third_Party;
  Covers;
  refund;
  discount;
  cashupindicator;

  constructor(
    private logger: NGXLogger,
    private authService: AuthFacadeService,
    private router: Router,
    private cashupFacade: CashupFacadeService,
    private r: ActivatedRoute,
    private downloadService: DownloadService,
  ) {
    this.cash_obj = this.router.getCurrentNavigation().extras.state;
    this.logger.log(
      "View Cash Obj",
      this.router.getCurrentNavigation(),
      this.router.url,
      this.cash_obj
    );
    if (this.cash_obj === undefined) {
      this.router.navigateByUrl("/accounting/cashup", {
        state: { viewState: "ALL" },
      });
    }
  }
  complaints;
  reasons;

  ngOnInit(): void {
    this.configurations = this.authService.getRestaurant().configurations;
    this.currSym = this.configurations.currency_sym;
    this.code = this.configurations.company_code;
    this.complaints = this.configurations.complaints;
    this.reasons = this.configurations.reasons;

    this.pdq_cards = this.configurations.pdq_card.sort((a, b) =>
      a.field_name.localeCompare(b.field_name)
    );
    this.pdqs = this.configurations.pdqs.sort((a, b) =>
      a.field_name.localeCompare(b.field_name)
    );

    // this.cash_obj.cashnPdq.wageAdvances.map((x) => {
    //   let wage = {};
    //   wage["Emp_id"] = x.employeeId;
    //   wage["Emp_Name"] = "John Doe";
    //   wage["Department_Name"] = "Management";
    //   wage["Advance_Provided"] = x.amount;
    //   this.Wage.push();
    // });

    this.Epos.push({
      id: "",
      title: "Food",
      value: this.cash_obj.sales[0].foodPayment,
    });

    this.Epos.push({
      id: "",
      title: "Drinks",
      value: this.cash_obj.sales[0].drinksPayment,
    });

    this.Epos.push({
      id: "",
      title: "Take Away",
      value: this.cash_obj.sales[0].takeAwayPayment,
    });

    this.Epos.push({
      id: "",
      title: "Other ",
      value: this.cash_obj.sales[0].otherPayment,
    });

    this.Epos.push({
      id: "",
      title: "Take Away",
      value: this.cash_obj.sales[0].takeAwayPayment,
    });

    this.cash_obj.sales[0].taxInfo?.forEach((x) => {
      this.Epos.push({
        id: "",
        title: x.name,
        value: x.amount,
      });
    });

    this.Epos.push({
      id: "",
      title: "Service Charges",
      value: this.cash_obj.sales[0].serviceCharges,
    });
    this.Epos.push({
      id: "",
      title: "CC Tip",
      value: this.cash_obj.sales[0].creditCardTip,
    });

    // Wage Advances
    this.cash_obj.cashnPdq.wageAdvances?.map((x) => {
      this.Wage.push({
        id: x.employeeId,
        name: "Johhn Doe",
        dept: "Management",
        adv: x.amount,
      });
    });

    // Petty Cash
    this.cash_obj.cashnPdq.pettyCashs?.map((x) => {
      this.PettyCash.push({
        id: "",
        title: x.pettyCashName,
        value: x.amount,
      });
    });

    //Till
    this.cash_obj.cashnPdq.tillSystems?.map((x) => {
      this.Till.push({
        id: "",
        title: x.name,
        value: x.amount,
      });
    });

    //ThirdParty
    this.cash_obj.thirdPartyInfo?.map((x) => {
      this.TPT.push({
        id: "",
        title: x.name,
        value: x.amount,
      });
    });

    //Covers
    this.cash_obj.kpi.kpiCovers?.map((x) => {
      this.Cover.push({
        id: "",
        title: x.kpiName,
        value: x.amount,
      });
    });

    //Refund Breakdown
    // this.cash_obj.kpi.breakDownDetails?.map((x) => {
    //   let refund = {};
    //   refund["Bill Number"] = x.billNumber;
    //   refund["Reason"] = x.breakDownReason;
    //   refund["Amount"] = x.amount;
    //   this.Refund.push();
    // });
    this.cash_obj.kpi.breakDownDetails?.map((x) => {
      let res = this.reasons.find((r) => r.code == x.breakDownReason);
      this.Refund.push({
        id: "",
        name: x.name,
        billnumber: x.billNumber,
        reason: res ? res.value : x.breakDownReason,
        amount: x.amount,
      });
    });

    //Discount Breakdown
    // this.cash_obj.kpi.breakDownDetails?.map((x) => {
    //   let discount = {};
    //   discount["Bill Number"] = x.billNumber;
    //   discount["Reason"] = x.breakDownReason;
    //   discount["Amount"] = x.amount;
    //   this.Discount.push();
    // });
    this.cash_obj.kpi.breakDownDetails.map((x) => {
      let res = this.reasons.find((r) => r.code == x.breakDownReason);
      this.Discount.push({
        id: "",
        name: x.name,
        billnumber: x.billNumber,
        reason: res ? res.value : x.breakDownReason,
        amount: x.amount,
      });
    });

    // PDQ Takings
    this.pdqs.map((pdq) => {
      let obj = { pdq: "", fields: [] };
      obj.pdq = pdq.field_name;

      let f = [];
      this.pdq_cards.map((card) => {
        f.push({
          name: card.field_name,
          value: this.cash_obj.cashnPdq.pdqSystems.find(
            (y) => y.cardName == card.field_name && y.name == pdq.field_name
          )?.amount,
        });
      });
      obj.fields = f;

      this.PDQ.push(obj);
    });

    // pdq: "iZettle",
    // fields: [
    //   { name: "Amex", value: 200 },
    //   { name: "Visa", value: 100 },
    //   { name: "Master Card", value: 300 },
    // ],

    this.Epos_Talkings = this.cashupFacade.getCashupTotals(this.cash_obj).epos;
    this.Tills = this.cashupFacade.getCashupTotals(this.cash_obj).cash;
    this.PdqSystems = this.cashupFacade.getCashupTotals(this.cash_obj).pdq;
    this.Petty = this.cashupFacade.getCashupTotals(this.cash_obj).petty;
    this.Wages = this.cashupFacade.getCashupTotals(this.cash_obj).wages;
    this.Third_Party = this.cashupFacade.getCashupTotals(
      this.cash_obj
    ).third_party;
    this.Covers = this.cashupFacade.getCashupTotals(this.cash_obj).covers;
    this.refund = this.cashupFacade.getCashupTotals(
      this.cash_obj
    ).refund_breakdown;
    this.discount = this.cashupFacade.getCashupTotals(
      this.cash_obj
    ).discount_breakdown;
    this.date = this.cash_obj.cashUpDate;
    this.cashupindicator = this.cash_obj.cashUpTimeIndicator;
    this.logger.log("date:", this.date);
    this.logger.log("code:", this.configurations);
  }
  Date = [];
  Epos = [];
  // Epos = [
  //   {
  //     id: "1",
  //     title: "Food",
  //     value: 25.0,
  //   },
  //   {
  //     id: "2",
  //     title: "Drinks",
  //     value: 20.0,
  //   },
  //

  PettyCash = [];
  // {
  //   id: "1",
  //   title: "Food & Drinks",
  //   value: 10.0,
  // },

  Till = [];
  // {
  //   id: "1",
  //   title: "Till 1",
  //   value: 10.0,
  // },

  Wage = [];
  // Wage = [
  //   {
  //     id: "E101",
  //     name: "Johhn Doe",
  //     dept: "Management",
  //     adv: 20,
  //   },

  // ];

  PDQ = [];

  // {
  //   pdq: "Voucher",
  //   fields: [
  //     { name: "Amex", value: 300 },
  //     { name: "Visa", value: 200 },
  //     { name: "Master Card", value: 100 },
  //   ],
  // },

  TPT = [];
  // {
  //   id: "1",
  //   title: "Zomato",
  //   value: 90.0,
  // },

  Cover = [];
  // {
  //   id: "1",
  //   title: "Take Out",
  //   value: 90.0,
  // },

  Refund = [];
  // {
  //   id: "1",
  //   title6: "Bill Number",
  //   refund: 10000001,
  //   refunds: 10000002,
  // },

  // {
  //   id: "4",
  //   title6: "Attachement",
  //   attachement: `<i class="material-icons" type="button">attachment</i>`,
  // },

  Discount = [];
  // {
  //   id: "1",
  //   title8: "Bill Number",
  //   discount: 10000001,
  //   discounts: 10000002,
  // },

  // {
  //   id: "4",
  //   title8: "Attachement",
  //   attachement: `<i class="material-icons" type="button">attachment</i>`,
  // },

  formatDownloadData(){
    this.logger.log("view cashup Download works");
    this.logger.log("Raw Cashup data",this.cash_obj);
    this.cashupsDownObj = [];
    let cashupObj = {};
    let i=0;
  
      cashupObj["Date"] = this.cash_obj.cashUpDate.toString().slice(0, 10);
      cashupObj["Time"] = this.cash_obj.cashUpTimeIndicator;

      this.cash_obj.sales.forEach((y) => {
        cashupObj["Food"] = this.currSym + " " + y.foodPayment;
        cashupObj["Drinks"] = this.currSym + " " + y.drinksPayment;
        cashupObj["Take away"] = this.currSym + " " + y.takeAwayPayment;
        cashupObj["Others"] = this.currSym + " " + y.otherPayment;
        y.taxInfo.forEach((taxes) => {
          cashupObj[taxes.name] = this.currSym + " " + taxes.amount;
        });
        cashupObj["CC Tip"] = this.currSym + " " + y.creditCardTip;
        cashupObj["Service Charge"] = this.currSym + " " + y.serviceCharges;
      });
      cashupObj["Epos Total"] = this.currSym + " " + this.cash_obj.epostotal;

      this.cash_obj.cashnPdq.pettyCashs.forEach((y) => {
        cashupObj[y.pettyCashName] = this.currSym + " " + y.amount;
      });

      this.cash_obj.cashnPdq.tillSystems.forEach((y) => {
        cashupObj[y.name] = this.currSym + " " + y.amount;
      });
      cashupObj["Cash Total"] = this.currSym + " " + this.cash_obj.cashtotal;

      this.cash_obj.cashnPdq.pdqSystems.forEach((y) => {
        cashupObj[y.name + ": " + y.cardName] = this.currSym + " " + y.amount;
      });
      cashupObj["PDQ Total"] = this.currSym + " " + this.cash_obj.pdqtotal;

      this.cash_obj.cashnPdq.wageAdvances.forEach((y) => {
        cashupObj["Wage: Employee " + i++] = this.currSym + " " + y.amount;//remove this(column name) and give colunm header with actiual emp or emp id
      });
      i = 0;//remove this and give colunm header with actiual emp or emp id
      this.cash_obj.thirdPartyInfo.forEach((y) => {
        cashupObj[y.name] = this.currSym + " " + y.amount;
      });
      cashupObj["Delivery Total"] = this.currSym + " " + this.cash_obj.deliverytotal;

      this.cash_obj.kpi.kpiCovers.forEach((y) => {
        cashupObj[y.kpiName] = this.currSym + " " + y.amount;
      });
      this.cash_obj.kpi.breakDownDetails.forEach((y) => {
        // refund and discount breakdow will have names in excel, same as they are in the backend/api
        //suggestion provide id for, whether its a refund or discount breakdow
        cashupObj[y.name] = this.currSym + " " + y.amount;
      });
      cashupObj["KPI Total"] = this.currSym + " " + this.cash_obj.kpitotal;

      cashupObj["Safe Count"] = this.currSym + " " + this.cash_obj.safeSummary.safeCount;
      cashupObj["Safe Till Amount"] = this.currSym + " " + this.cash_obj.safeSummary.safeTillAmount;
      cashupObj["Banked Amount"] = this.currSym + " " + this.cash_obj.safeSummary.bankedAmount;
      //check if safe summery total is available, the display,
      cashupObj["Difference"] = this.currSym + " " + this.cash_obj.difference;
      cashupObj["Reason"] = this.cash_obj.reason;
      cashupObj["Reason By"] = this.cash_obj.reasonAddedBy;
      cashupObj["Status"] = this.cash_obj.cashUpStatus;

      this.cashupsDownObj.push(cashupObj);

    this.logger.log("Downable Cashup data",this.cashupsDownObj);
    // this.downloadService.downloadExcel(this.cashupsDownObj);
  }
  downloadEXCEL() {
    this.formatDownloadData();
    if(this.cashupsDownObj.length >0)
    this.downloadService.newDownloadExcel(this.cashupsDownObj, "CashUp");
  }
  downloadCSV() {
    this.formatDownloadData();
    if(this.cashupsDownObj.length >0)
    this.downloadService.newDownloadCSV(this.cashupsDownObj, "CashUp");
  }
}
