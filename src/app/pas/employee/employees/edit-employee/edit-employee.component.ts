import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { EditDocumentActionCellComponent } from "./document-action-cell/edit-document-action-cell.component";
import { EditShiftActioncellComponent } from "./shift-actioncell/edit-shift-actioncell.component";

@Component({
  selector: "ngx-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"],
})
export class EditEmployeeComponent implements OnInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;
  //state: "new" | "edit" | "view" = "new";
  empFormTab = "Basic";
  empFormGroup: FormGroup;
  /* hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('Yes');
  floatLabelControl2 = new FormControl('Statement1');
  floatLabelControl3 = new FormControl('Yes'); */
  gridApi: any;
  gridColumnApi: any;
  empid;
  empobj;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeFacade: EmployeeFacadeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  allEmployee: any;
  ngOnInit(): void {
    //this.employeeFacade.load();
    this.employeeFacade.getEmpShiftCalendar();
    this.empid = this.route.snapshot.paramMap.get("id");
    console.log("empid" + this.empid);
    this.empFormGroup = this.fb.group({
      joiningInfo: [
        this.empobj?.basicInfo.joiningInfo.joiningDate.value,
        [Validators.required],
      ],
      // profileimg: [this.empobj?.basicInfo.empDetails.empImgUrl.value,[]],
      firstname: [
        this.empobj?.basicInfo.empDetails.firstName.value,
        [Validators.required],
      ],
      middlename: [this.empobj?.basicInfo.empDetails.middleName.value],
      lastname: [
        this.empobj?.basicInfo.empDetails.lastName.value,
        [Validators.required],
      ],
      city: [
        this.empobj?.basicInfo.empDetails.city.value,
        [Validators.required],
      ],
      state: [
        this.empobj?.basicInfo.empDetails.state.value,
        [Validators.required],
      ],
      country: [
        this.empobj?.basicInfo.empDetails.country.value,
        [Validators.required],
      ],
      address: [
        this.empobj?.basicInfo.empDetails.address.value,
        [Validators.required],
      ],
      zip: [this.empobj?.basicInfo.empDetails.zip.value, []],
      email: [
        this.empobj?.basicInfo.empDetails.email.value,
        [Validators.email],
      ],
      mobilenumber: [
        this.empobj?.basicInfo.empDetails.mobilenumber.value,
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      telephone: [
        this.empobj?.basicInfo.empDetails.telephone.value,
        [Validators.required],
      ],
      department: [
        this.empobj?.basicInfo.empDetails.department.value,
        [Validators.required],
      ],
      position: [
        this.empobj?.basicInfo.empDetails.position.value,
        [Validators.required],
      ],
      location: [
        this.empobj?.basicInfo.empDetails.location.value,
        [Validators.required],
      ],
      kinfirstname: [
        this.empobj?.basicInfo.kinInfo.firstName.value,
        [Validators.required],
      ],
      kinmiddlename: [this.empobj?.basicInfo.kinInfo.middleName.value, []],
      kinlastname: [
        this.empobj?.basicInfo.kinInfo.lastName.value,
        [Validators.required],
      ],
      kinaddress: [
        this.empobj?.basicInfo.kinInfo.address.value,
        [Validators.required],
      ],
      kinzip: [this.empobj?.basicInfo.kinInfo.zip.value, [Validators.required]],
      kinemail: [
        this.empobj?.basicInfo.kinInfo.email.value,
        [Validators.email],
      ],
      kinmobilenumber: [
        this.empobj?.basicInfo.kinInfo.mobile.value,
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      kintelephone: [
        this.empobj?.basicInfo.kinInfo.telephone.value,
        [Validators.required],
      ],
      kinrelation: [
        this.empobj?.basicInfo.kinInfo.relation.value,
        [Validators.required],
      ],
      bankname: [
        this.empobj?.bankDetails.BankInfo.bankname.value,
        [Validators.required],
      ],
      branchacc: [
        this.empobj?.bankDetails.BankInfo.BranchAcc.value,
        [Validators.required],
      ],
      accholdername: [
        this.empobj?.bankDetails.BankInfo.AccHolderName.value,
        [Validators.required],
      ],
      sortcode: [
        this.empobj?.bankDetails.BankInfo.BranchSortCode.value,
        [Validators.required],
      ],
      accnumber: [
        this.empobj?.bankDetails.BankInfo.AccNumber.value,
        [Validators.required],
      ],
      emptype: [
        this.empobj?.bankDetails.salaryInfo.EmployeeType.value,
        [Validators.required],
      ],
      salary: [
        this.empobj?.bankDetails.salaryInfo.Salary.value,
        [Validators.required],
      ],
      docname: [
        this.empobj?.DocumentDetails.docInfo.DocName.value,
        [Validators.required],
      ],
      doctype: [
        this.empobj?.DocumentDetails.docInfo.DocType.value,
        [Validators.required],
      ],
      Desp: [this.empobj?.DocumentDetails.docInfo.DocDesscription.value, []],
      taxP45: new FormControl(
        this.empobj?.StatutoryInfo.Tax.HavingtaxP45.value
      ),
      havingNInumber: new FormControl(
        this.empobj?.StatutoryInfo.NInumber.HavingNInumber.value
      ),
      NInumber: [
        this.empobj?.StatutoryInfo.NInumber.NInumber.value,
        [Validators.required],
      ],
      passportnumber: [
        this.empobj?.StatutoryInfo.BankInfo.PassportNumber.value,
        [Validators.required],
      ],
      maritalstatus: [
        this.empobj?.StatutoryInfo.BankInfo.MaritalStatus.value,
        [],
      ],
      age: [
        this.empobj?.StatutoryInfo.BankInfo.Age.value,
        [Validators.required],
      ],
      gender: [
        this.empobj?.StatutoryInfo.BankInfo.Gender.value,
        [Validators.required],
      ],
      DOB: [
        this.empobj?.StatutoryInfo.BankInfo.DateofBirth.value,
        [Validators.required],
      ],
      birthplace: [this.empobj?.StatutoryInfo.BankInfo.PlaceofBirth.value, []],
      nationality: [
        this.empobj?.StatutoryInfo.BankInfo.Nationality.value,
        [Validators.required],
      ],
      medicalcondition: [
        this.empobj?.StatmentsInfo.medicalCondition.MedicalCondition.value,
      ],
      loan: new FormControl(
        this.empobj?.StatmentsInfo.studentLoan.studentLoan.value
      ),
      empstatement: new FormControl(
        this.empobj?.StatmentsInfo.EmployeeStatement.Statement.value
      ),
      //docAttach:[this.empobj?.DocumentDetails.docInfo.AttachmentName.value]
    });
    this.employeeList$.pipe().subscribe((Data) => {
      this.allEmployee = Data;
      console.log(this.allEmployee);

      this.empobj = this.allEmployee.find((e) => e.id == this.empid);

      console.log("empobj:", this.empobj);
      this.empFormGroup.patchValue({
        joiningInfo: this.empobj?.basicInfo.joiningInfo.joiningDate,
        // profileimg: this.empobj?.basicInfo.empDetails.empImgUrl,
        firstname: this.empobj?.basicInfo.empDetails.firstName,
        middlename: this.empobj?.basicInfo.empDetails.middleName,
        lastname: this.empobj?.basicInfo.empDetails.lastName,
        city: this.empobj?.basicInfo.empDetails.city,
        state: this.empobj?.basicInfo.empDetails.state,
        country: this.empobj?.basicInfo?.empDetails?.country,
        address: this.empobj?.basicInfo.empDetails.addr,
        zip: this.empobj?.basicInfo.empDetails.zip,
        email: this.empobj?.basicInfo.empDetails.email,
        mobilenumber: this.empobj?.basicInfo.empDetails.mobile,
        telephone: this.empobj?.basicInfo.empDetails.telephone,
        department: this.empobj?.basicInfo.deptDetails.department,
        position: this.empobj?.basicInfo.deptDetails.position,
        location: this.empobj?.basicInfo.locationDetails.location,
        kinfirstname: this.empobj?.basicInfo.kinInfo.firstName,
        kinmiddlename: this.empobj?.basicInfo.kinInfo.middleName,
        kinlastname: this.empobj?.basicInfo.kinInfo.lastName,
        kinaddress: this.empobj?.basicInfo.kinInfo.addr,
        kinzip: this.empobj?.basicInfo.kinInfo.zip,
        kinemail: this.empobj?.basicInfo.kinInfo.email,
        kinmobilenumber: this.empobj?.basicInfo.kinInfo.mobile,
        kintelephone: this.empobj?.basicInfo.kinInfo.telephone,
        kinrelation: this.empobj?.basicInfo.kinInfo.relation,
        bankname: this.empobj?.bankDetails.BankInfo.BankName,
        branchacc: this.empobj?.bankDetails.BankInfo.BranchAcc,
        accholdername: this.empobj?.bankDetails.BankInfo.AccHolderName,
        sortcode: this.empobj?.bankDetails.BankInfo.BranchSortCode,
        accnumber: this.empobj?.bankDetails.BankInfo.AccNumber,
        emptype: this.empobj?.bankDetails.salaryInfo.EmployeeType,
        salary: this.empobj?.bankDetails.salaryInfo.Salary,
        docname: this.empobj?.DocumentDetails.docInfo.DocName,
        doctype: this.empobj?.DocumentDetails.docInfo.DocType,
        Desp: this.empobj?.DocumentDetails.docInfo.DocDesscription,
        taxP45: this.empobj?.StatutoryInfo.Tax.HavingtaxP45,
        havingNInumber: this.empobj?.StatutoryInfo.NInumber.HavingNInumber,
        NInumber: this.empobj?.StatutoryInfo.NInumber.NInumber,
        passportnumber: this.empobj?.StatutoryInfo.BankInfo.PassportNumber,
        maritalstatus: this.empobj?.StatutoryInfo.BankInfo.MaritalStatus,
        age: this.empobj?.StatutoryInfo.BankInfo.Age,
        gender: this.empobj?.StatutoryInfo.BankInfo.Gender,
        DOB: this.empobj?.StatutoryInfo.BankInfo.DateofBirth,
        birthplace: this.empobj?.StatutoryInfo.BankInfo.PlaceofBirth,
        nationality: this.empobj?.StatutoryInfo.BankInfo.Nationality,
        medicalcondition:
          this.empobj?.StatmentsInfo.medicalCondition.MedicalCondition,
        loan: this.empobj?.StatmentsInfo.studentLoan.studentLoan,
        empstatement: this.empobj?.StatmentsInfo.EmployeeStatement.Statement,
        // docAttach:this.empobj?.DocumentDetails.docInfo.AttachmentName,
      });
      console.log("empFormGroup:", this.empFormGroup);
    });
  }

  setFormTab(s: string) {
    this.empFormTab = s;
  }

  viewEmployee() {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/view-employee/" + this.empid
    );
  }

  @ViewChild("OpenPopup") OpenPopup: TemplateRef<any>;
  savePopup() {
    this.dialogService.open(this.OpenPopup);
  }

  submitEmpForm(form) {
    /* if (form.status == "INVALID") {
      console.log("Invalid Form ");
    } */
    console.log(form.value);
    let newEmp = {
      id: this.empobj?.id,
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
    this.employeeFacade.getEmpShiftCalendar();
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
      cellRendererFramework: EditShiftActioncellComponent,
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
      cellRendererFramework: EditDocumentActionCellComponent,
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
