import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AgGridCustomService } from '../../../../shared/services/ag-grid-custom.service';
import { PayrollFacadeService } from '../../fascade/payroll-facade.service';
import { Payroll } from '../../model/Payroll.model';
import { PayrollService } from '../../services/payroll.service';
import 'jspdf-autotable';
import jspdf from 'jspdf';
import { EmployeeFacadeService } from '../../fascade/employee-facade.service';
import { Employee } from '../../model/employee.model';
import { NbDialogService } from '@nebular/theme';
import { NewPayrollActionCellRendererComponent } from './new-payroll-action-cell-renderer/new-payroll-action-cell-renderer.component';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "ngx-new-payroll",
  templateUrl: "./new-payroll.component.html",
  styleUrls: ["./new-payroll.component.scss"],
})
export class NewPayrollComponent implements OnInit {
  value = "";
  isShow: boolean = false;
  //Shift
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  checkedListJSON: any; // Whole Shift json structure
  //Bank
  masterSelectedB1: boolean;
  checklistB1: any;
  masterSelectedB2: boolean;
  checklistB2: any;
  checkedListB1: any;
  checkedListB2: any;
  checkedListJSONB1: any; // Whole Bank1 stringfy json structure
  checkedListJSONB2: any; // Whole Bank1 stringfy json structure
  //Basic Info
  masterSelectedD1: boolean;
  checklistD1: any;
  masterSelectedD2: boolean;
  checklistD2: any;
  masterSelectedD3: boolean;
  checklistD3: any;
  masterSelectedD4: boolean;
  checklistD4: any;
  checkedListD1: any;
  checkedListD2: any;
  checkedListD3: any;
  checkedListD4: any;
  checkedListJSOND1: any; // Whole detail1 stringfy json structure
  checkedListJSOND2: any; // Whole detail1 stringfy json structure
  checkedListJSOND3: any; // Whole detail1 stringfy json structure
  checkedListJSOND4: any; // Whole detail1 stringfy json structure
  //grid
  gridApi: any;
  gridColumnApi: any;
  deleteCashupObj;
  private readonly destroy$ = new Subject<void>();
  employeeList$ = this.employeeFacade.employeeList$;
  getAllChecked: any;
  getAllCheckedBank: any;
  getAllCheckedDetails: any;
  addReportName: FormGroup;
 
 

  constructor(
    private employeeFacade: EmployeeFacadeService,
    private agGridService: AgGridCustomService,
    private PayrollFacade: PayrollFacadeService,
    private PayrollService: PayrollService,
    private dialogService: NbDialogService,
    private modalService: NgbModal
  ) {
    //shifts
    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: "Shift Type", isSelected: true },
      { id: 2, value: "Date", isSelected: true },
      { id: 3, value: "Location", isSelected: false },
      { id: 4, value: "Start Time", isSelected: false },
      { id: 5, value: "End Time", isSelected: false },
      { id: 6, value: "Break", isSelected: false },
      { id: 7, value: "Approved", isSelected: false },
    ];
    this.getCheckedItemList();

    //Bank
    this.masterSelectedB1 = false;

    this.checklistB1 = [
      { id: 1, value: "Bank Name", isSelected: true },
      { id: 2, value: "Branch Account", isSelected: true },
      { id: 3, value: "Account Holder Name", isSelected: false },
      { id: 4, value: "Branch Sort Code", isSelected: false },
      { id: 5, value: "Account Number", isSelected: false },
    ];
    this.getCheckedItemListBank1();
    this.masterSelectedB2 = false;
    this.checklistB2 = [
      { id: 1, value: "Employee Salary", isSelected: false },
      { id: 2, value: "Hourly Salary", isSelected: false },
      { id: 3, value: "Fixed Salary", isSelected: false },
    ];
    this.getCheckedItemListBank2();

    //Basic Details
    this.masterSelectedD1 = false;
    this.checklistD1 = [{ id: 1, value: "Joining Date", isSelected: true }];
    this.getCheckedItemListDetails1();
    this.masterSelectedD2 = false;
    this.checklistD2 = [
      { id: 1, value: "First Name", isSelected: true },
      { id: 2, value: "Middle Name", isSelected: false },
      { id: 3, value: "Last Name", isSelected: false },
      { id: 3, value: "Address", isSelected: false },
      { id: 3, value: "Zip Code", isSelected: false },
      { id: 3, value: "Town/City", isSelected: false },
      { id: 3, value: "State/Region", isSelected: false },
      { id: 3, value: "Country", isSelected: false },
      { id: 3, value: "Email", isSelected: false },
      { id: 3, value: "Mobile Number", isSelected: false },
      { id: 3, value: "Telephone", isSelected: false },
    ];
    this.getCheckedItemListDetails2();
    this.masterSelectedD3 = false;
    this.checklistD3 = [
      { id: 1, value: "Department", isSelected: true },
      { id: 2, value: "Position", isSelected: false },
      { id: 3, value: "Location", isSelected: false },
    ];
    this.getCheckedItemListDetails3();
    this.masterSelectedD4 = false;
    this.checklistD4 = [
      { id: 1, value: "First Name", isSelected: true },
      { id: 2, value: "Middle Name", isSelected: false },
      { id: 3, value: "Last Name", isSelected: false },
      { id: 3, value: "Address", isSelected: false },
      { id: 3, value: "Zip Code", isSelected: false },
      { id: 3, value: "Town/City", isSelected: false },
      { id: 3, value: "State/Region", isSelected: false },
      { id: 3, value: "Country", isSelected: false },
      { id: 3, value: "Email", isSelected: false },
      { id: 3, value: "Mobile Number", isSelected: false },
      { id: 3, value: "Telephone", isSelected: false },
    ];
    this.getCheckedItemListDetails4();
  }

  downloadOptions: boolean = false;
  //allPayroll : Payroll[];
  allEmployee: Employee[];
  dispEmployee: Employee[];
  searchEmployee: any = "";
  selectedDepartment = [];
  ngOnInit() {
    this.refreshEmployeeData();
    this.employeeList$.pipe().subscribe((data) => {
      this.allEmployee = data;
      this.dispEmployee = data;
    });
  }

  showTab() {
    this.isShow = true;
    this.getAllChecked = this.checkedList.length;
    this.getAllCheckedBank =
      this.checkedListB1.length + this.checkedListB2.length;
    this.getAllCheckedDetails =
      this.checkedListD1.length +
      this.checkedListD2.length +
      this.checkedListD3.length +
      this.checkedListD4.length;
  }

  @ViewChild("addField") addField: TemplateRef<any>;
  requestdate() {
    this.modalService.open(this.addField, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }

  refreshEmployeeData() {
    this.employeeFacade.load();
  }

  onEnter(val: any) {
    this.searchEmployee = val;
    this.filterEmployee();
  }

  selectedDept(val) {
    this.selectedDepartment = val;
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
      field: "DELETE",
      cellRendererFramework: NewPayrollActionCellRendererComponent,
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

  @ViewChild('addReport') addReport: TemplateRef<any>;
  addNew() {
    this.dialogService.open(this.addReport);
    this.addReportName = new FormGroup({
       reportName:new FormControl()
    });
 }

 save(form){
   console.log(form.value)
 }

  /* Card for Number of Filter */
  /* For Shift */
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedListJSON = JSON.stringify(this.checkedList);
  }
  /* For Bank */
  checkUncheckAllBank1() {
    for (var i = 0; i < this.checklistB1.length; i++) {
      this.checklistB1[i].isSelected = this.masterSelectedB1;
    }
    this.getCheckedItemListBank1();
  }
  checkUncheckAllBank2() {
    for (var i = 0; i < this.checklistB2.length; i++) {
      this.checklistB2[i].isSelected = this.masterSelectedB2;
    }
    this.getCheckedItemListBank2();
  }
  isAllSelectedBank1() {
    this.masterSelectedB1 = this.checklistB1.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListBank1();
  }
  isAllSelectedBank2() {
    this.masterSelectedB2 = this.checklistB2.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListBank2();
  }

  getCheckedItemListBank1() {
    this.checkedListB1 = [];
    for (var i = 0; i < this.checklistB1.length; i++) {
      if (this.checklistB1[i].isSelected)
        this.checkedListB1.push(this.checklistB1[i]);
    }

    this.checkedListJSONB1 = JSON.stringify(this.checkedListB1);
  }
  getCheckedItemListBank2() {
    this.checkedListB2 = [];
    for (var i = 0; i < this.checklistB2.length; i++) {
      if (this.checklistB2[i].isSelected)
        this.checkedListB2.push(this.checklistB2[i]);
    }
    this.checkedListJSONB2 = JSON.stringify(this.checkedListB2);
  }
  /* For Basic Details */
  checkUncheckAllDetails1() {
    for (var i = 0; i < this.checklistD1.length; i++) {
      this.checklistD1[i].isSelected = this.masterSelectedD1;
    }
    this.getCheckedItemListDetails1();
  }
  checkUncheckAllDetails2() {
    for (var i = 0; i < this.checklistD2.length; i++) {
      this.checklistD2[i].isSelected = this.masterSelectedD2;
    }
    this.getCheckedItemListDetails2();
  }
  checkUncheckAllDetails3() {
    for (var i = 0; i < this.checklistD3.length; i++) {
      this.checklistD3[i].isSelected = this.masterSelectedD3;
    }
    this.getCheckedItemListDetails3();
  }
  checkUncheckAllDetails4() {
    for (var i = 0; i < this.checklistD4.length; i++) {
      this.checklistD4[i].isSelected = this.masterSelectedD4;
    }
    this.getCheckedItemListDetails4();
  }

  isAllSelectedDetails1() {
    this.masterSelectedD1 = this.checklistD1.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListDetails1();
  }
  isAllSelectedDetails2() {
    this.masterSelectedD2 = this.checklistD2.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListDetails2();
  }
  isAllSelectedDetails3() {
    this.masterSelectedD3 = this.checklistD3.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListDetails3();
  }
  isAllSelectedDetails4() {
    this.masterSelectedD4 = this.checklistD4.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemListDetails4();
  }

  getCheckedItemListDetails1() {
    this.checkedListD1 = [];
    for (var i = 0; i < this.checklistD1.length; i++) {
      if (this.checklistD1[i].isSelected)
        this.checkedListD1.push(this.checklistD1[i]);
    }
    this.checkedListJSOND1 = JSON.stringify(this.checkedListD1);
  }
  getCheckedItemListDetails2() {
    this.checkedListD2 = [];
    for (var i = 0; i < this.checklistD2.length; i++) {
      if (this.checklistD2[i].isSelected)
        this.checkedListD2.push(this.checklistD2[i]);
    }
    this.checkedListJSOND2 = JSON.stringify(this.checkedListD2);
  }
  getCheckedItemListDetails3() {
    this.checkedListD3 = [];
    for (var i = 0; i < this.checklistD3.length; i++) {
      if (this.checklistD3[i].isSelected)
        this.checkedListD3.push(this.checklistD3[i]);
    }
    this.checkedListJSOND3 = JSON.stringify(this.checkedListD3);
  }
  getCheckedItemListDetails4() {
    this.checkedListD4 = [];
    for (var i = 0; i < this.checklistD4.length; i++) {
      if (this.checklistD4[i].isSelected)
        this.checkedListD4.push(this.checklistD4[i]);
    }
    this.checkedListJSOND4 = JSON.stringify(this.checkedListD4);
  }
}
