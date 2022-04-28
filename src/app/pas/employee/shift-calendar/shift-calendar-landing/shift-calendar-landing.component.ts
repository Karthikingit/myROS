import { DatePipe } from "@angular/common";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarView, DateFormatterParams } from "angular-calendar";
import { shareReplay, take } from "rxjs/operators";
import { AgGridCustomService } from "../../../../shared/services/ag-grid-custom.service";
import { DownloadService } from "../../../../shared/services/download.service";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { ShiftCalendarFacadeService } from "../../fascade/shift-calendar-facade.service";
import { Employee } from "../../model/employee.model";
import { ShiftCalendar } from "../../model/shift-calendar.model";
import { ShiftCalenderActionRendererComponent } from "./shift-calender-action-renderer/shift-calender-action-renderer.component";

@Component({
  selector: "ngx-shift-calendar-landing",
  templateUrl: "./shift-calendar-landing.component.html",
  styleUrls: ["./shift-calendar-landing.component.scss"],
})
export class ShiftCalendarLandingComponent implements OnInit {
  tab: string;
  gridApi: any;
  gridColumnApi: any;
  rowSelection = "multiple";
  defaultColDef;
  @Input() hourSegments: number = 1;
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  shifts = [
    { id: 1, name: "Shrangi", ts: 10, tl: 1, status: "Published" },
    { id: 2, name: "Amit", ts: -10, tl: 1, status: "Draft" },
    { id: 3, name: "Ayush", ts: -10, tl: 1, status: "Draft" },
  ];

  gridOptions = {
    context: {
      componentParent: this
    }
  }

  columnDefs = [
    {
      field: "weekStart",
      headerName: "WEEK START",
      sortable: true,
      filter: "agDateColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      valueFormatter: (params) =>
        this.agGridService.dateFormatter(params.data.weekStart),
    },
    {
      field: "weekEnd",
      headerName: "WEEK END",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) =>
        this.agGridService.dateFormatter(params.data.weekEnd),
    },
    {
      field: "totalShift",
      headerName: "TOTAL SHIFT",
      sortable: true,
      filter: true,
    },
    {
      field: "totalLeaves",
      headerName: "TOTAL LEAVES",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: true,
      filter: true,
      cellStyle: (params) => {
        if (params.value == "Published") {
          return { color: "green" };
        }
        return {};
      },
    },

    {
      field: "ACTIONS",
      cellRendererFramework: ShiftCalenderActionRendererComponent,
    },
  ];

  // filterData($event){
  //   this.allShiftCalendar.filter(emp=> emp.sheet_date>= $event.start_date && emp.sheet_date<= $event.end_date  )
  // }
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;
  allEmployee
  shiftCalendarList$ = this.shiftCalendarFacadeService.shiftCalendarList$;
  allShiftCalendar: ShiftCalendar[];
  constructor(
    private agGridService: AgGridCustomService,
    private shiftCalendarFacadeService: ShiftCalendarFacadeService,
    private downloadService: DownloadService,
    private employeeFacade: EmployeeFacadeService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dialogService: NbDialogService

  ) {
    this.defaultColDef = this.agGridService.defaultColDef;
  }

  download() {
    this.downloadService.downloadCSV(this.allShiftCalendar);
    this.downloadService.downloadExcel(this.allShiftCalendar);
  }
  ngOnInit(): void {

    this.refreshEmployeeData();
    this.shiftCalendarList$.pipe(take(2)).subscribe((data) => {
      this.allShiftCalendar = data;
      console.log("New data is recieved");
    });
    this.employeeFacade.getEmpShiftCalendar();

    this.employeeList$.pipe().subscribe((cashupData) => {
      this.allEmployee = cashupData;
      // console.log(this.allEmployee);
      this.empobj = this.allEmployee.find((e) => e.id == 2);
      if (this.empobj) this.event = this.events();
      // console.log("empobj:", this.empobj);
      // console.log("dep", this.empobj.basicInfo.deptDetails.position);
    });
  }

  refreshEmployeeData() {
    this.shiftCalendarFacadeService.load();
  }
  formatedate(date:Date){
    return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
  }
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

  selectedTab($event) {
    this.tab = $event;
  }
  ids;
  addForm;
  addshift() {
    console.log("addform:",this.addForm.value)
    let startTime: Date = new Date(this.ids.date);
    let st = this.addForm.value.start_time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));
    console.log("start:", st)

    let endTime: Date = new Date(this.ids.date);
    let et = this.addForm.value.end_time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));
    console.log("end:",et)

    let new_shift = {
      location: this.addForm.value.city,
      empId: this.empobj.id,
      title: "Shift Title",
      shiftType: this.addForm.value.position,
      shiftDate: this.ids.date,
      shiftStartTime: startTime,
      shiftEndTime: endTime,
      isApproved: false,
    };
    this.employeeFacade.addShift(new_shift);
    this.employeeFacade.getEmpShiftCalendar();
   
    console.log(new_shift);
  }
  @ViewChild("add") add: TemplateRef<any>;
  adddata(c) {
    this.ids = c;

    this.modalService.open(this.add, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    this.addForm = new FormGroup({
      city: new FormControl(),
      name: new FormControl(this.empobj.empName),
      department: new FormControl(this.empobj.department),
      position: new FormControl(this.empobj.basicInfo.deptDetails.position),
      start_time: new FormControl(),
      end_time: new FormControl(),
      approve: new FormControl(),
    });
    
    console.log("ids", this.ids);
  }
  empobj;
  event;
  events() {
    this.event = [];
    for (let i = 0; i < this.empobj.shifts.length; i++) {
      const event = {
        id: "",
        start: null,
        end: null,
        punchin: "9:10",
        punchout: "20:10",
        status: "",
      };
      event.id = this.empobj.shifts[i].id;
      event.start = new Date(this.empobj.shifts[i].shiftStartTime);
      event.end = new Date(this.empobj.shifts[i].shiftEndTime);
      event.punchin = "9:10";
      event.punchout = "20:10";
      event.status = this.empobj.shifts[i].isApproved;
      this.event.push(event);
    }
    console.log(this.event);

    return this.event;
  }
  dateFormatter(date: Date) {
    console.log("date:",date )
    return date.getHours()+":"+date.getMinutes();
  }
  id;
  editForm;
  editshift() {
    console.log("edit:", this.editForm.value)
    let startTime: Date = new Date(this.id.start);
    let st = this.editForm.value.start_Time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));

    let endTime: Date = new Date(this.id.end);
    let et = this.editForm.value.end_Time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));

    let newshift = {
      id: this.id.id,
      location: this.editForm.value.City,
      empId: this.empobj.id,
      title: "Shift Title",
      shiftType: this.editForm.value.Position,
      shiftDate: this.id.date,
      shiftStartTime:startTime,
      shiftEndTime:endTime,
      isApproved: this.editForm.value.approve,
    };
    this.employeeFacade.editShift(newshift , this.id.id);
    this.employeeFacade.getEmpShiftCalendar();
    console.log("charan:",newshift);
  }
  @ViewChild("edit") edit: TemplateRef<any>;
  editdate(b) {
    this.id = b;
    this.modalService.open(this.edit, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    this.editForm = new FormGroup({
      City: new FormControl(this.empobj.basicInfo.empDetails.city),
      Name: new FormControl(this.empobj.empName),
      Position: new FormControl(this.empobj.basicInfo.deptDetails.position),
      start_Time: new FormControl(new Date( this.id.start).toString().slice(16,21)),
      end_Time: new FormControl(new Date( this.id.end).toString().slice(16,21)),
      approve: new FormControl(this.id.status),
    });
    console.log(this.id)
  }
  deleteobjid = null;
  @ViewChild('deleteContent') deleteContent: TemplateRef<any>;
  deleteshift(e) {
    this.deleteobjid = e;
    this.dialogService.open(this.deleteContent);
    console.log(e)
  }
  deleteshifts(){
    this.employeeFacade.deleteshift(this.deleteobjid );
    this.employeeFacade.getEmpShiftCalendar();
    this.deleteobjid = null;
  }
  editvacationshift() {
  
    let startTime: Date = new Date(this.editvacationForm.value.Starts);
    startTime.setHours(0, 0);

    let endTime: Date = new Date(this.editvacationForm.value.Ends);
    endTime.setHours(23, 59);
    console.log("starttime:", startTime)
    console.log("endtime:", endTime)


    let newshift = {
      id: this.IDs.id,
      empId: this.empobj.id,
      title: "Shift Title",
      shiftStartTime:startTime,
      shiftEndTime:endTime,
      isApproved: this.editvacationForm.value.Approve,
    };
    this.employeeFacade.editvacationShift(newshift , this.IDs.id);
    this.employeeFacade.getEmpShiftCalendar();
    console.log("atya:",newshift);
  }
  IDs;
  ed:Date;
  editvacationForm;
  @ViewChild("editvacation") editvacation: TemplateRef<any>;
  editvacations(d) {
  this.IDs =d
    this.modalService.open(this.editvacation, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    this.ed = new Date(this.IDs.start);
    this.ed.setDate(this.ed.getDate()+1)
    this.editvacationForm = new FormGroup({
      names: new FormControl(this.empobj.empName),
      Starts: new FormControl(this.ed.toISOString().slice(0,10)  ),
      Ends: new FormControl(this.IDs.end.toISOString().slice(0,10) ),
      Approve: new FormControl(this.IDs.status),
    });
  }
  @ViewChild('addConfirmation') addConfirmation: TemplateRef<any>;

  shiftconfirmation() {
    this.dialogService.open(this.addConfirmation);
  }
  @ViewChild('vacationeditConfirmation') vacationeditConfirmation: TemplateRef<any>;

  vacationedit() {
    this.dialogService.open(this.vacationeditConfirmation);
  }
 
  @ViewChild('editConfirmation') editConfirmation: TemplateRef<any>;

  shifteditconfirmation() {
    this.dialogService.open(this.editConfirmation);
  }
  
}
