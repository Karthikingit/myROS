import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, forkJoin } from "rxjs";
import { shareReplay, take } from "rxjs/operators";
import { Employee } from "../model/employee.model";
import { EmployeeService } from "../services/employee.service";
import { ShiftCalendarService } from "../services/shift-calendar.service";

@Injectable()
export class EmployeeFacadeService  {
  private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  employeeList$ = this.employeeListSubject.asObservable();

  public empshiftCalendarSubject$ = new BehaviorSubject<Employee[]>([]);
  empshiftCalendarList$ = this.empshiftCalendarSubject$.asObservable();

  private employeeAddShiftSubject = new BehaviorSubject<Employee>(null);
  employeeAddShift$ = this.employeeAddShiftSubject.asObservable();

  private employeeEditShiftSubject = new BehaviorSubject<any>(null);
  employeeEditShift$ = this.employeeEditShiftSubject.asObservable();

  private empDelShiftSubject = new BehaviorSubject<number>(null);
  empDelShift$ = this.empDelShiftSubject.asObservable();

  private dataStore = { allEmployee: [] };

  // map(emp=> {return {id:emp.id, name:emp.empName, department:emp.department} as Employee;

  // employeeListAction$ = combineLatest([
  //   this.employeeList$,
  //   this.employeeAdd$,
  //   this.empDel$,
  // ]).pipe(
  //   map(([employeeList, employeeAdd, empDel]) => {
  //     if (employeeAdd === null && empDel === null) {
  //       return employeeList;
  //     } else if (empDel != null) {
  //       // console.log("Del", employeeList.filter(x=> x.id != empDel));
  //       let emps = [...employeeList.filter((x) => x.id != empDel)];
  //       console.log("Updated the employee list");
  //       // this.employeeListSubject.next(emps);
  //       return emps;
  //     } else {
  //       return [...employeeList, employeeAdd];
  //     }
  //   })
  // );

  private employeeSubject = new BehaviorSubject<any>({});
  employee$ = this.employeeSubject.asObservable();

  constructor(
    private employeeService: EmployeeService,
    private shiftCalendarService: ShiftCalendarService
  ) {}
  allEmp$;
  allShift$;
  allEmpShiftCalendar$;

  getEmpShiftCalendar() {
    let ALL_EMP;
    let ALL_SHIFT;

    this.allEmp$ = this.employeeService.getAllEmployee();
    this.allShift$ = this.shiftCalendarService.getAllShifts();

    forkJoin({
      allEmp: this.allEmp$,
      allShift: this.allShift$,
    })
      .pipe(shareReplay())
      .subscribe(({ allEmp, allShift }) => {
        ALL_EMP = allEmp;
        ALL_SHIFT = allShift;

        ALL_EMP.map((e) => {
          let shifts = ALL_SHIFT.filter((s) => s.empId === e.id);
          e.shifts = shifts;
        });

        console.log("EMPLOYEE SHIFT CALENDAR Data is fetched");
        console.log("EMP", ALL_EMP);
        this.empshiftCalendarSubject$.next(ALL_EMP);
      });
  }
  load(): void {
    this.employeeService
      .getAllEmployee()
      .pipe(take(1))
      .subscribe(
        (empList) => {
          console.log("load data completed");
          this.dataStore.allEmployee = empList;
          return this.employeeListSubject.next(
            Object.assign({}, this.dataStore).allEmployee
          );
        },
        (err) => {
          console.log("err", err);
        }
      );
  }

  deleteEmployee(id) {
    this.employeeService
      .deleteEmployeeById(id)
      .pipe()
      .subscribe(
        (e) => {
          this.dataStore.allEmployee.forEach((e, i) => {
            if (e.id === id) {
              this.dataStore.allEmployee.splice(i, 1);
            }
          });
          this.employeeListSubject.next(
            Object.assign({}, this.dataStore).allEmployee
          );
          console.log("Employee is deleted");
        },
        (err) => console.log("Cannot delete employee")
      );
  }

  searchEmployee(id: number) {
    this.employeeService
      .getEmployById(id)
      .pipe()
      .subscribe(
        (e) => this.employeeSubject.next(e),
        (err) => console.log("Cannot Fetch Employee")
      );
  }

  addEmployee(e: any) {
    this.employeeService
      .addEmployee(e)
      .pipe()
      .subscribe(
        (e) => {
          console.log(e);
          this.dataStore.allEmployee.push(e);
          this.employeeListSubject.next(
            Object.assign({}, this.dataStore).allEmployee
          );
        },
        (err) => console.log(err)
      );
  }
  addShift(e: any) {
    this.employeeService
      .addShift(e)
      .pipe()
      .subscribe(
        (e) => {
          console.log("shift", e);
          this.employeeAddShiftSubject.next(e);
        },
        (err) => console.log(err)
      );
  }
  addvacationshift(e: any) {
    this.employeeService
      .addvacationshift(e)
      .pipe()
      .subscribe(
        (e) => {
          console.log("addvacation", e);
          this.employeeAddShiftSubject.next(e);
        },
        (err) => console.log(err)
      );
  }
  deleteshift(id) {
    this.employeeService
      .deleteshiftById(id)
      .pipe()
      .subscribe(
        (e) => {
          console.log(e);
          this.empDelShiftSubject.next(id);
        },
        (err) => console.log("Cannot delete employee")
      );
  }
  editShift(e: any ,id ) {
    this.employeeService
      .editShift(e,id)
      .pipe()
      .subscribe(
        (e) => {
          console.log("shift", e);
          this.employeeEditShiftSubject.next(e);
        },
        (err) => console.log(err)
      );
  }
  editvacationShift(e: any ,id ) {
    this.employeeService
      .editvacationShift(e,id)
      .pipe()
      .subscribe(
        (e) => {
          console.log("shift", e);
          this.employeeEditShiftSubject.next(e);
        },
        (err) => console.log(err)
      );
  }
}

