import { DatePipe } from "@angular/common";
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import All_Cashup from "../../model/all-cashup.model";
import { CashupService } from "../../service";
import { DownloadService } from "../../../../shared/services/download.service";
import { CashupActionCellRendererComponentComponent } from "./cashup-action-cell-renderer-component/cashup-action-cell-renderer-component.component";
import { NbDialogService } from "@nebular/theme";
import { CashupFacadeService } from "../../facade/cashup-facade.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { PrivilegeFacadeService } from "../../../auth/facade/privilege-facade.service";
import { NgxPermissionsService } from "ngx-permissions";
import { CashUp } from "../../model/cashup.model";
import { AgGridCustomService } from "../../../../shared/services/ag-grid-custom.service";
import { AuthFacadeService } from "../../../auth/facade/auth-facade.service";
import { NGXLogger } from "ngx-logger";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "ngx-all-cashup",
  templateUrl: "./all-cashup.component.html",
  styleUrls: ["./all-cashup.component.scss"],
})
export class AllCashupComponent implements OnInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();
  cashupList$ = this.cashupFacade.cashupList$;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef;
  deleteCashupObj;
  configurations: any;
  currSym: any;
  cashupsDownObj =[];

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private dialogService: NbDialogService,
    private downloadService: DownloadService,
    private cashupFacade: CashupFacadeService,
    private agGridService: AgGridCustomService,
    private authFacade: AuthFacadeService,
    private logger: NGXLogger,
    private snackBar: MatSnackBar
  ) {
    this.defaultColDef = this.agGridService.defaultColDef;
  }

  downloadOptions: boolean = false;

  @Input() date_range = {
    start_date: new Date(),
    end_date: new Date(),
  };

  @Input() allCashup: CashUp[] = [];

  ngOnInit(): void {
    //this.refreshBankingData();
    // this.cashupList$.pipe(takeUntil(this.destroy$)).subscribe((cashupData) => {
    //   this.allCashup = Object.assign([], cashupData);
    //   this.allCashup = this.allCashup.filter(
    //     (x) => x.cashUpStatus === "DRAFT" || x.cashUpStatus === "PUBLISHED"
    //   );
    //   this.allCashup.map((x) => {
    //     // x.eposTotal = this.cashupFacade.getCashupTotals(x).epos;
    //     // x.cashTotal = this.cashupFacade.getCashupTotals(x).cash;
    //     // x.pdqTotal = this.cashupFacade.getCashupTotals(x).pdq;
    //     // x.deliveryTotal = this.cashupFacade.getCashupTotals(x).delivery;
    //     // x.difference = this.cashupFacade.getCashupTotals(x).difference;
    //     // x.kpiTotal = this.cashupFacade.getCashupTotals(x).kpi_total;
    //   });
    //   this.logger.log(this.allCashup);
    //});
    this.configurations = this.authFacade.getRestaurant().configurations;

    this.currSym = this.configurations.currency_sym;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
  ngOnChanges(): void {
    this.logger.log("hii",this.allCashup);
    // this.filterByDateRange(this.date_range);
  }

  // refreshBankingData() {
  //   this.cashupFacade.load();
  // }

  gridOptions = {
    context: {
      componentParent: this,
    },
  };

  columnDefs = [
    {
      field: "cashUpDate",
      headerName: "DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      valueFormatter: (params) =>
        this.agGridService.dateFormatter(params.data.cashUpDate),
    },
    {
      field: "cashUpTimeIndicator",
      headerName: "TIME",
      sortable: true,
      filter: true,
    },
    {
      field: "epostotal",
      headerName: "EPOS",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatter(
          params.data.epostotal,
          this.currSym
        ),
    },
    {
      field: "cashtotal",
      headerName: "CASH",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatter(
          params.data.cashtotal,
          this.currSym
        ),
    },
    {
      field: "pdqtotal",
      headerName: "PDQ",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatter(
          params.data.pdqtotal,
          this.currSym
        ),
    },
    {
      field: "deliverytotal",
      headerName: "DELIVERY",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatter(
          params.data.deliverytotal,
          this.currSym
        ),
    },
    {
      field: "difference",
      headerName: "DIFFERENCE",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatterclr(
          params.data.difference,
          this.currSym
        ),
      cellStyle: (params) => {
        if (params.value < 0) {
          return { color: "#A24646" };
        } else if (params.value == 0) {
          return { color: "#000000" };
        } else {
          return { color: "#468F49" };
        }
      },
    },
    {
      field: "kpitotal",
      headerName: "KPI TOTAL",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.currencyFormatter(
          params.data.kpitotal,
          this.currSym
        ),
    },
    //{ field: 'VOID',sortable: true, filter: 'agNumberColumnFilter',  valueFormatter: params => this.currencyFormatter(params.data.VOID, '£') },
    //{ field: 'DISCOUNT',sortable: true, filter: 'agNumberColumnFilter',  valueFormatter: params => this.currencyFormatter(params.data.DISCOUNT, '£') },
    //{ field: 'REFUNDS',sortable: true, filter: 'agNumberColumnFilter',  valueFormatter: params => this.currencyFormatter(params.data.REFUNDS, '£') },
    {
      field: "cashUpStatus",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },

    {
      field: "ACTIONS",
      cellRendererFramework: CashupActionCellRendererComponentComponent,
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

  formatDownloadData() {
    this.cashupsDownObj = [];
    let i = 0;//remove this when given proper colunm header with actiual emp or emp id
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    console.log("selected data", selectedData);
    if (selectedData?.length > 0) {
      selectedData.forEach((x) => {
        let cashupObj = {};
        cashupObj["Date"] = x.cashUpDate.toString().slice(0, 10);
        cashupObj["Time"] = x.cashUpTimeIndicator;

        x.sales.forEach((y) => {
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
        cashupObj["Epos Total"] = this.currSym + " " + x.epostotal;

        x.cashnPdq.pettyCashs.forEach((y) => {
          cashupObj[y.pettyCashName] = this.currSym + " " + y.amount;
        });

        x.cashnPdq.tillSystems.forEach((y) => {
          cashupObj[y.name] = this.currSym + " " + y.amount;
        });
        cashupObj["Cash Total"] = this.currSym + " " + x.cashtotal;

        x.cashnPdq.pdqSystems.forEach((y) => {
          cashupObj[y.name + ": " + y.cardName] = this.currSym + " " + y.amount;
        });
        cashupObj["PDQ Total"] = this.currSym + " " + x.pdqtotal;

        x.cashnPdq.wageAdvances.forEach((y) => {
          cashupObj["Wage: Employee " + i++] = this.currSym + " " + y.amount;//remove this(column name) and give colunm header with actiual emp or emp id
        });
        i = 0;//remove this and give colunm header with actiual emp or emp id
        x.thirdPartyInfo.forEach((y) => {
          cashupObj[y.name] = this.currSym + " " + y.amount;
        });
        cashupObj["Delivery Total"] = this.currSym + " " + x.deliverytotal;

        x.kpi.kpiCovers.forEach((y) => {
          cashupObj[y.kpiName] = this.currSym + " " + y.amount;
        });
        x.kpi.breakDownDetails.forEach((y) => {
          // refund and discount breakdow will have names in excel, same as they are in the backend/api
          //suggestion provide id for, whether its a refund or discount breakdow
          cashupObj[y.name] = this.currSym + " " + y.amount;
        });
        cashupObj["KPI Total"] = this.currSym + " " + x.kpitotal;

        cashupObj["Safe Count"] = this.currSym + " " + x.safeSummary.safeCount;
        cashupObj["Safe Till Amount"] = this.currSym + " " + x.safeSummary.safeTillAmount;
        cashupObj["Banked Amount"] = this.currSym + " " + x.safeSummary.bankedAmount;
        //check if safe summery total is available, the display,
        cashupObj["Difference"] = this.currSym + " " + x.difference;
        cashupObj["Reason"] = x.reason;
        cashupObj["Reason By"] = x.reasonAddedBy;
        cashupObj["Status"] = x.cashUpStatus;

        this.cashupsDownObj.push(cashupObj);

      });
      console.log("Downable allCashup data", this.cashupsDownObj)
      console.log("allCashup data", this.allCashup)
    } else {
      this.snackBar.open("Please make selection before download", "Close", {
        duration: 2000,
      });
    }

  }

  editCashup(cashup: CashUp) {
    this.router.navigateByUrl("/accounting/cashup/edit", {
      state: cashup,
    });
  }

  viewCashup(cashup: CashUp) {
    this.router.navigateByUrl("/accounting/cashup/view", {
      state: cashup,
    });
  }

  filterCashData(status) {
    this.allCashup = this.allCashup.filter((x) => x.cashUpStatus == status);
  }

  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  deleteCashup(row) {
    this.deleteCashupObj = row;
    this.dialogService.open(this.deleteContent);
  }
  deleteCashupData(d) {
    //this.allCashup = this.allCashup.filter((x) => x.id != d.id);
    // this.logger.log(d, "has been deleted");
    this.cashupFacade.deleteCashup(d.id);
    // console.log("d.id", d.id);
  }

  // deleteCashupData(d) {
  //   console.log(d, " Has been deleted");
  //   this.CashupService.deleteCashupById(d.id);
  //   this.refreshBankingData();
  // }

  download() {
    this.downloadService.downloadCSV(this.allCashup);
    this.downloadService.downloadExcel(this.allCashup);
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
  navigateToAddNew() {
    this.router.navigateByUrl("/accounting/cashup");
  }
  filterByDateRange(range) {
    this.cashupFacade.filterByDateRange(range);
  }
}
