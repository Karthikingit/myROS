import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";

import { AllSubscriptionService } from '../../service/all-subscription.service';

@Component({
  selector: 'ngx-addnewsubscription',
  templateUrl: './addnewsubscription.component.html',
  styleUrls: ['./addnewsubscription.component.scss']
})

export class AddnewsubscriptionComponent implements OnInit {

  addNewSubscriptionForm: FormGroup;
  newSubscriptionHeader: string;
  newSubscriptionDetails: any;
  editFlag: boolean;

  dialogMessage: String;

  products: any = [];
  durations: any = [];
  pType: any = [];
  freq: any = [];

  // Subscription_name: any = [];

  description: string;

  // pricingId : "";
  pricingType: string;
  frequency: string;
  cost: number;
  raw: any[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dialogService: NbDialogService,
    private logger: NGXLogger,
    private AllSubscriptionService: AllSubscriptionService
  ) {
    history.pushState(null, document.title, location.href);
    let url = location.href;
    console.log("URL: ", url)
    url = url.substr(0, url.lastIndexOf('/'));
    console.log("URL slash: ", url)
    window.addEventListener('popstate', function (event) {
      const leavePage = confirm("Do you want to Exit without Saving??");
      if (leavePage) {
        history.pushState(null, document.title, url + "/subscription");
        window.location.reload();
      } else {
        console.log(document.title, location.href)
        history.pushState(null, document.title, location.href);
      }
    });
  }


  async ngOnInit(): Promise<void> {

    await this.AllSubscriptionService.getSubscriptionPricingType().subscribe((res) => {
      this.pType = res;
      console.log("Pricing Type ", this.pType);
    });

    await this.AllSubscriptionService.getSubscriptionFrequency().subscribe((res) => {
      this.freq = res;
      console.log("Frequency ", this.freq);
    });

    await this.AllSubscriptionService.getSubscriptionProduct().subscribe((res) => {
      this.products = res;
      console.log("Product Name ", this.products);
    });

    // await this.AllSubscriptionService.getSubscriptionName().subscribe((res) => {
    //   this.Subscription_name = res;
    //   console.log("Name ",this.Subscription_name);
    // });

    const id = localStorage.getItem("newSubscriptionId");
    this.addNewSubscriptionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      product: new FormControl(null, Validators.required),
      duration: new FormControl(null),
      noOfCashupSheets: new FormControl(null, Validators.required),
      noOfRestaurants: new FormControl(null, Validators.required),
      storageLimit: new FormControl(null, Validators.required),
      noOfEmployees: new FormControl(null, Validators.required),
      subscriptionCode: new FormControl(null, Validators.required),
      userCount: new FormControl(null, Validators.required),
      pricingType: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
    });
    this.newSubscriptionHeader = localStorage.getItem("newSubscriptionHeader");
    console.log("header", this.newSubscriptionHeader);

    if (id && id != "null") {
      console.log("gettin id inside", id)
      await this.AllSubscriptionService.getSubscriptions_ById(id).subscribe((res) => {
        if (res) {
          this.newSubscriptionDetails = res;
          console.log("newSubDetails", this.newSubscriptionDetails);
        }
        if (this.newSubscriptionDetails) {
          this.addNewSubscriptionForm.patchValue({
            name: this.newSubscriptionDetails?.name,
            product: this.newSubscriptionDetails?.productCode,
            duration: this.newSubscriptionDetails?.subscriptionDuration,
            noOfCashupSheets: this.newSubscriptionDetails?.subscriptionPackageSpecification?.noOfCashUpSheet,
            noOfRestaurants: this.newSubscriptionDetails?.subscriptionPackageSpecification?.noOfRestaurant,
            subscriptionCode: this.newSubscriptionDetails?.subscriptionCode,
            storageLimit: this.newSubscriptionDetails?.subscriptionPackageSpecification?.storageLimit,
            noOfEmployees: this.newSubscriptionDetails?.subscriptionPackageSpecification?.noOfEmployee,
            userCount: this.newSubscriptionDetails?.subscriptionPackageSpecification?.userCount,
            pricingType: this.newSubscriptionDetails?.pricings[0]?.pricingType,
            frequency: this.newSubscriptionDetails?.pricings[0]?.frequency,
            cost: this.newSubscriptionDetails?.pricings[0]?.cost
          });
          this.description = this.newSubscriptionDetails?.description;
          this.raw = this.newSubscriptionDetails?.pricings;
        }
        this.editFlag = true;

        console.log("isRawPatched: ", this.raw);
        console.log("isProductPatched: ", this.addNewSubscriptionForm.value.product);
        console.log("isNamePatched: ", this.addNewSubscriptionForm.value.name);
        console.log("isCostPatched: ", this.addNewSubscriptionForm.value.cost);
      });
    }

  }

  put_json() {
    if (this.addNewSubscriptionForm.value.pricingType &&
      this.addNewSubscriptionForm.value.frequency &&
      this.addNewSubscriptionForm.value.cost) {
      this.raw.push({
        "id": "",
        "pricingType": this.addNewSubscriptionForm.value.pricingType,
        "frequency": this.addNewSubscriptionForm.value.frequency,
        "cost": this.addNewSubscriptionForm.value.cost
      })
    }
    console.log("raw details: ", this.raw);
  }

  removePricing(d) {
    for (let i = 0; i < this.raw.length; i++) {
      if (this.raw[i] == d) {
        this.raw.splice(i, 1);
      }
    }
  }

  async onSubmit() {
    if (this.addNewSubscriptionForm.valid) {
      console.log("Yay you are ready to go");
      if (this.editFlag) {
        this.saveEditedDetails();
      } else {

        let addObject: any = {
          description: this.description,
          id: "",
          name: this.addNewSubscriptionForm.controls.name.value,
          pricings: this.raw,
          productCode: this.addNewSubscriptionForm.controls.product.value,
          subscriptionDuration: this.addNewSubscriptionForm.controls.duration.value,
          subscriptionActive: true,
          subscriptionCode: this.addNewSubscriptionForm.controls.subscriptionCode.value,
          // subscriptionFeatures: {
          //   feature: 
          //   id: 
          // }
          subscriptionPackageSpecification: {
            id: "",
            noOfCashUpSheet: this.addNewSubscriptionForm.controls.noOfCashupSheets.value,
            noOfEmployee: this.addNewSubscriptionForm.controls.noOfEmployees.value,
            noOfRestaurant: this.addNewSubscriptionForm.controls.noOfRestaurants.value,
            storageLimit: this.addNewSubscriptionForm.controls.storageLimit.value,
            userCount: this.addNewSubscriptionForm.controls.userCount.value,
          },
        };

        await this.AllSubscriptionService.addSubscription(addObject).toPromise()
          .then((res: any) => {
            console.log(res);
            // if (res.id) {
            //   console.log("Successfully receieved all Subscription")
            // }
            if (res.id) {
              this.addNewSubscriptionForm.reset();
              this.dialogMessage = "Subscription added successfully";
              this.openNavigationDialog();
            } else {
              this.dialogMessage =
                "Unable to Add new Subscription ! Please try again ...";
              this.openDialog();
            }
          })
          .catch(
            (err) => {
              console.log(err),
                console.log("Unable to get all Subscription")
            }
          )
      }
    }
    // else {
    //   this.dialogMessage = "Please Enter all the Mandatory Feilds To Save.";
    //   this.openDialog();
    // }
  }
  dummy = [{
    "feature": "ACC_CUP_ADD",
    "subscriptionFeatureActive": true
  },
  {
    "feature": "ACC_CUP_EDI",
    "subscriptionFeatureActive": true
  }];
  async saveEditedDetails() {

    const addObject: any = {
      description: this.description,
      id: this.newSubscriptionDetails?.id,
      name: this.addNewSubscriptionForm.controls.name.value,
      pricings: this.raw,
      productCode: this.addNewSubscriptionForm.controls.product.value,
      subscriptionActive: this.newSubscriptionDetails?.subscriptionActive,
      subscriptionCode: this.addNewSubscriptionForm.controls.subscriptionCode.value,
      subscriptionFeatures: this.featuresWithoutId(this.newSubscriptionDetails?.subscriptionFeatures),
      subscriptionPackageSpecification: {
        id: this.newSubscriptionDetails?.subscriptionPackageSpecification?.id,
        noOfCashUpSheet: this.addNewSubscriptionForm.controls.noOfCashupSheets.value,
        noOfEmployee: this.addNewSubscriptionForm.controls.noOfEmployees.value,
        noOfRestaurant: this.addNewSubscriptionForm.controls.noOfRestaurants.value,
        storageLimit: this.addNewSubscriptionForm.controls.storageLimit.value,
        userCount: this.addNewSubscriptionForm.controls.userCount.value,
      },
      subscriptionDuration: this.addNewSubscriptionForm.controls.duration.value
    };

    this.AllSubscriptionService.updateSubscription(addObject)
      .subscribe((res: any) => {
        console.log(res);
        if (res.id) {
          this.addNewSubscriptionForm.reset();
          this.dialogMessage = "Subscription updated successfully";
          this.openNavigationDialog();
          this.editFlag = false;
        } else {
          this.dialogMessage =
            "Unable to update Subscription ! Please try again ...";
          this.openDialog();
        }
      })
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

  @ViewChild('DescriptionDialog') DescriptionDialog: TemplateRef<any>;
  popupsubmit() {
    if (this.addNewSubscriptionForm.valid) {
      this.dialogService.open(this.DescriptionDialog);
    } else {

      this.dialogMessage = "Please enter all the mandatory fields before saving.";
      this.openDialog();
    }
  }

  backTolandingPage() {
    this.router.navigateByUrl("/subscription");
  }

  back() {
    if (this.addNewSubscriptionForm.dirty)
      this.openBackDialog();
    else
      this.navigateToDashBoard();
  }

  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  openDialog() {
    this.dialog.open(this.secondDialog, { disableClose: true });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openNavigationDialog() {
    this.dialog.open(this.successDialog, { disableClose: true });
  }

  openBackDialog() {
    this.dialog.open(this.backDialog, { disableClose: true });
  }

  async navigateToDashBoard() {
    this.closeDialog();
    await this.router.navigateByUrl("/subscription");
  }

  allowOnlyChar(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 31 && charCode < 33) ||
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123)
    ) {
      return true;
    } else {
      return false;
    }
  }

}
