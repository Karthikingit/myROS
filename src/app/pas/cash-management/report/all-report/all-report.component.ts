import { DatePipe } from "@angular/common";
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { NGXLogger } from "ngx-logger";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ReportFacadeService } from "../../facade/report-facade.service";
import FacadeReport from "../../model/facadeReport.model";
import Report from "../../model/report.model";
// import { ReportService } from '../../service/report.service';
import { ReportsActionCellRendererComponent } from "./reports-action-cell-renderer/reports-action-cell-renderer.component";

@Component({
  selector: "ngx-all-report",
  templateUrl: "./all-report.component.html",
  styleUrls: ["./all-report.component.scss"],
})
export class AllReportComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  deleteObj;
  public obj;
  // downloadOptions = false;
  reports$ = this.reportFacade.reportList$;
  // reports: Report[];
  reports: FacadeReport[];
  reset_report_filter = "M";
  constructor(
    private logger: NGXLogger,
    private router: Router,
    private dialogService: NbDialogService,
    private datePipe: DatePipe,
    private reportFacade: ReportFacadeService,
    private title: Title
  ) {
    this.title.setTitle("ROS - Reports");
  }

  ngOnInit(): void {
    this.reportFacade.load();
    this.reports$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.reports = data;
    });
  }

  reset_filter(s: string) {
    this.reset_report_filter = s;
  }

  gridOptions = {
    context: {
      componentParent: this,
    },
  };

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  columnDefs = [
    {
      field: "ReportName",
      headerName: "REPORT NAME",
      sortable: true,
      // checkboxSelection: true,
      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
    },
    {
      field: "DATE",
      headerName: "REPORT DATE",
      sortable: true,
      filter: "agTextColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.DATE),
    },
    {
      field: "FromDATE",
      headerName: "FROM DATE",
      sortable: true,
      filter: "agTextColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.FromDATE),
    },
    {
      field: "ToDATE",
      headerName: "TO DATE",
      sortable: true,
      filter: "agTextColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.ToDATE),
    },
    {
      field: "UserName",
      headerName: "USER NAME",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "ACTIONS",
      cellRendererFramework: ReportsActionCellRendererComponent,
    },
  ];

  // reports = [
  //   { id: 1, ReportName: 'PDQ Report Febuary', Date: '29 Feb 2021', UserName: 'Krishna Kumar' },
  //   { id: 2, ReportName: 'EPOS & Petty Csh', Date: '12 Feb 2021', UserName: 'Pratian' },
  //   { id: 3, ReportName: 'Revenu Report Jan', Date: '03 Feb 2021', UserName: 'Skill Assure' }
  // ];

  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  deleteReport(row) {
    this.deleteObj = row;
    this.dialogService.open(this.deleteContent);
  }

  gotoNewReport() {
    this.router.navigateByUrl("/accounting/report/new");
  }

  deleteReportData(d) {
    this.reports = this.reports.filter((x) => x.id != d.id);
  }

  dateFormatter(date: Date) {
    var formatted_date = this.datePipe.transform(date, "dd MMM yyyy");
    return formatted_date;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
