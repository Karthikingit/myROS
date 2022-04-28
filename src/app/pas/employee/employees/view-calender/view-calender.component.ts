import { DatePipe } from "@angular/common";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from "angular-calendar";
import { tap } from "rxjs/operators";
import { TemperatureHumidityService } from "../../../../@core/mock/temperature-humidity.service";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { Employee } from "../../model/employee.model";

@Component({
  selector: "ngx-view-calender",
  templateUrl: "./view-calender.component.html",
  styleUrls: ["./view-calender.component.scss"],
})
export class ViewCalenderComponent implements OnInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;
  // addvacationForm!: FormGroup;
  empid;
  empobj;
  constructor(
    private employeeFacade: EmployeeFacadeService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private fb: FormBuilder
  ) {}
  allEmployee: any;
  ngOnInit(): void {
    
    this.empid = this.route.snapshot.paramMap.get("id");
    this.employeeFacade.getEmpShiftCalendar();
   
    this.employeeList$.pipe().subscribe((cashupData) => {
      this.allEmployee = cashupData;
      // console.log(this.allEmployee);
      this.empobj = this.allEmployee.find((e) => e.id == this.empid);
      if (this.empobj) this.event = this.events();
    });
  
  }
  
  datarefresh;
  e;
  
  addshift() {
    let startTime: Date = new Date(this.ids.date);
    let st = this.addForm.value.start_time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));

    let endTime: Date = new Date(this.ids.date);
    let et = this.addForm.value.end_time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));

    let new_shift = {
      location: this.addForm.value.city,
      empId: this.empobj.id,
      title: "Shift Title",
      shiftType: this.addForm.value.position,
      shiftDate: this.ids.date,
      shiftStartTime: startTime,
      shiftEndTime: endTime,
      isApproved: this.addForm.value.approve,
    };
    if(startTime>endTime){
      alert("wrong time! Re-enter time again")
    }
    else{
      this.employeeFacade.addShift(new_shift);
    this.employeeFacade.getEmpShiftCalendar();
    console.log(new_shift);
    }
    
  }
  editshift() {
    console.log("edit:", this.editForm.value)
    let startTime: Date = new Date(this.id.start);
    let st = this.editForm.value.start_Time.split(":");
    startTime.setHours(parseInt(st[0]), parseInt(st[1]));

    let endTime: Date = new Date(this.id.end);
    let et = this.editForm.value.end_Time.split(":");
    endTime.setHours(parseInt(et[0]), parseInt(et[1]));
    console.log("starttime:", startTime)
    console.log("endtime:", endTime)


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
    if(startTime>endTime){
      alert("wrong time! Re-enter time again")
    }
    else{
      this.employeeFacade.editShift(newshift , this.id.id);
      this.employeeFacade.getEmpShiftCalendar();
      console.log("charan:",newshift);
    }
   
  }
  addvacationshift() {
  
    let startTime: Date = new Date(this.addvacationForm.value.starts);
    startTime.setHours(0, 0);

    let endTime: Date = new Date(this.addvacationForm.value.ends);
    endTime.setHours(23, 59);
    console.log("starttime:", startTime)
    console.log("endtime:", endTime)


    let newshift = {
      empId: this.empobj.id,
      title: "Shift Title",
      shiftStartTime:startTime,
      shiftEndTime:endTime,
      isApproved: this.addvacationForm.value.approve,
    };
    if(startTime>endTime){
      alert("Starting Date is greater than Ending Date")
    }
    else{
      this.employeeFacade.addvacationshift(newshift);
      this.employeeFacade.getEmpShiftCalendar();
    }
   
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
    if(startTime>endTime){
      alert("Starting Date is greater than Ending Date")
    }
    else{
      this.employeeFacade.editvacationShift(newshift , this.IDs.id);
      this.employeeFacade.getEmpShiftCalendar();
      console.log("atya:",newshift);
    }
  }
  shiftid;
 
  viewAll() {
    this.employeeFacade.load();
  }
  event;
  editForm;
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
    let time =  date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    return time;
  }
  formatedate(date:Date){
    return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
  }
  id;
  ids;
  addForm;
  @Input() hourSegments: number = 1;
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
    console.log("id:",this.id.status)
  }
  addvacationForm;
  ID;
  @ViewChild("addvacation") addvacation: TemplateRef<any>;
  addvacations(s) {
    this.ID =s;
    this.modalService.open(this.addvacation, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
    this.addvacationForm = new FormGroup({
      name: new FormControl(this.empobj.empName),
      starts: new FormControl( ),
      ends: new FormControl(),
      approve: new FormControl(),
    });
    console.log("ID:", this.ID.status)
  }
  
  IDs;
  editvacationForm;
  ed:Date;
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
      Starts: new FormControl( this.ed.toISOString().slice(0,10)),
      Ends: new FormControl( this.IDs.end.toISOString().slice(0,10)),
      Approve: new FormControl(this.IDs.status),
    });
  }
  deleteobjid=null;
  @ViewChild('deleteContent') deleteContent: TemplateRef<any>;
  deleteshift(e) {
    this.deleteobjid = e;
    this.dialogService.open(this.deleteContent);
    console.log(e)
  }
  @ViewChild('addConfirmation') addConfirmation: TemplateRef<any>;

  shiftconfirmation() {
    this.dialogService.open(this.addConfirmation);
  }
  @ViewChild('vacationeditConfirmation') vacationeditConfirmation: TemplateRef<any>;

  vacationedit() {
    this.dialogService.open(this.vacationeditConfirmation);
  }
  @ViewChild('vacationaddConfirmation') vacationaddConfirmation: TemplateRef<any>;

  vacationadd() {
    this.dialogService.open(this.vacationaddConfirmation);
  }
  @ViewChild('editConfirmation') editConfirmation: TemplateRef<any>;

  shifteditconfirmation() {
    this.dialogService.open(this.editConfirmation);
  }
  deleteshifts(){
    this.employeeFacade.deleteshift(this.deleteobjid );
    this.employeeFacade.getEmpShiftCalendar();
    this.deleteobjid = null;
  }
  
  changeCity(e) {
    this.addForm.get("city").setValue(e.target.value);
    console.log(this.addForm.value.city);
    console.log(e.target.value);
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
      approve: new FormControl(false),
    });
    console.log("ids", this.ids);
  }

  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

}
 
