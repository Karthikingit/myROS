import { DatePipe } from "@angular/common";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { RequestFacadeService } from "../fascade/request-facade.service";
import All_Request from "../model/request.model";
import { RequestService } from "../services/request.service";
import { RequestActionCellRendererComponent } from "./request-action-cell-renderer/request-action-cell-renderer.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LeavesActionCellComponent } from "./leaves-action-cell/leaves-action-cell.component";
import { ProfileActionCellComponent } from "./profile-action-cell/profile-action-cell.component";
import { id } from "@swimlane/ngx-charts";
import { MyleavesActionCellComponent } from "./myleaves-action-cell/myleaves-action-cell.component";
import { MyprofileActionCellComponent } from "./myprofile-action-cell/myprofile-action-cell.component";
import { MyshiftsActionCellComponent } from "./myshifts-action-cell/myshifts-action-cell.component";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "ngx-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent implements OnInit {
  constructor(
    public datepipe: DatePipe,
    public requestFacade: RequestFacadeService,
    public requestService: RequestService,
    private router: Router,
    private modalService: NgbModal,
    private dialogService: NbDialogService
  ) {}
  date = new Date();
  tab = "EMPLOYEES";
  selectedCard = "SHIFTS";
  gridApi: any;
  gridColumnApi: any;
  private readonly destroy$ = new Subject<void>();
  requestList$ = this.requestFacade.requestList$;
  showIcon: boolean = false;
  showApprove: boolean = true;
  showReject: boolean = true;

  allRequest: All_Request[];
  request: All_Request[];
  empobj;
  allEmployee;
  event: All_Request[];
  ngOnInit(): void {
    this.refreshRequestData();
    this.requestList$.pipe().subscribe((payrollData) => {
      this.allRequest = payrollData;
      console.log(this.allRequest);
    });
    this.requestList$.pipe().subscribe((payrollData) => {
      this.request = payrollData;
      this.empobj = this.request.filter((e) => e.id == 2);
      if (this.empobj) this.event = this.empobj;
      console.log("charan:", this.event);
    });
  }
  refreshRequestData() {
    this.requestFacade.load();
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

  Shift_columnDefs = [
    {
      field: "empName",
      headerName: "EMPLOYEE NAME",
      sortable: true,
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRenderer: (params) => {
        return (
          `<img src="` +
          params.data.empImgUrl +
          `" width="25px" height="25px" style="border-radius: 50%;">` +
          "  " +
          params.data.empName
        );
      },
    },
    {
      field: "id",
      headerName: "EMP ID",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      field: "department",
      headerName: "DEPARTMENT",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "Shift_date",
      headerName: "SHIFT DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.Shift_date),
    },
    {
      field: "Start_time",
      headerName: "START TIME",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => this.timeFormatter(params.data.Start_time),
    },
    {
      field: "End_Time",
      headerName: "END TIME",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => this.timeFormatter(params.data.End_Time),
    },
    {
      field: "Shift_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: RequestActionCellRendererComponent,
    },
  ];
  Shift1_columnDefs = [
    {
      headerName: "SR NO.",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: "Shift_date",
      headerName: "SHIFT DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.Shift_date),
    },
    {
      field: "Start_time",
      headerName: "START TIME",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => this.timeFormatter(params.data.Start_time),
    },
    {
      field: "End_Time",
      headerName: "END TIME",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => this.timeFormatter(params.data.End_Time),
    },
    {
      field: "Shift_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: MyshiftsActionCellComponent,
    },
  ];
  @ViewChild("edits") edits: TemplateRef<any>;
  edit() {
    this.modalService.open(this.edits, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
  @ViewChild("viewleaves") viewleaves: TemplateRef<any>;
  viewLeaves() {
    this.modalService.open(this.viewleaves, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  delete() {
    this.dialogService.open(this.deleteContent);
  }
  @ViewChild("editshifts") editshifts: TemplateRef<any>;
  editShifts() {
    this.modalService.open(this.editshifts, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
  @ViewChild("viewshifts") viewshifts: TemplateRef<any>;
  viewShifts() {
    this.modalService.open(this.viewshifts, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
  @ViewChild("deleteshifts") deleteshifts: TemplateRef<any>;
  deleteShifts() {
    this.dialogService.open(this.deleteshifts);
  }
  @ViewChild("deleteprofile") deleteprofile: TemplateRef<any>;
  deleteProfile() {
    this.dialogService.open(this.deleteprofile);
  }
  editprofile() {
    this.router.navigateByUrl("/ROS/emp-management/employees/edit-employee/2");
  }
  viewprofile() {
    this.router.navigateByUrl("/ROS/emp-management/profile");
  }

  Leaves_columnDefs = [
    {
      field: "empName",
      headerName: "EMPLOYEE NAME",
      sortable: true,
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRenderer: (params) => {
        return (
          `<img src="` +
          params.data.empImgUrl +
          `" width="25px" height="25px" style="border-radius: 50%;">` +
          "  " +
          params.data.empName
        );
      },
    },
    {
      field: "id",
      headerName: "EMP ID",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      field: "department",
      headerName: "DEPARTMENT",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "Start_date",
      headerName: "START DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.Start_date),
    },
    {
      field: "End_date",
      headerName: "END DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.End_date),
    },
    {
      field: "Leave_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: LeavesActionCellComponent,
    },
  ];
  Leaves1_columnDefs = [
    {
      headerName: "SR NO.",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: "Start_date",
      headerName: "START DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.Start_date),
    },
    {
      field: "End_date",
      headerName: "END DATE",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => this.dateFormatter(params.data.End_date),
    },
    {
      field: "Leave_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: MyleavesActionCellComponent,
    },
  ];

  Profile_columnDefs = [
    {
      field: "empName",
      headerName: "EMPLOYEE NAME",
      sortable: true,
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRenderer: (params) => {
        return (
          `<img src="` +
          params.data.empImgUrl +
          `" width="25px" height="25px" style="border-radius: 50%;">` +
          "  " +
          params.data.empName
        );
      },
    },
    {
      field: "id",
      headerName: "EMP ID",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      field: "department",
      headerName: "DEPARTMENT",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "Profile_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: ProfileActionCellComponent,
    },
  ];
  Profile1_columnDefs = [
    {
      headerName: "SR NO.",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: "department",
      headerName: "DEPARTMENT",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "Profile_status",
      headerName: "STATUS",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "ACTIONS",
      cellRendererFramework: MyprofileActionCellComponent,
    },
  ];

  rowSelection = "multiple";

  dateFormatter(date: Date) {
    let now_date = this.datepipe.transform(date, "dd MMMM yyyy");
    return now_date;
  }

  timeFormatter(date: Date) {
    let d = new Date(date);
    return (
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  }

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

  @ViewChild("addShift") addShift: TemplateRef<any>;
  viewShiftRequest(a) {
    this.modalService.open(this.addShift, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }

  @ViewChild("addLeaves") addLeaves: TemplateRef<any>;
  viewLeavesRequest(a) {
    this.modalService.open(this.addLeaves, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }

  @ViewChild("addProfile") addProfile: TemplateRef<any>;
  viewProfileRequest(a) {
    this.modalService.open(this.addProfile, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }

  setSelectedCard(s: string) {
    this.selectedCard = s;
  }

  setTab(s: string) {
    this.tab = s;
    if (s === "MY REQUEST") this.setSelectedCard("SHIFTS1");
    else this.setSelectedCard("SHIFTS");
  }

  ShowApproved() {
    this.showIcon = true;
    this.showReject = false;
  }

  ShowRejected() {
    this.showIcon = true;
    this.showApprove = false;
  }
}
