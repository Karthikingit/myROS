import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin } from "rxjs";
import { filter, map, shareReplay, take } from "rxjs/operators";
import { ShiftCalendar } from "../model/shift-calendar.model";
import { EmployeeService } from "../services/employee.service";
import { ShiftCalendarService } from "../services/shift-calendar.service";

@Injectable()
export class ShiftCalendarFacadeService {
  private shiftCalendarSubject$ = new BehaviorSubject<ShiftCalendar[]>([]);
  shiftCalendarList$ = this.shiftCalendarSubject$.asObservable();

  private allEmpSubject$ = new BehaviorSubject<any>([]);
  allEmpList$ = this.allEmpSubject$.asObservable();

  private allShiftSubject$ = new BehaviorSubject<any>([]);
  allShiftList$ = this.allShiftSubject$.asObservable();

  private EditShiftSubject = new BehaviorSubject<any>(null);
  EditShiftList$ = this.EditShiftSubject.asObservable();

  private dataStore = { ALL_EMP: [], ALL_SHIFT: [], ALL_SHIFT_CALENDAR: [] };

  constructor(
    private shiftCalendarService: ShiftCalendarService,
    private employeeService: EmployeeService
  ) {}

  allEmp$ = this.employeeService.getAllEmployee();
  allShift$ = this.shiftCalendarService.getAllShifts();
  allShiftCalendar$ = this.shiftCalendarService.getAllShiftCalendar();

  getAllShiftsBetweenTwoDates(sd: Date, ed: Date) {
    console.log("getting dates", sd, ed);
    return this.shiftCalendarService.getAllShifts().pipe(
      map((allShifts) =>
        allShifts.filter((shift) => {
          let d = new Date(shift.shiftDate);
          return d >= sd && d <= ed;
        })
      )
    );
  }

  getShiftCalendar() {
    forkJoin({
      allEmp: this.allEmp$,
      allShift: this.allShift$,
      allShiftCalendar: this.allShiftCalendar$,
    })
      .pipe(shareReplay())
      .subscribe(({ allEmp, allShift, allShiftCalendar }) => {
        this.dataStore.ALL_EMP = Object.assign([], allEmp);
        this.dataStore.ALL_SHIFT = Object.assign([], allShift);
        this.dataStore.ALL_SHIFT_CALENDAR = Object.assign([], allShiftCalendar);

        this.allEmpSubject$.next(Object.assign([], this.dataStore).ALL_EMP);
        this.allShiftSubject$.next(Object.assign([], this.dataStore).ALL_SHIFT);
        this.shiftCalendarSubject$.next(
          Object.assign([], this.dataStore).ALL_SHIFT_CALENDAR
        );

        this.dataStore.ALL_SHIFT_CALENDAR.map((s) => {
          s.employees.map((e) => {
            e.empDetail = this.dataStore.ALL_EMP.find((x) => x.id == e.empId);
            e.shifts.map((_shift) => {
              _shift.shiftDetail = this.dataStore.ALL_SHIFT.find(
                (x) => x.id == _shift.shiftId
              );
            });
          });
        });

        console.log("All Data is fetched");
        this.shiftCalendarSubject$.next(
          Object.assign([], this.dataStore).ALL_SHIFT_CALENDAR
        );
      });
  }

  load(): void {
    this.shiftCalendarService
      .getAllShiftCalendar()
      .pipe(take(1))
      .subscribe(
        (allShiftCalData) => {
          console.log("load is completed");
          this.dataStore.ALL_SHIFT_CALENDAR = allShiftCalData;
          return this.shiftCalendarSubject$.next(
            Object.assign([], this.dataStore).ALL_SHIFT_CALENDAR
          );
        },
        (err) => {
          console.log("err", err);
        }
      );
  }

  deleteShiftCalendar(id) {
    this.shiftCalendarService
      .deleteShiftCalendarById(id)
      .pipe()
      .subscribe(
        (e) => this.load(),
        (err) => console.log("Cannot delete employee")
      );
  }

  // searchShiftCalendar(id:number){
  //   this.shiftCalendarService.getShiftCalendarById(id)
  //   .pipe()
  //   .subscribe(
  //     e=> this.shiftCalendarSubject$.next(e),
  //     err=> console.log("Cannot Fetch ShiftCalendar")
  //   );
  // }

  addShiftCalendar(e: any) {
    this.shiftCalendarService
      .addShiftCalendar(e)
      .pipe()
      .subscribe(
        (e) => console.log(e),
        (err) => console.log(err)
      );
  }
  editShiftCalendar(e: any ,id) {
    this.shiftCalendarService
      .editShiftCalendar(e,id)
      .pipe()
      .subscribe(
        (e) => {
          console.log("shift", e);
          this.EditShiftSubject.next(e);
        },
        (err) => console.log(err)
      );
  }

}
