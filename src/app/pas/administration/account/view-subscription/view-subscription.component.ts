import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../service/data-service.service';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { UserServiceService } from '../service/user-service.service';
export interface Task {
  name: String;
  completed: boolean;
  code: String;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'ngx-view-subscription',
  templateUrl: './view-subscription.component.html',
  styleUrls: ['./view-subscription.component.scss']
})

export class ViewSubscriptionComponent implements OnInit {
  
  constructor(
    private readonly dataService: DataService,
    private userService: UserServiceService,
    private restaurantservice: RestaurantServiceService
  ) {}
  activeCards = "Accounting";
  stepperData: any;
  @Output() closeEvnt = new EventEmitter<boolean>();

  accountingCashUp: Task = {
    name: "CASH UP",
    completed: false,
    color: "primary",
    code: "ACC_CUP",
    subtasks: [
      {
        name: "Add new",
        completed: false,
        color: "accent",
        code: "ACC_CUP_ADD",
      },
      { name: "Edit", completed: false, color: "accent", code: "ACC_CUP_EDI" },
      {
        name: "Save as Draft",
        completed: false,
        color: "accent",
        code: "ACC_CUP_SAV",
      },
      {
        name: "Publish",
        completed: false,
        color: "accent",
        code: "ACC_CUP_PUB",
      },
      {
        name: "View Cash up",
        completed: false,
        color: "accent",
        code: "ACC_CUP_VCU",
      },
      { name: "View", completed: false, color: "accent", code: "ACC_CUP_VLI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "ACC_CUP_DEL",
      },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "ACC_CUP_DOW",
      },
      {
        name: "View Summary",
        completed: false,
        color: "accent",
        code: "ACC_CUP_VSU",
      },
    ],
  };

  accountingDeposit: Task = {
    name: "DEPOSIT",
    completed: false,
    code: "ACC_DEP",
    color: "primary",
    subtasks: [
      {
        name: "Deposits",
        completed: false,
        color: "accent",
        code: "ACC_DEP_VIE",
      },
      {
        name: "Create",
        completed: false,
        color: "accent",
        code: "ACC_DEP_CRE",
      },
      {
        name: "Banked",
        completed: false,
        color: "accent",
        code: "ACC_DEP_VLB",
      },
      {
        name: "View Banked",
        completed: false,
        color: "accent",
        code: "ACC_DEP_VBA",
      },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "ACC_DEP_DOW",
      },
      { name: "Edit", completed: false, color: "accent", code: "ACC_DEP_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "ACC_DEP_DEL",
      },
      {
        name: "View Summary",
        completed: false,
        color: "accent",
        code: "ACC_DEP_VSU",
      },
    ],
  };

  accountingReconcilation: Task = {
    name: "RECONCILIATION",
    completed: false,
    color: "primary",
    code: "ACC_REC",
    subtasks: [
      {
        name: "Calendar",
        completed: false,
        color: "accent",
        code: "ACC_REC_CAL",
      },
      { name: "Add", completed: false, color: "accent", code: "ACC_REC_ADD" },
      { name: "Edit", completed: false, color: "accent", code: "ACC_REC_EDI" },
      { name: "View", completed: false, color: "accent", code: "ACC_REC_VIE" },
      {
        name: "Do Match or Partial Match",
        completed: false,
        color: "accent",
        code: "ACC_REC_MAT",
      },
    ],
  };

  employeeMain: Task = {
    name: "EMPLOYEE",
    completed: false,
    color: "primary",
    code: "HRM_EMP",
    subtasks: [
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "HRM_EMP_SEA",
      },
      { name: "Add", completed: false, color: "accent", code: "HRM_EMP_ADD" },
      { name: "Edit", completed: false, color: "accent", code: "HRM_EMP_EDI" },
      { name: "View", completed: false, color: "accent", code: "HRM_EMP_VIE" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "HRM_EMP_DEL",
      },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "HRM_EMP_DOW",
      },
    ],
  };

  employeeShifts: Task = {
    name: "SHIFTS",
    completed: false,
    color: "primary",
    code: "HRM_ROT",
    subtasks: [
      {
        name: "View Schedule",
        completed: false,
        color: "accent",
        code: "HRM_ROT_VSL",
      },
      {
        name: "View Shift",
        completed: false,
        color: "accent",
        code: "HRM_ROT_VSC",
      },
      {
        name: "Copy Schedule",
        completed: false,
        color: "accent",
        code: "HRM_ROT_CSC",
      },
      {
        name: "Add Shift",
        completed: false,
        color: "accent",
        code: "HRM_ROT_ADD",
      },
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "HRM_ROT_SEA",
      },
      { name: "Edit", completed: false, color: "accent", code: "HRM_ROT_EDI" },
      {
        name: "Send Message",
        completed: false,
        color: "accent",
        code: "HRM_ROT_MES",
      },
      {
        name: "Publish",
        completed: false,
        color: "accent",
        code: "HRM_ROT_PUB",
      },
    ],
  };

  employeeAttendance: Task = {
    name: "ATTENDANCE",
    completed: false,
    color: "primary",
    code: "HRM_ATD",
    subtasks: [
      { name: "View", completed: false, color: "accent", code: "HRM_ATD_VIE" },
      {
        name: "View Calendar",
        completed: false,
        color: "accent",
        code: "HRM_ATD_VCA",
      },
      { name: "Add", completed: false, color: "accent", code: "HRM_ATD_ADD" },
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "HRM_ATD_SEA",
      },
      { name: "Edit", completed: false, color: "accent", code: "HRM_ATD_EDI" },
    ],
  };

  employeeLeaves: Task = {
    name: "LEAVES",
    completed: false,
    color: "primary",
    code: "HRM_LEA",
    subtasks: [
      { name: "View", completed: false, color: "accent", code: "HRM_LEA_VIE" },
      { name: "Add", completed: false, color: "accent", code: "HRM_LEA_ADD" },
      {
        name: "Request",
        completed: false,
        color: "accent",
        code: "HRM_LEA_REQ",
      },
      { name: "Edit", completed: false, color: "accent", code: "HRM_LEA_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "HRM_LEA_DEL",
      },
    ],
  };

  employeeRequests: Task = {
    name: "REQUESTS",
    completed: false,
    color: "primary",
    code: "HRM_REQ",
    subtasks: [
      { name: "View", completed: false, color: "accent", code: "HRM_REQ_VLI" },
      {
        name: " View Specific",
        completed: false,
        color: "accent",
        code: "HRM_REQ_VSP",
      },
      {
        name: "Approve",
        completed: false,
        color: "accent",
        code: "HRM_REQ_APP",
      },
      {
        name: "Reject",
        completed: false,
        color: "accent",
        code: "HRM_REQ_REG",
      },
      {
        name: "Notification",
        completed: false,
        color: "accent",
        code: "HRM_REQ_NOT",
      },
      { name: "Edit", completed: false, color: "accent", code: "HRM_REQ_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "HRM_REQ_DEL",
      },
    ],
  };

  employeePayroll: Task = {
    name: "PAYROLL",
    completed: false,
    color: "primary",
    code: "HRM_PAY",
    subtasks: [
      {
        name: "Create",
        completed: false,
        color: "accent",
        code: "HRM_PAY_CRE",
      },
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "HRM_PAY_SEA",
      },
      { name: "View", completed: false, color: "accent", code: "HRM_PAY_VIE" },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "HRM_PAY_DOW",
      },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "HRM_PAY_DEL",
      },
    ],
  };

  suppliers: Task = {
    name: "SUPPLIER",
    completed: false,
    color: "primary",
    code: "INV_SUP",
    subtasks: [
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "INV_SUP_SEA",
      },
      {
        name: "View List",
        completed: false,
        color: "accent",
        code: "INV_SUP_VLI",
      },
      { name: "View", completed: false, color: "accent", code: "INV_SUP_VIE" },
      { name: "Add", completed: false, color: "accent", code: "INV_SUP_ADD" },
      { name: "Edit", completed: false, color: "accent", code: "INV_SUP_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "INV_SUP_DEL",
      },
      {
        name: "Import",
        completed: false,
        color: "accent",
        code: "INV_SUP_IMP",
      },
    ],
  };

  suppliersPurchaseOrder: Task = {
    name: "PURCHASE ORDER",
    completed: false,
    color: "primary",
    code: "INV_PUR",
    subtasks: [
      {
        name: "View List",
        completed: false,
        color: "accent",
        code: "INV_PUR_VLI",
      },
      {
        name: "Add/Create",
        completed: false,
        color: "accent",
        code: "INV_PUR_ADD",
      },
      {
        name: "Save as Draft",
        completed: false,
        color: "accent",
        code: "INV_PUR_SAV",
      },
      { name: "View", completed: false, color: "accent", code: "INV_PUR_VIE" },
      {
        name: "Submit",
        completed: false,
        color: "accent",
        code: "INV_PUR_SUB",
      },
      {
        name: "Re-submit",
        completed: false,
        color: "accent",
        code: "INV_PUR_RES",
      },
      { name: "Edit", completed: false, color: "accent", code: "INV_PUR_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "INV_PUR_DEL",
      },
      {
        name: "Reject",
        completed: false,
        color: "accent",
        code: "INV_PUR_REJ",
      },
      {
        name: "Approve",
        completed: false,
        color: "accent",
        code: "INV_PUR_APP",
      },
    ],
  };

  suppliersStockManagement: Task = {
    name: "STOCK",
    completed: false,
    color: "primary",
    code: "INV_STO",
    subtasks: [
      {
        name: "View List",
        completed: false,
        color: "accent",
        code: "INV_STO_VLI",
      },
      { name: "View", completed: false, color: "accent", code: "INV_STO_VIE" },
      { name: "Add", completed: false, color: "accent", code: "INV_STO_ADD" },
      {
        name: "Save as Draft",
        completed: false,
        color: "accent",
        code: "INV_STO_SAV",
      },
      {
        name: "Approve",
        completed: false,
        color: "accent",
        code: "INV_STO_APP",
      },
      { name: "Edit", completed: false, color: "accent", code: "INV_STO_EDI" },
      {
        name: "Delete",
        completed: false,
        color: "accent",
        code: "INV_STO_DEL",
      },
    ],
  };

  inventroyInvoice: Task = {
    name: "INVOICE",
    completed: false,
    color: "primary",
    code: "INV_INO",
    subtasks: [
      {
        name: "View List",
        completed: false,
        color: "accent",
        code: "INV_INO_VLI",
      },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "INV_INO_DOW",
      },
      { name: "View", completed: false, color: "accent", code: "INV_INO_VIE" },
    ],
  };

  reportsAccounting: Task = {
    name: "ACCOUNTING",
    completed: false,
    color: "primary",
    code: "RAI_ACC",
    subtasks: [
      {
        name: "Cash up ",
        completed: false,
        color: "accent",
        code: "RAI_ACC_VCR",
      },
      {
        name: "Restaurant Information",
        completed: false,
        color: "accent",
        code: "RAI_ACC_VRI",
      },
      {
        name: "Restaurant Location",
        completed: false,
        color: "accent",
        code: "RAI_ACC_VRL",
      },
      {
        name: "Download",
        completed: false,
        color: "accent",
        code: "RAI_ACC_DOW",
      },
      { name: "View", completed: false, color: "accent", code: "RAI_ACC_VIE" },
    ],
  };

  forecasrBudgetting: Task = {
    name: "BUDGETTING",
    completed: false,
    color: "primary",
    code: "FOR_BUD",
    subtasks: [
      { name: "View", completed: false, color: "accent", code: "FOR_BUD_VIE" },
      { name: "Add", completed: false, color: "accent", code: "FOR_BUD_ADD" },
      {
        name: "Import",
        completed: false,
        color: "accent",
        code: "FOR_BUD_IMP",
      },
    ],
  };

  administrationClient: Task = {
    name: "CLIENT",
    completed: false,
    color: "primary",
    code: "ADM_CLI",
    subtasks: [
      {
        name: "Account Summary",
        completed: false,
        color: "accent",
        code: "ADM_CLI_VAS",
      },
      {
        name: "All Clients",
        completed: false,
        color: "accent",
        code: "ADM_CLI_VAC",
      },
      {
        name: "Search Client",
        completed: false,
        color: "accent",
        code: "ADM_CLI_SEA",
      },
      {
        name: "Add New",
        completed: false,
        color: "accent",
        code: "ADM_CLI_ADD",
      },
      { name: "Edit", completed: false, color: "accent", code: "ADM_CLI_EDI" },
      { name: "View", completed: false, color: "accent", code: "ADM_CLI_VIE" },
      {
        name: "Deactivate",
        completed: false,
        color: "accent",
        code: "ADM_CLI_DEA",
      },
      {
        name: "Activate Client",
        completed: false,
        color: "accent",
        code: "ADM_CLI_ACT",
      },
      {
        name: "View Client Summary",
        completed: false,
        color: "accent",
        code: "ADM_CLI_VCS",
      },
    ],
  };

  administrationRestaurant: Task = {
    name: "RESTAURANT",
    completed: false,
    color: "primary",
    code: "ADM_RES",
    subtasks: [
      {
        name: "Client Restaurants",
        completed: false,
        color: "accent",
        code: "ADM_RES_VCR",
      },
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "ADM_RES_SEA",
      },
      {
        name: "Add New",
        completed: false,
        color: "accent",
        code: "ADM_RES_ADD",
      },
      { name: "Edit", completed: false, color: "accent", code: "ADM_RES_EDI" },
      { name: "View", completed: false, color: "accent", code: "ADM_RES_VIE" },
      {
        name: "Configure",
        completed: false,
        color: "accent",
        code: "ADM_RES_CON",
      },
      {
        name: "Activate",
        completed: false,
        color: "accent",
        code: "ADM_RES_ACT",
      },
      {
        name: "Deactivate",
        completed: false,
        color: "accent",
        code: "ADM_RES_DEA",
      },
    ],
  };

  administrationUser: Task = {
    name: "USER",
    completed: false,
    color: "primary",
    code: "ADM_USR",
    subtasks: [
      { name: "View", completed: false, color: "accent", code: "ADM_USR_VAU" },
      {
        name: "Search",
        completed: false,
        color: "accent",
        code: "ADM_USR_SEA",
      },
      {
        name: "Add New",
        completed: false,
        color: "accent",
        code: "ADM_USR_FIL",
      },
      { name: "Edit", completed: false, color: "accent", code: "ADM_USR_ADD" },
      {
        name: "Filter Users",
        completed: false,
        color: "accent",
        code: "ADM_USR_EDI",
      },
      {
        name: "Configure",
        completed: false,
        color: "accent",
        code: "ADM_USR_CON",
      },
      {
        name: "Activate",
        completed: false,
        color: "accent",
        code: "ADM_USR_DEA",
      },
      {
        name: "Deactivate",
        completed: false,
        color: "accent",
        code: "ADM_USR_ACT",
      },
    ],
  };

  administrationSubscription: Task = {
    name: "SUBSCRIPTION",
    completed: false,
    color: "primary",
    code: "ADM_SUB",
    subtasks: [
      {
        name: "Add New",
        completed: false,
        color: "accent",
        code: "ADM_SUB_ADD",
      },
      {
        name: "View All",
        completed: false,
        color: "accent",
        code: "ADM_SUB_VAS",
      },
      {
        name: "Activate",
        completed: false,
        color: "accent",
        code: "ADM_SUB_ACT",
      },
      {
        name: "Deactivate",
        completed: false,
        color: "accent",
        code: "ADM_SUB_DEA",
      },
      {
        name: "Configure",
        completed: false,
        color: "accent",
        code: "ADM_SUB_CON",
      },
    ],
  };

  loadPerms=[] ;
  permsString = [];
  subscriptionList=[];
  subscriptionCodeList=[];
  userData;

  ngOnInit(): void {
    //this.loadPerms = this.userService.getUserPermission();
    this.restaurantservice.getAllSubscriptionsByClientId(localStorage.getItem("ClientId")).subscribe((res)=>{
         this.loadPerms =res.accountSubscriptions[0].subscription.subscriptionFeatures;
         this.permsString = this.loadPerms.map((x) => x.feature);
         console.log("Loaded User Permissions", this.loadPerms, this.permsString);
    })
    //this.userData = this.userService.getUser();
    
    this.dataService.sharedStepperData.subscribe((stepperData) => {
      this.stepperData = stepperData;
    });
    // this.subscriptionList = this.userService.getUserSubscription();
    // this.subscriptionCodeList = this.subscriptionList.map((x)=> x.feature)
    this.restaurantservice.getAllSubscriptionsByClientId(localStorage.getItem("ClientId")).subscribe((res)=>{
      this.subscriptionList =res.accountSubscriptions[0].subscription.subscriptionFeatures;
      this.subscriptionCodeList = this.loadPerms.map((x) => x.feature);
      // console.log("subscriptionCodeList",this.subscriptionCodeList)
 
    
    this.accountingCashUp.subtasks  = this.accountingCashUp.subtasks.filter((x)=>{
     return this.subscriptionCodeList.includes(x.code)
    })

    this.accountingDeposit.subtasks  = this.accountingDeposit.subtasks.filter((x)=>{
      return this.subscriptionCodeList.includes(x.code)
    })

    this.accountingReconcilation.subtasks  = this.accountingReconcilation.subtasks.filter((x)=>{
      return this.subscriptionCodeList.includes(x.code)
    })
    this.employeeMain.subtasks  = this.employeeMain.subtasks.filter((x)=>{
      return this.subscriptionCodeList.includes(x.code)
     })
 
    this.employeeLeaves.subtasks  = this.employeeLeaves.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })
 
    this.employeeAttendance.subtasks  = this.employeeAttendance.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })

     this.employeeRequests.subtasks  = this.employeeRequests.subtasks.filter((x)=>{
      return this.subscriptionCodeList.includes(x.code)
     })
 
    this.employeeShifts.subtasks  = this.employeeShifts.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })
 
    this.employeePayroll.subtasks  = this.employeePayroll.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })

     this.suppliers.subtasks  = this.suppliers.subtasks.filter((x)=>{
      return this.subscriptionCodeList.includes(x.code)
     })
 
     this.suppliersPurchaseOrder.subtasks  = this.suppliersPurchaseOrder.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })
 
     this.suppliersStockManagement.subtasks  = this.suppliersStockManagement.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
     })
     this.inventroyInvoice.subtasks  = this.inventroyInvoice.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
      })
  
     this.reportsAccounting.subtasks  = this.reportsAccounting.subtasks.filter((x)=>{
        return this.subscriptionCodeList.includes(x.code)
      })
  
     this.forecasrBudgetting.subtasks  = this.forecasrBudgetting.subtasks.filter((x)=>{
        return this.subscriptionCodeList.includes(x.code)
      })
 
      this.administrationClient.subtasks  = this.administrationClient.subtasks.filter((x)=>{
       return this.subscriptionCodeList.includes(x.code)
      })
  
     this.administrationRestaurant.subtasks  = this.administrationRestaurant.subtasks.filter((x)=>{
        return this.subscriptionCodeList.includes(x.code)
      })
  
     this.administrationUser.subtasks  = this.administrationUser.subtasks.filter((x)=>{
        return this.subscriptionCodeList.includes(x.code)
      })

      this.administrationSubscription.subtasks  = this.administrationSubscription.subtasks.filter((x)=>{
        return this.subscriptionCodeList.includes(x.code)
      })
    })

    this.accountingCashUp.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });

    this.accountingDeposit.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });

    this.accountingReconcilation.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });

    this.employeeMain.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });

    this.employeeLeaves.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.employeeAttendance.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.employeeRequests.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.employeeShifts.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.employeePayroll.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.suppliers.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.suppliersPurchaseOrder.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.suppliersStockManagement.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.inventroyInvoice.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.reportsAccounting.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.forecasrBudgetting.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.administrationClient.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.administrationRestaurant.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.administrationUser.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
    this.administrationSubscription.subtasks?.map((x) => {
      if (this.permsString.indexOf(x.code) != -1) x.completed = true;
    });
  }

  ngOnDestroy(): void {
    console.log("My Component Is Destoryed");
  }

  

  closePermissions() {
    this.closeEvnt.emit(true);
  }

  setActive(c: string) {
    this.activeCards = c;
  }

  allComplete: boolean = false;
  allCompleteDeposit: boolean = false;
  allCompleteReconcilation: boolean = false;
  allCompleteEmployee: boolean = false;
  allCompleteEmployeeShiftCalendar: boolean = false;
  allCompleteEmployeeLeaves: boolean = false;
  allCompleteEmployeeAttendances: boolean = false;
  allCompleteEmployeeRequests: boolean = false;
  allCompleteEmployeePayroll: boolean = false;
  allCompleteSuppliers: boolean = false;
  allCompleteSupplierPurchaseOrder: boolean = false;
  allCompleteSupplierStockManagement: boolean = false;
  allCompleteInventroyInvoice: boolean = false;
  allCompleteReportsAccounting: boolean = false;
  allCompleteForecasrBudgetting: boolean = false;
  allCompleteAdministrationClient: boolean = false;
  allCompleteAdministrationRestaurant: boolean = false;
  allCompleteAdministrationUser: boolean = false;
  allCompleteAdministrationSubscription: boolean = false;

  updateAllCompleteCashUp() {
    this.allComplete =
      this.accountingCashUp.subtasks != null &&
      this.accountingCashUp.subtasks.every((t) => t.completed);
  }

  updateAllCompleteDeposit() {
    this.allCompleteDeposit =
      this.accountingDeposit.subtasks != null &&
      this.accountingDeposit.subtasks.every((t) => t.completed);
  }

  updateAllCompleteReconcilation() {
    this.allCompleteReconcilation =
      this.accountingReconcilation.subtasks != null &&
      this.accountingReconcilation.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployees() {
    this.allCompleteEmployee =
      this.employeeMain.subtasks != null &&
      this.employeeMain.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployeeShiftCalendar() {
    this.allCompleteEmployeeShiftCalendar =
      this.employeeShifts.subtasks != null &&
      this.employeeShifts.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployeeLeaves() {
    this.allCompleteEmployeeLeaves =
      this.accountingReconcilation.subtasks != null &&
      this.accountingReconcilation.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployeeAttendances() {
    this.allCompleteEmployeeAttendances =
      this.employeeAttendance.subtasks != null &&
      this.employeeAttendance.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployeeRequests() {
    this.allCompleteEmployeeRequests =
      this.employeeRequests.subtasks != null &&
      this.employeeRequests.subtasks.every((t) => t.completed);
  }

  updateAllCompleteEmployeePayroll() {
    this.allCompleteEmployeePayroll =
      this.employeePayroll.subtasks != null &&
      this.employeePayroll.subtasks.every((t) => t.completed);
  }

  updateAllCompleteSuppliers() {
    this.allCompleteSuppliers =
      this.suppliers.subtasks != null &&
      this.suppliers.subtasks.every((t) => t.completed);
  }

  updateAllCompleteSupplierPurchaseOrder() {
    this.allCompleteSupplierPurchaseOrder =
      this.suppliersPurchaseOrder.subtasks != null &&
      this.suppliersPurchaseOrder.subtasks.every((t) => t.completed);
  }

  updateAllCompleteSupplierStockManagement() {
    this.allCompleteSupplierStockManagement =
      this.suppliersStockManagement.subtasks != null &&
      this.suppliersStockManagement.subtasks.every((t) => t.completed);
  }

  updateAllCompleteInventroyInvoice() {
    this.allCompleteInventroyInvoice =
      this.inventroyInvoice.subtasks != null &&
      this.inventroyInvoice.subtasks.every((t) => t.completed);
  }

  updateAllCompleteReportsAccounting() {
    this.allCompleteReportsAccounting =
      this.reportsAccounting.subtasks != null &&
      this.reportsAccounting.subtasks.every((t) => t.completed);
  }

  updateAllCompleteForecasrBudgetting() {
    this.allCompleteForecasrBudgetting =
      this.forecasrBudgetting.subtasks != null &&
      this.forecasrBudgetting.subtasks.every((t) => t.completed);
  }

  updateAllCompleteAdministrationClient() {
    this.allCompleteAdministrationClient =
      this.administrationClient.subtasks != null &&
      this.administrationClient.subtasks.every((t) => t.completed);
  }

  updateAllCompleteAdministrationRestaurant() {
    this.allCompleteAdministrationRestaurant =
      this.administrationRestaurant.subtasks != null &&
      this.administrationRestaurant.subtasks.every((t) => t.completed);
  }

  someCompleteCashUp(): boolean {
    if (this.accountingCashUp.subtasks == null) {
      return false;
    }
    return (
      this.accountingCashUp.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  someCompleteDeposit() {
    if (this.accountingDeposit.subtasks == null) {
      return false;
    }
    return (
      this.accountingDeposit.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteDeposit
    );
  }

  someCompleteReconcilation() {
    if (this.accountingReconcilation.subtasks == null) {
      return false;
    }
    return (
      this.accountingReconcilation.subtasks.filter((t) => t.completed).length >
        0 && !this.allCompleteReconcilation
    );
  }

  someCompleteEmployee() {
    if (this.employeeMain.subtasks == null) {
      return false;
    }
    return (
      this.employeeMain.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployee
    );
  }

  someCompleteEmployeeShiftCalendar() {
    if (this.employeeShifts.subtasks == null) {
      return false;
    }
    return (
      this.employeeShifts.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployeeShiftCalendar
    );
  }

  someCompleteEmployeeAttendances() {
    if (this.employeeAttendance.subtasks == null) {
      return false;
    }
    return (
      this.employeeAttendance.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployeeAttendances
    );
  }

  someCompleteEmployeeLeaves() {
    if (this.employeeLeaves.subtasks == null) {
      return false;
    }
    return (
      this.employeeLeaves.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployeeLeaves
    );
  }

  someCompleteEmployeeRequests() {
    if (this.employeeRequests.subtasks == null) {
      return false;
    }
    return (
      this.employeeRequests.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployeeRequests
    );
  }

  someCompleteEmployeePayroll() {
    if (this.employeePayroll.subtasks == null) {
      return false;
    }
    return (
      this.employeePayroll.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteEmployeePayroll
    );
  }

  someCompleteSuppliers() {
    if (this.suppliers.subtasks == null) {
      return false;
    }
    return (
      this.suppliers.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteSuppliers
    );
  }

  someCompleteSupplierPurchaseOrder() {
    if (this.suppliersPurchaseOrder.subtasks == null) {
      return false;
    }
    return (
      this.suppliersPurchaseOrder.subtasks.filter((t) => t.completed).length >
        0 && !this.allCompleteSupplierPurchaseOrder
    );
  }

  someCompleteSupplierStockManagement() {
    if (this.suppliersStockManagement.subtasks == null) {
      return false;
    }
    return (
      this.suppliersStockManagement.subtasks.filter((t) => t.completed).length >
        0 && !this.allCompleteSupplierStockManagement
    );
  }

  someCompleteInventroyInvoice() {
    if (this.inventroyInvoice.subtasks == null) {
      return false;
    }
    return (
      this.inventroyInvoice.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteInventroyInvoice
    );
  }

  someCompleteReportsAccounting() {
    if (this.reportsAccounting.subtasks == null) {
      return false;
    }
    return (
      this.reportsAccounting.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteReportsAccounting
    );
  }

  someCompleteForecasrBudgetting() {
    if (this.forecasrBudgetting.subtasks == null) {
      return false;
    }
    return (
      this.forecasrBudgetting.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteForecasrBudgetting
    );
  }

  someCompleteAdministrationClient() {
    if (this.administrationClient.subtasks == null) {
      return false;
    }
    return (
      this.administrationClient.subtasks.filter((t) => t.completed).length >
        0 && !this.allCompleteAdministrationClient
    );
  }

  someCompleteAdministrationRestaurantt() {
    if (this.administrationRestaurant.subtasks == null) {
      return false;
    }
    return (
      this.administrationRestaurant.subtasks.filter((t) => t.completed).length >
        0 && !this.allCompleteAdministrationRestaurant
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.accountingCashUp.subtasks == null) {
      return;
    }
    this.accountingCashUp.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllDeposit(completed: boolean) {
    this.allCompleteDeposit = completed;
    if (this.accountingDeposit.subtasks == null) {
      return;
    }
    this.accountingDeposit.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllReconcilation(completed: boolean) {
    this.allCompleteReconcilation = completed;
    if (this.accountingReconcilation.subtasks == null) {
      return;
    }
    this.accountingReconcilation.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }

  setAllEmployee(completed: boolean) {
    this.allCompleteEmployee = completed;
    if (this.employeeMain.subtasks == null) {
      return;
    }
    this.employeeMain.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllEmployeeShiftCalendar(completed: boolean) {
    this.allCompleteEmployeeShiftCalendar = completed;
    if (this.employeeShifts.subtasks == null) {
      return;
    }
    this.employeeShifts.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllemployeeAttendances(completed: boolean) {
    this.allCompleteEmployeeAttendances = completed;
    if (this.employeeAttendance.subtasks == null) {
      return;
    }
    this.employeeAttendance.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllEmployeeLeaves(completed: boolean) {
    this.allCompleteEmployeeLeaves = completed;
    if (this.employeeLeaves.subtasks == null) {
      return;
    }
    this.employeeLeaves.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllEmployeePayroll(completed: boolean) {
    this.allCompleteEmployeePayroll = completed;
    if (this.employeePayroll.subtasks == null) {
      return;
    }
    this.employeePayroll.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllEmployeeRequests(completed: boolean) {
    this.allCompleteEmployeeRequests = completed;
    if (this.employeeRequests.subtasks == null) {
      return;
    }
    this.employeeRequests.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllSuppliers(completed: boolean) {
    this.allCompleteSuppliers = completed;
    if (this.suppliers.subtasks == null) {
      return;
    }
    this.suppliers.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllSupplierPurchaseOrders(completed: boolean) {
    this.allCompleteSupplierPurchaseOrder = completed;
    if (this.suppliersPurchaseOrder.subtasks == null) {
      return;
    }
    this.suppliersPurchaseOrder.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }

  setAllSupplierStockManagement(completed: boolean) {
    this.allCompleteSupplierStockManagement = completed;
    if (this.suppliersStockManagement.subtasks == null) {
      return;
    }
    this.suppliersStockManagement.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }

  setAllInventroyInvoice(completed: boolean) {
    this.allCompleteInventroyInvoice = completed;
    if (this.inventroyInvoice.subtasks == null) {
      return;
    }
    this.inventroyInvoice.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllReportsAccounting(completed: boolean) {
    this.allCompleteReportsAccounting = completed;
    if (this.reportsAccounting.subtasks == null) {
      return;
    }
    this.reportsAccounting.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllForecasrBudgetting(completed: boolean) {
    this.allCompleteForecasrBudgetting = completed;
    if (this.forecasrBudgetting.subtasks == null) {
      return;
    }
    this.forecasrBudgetting.subtasks.forEach((t) => (t.completed = completed));
  }

  setAllAdministrationClient(completed: boolean) {
    this.allCompleteAdministrationClient = completed;
    if (this.administrationClient.subtasks == null) {
      return;
    }
    this.administrationClient.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }

  setAllAdministrationRestaurant(completed: boolean) {
    this.allCompleteAdministrationRestaurant = completed;
    if (this.administrationRestaurant.subtasks == null) {
      return;
    }
    this.administrationRestaurant.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }

  updateAllCompleteAdministrationUser() {
    this.allCompleteAdministrationUser =
      this.administrationUser.subtasks != null &&
      this.administrationUser.subtasks.every((t) => t.completed);
  }

  someCompleteAdministrationUser() {
    if (this.administrationUser.subtasks == null) {
      return false;
    }
    return (
      this.administrationUser.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allCompleteAdministrationUser
    );
  }

  setAllAdministrationUser(completed: boolean) {
    this.allCompleteAdministrationUser = completed;
    if (this.administrationUser.subtasks == null) {
      return;
    }
    this.administrationUser.subtasks.forEach((t) => (t.completed = completed));
  }

  updateAllCompleteAdministrationSubscription() {
    this.allCompleteAdministrationSubscription =
      this.administrationSubscription.subtasks != null &&
      this.administrationSubscription.subtasks.every((t) => t.completed);
  }

  someCompleteAdministrationSubscription() {
    if (this.administrationSubscription.subtasks == null) {
      return false;
    }
    return (
      this.administrationSubscription.subtasks.filter((t) => t.completed)
        .length > 0 && !this.allCompleteAdministrationSubscription
    );
  }

  setAllAdministrationSubscription(completed: boolean) {
    this.allCompleteAdministrationSubscription = completed;
    if (this.administrationSubscription.subtasks == null) {
      return;
    }
    this.administrationSubscription.subtasks.forEach(
      (t) => (t.completed = completed)
    );
  }
}

