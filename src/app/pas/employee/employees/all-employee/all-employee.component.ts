import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { Employee } from "../../model/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeActionCellRendererComponent } from "./employee-action-cell-renderer/employee-action-cell-renderer.component";

@Component({
  selector: "ngx-all-employee",
  templateUrl: "./all-employee.component.html",
  styleUrls: ["./all-employee.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AllEmployeeComponent implements OnInit {
  value = "";
  gridApi: any;
  gridColumnApi: any;
  deleteCashupObj;
  private readonly destroy$ = new Subject<void>();
  employeeList$ = this.employeeFacade.employeeList$;

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
    private employeeFacade: EmployeeFacadeService
  ) {}

  /** list of employees */
  allEmployee: Employee[];
  dispEmployee: Employee[];
  deptBOH: boolean;
  deptFOH: boolean;
  DeptMgmt: Boolean;

  searchEmployee: any = "";
  selectedDepartment = [];

  ngOnInit(): void {
    this.refreshEmployeeData();
    this.employeeList$.pipe().subscribe((data) => {
      this.allEmployee = Object.assign([], data);
      this.dispEmployee = Object.assign([], data);
      console.log("Employee List is updated");
    });

    console.log(this.allEmployee);
  }

  refreshEmployeeData() {
    this.employeeFacade.load();
  }

  viewAll() {
    this.dispEmployee = Object.assign([], this.allEmployee);
  }

  onEnter(value: any) {
    this.searchEmployee = value;
    this.filterEmployee();
  }

  selectedDept(val) {
    this.selectedDepartment = val;
    if (val == "all") {
      this.deptBOH = true;
      this.deptFOH = true;
      this.DeptMgmt = true;
    }
    this.filterEmployee();
  }

  filterEmployee() {
    let tempEmp = this.allEmployee.filter(
      (x) =>
        x.id == this.searchEmployee ||
        x.empName.toLowerCase().includes(this.searchEmployee.toLowerCase())
    );

    this.dispEmployee = tempEmp.filter(
      (x) =>
        this.selectedDepartment.includes("all") ||
        this.selectedDepartment.length == 0 ||
        this.selectedDepartment.includes(x.department)
    );
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
      field: "ACTIONS",
      cellRendererFramework: EmployeeActionCellRendererComponent,
    },
  ];

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("params:" + params.empName);

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    this.gridApi.sizeColumnsToFit();
    this.gridApi.resetRowHeights();
  }

  editEmployee(a) {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/edit-employee/" + a
    );
  }

  viewEmployee(a) {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/view-employee/" + a
    );
  }
  viewCalender(a) {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/view-calender/" + a
    );
  }

  addNewEmp() {
    this.router.navigateByUrl("/ROS/emp-management/employees/add-employee");
  }

  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  deleteEmployee(row) {
    this.deleteCashupObj = row;
    this.dialogService.open(this.deleteContent);
  }

  deleteEmployeeData(d) {
    console.log(d, " Has been deleted");
    //this.employeeService.deleteEmployeeById(d.id);
    this.employeeFacade.deleteEmployee(d.id);
    //this.refreshEmployeeData();
  }
}
