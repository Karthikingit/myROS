import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NbDialogModule, NbDialogService } from "@nebular/theme";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  addDays,
  differenceInDays,
  differenceInHours,
  isSameDay,
} from "date-fns";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { ShiftCalendarFacadeService } from "../../fascade/shift-calendar-facade.service";

@Component({
  selector: "ngx-shift-schedular",
  templateUrl: "./shift-schedular.component.html",
  styleUrls: ["./shift-schedular.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftSchedularComponent implements OnInit, AfterViewInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;
  constructor(
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private dialogService: NbDialogService,
    private employeeFacade: EmployeeFacadeService,
    private shiftCalendarFacadeService: ShiftCalendarFacadeService
  ) {
    Window["ShiftSchedularComponent"] = this;
  }

  ngAfterViewInit() {
    // this.updateShiftsCell();
  }

  emps;
  ids;
  addForm: FormGroup;
  empobj;

  day_string = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  view: string = "W";
  days: any = [];
  todaysDate: Date = new Date();
  allDays = [];
  allEmployee: any;
  totalHours = 0;
  totalPayroll = 0;
  event;
  empid;

  ngOnInit(): void {
    this.shiftCalendarFacadeService.allEmp$.subscribe((data) => {
      this.emps = Object.assign([], data);
      this.tempEmps = Object.assign([], data);
      console.log(this.emps);
      // this.days = this.allDays.slice(0, 7);
      this.refreshEmployeeData();
    });
    this.ref.detectChanges();
  }

  changeView($event) {
    this.view = $event.target.value;

    // if (this.view == "W")
    // this.days = Object.assign([], this.allDays);

    // if (this.view == "2W") this.days = Object.assign([], this.allDays);

    this.ref.detectChanges();
    // console.log("checking changes again");
  }

  renderEvents(dates) {
    // console.log(dates);
    this.shiftCalendarFacadeService
      .getAllShiftsBetweenTwoDates(dates.start, dates.end)
      .subscribe((data) => {
        console.log(data);
        this.allDays = this.createEvents(dates.start, dates.end, data);
        this.totalHoursAndPayroll(this.allDays);
        this.ref.detectChanges();
      });
  }
  fohEmps = [];
  bohEmps = [];
  mgmtEmps = [];
  tempEmps;
  accExpand = true;

  createEvents(start: Date, end: Date, shifts) {
    let days = [];
    let curr_date: Date = new Date(start);

    for (let i = 0; i <= differenceInDays(end, start); i++) {
      let day: any = {};
      day.day = this.day_string[curr_date.getDay()];
      day.date = new Date(curr_date);
      day.ppl = shifts.filter((s) => {
        let d = new Date(s.shiftDate);
        return isSameDay(d, curr_date);
      }).length;
      day.hrs = shifts
        .filter((s) => {
          let d = new Date(s.shiftDate);
          return isSameDay(d, curr_date);
        })
        .reduce(
          (totalHrs, s) =>
            totalHrs +
            differenceInHours(
              new Date(s.shiftEndTime),
              new Date(s.shiftStartTime)
            ),
          0
        );

      day.payroll = 400;
      day.events = shifts.filter((s) => {
        let d = new Date(s.shiftDate);
        // console.log(d, curr_date);
        return isSameDay(d, curr_date);
      });
      day.events.map((e) => {
        e.shiftDate = new Date(e.shiftDate);
        e.shiftStartTime = new Date(e.shiftStartTime);
        e.shiftEndTime = new Date(e.shiftEndTime);
      });
      days.push(day);
      curr_date = addDays(curr_date, 1);
    }
    console.log(days);
    return days;
  }

  totalHoursAndPayroll(days) {
    this.totalHours = days.reduce((sum, day) => sum + day.hrs, 0);
    this.totalPayroll = days.reduce((sum, day) => sum + day.payroll, 0);
  }

  refreshEmployeeData() {
    this.fohEmps = Object.assign(
      [],
      this.tempEmps.filter((x) => x.department == "FOH")
    );
    this.bohEmps = this.tempEmps.filter((x) => x.department == "BOH");
    this.mgmtEmps = this.tempEmps.filter((x) => x.department == "Management");

    this.ref.detectChanges();
  }

  filterEmployee(val) {
    this.tempEmps = this.emps.filter((x) => {
      let fullName =
        x.basicInfo.empDetails.firstName +
        " " +
        x.basicInfo.empDetails.lastName;
      return fullName.toLowerCase().includes(val.toLowerCase());
    });
    this.refreshEmployeeData();
    this.ref.detectChanges();
  }

  c = 1;
  test(e) {
    console.log("test", e);
  }

  getShiftEvent(id, day) {
    let event = day.events?.find((x) => x.empId === id);

    return event;
  }

  findEvent(id, day) {
    let event = day.events?.find((x) => x.empId === id);

    if (event) return true;
    else return false;
  }

  deleteShift() {
    console.log("SHift is deleted");
  }

  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  deleteShiftModal(id) {
    console.log("Opening Delete Modal");
    this.modalService.open(this.deleteContent, {
      centered: true,
      backdrop: true,
      windowClass: "shortModal",
      size: "sm",
    });
    this.ref.detectChanges();
  }

  @ViewChild("CopySchedule") CopySchedule: TemplateRef<any>;
  copySchedule() {
    this.dialogService.open(this.CopySchedule);
    this.ref.detectChanges();
  }

  @ViewChild("OpenPopup") OpenPopup: TemplateRef<any>;
  openPopup() {
    this.dialogService.open(this.OpenPopup);
    this.ref.detectChanges();
  }

  shifts;
  @ViewChild("add") add: TemplateRef<any>;
  adddata(shiftdata, empdata) {
    this.shifts = shiftdata;
    this.emps = empdata;

    this.modalService.open(this.add, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    this.addForm = new FormGroup({
      city: new FormControl(),
      name: new FormControl(
        this.emps.basicInfo.empDetails.firstName +
          " " +
          this.emps.basicInfo.empDetails.lastName
      ),
      position: new FormControl(this.emps.basicInfo.deptDetails.position),
      start_time: new FormControl(),
      end_time: new FormControl(),
      approve: new FormControl(false),
    });
    console.log("ids", this.emps);
  }
  editshift() {
    console.log("edit:", this.editForm.value);
    let startTime: Date = new Date(this.shiftdetail.shiftStartTime);
    let st = this.editForm.value.start_Time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));

    let endTime: Date = new Date(this.shiftdetail.shiftEndTime);
    let et = this.editForm.value.end_Time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));
    console.log("starttime:", st);
    console.log("endtime:", et);

    let newshift = {
      id: this.shiftdetail.id,
      location: this.editForm.value.City,
      empId: this.emp.id,
      title: "Shift Title",
      shiftType: this.editForm.value.Position,
      shiftStartTime: startTime,
      shiftEndTime: endTime,
      isApproved: this.editForm.value.approve,
    };
    if (startTime > endTime) {
      alert("wrong time! Re-enter time again");
    } else {
      this.shiftCalendarFacadeService.editShiftCalendar(
        newshift,
        this.shiftdetail.id
      );
      this.shiftCalendarFacadeService.getShiftCalendar();
      console.log("charan:", newshift);
    }
  }
  shiftdetail;
  editForm;
  emp;
  @ViewChild("edit") edit: TemplateRef<any>;
  editdate(shiftevent, empdetail) {
    this.shiftdetail = shiftevent;
    this.emp = empdetail;
    this.modalService.open(this.edit, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    console.log("shiftid:", this.shiftdetail);
    console.log("emp:", this.emp);

    this.editForm = new FormGroup({
      City: new FormControl(empdetail.basicInfo.empDetails.city),
      Name: new FormControl(empdetail.empName),
      Position: new FormControl(empdetail.basicInfo.deptDetails.position),
      start_Time: new FormControl(
        new Date(shiftevent.shiftStartTime).toString().slice(16, 21)
      ),
      end_Time: new FormControl(
        new Date(shiftevent.shiftEndTime).toString().slice(16, 21)
      ),
      approve: new FormControl(shiftevent.isApproved),
    });
    console.log(this.shiftdetail.isApproved);
  }

  addshift() {
    let startTime: Date = new Date(this.shifts.date);
    let st = this.addForm.value.start_time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));
    let endTime: Date = new Date(this.shifts.date);
    let et = this.addForm.value.end_time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));
    let new_shift = {
      location: this.addForm.value.city,
      empId: this.emps.id,
      title: "Shift Title",
      shiftType: this.addForm.value.position,
      shiftDate: this.shifts.date,
      shiftStartTime: startTime,
      shiftEndTime: endTime,
      isApproved: this.addForm.value.approve,
    };
    this.shiftCalendarFacadeService.addShiftCalendar(new_shift);
    this.shiftCalendarFacadeService.getShiftCalendar();
    console.log(new_shift);
  }
}
// emps = [
//   {
//     name: "John Doe",
//     img: "https://cdn.fakercloud.com/avatars/pcridesagain_128.jpg",
//     id: 1,
//     dept: "FOH",
//   },
//   {
//     name: "Alex Murphy",
//     img: "https://cdn.fakercloud.com/avatars/bryan_topham_128.jpg",
//     id: 2,
//     dept: "BOH",
//   },
//   {
//     name: "Aaron Hank",
//     img: "https://cdn.fakercloud.com/avatars/snowshade_128.jpg",
//     id: 3,
//     dept: "Management",
//   },
// ];

// allDays = [
//   {
//     day: "Monday",
//     date: new Date(2020, 3, 21),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//     events: [
//       {
//         date: new Date(2021, 3, 21),
//         empId: 1,
//         startTime: new Date(2021, 3, 21, 11, 15),
//         endTime: new Date(2021, 3, 21, 20, 15),
//         status: "Approved",
//       },

//       {
//         date: new Date(2021, 3, 21),
//         empId: 3,
//         startTime: new Date(2021, 3, 21, 10, 0),
//         endTime: new Date(2021, 3, 21, 20, 50),
//         status: "Approved",
//       },
//     ],
//   },
//   {
//     day: "Tuesday",
//     date: new Date(2020, 3, 22),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Wednesday",
//     date: new Date(2020, 3, 23),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//     events: [
//       {
//         date: new Date(2021, 3, 23),
//         empId: 1,
//         startTime: new Date(2021, 3, 23, 6, 0),
//         endTime: new Date(2021, 3, 23, 14, 0),
//         status: "Pending",
//       },
//     ],
//   },
//   {
//     day: "Thursday",
//     date: new Date(2020, 3, 24),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//     events: [
//       {
//         date: new Date(2021, 3, 24),
//         empId: 2,
//         startTime: new Date(2021, 3, 24, 9, 0),
//         endTime: new Date(2021, 3, 24, 20, 0),
//         status: "Approved",
//       },
//       {
//         date: new Date(2021, 3, 24),
//         empId: 3,
//         startTime: new Date(2021, 3, 24, 9, 0),
//         endTime: new Date(2021, 3, 24, 18, 0),
//         status: "Pending",
//       },
//     ],
//   },
//   {
//     day: "Friday",
//     date: new Date(2020, 3, 25),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Saturday",
//     date: new Date(2020, 3, 26),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Sunday",
//     date: new Date(2020, 3, 27),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },

//   {
//     day: "Monday",
//     date: new Date(2020, 3, 28),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Tuesday",
//     date: new Date(2020, 3, 29),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//     events: [
//       {
//         date: new Date(2021, 3, 29),
//         empId: 3,
//         startTime: new Date(2021, 3, 29, 6),
//         endTime: new Date(2021, 3, 29, 18),
//         status: "Approved",
//       },
//     ],
//   },
//   {
//     day: "Wednesday",
//     date: new Date(2020, 3, 30),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Thursday",
//     date: new Date(2020, 3, 31),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//     events: [
//       {
//         date: new Date(2021, 3, 31),
//         empId: 2,
//         startTime: new Date(2021, 3, 31, 12),
//         endTime: new Date(2021, 3, 31, 23),
//         status: "Pending",
//       },
//     ],
//   },
//   {
//     day: "Friday",
//     date: new Date(2020, 3, 32),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Saturday",
//     date: new Date(2020, 3, 33),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
//   {
//     day: "Sunday",
//     date: new Date(2020, 3, 34),
//     ppl: 2,
//     hrs: 33,
//     payroll: 700,
//   },
// ];

// events = [
//   {
//     date: new Date(2021, 3, 21),
//     empId: 1,
//     startTime: new Date(2021, 3, 21),
//     endTime: new Date(2021, 3, 21),
//     status: "Approved",
//   },
//   {
//     date: new Date(2021, 3, 24),
//     empId: 2,
//     startTime: new Date(2021, 3, 24),
//     endTime: new Date(2021, 3, 24),
//     status: "Pending",
//   },
//   {
//     date: new Date(2021, 3, 22),
//     empId: 3,
//     startTime: new Date(2021, 3, 22),
//     endTime: new Date(2021, 3, 22),
//     status: "Approved",
//   },
// ];

// c = 1;
//}
