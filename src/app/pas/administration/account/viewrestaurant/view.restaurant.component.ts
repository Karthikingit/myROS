import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RestaurantServiceService } from "../service/restaurant-service.service";
import { ClientServiceService } from "../service/client-service.service";

@Component({
  selector: "ngx-restaurant",
  templateUrl: "./view.restaurant.component.html",
  styleUrls: ["./view.restaurant.component.scss"],
})
export class ViewRestaurantComponent implements OnInit {
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  restaurantForm: FormGroup;
  dialogMessage: String;
  restaurantDetails: any;
  editFlag: boolean;
  clients: any;
  countries: any;
  public title: string;
  clientDetails: any;
  clientName: String;
  superInfo = null;


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private restaurantServiceService: RestaurantServiceService,
    private clientServiceService: ClientServiceService
  ) {
    console.log("ROute", this.router.getCurrentNavigation());

    if (this.router.getCurrentNavigation().extras.state) {
      this.superInfo = this.router.getCurrentNavigation().extras.state;
      console.log("from superAdmin", this.superInfo);
    }

    this.clientServiceService.getAllCountries().subscribe((count) => {
      this.countries = count;
    });
    this.clientServiceService.getAllClinets().subscribe((res) => {
      this.clients = res;
    });
  }
  async ngOnInit(): Promise<void> {
    // const id = this.restaurantServiceService.getRestaurantId();
    const id = localStorage.getItem("resturantId");
    this.restaurantForm = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      tradeName: new FormControl(null),
      ownerName: new FormControl(null, Validators.required),
      ownerEmail: new FormControl(null),
      client: new FormControl(null, Validators.required),
      postalAddress: new FormControl(null, Validators.required),
      postalZipCode: new FormControl(null, Validators.required),
      postalCity: new FormControl(null, Validators.required),
      postalState: new FormControl(null, Validators.required),
      postalCountry: new FormControl(null, Validators.required),
      physicalAddress: new FormControl(null, Validators.required),
      physicalZipCode: new FormControl(null, Validators.required),
      physicalCity: new FormControl(null, Validators.required),
      physicalState: new FormControl(null, Validators.required),
      physicalCountry: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      contactEmail: new FormControl(null, Validators.required),
      contactMobileNumber: new FormControl(null, Validators.required),
      contactTelephone: new FormControl(null, Validators.required),
      fax: new FormControl(null),
      website: new FormControl(null),
      taxCountryCode: new FormControl(null),
      taxRegistrationNo: new FormControl(null),
      vatInfoId: new FormControl(null),
    });

    if (id != null) {
      await this.restaurantServiceService.getRestaurant(id).subscribe((res) => {
        if (res) {
          this.restaurantDetails = res;
          this.title = this.restaurantDetails.name;
        }
        if (this.restaurantDetails) {
          console.log(this.restaurantDetails);
          this.restaurantForm.patchValue({
            businessName: this.restaurantDetails?.name,
            tradeName: this.restaurantDetails?.legalName,
            ownerName: this.restaurantDetails?.ownerName,
            ownerEmail: this.restaurantDetails?.ownerEmail,
            client: this.restaurantDetails?.clientId,
            postalAddress: this.restaurantDetails?.postalAddress?.addressLine1,
            postalZipCode: this.restaurantDetails?.postalAddress?.zipCode,
            postalCity: this.restaurantDetails?.postalAddress?.city,
            postalState: this.restaurantDetails?.postalAddress?.state,
            postalCountry:
              this.restaurantDetails?.postalAddressCountry,
            physicalAddress:
              this.restaurantDetails?.physicalAddress?.addressLine1,
            physicalZipCode: this.restaurantDetails?.physicalAddress?.zipCode,
            physicalCity: this.restaurantDetails?.physicalAddress?.city,
            physicalState: this.restaurantDetails?.physicalAddress?.state,
            physicalCountry:
              this.restaurantDetails?.physicalAddressCountry,
            firstName: this.restaurantDetails?.primaryContact?.firstName,
            middleName: this.restaurantDetails?.primaryContact?.middleName,
            lastName: this.restaurantDetails?.primaryContact?.lastName,
            email: this.restaurantDetails?.primaryContact?.primaryContactEmail,
            mobileNumber:
              this.restaurantDetails?.primaryContact?.primaryContactPhoneNo,
            telephone:
              this.restaurantDetails?.primaryContact?.primaryContactTelephoneNo,
            contactEmail:
              this.restaurantDetails?.contactInformation?.contactEmail,
            contactMobileNumber:
              this.restaurantDetails?.contactInformation?.contactPhoneNo,
            contactTelephone:
              this.restaurantDetails?.contactInformation?.contactTelephoneNo,
            fax: this.restaurantDetails?.contactInformation?.faxNo,
            website: this.restaurantDetails?.contactInformation?.websiteURL,
            taxCountryCode:
              this.restaurantDetails?.vatCountryCode,
            taxRegistrationNo: this.restaurantDetails?.taxRegistrationNo,
            vatInfoId: this.restaurantDetails?.vatInfo?.id,
          });
        }
        this.editFlag = true;
      });
    }
  }

  getClientName() {
    this.clientServiceService
      .getClient(this.restaurantForm.value.clientId)
      .subscribe((res) => {
        if (res) {
          this.clientDetails = res;
          this.restaurantForm.patchValue({
            client: this.clientDetails.name,
          });
        }
      });
  }

  async navigateToDashBoard() {
    //this.closeDialog();
    localStorage.setItem("activeCard", "Restaurants");
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }
}
