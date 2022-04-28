import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CalendarView } from "angular-calendar";
import { isSameDay } from "date-fns";
import { Subject } from "rxjs";
import { AttendenceFacadeService } from "../fascade/attendence-facade.service";
import { Attendance } from "../model/attendence.model";
import { AttendanceCellRendererActionsComponent } from "./attendance-cell-renderer-actions/attendance-cell-renderer-actions.component";

@Component({
  selector: "ngx-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  private readonly destroy$ = new Subject<void>();
  employeeList$ = this.attendanceFacade.attendanceList$;
  view: string = "D";
  viewDate: Date = new Date();
  dispAttendance = [];

  constructor(
    private attendanceFacade: AttendenceFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  allAttendance: any;
  ngOnInit() {
    this.refreshAttendanceData();
    this.employeeList$.pipe().subscribe((data) => {
      this.allAttendance = data;
      console.log(this.allAttendance);
      this.getAttendanceOfDay();
    });
  }

  refreshAttendanceData() {
    this.attendanceFacade.load();
  }

  getAttendanceOfDay() {
    let att = this.allAttendance.find((x) =>
      isSameDay(this.viewDate, new Date(x.attendance_date))
    );
    console.log(att);
    if (att) this.dispAttendance = att.attendance_Details.empAttendanceDetails;
    else this.dispAttendance = [];
    // allAttendance[0]?.attendance_Details?.empAttendanceDetails
  }

  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;
  views: CalendarView = CalendarView.Week;

  changeDate(d) {
    this.viewDate = d.start;
    console.log(this.viewDate);
    this.getAttendanceOfDay();
  }

  /* For Tab */
  toggleTab(evt, attDate) {
    console.log(evt);
    this.selectedDate = attDate.date;
    // console.log(this.selectedDate);
    this.viewDate = attDate.date;
    console.log(this.viewDate, this.selectedDate);
    this.getAttendanceOfDay();
  }
  selectedDate;

  checkDate(d) {
    return isSameDay(d, this.viewDate);
  }

  /* for vertical tabs display */
  changeView($event) {
    this.view = $event.target.value;
    if (this.view == "W") {
      this.selectedDate == this.viewDate;
      this.getAttendanceOfDay();
    }
  }

  /* Month Navigator */
  filterReconcileByMonth() {
    let startDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth(),
      1
    );
    let endDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1,
      0
    );
    /* console.log(endDate)
     console.log(this.viewDate);
     this.attendence = this.attendenceService.getAllAttendence().filter(x=>{
       return x.attendence_date>= startDate && x.attendence_date<= endDate;
     }) */
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
      field: "empName",
      headerName: "EMPLOYEE NAME",
      sortable: true,
      filter: true,
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
    { field: "id", headerName: "EMP ID", sortable: true, filter: true },
    {
      field: "department",
      headerName: "DEPARTMENT",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: true,
      filter: true,
      cellStyle: (params) => {
        if (params.value === "On Duty") {
          return { color: "rgba(70, 143, 73, 1)" };
        } else if (params.value === "Off Duty") {
          return { color: "rgba(162, 70, 70, 1)" };
        }
        return { color: "rgba(236, 188, 15, 1)" };
      },
    },
    {
      field: "VIEW SCHEDULE",
      cellRendererFramework: AttendanceCellRendererActionsComponent,
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

  viewCalender(a) {
    this.router.navigateByUrl(
      "/emp-management/employees/view-calender/" + a
    );
  }
}
