import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { NGXLogger } from "ngx-logger";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CashupFacadeService } from "../../facade/cashup-facade.service";
import All_Cashup from "../../model/all-cashup.model";
import { CashUp } from "../../model/cashup.model";
import { ReportService } from "../../service/report.service";

// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// import * as _moment from 'moment';
// import { default as _rollupMoment } from 'moment';

// const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: "ngx-new-report",
  templateUrl: "./new-report.component.html",
  styleUrls: ["./new-report.component.scss"],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class NewReportComponent implements OnInit, OnDestroy {
  [x: string]: any;
  // startDate = new FormControl(moment());
  // endDate = new FormControl(moment());

  private readonly destroy$ = new Subject<void>();
  cashupList$ = this.cashupFacade.cashupList$;
  allCashup: CashUp[];

  startDate = new FormControl("", [Validators.required]);
  endDate = new FormControl("", [Validators.required]);

  reports = [];
  report;
  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private report_service: ReportService,
    private logger: NGXLogger,
    private cashupFacade: CashupFacadeService
  ) {}

  ngOnInit(): void {
    this.cashupFacade.load();
    this.cashupList$.pipe(takeUntil(this.destroy$)).subscribe((cashupData) => {
      this.allCashup = cashupData;
    });
    //  this.reports = this.report_service.getAllReports();
    // this.id = 1;
    // this.report = this.report_service.getReportById(this.id);
  }
  onSubmit() {
    // this.logger.log.log("ok");
    if (this.saveCheck()) {
      // also check for start and end date entered
      //good to go for save
    } else {
      // raise an alert, must select a field
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  @ViewChild("saveContent") saveContent: TemplateRef<any>;
  saveReport() {
    // this.deleteObj = row;
    this.dialogService.open(this.saveContent);
  }

  onChecked(obj: any, isChecked: boolean) {
    this.showDiv[obj] = isChecked;
  }

  saveCheck() {
    if (
      this.showDiv.Epos ||
      this.showDiv.PettyCash ||
      this.showDiv.Pdq ||
      this.showDiv.ThirdPartyTakings ||
      this.showDiv.PendingDeposit ||
      this.showDiv.BankingDetails
    )
      return true;
    else return false;
  }
  allreports() {
    this.router.navigateByUrl("/accounting/report/home");
  }

  showDiv = {
    Epos: false,
    food: true,
    drinks: true,
    takeAway: true,
    others: true,
    vat: true,
    seviceCharges: true,
    creditCardTips: true,

    PettyCash: false,
    foodDrink: true,
    repair: true,
    maintenance: true,
    sundries: true,

    Pdq: false,
    debit: true,
    visa: true,
    amex: true,

    ThirdPartyTakings: false,
    zomato: true,
    delivaro: true,

    PendingDeposit: false,

    BankingDetails: false,
    giroSlipNumber: true,
    bankingTotal: true,
    bankedTotal: true,
    cashupSheetDate: true,
    sealedBy: true,
  };

  PdqTaking = [
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10756,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10345,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10987,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10756,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10345,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10567,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10765,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10245,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10567,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10232,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10878,
      sealed_by: "John Doe",
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10234,
      sealed_by: "John Doe",
    },
  ];
}
