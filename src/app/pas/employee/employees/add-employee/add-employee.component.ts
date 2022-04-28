import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { DocumentActionCellComponent } from "./document-action-cell/document-action-cell.component";

@Component({
  selector: "ngx-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;

  empFormTab = "Basic";
  empFormGroup: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("Yes");
  floatLabelControl2 = new FormControl("Statement1");
  floatLabelControl3 = new FormControl("Yes");
  gridApi: any;
  gridColumnApi: any;
  StartDate = new Date();
  empLastId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeFacade: EmployeeFacadeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  allEmployee: any;
  ngOnInit(): void {
    this.employeeFacade.getEmpShiftCalendar();
    this.employeeList$.pipe().subscribe((Data) => {
      this.allEmployee = Data;
      this.empLastId = this.allEmployee.length;
    });
    this.empFormGroup = this.fb.group({
      joiningInfo: ["", [Validators.required]],
      profileimg: ["", []],
      firstname: ["", [Validators.required]],
      middlename: [""],
      lastname: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      address: ["", [Validators.required]],
      zip: ["", []],
      email: ["", [Validators.email]],
      mobilenumber: [
        "",
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      telephone: ["", [Validators.required]],
      department: ["", [Validators.required]],
      position: ["", [Validators.required]],
      location: ["", [Validators.required]],
      kinfirstname: ["", [Validators.required]],
      kinmiddlename: ["", []],
      kinlastname: ["", [Validators.required]],
      kinaddress: ["", [Validators.required]],
      kinzip: ["", [Validators.required]],
      kinemail: ["", [Validators.email]],
      kinmobilenumber: [
        "",
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      kintelephone: ["", [Validators.required]],
      kinrelation: ["", [Validators.required]],
      bankname: ["", [Validators.required]],
      branchacc: ["", [Validators.required]],
      accholdername: ["", [Validators.required]],
      sortcode: ["", [Validators.required]],
      accnumber: ["", [Validators.required]],
      emptype: ["", [Validators.required]],
      salary: ["", [Validators.required]],
      docname: ["", [Validators.required]],
      doctype: ["", [Validators.required]],
      Desp: ["", []],
      taxP45: this.hideRequiredControl,
      havingNInumber: this.floatLabelControl,
      NInumber: ["", [Validators.required]],
      passportnumber: ["", [Validators.required]],
      maritalstatus: ["", []],
      age: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      birthplace: ["", []],
      nationality: ["", [Validators.required]],
      medicalcondition: [""],
      loan: this.floatLabelControl2,
      empstatement: this.floatLabelControl3,
      docAttach: [""],
    });
  }
  dateFormatter(d: Date) {
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  setFormTab(s: string) {
    this.empFormTab = s;
  }

  @ViewChild("OpenPopup") OpenPopup: TemplateRef<any>;
  savePopup() {
    this.dialogService.open(this.OpenPopup);
  }

  viewEmployee() {
    this.router.navigateByUrl("/ROS/employees/view-employee/" + this.empLastId);
  }

  submitEmpForm(form) {
    if (form.status == "INVALID") {
      console.log("Invalid Form ");
    }
    console.log(form.value);
    let newEmp = {
      empImgUrl: form.value.profileimg,
      empName: form.value.firstname,
      department: form.value.department,
      basicInfo: {
        joiningInfo: {
          joiningDate: form.value.joiningDate,
        },
        empDetails: {
          empImgUrl: form.value.profileimg,
          firstName: form.value.firstname,
          lastName: form.value.lastname,
          middleName: form.value.middleName,
          addr: form.value.address,
          zip: form.value.zip,
          city: form.value.city,
          state: form.value.state,
          country: form.value.country,
          email: form.value.email,
          mobile: form.value.mobilenumber,
          telephone: form.value.telephone,
        },
        deptDetails: {
          department: form.value.department,
          position: form.value.position,
        },
        locationDetails: {
          location: form.value.location,
        },
        kinInfo: {
          firstName: form.value.kinfirstname,
          lastName: form.value.kinlastname,
          middleName: form.value.kinmiddlename,
          addr: form.value.kinaddress,
          zip: form.value.kinzip,
          email: form.value.kinemail,
          mobile: form.value.kinmobilenumber,
          telephone: form.value.kintelephone,
          relation: form.value.kinrelation,
        },
      },
      bankDetails: {
        BankInfo: {
          BankName: form.value.bankname,
          BranchAcc: form.value.branchacc,
          AccHolderName: form.value.accholdername,
          BranchSortCode: form.value.BranchSortCode,
          AccNumber: form.value.accnumber,
        },
        salaryInfo: {
          EmployeeType: form.value.emptype,
          Salary: form.value.salary,
        },
      },
      DocumentDetails: {
        docInfo: {
          DocName: form.value.docname,
          DocType: form.value.doctype,
          DocDesscription: form.value.Desp,
          AttachmentName: form.value.docAttach,
        },
      },
      StatutoryInfo: {
        BankInfo: {
          Nationality: form.value.nationality,
          PlaceofBirth: form.value.birthplace,
          DateofBirth: form.value.DOB,
          Gender: form.value.gender,
          Age: form.value.age,
          MaritalStatus: form.value.maritalstatus,
          PassportNumber: form.value.passportnumber,
        },
        NInumber: {
          HavingNInumber: form.value.havingNInumber,
          NInumber: form.value.NInumber,
        },
        Tax: {
          HavingtaxP45: form.value.taxP45,
        },
      },
      StatmentsInfo: {
        EmployeeStatement: {
          Statement: form.value.empstatement,
        },
        studentLoan: {
          studentLoan: form.value.loan,
        },
        medicalCondition: {
          MedicalCondition: form.value.medicalcondition,
        },
      },
    };
    console.log(newEmp);
    this.employeeFacade.addEmployee(newEmp);
  }

  back() {
    this.router.navigateByUrl("/ROS/emp-management/employees/all-employee");
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

  /*   columnDefs = [
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
      cellRendererFramework:ShiftActioncellComponent,
    },
  ];
  
  ShiftDetails = [
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
]; */

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
      cellRendererFramework: DocumentActionCellComponent,
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

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("params:" + params);

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    // this.gridApi.sizeColumnsToFit();
    // this.gridApi.resetRowHeights();
  }

  onAddRow() {
    var docName = (<HTMLInputElement>document.getElementById("documentName"))
      .value;
    var docAttach = (<HTMLInputElement>document.getElementById("file")).value;
    docAttach = docAttach.split("\\").pop();
    var docType = (<HTMLSelectElement>document.getElementById("documentType"))
      .value;
    var docDescription = (<HTMLInputElement>(
      document.getElementById("documentDesp")
    )).value;
    this.gridApi.updateRowData({
      add: [
        {
          docName: docName,
          desp: docDescription,
          docType: "Contract",
          attachment: docAttach,
        },
      ],
    });
  }
}
