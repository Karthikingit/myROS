import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DownloadService } from '../../../../shared/services/download.service';
import { ReportFacadeService } from '../../facade/report-facade.service';
import FacadeReport from '../../model/facadeReport.model';
import Report from '../../model/report.model';
import { ReportService } from '../../service/report.service';
@Component({
  selector: 'ngx-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  reports$ = this.reportFacade.reportList$;

  downloadOptions: boolean = false;
  reports: FacadeReport[];
  id;
  report: FacadeReport;
  // report: Report;
  viewReport;

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.reports = this.report_service.getAllReports();

    this.reportFacade.load();
    this.reports$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.reports = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.logger.log("Selected ID: " + this.id);

    this.report_service.getReportById(this.id).pipe(take(1)).subscribe
      (
        data => {
          this.report = data;
        }
      );

    this.viewReport = this.report_service.getDummyReportById(this.id);
    this.logger.log(this.viewReport)

    this.logger.log(this.report)

    this.reports.forEach(element => {
      if (element.id == this.id) {
        this.showDiv = element.showDiv;
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private report_service: ReportService,
    private logger: NGXLogger,
    private downloadService: DownloadService,
    private reportFacade: ReportFacadeService,
  ) { }

  downloadEXCEL() {
    this.downloadService.downloadExcel(this.viewReport);
  }

  showDiv = {
    Epos: false,
    food: false,
    drinks: false,
    takeAway: false,
    others: false,
    vat: false,
    seviceCharges: false,
    creditCardTips: false,

    PettyCash: false,
    foodDrink: false,
    repair: false,
    maintenance: false,
    sundries: false,

    Pdq: false,
    debit: false,
    visa: false,
    amex: false,

    ThirdPartyTakings: false,
    zomato: false,
    delivaro: false,
    // justEat: false,

    PendingDeposit: false,

    BankingDetails: false,
    giroSlipNumber: false,
    bankingTotal: false,
    bankedTotal: false,
    cashupSheetDate: false,
    sealedBy: false,
  };

  tabledata: any = [{
    "n1": "01 Feb2021",
    "n2": "AM",
    "n3": "20",
    "n4": "25",
    "n5": "25",
    "n6": "28"
  },
  {
    "n1": "01 Feb2021",
    "n2": "AM",
    "n3": "25",
    "n4": "25",
    "n5": "25",
    "n6": "28"
  },
  {
    "n1": "01 Feb2021",
    "n2": "AM",
    "n3": "20",
    "n4": "21",
    "n5": "28",
    "n6": "90"
  },
  {
    "n1": "01 Feb2021",
    "n2": "AM",
    "n3": "25",
    "n4": "25",
    "n5": "25",
    "n6": "28"
  },
  {
    "n1": "01 Feb2021",
    "n2": "AM",
    "n3": "25",
    "n4": "25",
    "n5": "25",
    "n6": "28"
  }


  ]

  PdqTaking = [
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10756,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10345,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10987,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10756,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10345,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10567,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10765,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10245,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10567,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10232,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10878,
      sealed_by: "John Doe"
    },
    {
      sheet_date: new Date(2020, 12, 1),
      debit_card: 10,
      visa: 10,
      amex: 10,
      giroSlipNumber: 10234,
      sealed_by: "John Doe"
    },

  ]

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}


