import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { isThisISOWeek } from "date-fns";
import { ViewDocumentActionCellComponent } from "../employees/view-employee/document-action-cell/view-document-action-cell.component";
import { EmployeeFacadeService } from "../fascade/employee-facade.service";
import { MyprofileActionCellRendererComponent } from "./myprofile-action-cell-renderer/myprofile-action-cell-renderer.component";
import { MyprofileShiftActionCellComponent } from "./myprofile-shift-action-cell/myprofile-shift-action-cell.component";

@Component({
  selector: "ngx-emp-profile",
  templateUrl: "./emp-profile.component.html",
  styleUrls: ["./emp-profile.component.scss"],
})
export class EmpProfileComponent implements OnInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;

  empFormTab = "Basic";

  gridApi: any;
  gridColumnApi: any;
  empid = 0; // consider 0 as employee ID o
  empobj;

  constructor(
    private router: Router,
    private employeeFacade: EmployeeFacadeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  allEmployee: any;
  configForm
  ngOnInit(): void {
    //this.employeeFacade.load();
    this.employeeFacade.getEmpShiftCalendar();

    console.log("empid" + this.empid);

    this.employeeList$.pipe().subscribe((Data) => {
      this.allEmployee = Data;
      console.log(this.allEmployee);
      this.empobj = this.allEmployee.find((e) => e.id == this.empid);
      console.log("empobj:", this.empobj);
    });
    const empObjImg = this.empobj?.basicInfo.empDetails.empImgUrl;
    this.configForm= new FormGroup({
      Till_name: new FormControl(),
      PDQ_name: new FormControl(),
      Thirdparty_name:new FormControl(),
      Pettycash_name:new FormControl(),

    })

  }

  setFormTab(s: string) {
    this.empFormTab = s;
  }

  goToEdit() {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/edit-employee/" + this.empid
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
      field: "Shift_date",
      headerName: "DATE",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "location", headerName: "LOCATION", sortable: true, filter: true },
    {
      field: "startTime",
      headerName: "START TIME",
      sortable: true,
      filter: true,
    },
    {
      field: "endTime",
      headerName: "END TIME",
      sortable: true,
      filter: true,
    },
    {
      field: "break",
      headerName: "BREAK",
      sortable: true,
      filter: true,
    },
    {
      field: "approved",
      headerName: "APPROVED",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: MyprofileShiftActionCellComponent,
    },
  ];

  ShiftDetails = [
    {
      Shift_date: "01 March 2021",
      location: "Cremes Cafe",
      startTime: "09:00",
      endTime: "15:00",
      break: "00:45",
      approved: "Not approved",
    },
    {
      Shift_date: "01 March 2021",
      location: "Cremes Cafe",
      startTime: "09:00",
      endTime: "15:00",
      break: "00:45",
      approved: "Not approved",
    },
    {
      Shift_date: "01 March 2021",
      location: "Cremes Cafe",
      startTime: "09:00",
      endTime: "15:00",
      break: "00:45",
      approved: "Not approved",
    },
    {
      Shift_date: "01 March 2021",
      location: "Cremes Cafe",
      startTime: "09:00",
      endTime: "15:00",
      break: "00:45",
      approved: "Not approved",
    },
  ];

  //document table
  columnDefs2 = [
    {
      field: "docName",
      headerName: "DOCUMENT NAME",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "desp", headerName: "DESCRIPTION", sortable: true, filter: true },
    {
      field: "docType",
      headerName: "DOCUMENT TYPE",
      sortable: true,
      filter: true,
    },
    {
      field: "attachment",
      headerName: "ATTACHMENT",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: MyprofileActionCellRendererComponent,
    },
  ];

  DocDetails = [
    {
      docName: "Passport",
      desp: "Passport of employee",
      docType: "contract",
      attachment: "image_123.jpg",
    },
  ];

  //document table
  columnDefs3 = [
    {
      field: "docName",
      headerName: "DOCUMENT NAME",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "desp", headerName: "DESCRIPTION", sortable: true, filter: true },
    {
      field: "docType",
      headerName: "DOCUMENT TYPE",
      sortable: true,
      filter: true,
    },
    {
      field: "attachment",
      headerName: "ATTACHMENT",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: ViewDocumentActionCellComponent,
    },
  ];

  DocDetails2 = [
    {
      docName: "Passport",
      desp: "Passport of employee",
      docType: "contract",
      attachment: "image_123.jpg",
    },
  ];

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //console.log("params:" , params.columnApi);

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    // this.gridApi.sizeColumnsToFit();
    // this.gridApi.resetRowHeights();
  }
  tills=[]
  PDQ=[]
  Thirdparty=[];
  Pettycash=[];
  save(){
    this.tills.push(this.configForm.value.Till_name);
  }
  PDQs(){
    this.PDQ.push(this.configForm.value.PDQ_name);
  }
  ThirdParty(){
    this.Thirdparty.push(this.configForm.value.Thirdparty_name);
  }
  PettyCash(){
    this.Pettycash.push(this.configForm.value.Pettycash_name);
  }
  del(index){
     this.PDQ = this.PDQ.filter((x)=> x != index)
  }
  removetill(index){
    this.tills = this.tills.filter((x)=> x != index)
 }
 removethird(index){
  this.Thirdparty = this.Thirdparty.filter((x)=> x != index)
}
removepetty(index){
  this.Pettycash = this.Pettycash.filter((x)=> x != index)
}
}
