import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AgGridCustomService } from "../../../../shared/services/ag-grid-custom.service";
import { DownloadService } from "../../../../shared/services/download.service";
import { PayrollFacadeService } from "../../fascade/payroll-facade.service";
import { Payroll } from "../../model/Payroll.model";
import { PayrollService } from "../../services/payroll.service";
import { PayrollActionCellRendererComponent } from "./payroll-action-cell-renderer/payroll-action-cell-renderer.component";

@Component({
  selector: "ngx-all-payroll",
  templateUrl: "./all-payroll.component.html",
  styleUrls: ["./all-payroll.component.scss"],
})
export class AllPayrollComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  private readonly destroy$ = new Subject<void>();
  payrollList$ = this.PayrollFacade.payrollList$;

  constructor(
    private router: Router,
    private downloadService: DownloadService,
    private agGridService: AgGridCustomService,
    private PayrollFacade: PayrollFacadeService,
    private PayrollService: PayrollService
  ) {}

  downloadOptions: boolean = false;
  allPayroll: Payroll[];
  ngOnInit() {
    this.refreshPayrollData();
    this.payrollList$.pipe().subscribe((payrollData) => {
      this.allPayroll = payrollData;
    });
  }

  refreshPayrollData() {
    this.PayrollFacade.load();
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
      field: "Report_Name",
      headerName: "REPORT NAME",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {
      field: "Start_date",
      headerName: "START DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.dateFormatter(params.data.Start_date),
    },
    {
      field: "End_date",
      headerName: "END DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.dateFormatter(params.data.End_date),
    },
    {
      field: "DOWNLOAD",
      cellRendererFramework: PayrollActionCellRendererComponent,
    },
  ];

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.resetRowHeights();
  }
  download() {
    this.downloadService.downloadCSV(this.allPayroll);
    this.downloadService.downloadExcel(this.allPayroll);
  }
  downloadEXCEL() {
    this.downloadService.downloadExcel(this.allPayroll);
  }
  downloadCSV() {
    this.downloadService.downloadCSV(this.allPayroll);
  }
  navigateToAddNew() {
    this.router.navigateByUrl("/ROS/emp-management/payroll/new-payroll");
  }
}
