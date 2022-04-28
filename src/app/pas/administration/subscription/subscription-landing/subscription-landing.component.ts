import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { NbDialogService } from '@nebular/theme';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
//import { id } from '@swimlane/ngx-charts';
import { AgGridCustomService } from '../../../../shared/services/ag-grid-custom.service';
import { AllSubscriptionService } from '../service/all-subscription.service';
// import { DataService } from '../service/data.service';
// import { UserService } from '../service/user.service';
import { SubscriptionActionCellRendererComponent } from './subscription-action-cell-renderer/subscription-action-cell-renderer.component';


@Component({
  selector: 'ngx-subscription-landing',
  templateUrl: './subscription-landing.component.html',
  styleUrls: ['./subscription-landing.component.scss']
})

export class SubscriptionLandingComponent implements OnInit {

  row_Data: any;
  productCode = 'ROS_ERP'
  allSubscriptions: any = [];
  subsSummeryData: any;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef;
  stepperData: any;
  // rowdata: any;
  dialogMessage: string;
  selectedSubscription: any;

  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("configurationModal") configurationModal: TemplateRef<any>;

  constructor(
    private router: Router,
    private allSubsService: AllSubscriptionService,
    private agGridService: AgGridCustomService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private dialogService: NbDialogService,
    private AllSubscriptionService: AllSubscriptionService
  ) {
    this.defaultColDef = this.agGridService.defaultColDef;
  }
  async ngOnInit(): Promise<void> {
    await this.allSubsService.getSubsSummeryData(this.productCode).toPromise().then((res) => {
      this.subsSummeryData = res;
      console.log("Subs Summery Data ", this.subsSummeryData);
    })
      .catch(
        (err) => {
          console.log(err),
            console.log("Unable to get subscription")
        }
      );

    await this.allSubsService.getAllSubscriptions().toPromise()
      .then((res) => {
        this.allSubscriptions = res;
        console.log("All Subscriptions ", this.allSubscriptions);
      })
      .catch(
        (err) => {
          console.log(err),
            console.log("Unable to get subscription")
        }
      );
  }
  gridOptions = {
    context: {
      componentParent: this,
    },
  };
  columnDefs = [
    {
      field: "subscriptionCode",
      headerName: "CODE",
      sortable: true,
      filter: true,
    },
    {
      field: "name",
      headerName: "NAME",
      sortable: true,
      filter: true,
    },
    {
      field: "productCode",
      headerName: "PRODUCT",
      sortable: true,
      filter: true,
    },
    {
      field: "subscriptionPackageSpecification.userCount",
      headerName: "USER LIMIT",
      sortable: true,
      filter: true,
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: SubscriptionActionCellRendererComponent,
    },
  ];

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

  addNew() {
    this.AllSubscriptionService.setSubscriptionById(null);
    localStorage.setItem("newSubscriptionId", null);
    localStorage.setItem("newSubscriptionHeader", "Add New Subscription");
    this.router.navigateByUrl("/addnewsubscription");
  }

  editSubscription(rowData) {
    console.log("row_data", rowData);
    localStorage.setItem("newSubscriptionHeader", "Edit Subscription");
    localStorage.setItem("newSubscriptionId", rowData.id);
    this.AllSubscriptionService.setSubscriptionById(rowData.id);
    this.router.navigate(["/addnewsubscription"], { state: { isSuper: true } });
  }
  async configure(rowData) {
    //console.log("configureId",id);
    await this.AllSubscriptionService.getSubscriptions_ById(rowData.id).toPromise()
      .then((res) => {
        this.selectedSubscription = res;
        console.log("selectedSubscription", this.selectedSubscription);
      })
      .catch(
        (err) => {
          console.log(err),
            console.log("Unable to get subscription")
        }
      );
    // this.router.navigateByUrl("/configuration");    
    this.modalService.open(this.configurationModal, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg"
    });
  }

  closePerms(isClose) {
    if (isClose) this.modalService.dismissAll();
  }

  featuresWithoutId(features) {
    let newFeatures = [];
    features.forEach(x => {
      let obj = {
        "feature": x.feature,
        "subscriptionFeatureActive": x.subscriptionFeatureActive,
      }
      newFeatures.push(obj);
    });
    return newFeatures;
  }

  async isSubActive(rowData) {
    await this.AllSubscriptionService.getSubscriptions_ById(rowData.id)
      .toPromise()
      .then((res) => {
        if (res) {
          this.row_Data = res;
          console.log("loaded subs for active/deactive", this.row_Data);
        }
      })
      .catch(
        (err) => {
          console.log(err),
            console.log("Unable to get subscription Configurations")
        }
      );
    this.row_Data.subscriptionFeatures = this.featuresWithoutId(this.row_Data.subscriptionFeatures);

    if (this.row_Data.subscriptionActive) {
      this.row_Data.subscriptionActive = false;
      console.log("row_data should now be deactivated i.e.", this.row_Data);

    } else {
      this.row_Data.subscriptionActive = true;
      console.log("row_data soulde now be activated i.e", this.row_Data);
    }

    this.AllSubscriptionService.deActivateSubscription(this.row_Data)
      .subscribe((res: any) => {
        console.log(res);
        if (this.row_Data.subscriptionActive) {
          // this.openDialogBoxActivate();
          alert("Subscription successfully activated!");
        } else {
          // this.openDialogBoxDeactivate();
          alert("Subscription successfully deactivated!");
        }
      })
    // this.router.navigateByUrl("/subscription");
  }

  @ViewChild('Deactivate') Deactivate: TemplateRef<any>;
  openDialogBoxDeactivate() {
    this.dialogService.open(this.Deactivate);
  }
  @ViewChild('Activate') Activate: TemplateRef<any>;
  openDialogBoxActivate() {
    this.dialogService.open(this.Activate);
  }
}
