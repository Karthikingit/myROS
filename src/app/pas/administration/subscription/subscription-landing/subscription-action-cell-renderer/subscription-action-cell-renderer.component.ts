import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AllSubscriptionService } from '../../service/all-subscription.service';

@Component({
  selector: 'ngx-subscription-action-cell-renderer',
  templateUrl: './subscription-action-cell-renderer.component.html',
  styleUrls: ['./subscription-action-cell-renderer.component.scss']
})
export class SubscriptionActionCellRendererComponent implements OnInit {

  @ViewChild("configurationModel") configurationModal: TemplateRef<any>;

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    public dialog: MatDialog,
    private AllSubscriptionService: AllSubscriptionService,
  ) { }
  params;
  data;
  latestData;
  private modalService: NgbModal

  ngOnInit(): void {
  }

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  edit() {
    this.params.context.componentParent.editSubscription(this.data);
    // console.log("edit works")
  }

  configureSub() {
    this.params.context.componentParent.configure(this.data);
  }

  isActiveStatus: boolean;
  isActive() {
    this.getStatus(this.data.id);
    this.params.context.componentParent.isSubActive(this.latestData);
    this.isActiveStatus = this.latestData.subscriptionActive;
  }
  async openDialog() {
    await this.getStatus(this.data.id);
    if (this.latestData.subscriptionActive) {
      this.openDeactivationDialog();
    } else {
      this.openActivationDialog();
    }
  }

  async getStatus(id): Promise<void> {
    await this.AllSubscriptionService.getSubscriptions_ById(id).toPromise()
      .then((res) => {
        if (res) {
          this.latestData = res;
        }
      })
      .catch(
        (err) => {
          console.log(err),
            console.log("Unable to get latest subscription for the row")
        }
      );
  }
  @ViewChild("ConfirmActivationDialog") ConfirmActivationDialog: TemplateRef<any>;
  openActivationDialog() {
    this.dialog.open(this.ConfirmActivationDialog, { disableClose: true });
  }

  @ViewChild("ConfirmDeactivationDialog") ConfirmDeactivationDialog: TemplateRef<any>;
  openDeactivationDialog() {
    this.dialog.open(this.ConfirmDeactivationDialog, { disableClose: true });
  }

  navigateToDashBoard() {
    this.closeDialog();
    this.router.navigateByUrl("/subscription");
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}