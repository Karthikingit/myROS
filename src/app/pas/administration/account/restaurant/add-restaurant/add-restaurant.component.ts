import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RestaurantServiceService } from "../../service/restaurant-service.service";
import { ClientServiceService } from "../../service/client-service.service";
import { AnyRecordWithTtl } from "dns";

@Component({
  selector: "ngx-restaurant",
  templateUrl: "./add-restaurant.component.html",
  styleUrls: ["./add-restaurant.component.scss"],
})
export class AddRestaurantComponent implements OnInit {
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  restaurantForm: FormGroup;
  dialogMessage: String;
  restaurantDetails: any;
  clients: any;
  countries: any;
  countryCode: any;
  superInfo = null;
  codes: any;

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
      this.countryCode = count;
      this.countries = this.countries?.sort((a, b) => {
        if (a.countryName?.toLowerCase() < b.countryName?.toLowerCase()) { return -1; }
        if (a.countryName?.toLowerCase() > b.countryName?.toLowerCase()) { return 1; }
      });
      this.countryCode = this.countryCode?.sort((a, b) => {
        if (a.taxCountryCode?.toLowerCase() < b.taxCountryCode?.toLowerCase()) { return -1; }
        if (a.taxCountryCode?.toLowerCase() > b.taxCountryCode?.toLowerCase()) { return 1; }
      });
    });
    this.clientServiceService.getAllClinets().subscribe((res) => {
      this.clients = res;
      this.clients = this.clients?.sort((a, b) => {
        if (a.name?.toLowerCase() < b.name?.toLowerCase()) { return -1; }
        if (a.name?.toLowerCase() > b.name?.toLowerCase()) { return 1; }
      })
    });

    history.pushState(null, document.title, location.href);
    let sup = this.superInfo;
    let url = location.href;
    console.log("URL: ", url)
    url = url.substr(0, url.lastIndexOf('/'));
    console.log("URL slash: ", url)
    window.addEventListener('popstate', function (event) {
      const leavePage = confirm("Do you want to Exit without Saving??");
      if (leavePage) {
        if (sup) {
          history.pushState(null, document.title, url + "/account");
          console.log("URL: ", url)
          window.location.reload();
        }
        else {
          history.pushState(null, document.title, url + "/clientLogin");
          console.log("URL: ", url)
          window.location.reload();
        }
      } else {
        console.log(document.title, location.href)
        history.pushState(null, document.title, location.href);
      }
    });

  }
  c() {
    console.log(this.restaurantForm.value)
  }
  async ngOnInit(): Promise<void> {
    const id = this.restaurantServiceService.getRestaurantId();
    this.restaurantForm = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      tradeName: new FormControl(null, Validators.required),
      ownerName: new FormControl(null),
      ownerEmail: new FormControl(null),
      client: new FormControl(null),
      postalAddress: new FormControl(null, Validators.required),
      postalZipCode: new FormControl(null, Validators.required),
      postalCity: new FormControl(null, Validators.required),
      postalState: new FormControl(null),
      postalCountry: new FormControl(null, Validators.required),
      physicalAddress: new FormControl(null),
      physicalZipCode: new FormControl(null),
      physicalCity: new FormControl(null),
      physicalState: new FormControl(null),
      physicalCountry: new FormControl(null),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      mobileNumber: new FormControl(null),
      telephone: new FormControl(null),
      contactEmail: new FormControl(null),
      contactMobileNumber: new FormControl(null),
      contactTelephone: new FormControl(null),
      fax: new FormControl(null),
      website: new FormControl(null),
      taxCountryCode: new FormControl(null),
      taxRegistrationNo: new FormControl(null),
      vatInfoId: new FormControl(null),
    });
  }

  back() {
    if (this.restaurantForm.dirty)
      this.openBackDialog();
    else
      this.navigateToDashBoard();
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

  async saveRestaurant() {
    const addObject: any = {
      name: this.restaurantForm.controls.businessName.value,
      legalName: this.restaurantForm.controls.tradeName.value,
      ownerName: this.restaurantForm.controls.ownerName.value,
      ownerEmail: this.restaurantForm.controls.ownerEmail.value,
      clientId: this.superInfo
        ? this.restaurantForm.controls.client.value.id
        : localStorage.getItem("ClientId"),
      clientLegalName: this.superInfo
        ? this.restaurantForm.controls.client.value.legalName
        : localStorage.getItem("clientName"),
      vatEditableCountryId: "string",
      physicalId: this.restaurantForm.controls.physicalCountry.value?.id,
      postalId: this.restaurantForm.controls.postalCountry.value?.id,
      postalAddressCountry: this.restaurantForm.controls.postalCountry.value?.countryName,
      physicalAddressCountry: this.restaurantForm.controls.physicalCountry.value?.countryName,
      postalTaxCode: this.restaurantForm.controls.postalCountry.value?.taxCountryCode,
      physicalTaxCode: this.restaurantForm.controls.physicalCountry.value?.taxCountryCode,
      vatCountryCode: "string",
      vatCountryName: "string",
      postalAddress: {
        city: this.restaurantForm.controls.postalCity.value,
        state: this.restaurantForm.controls.postalState.value,
        addressLine1: this.restaurantForm.controls.postalAddress.value,
        zipCode: this.restaurantForm.controls.postalZipCode.value,
        country:
        {
          id: this.restaurantForm.controls.postalCountry.value?.id,
          taxCountryCode: this.restaurantForm.controls.postalCountry.value?.taxCountryCode,
          countryName: this.restaurantForm.controls.postalCountry.value?.countryName,
        }
      },
      physicalAddress: {
        city: this.restaurantForm.controls.physicalCity.value,
        state: this.restaurantForm.controls.physicalState.value,
        addressLine1: this.restaurantForm.controls.physicalAddress.value,
        zipCode: this.restaurantForm.controls.physicalZipCode.value,
        country:
        {
          id: this.restaurantForm.controls.physicalCountry.value?.id,
          taxCountryCode: this.restaurantForm.controls.physicalCountry.value?.taxCountryCode,
          countryName: this.restaurantForm.controls.physicalCountry.value?.countryName,
        }
      },
      primaryContact: {
        firstName: this.restaurantForm.controls.firstName.value,
        middleName: this.restaurantForm.controls.middleName.value,
        lastName: this.restaurantForm.controls.lastName.value,
        primaryContactEmail: this.restaurantForm.controls.email.value,
        primaryContactPhoneNo: this.restaurantForm.controls.mobileNumber.value,
        primaryContactTelephoneNo: this.restaurantForm.controls.telephone.value,
      },
      contactInformation: {
        contactEmail: this.restaurantForm.controls.contactEmail.value,
        contactPhoneNo: this.restaurantForm.controls.contactMobileNumber.value,
        contactTelephoneNo: this.restaurantForm.controls.contactTelephone.value,
        faxNo: this.restaurantForm.controls.fax.value,
        websiteURL: this.restaurantForm.controls.website.value,
      },
      vatInfo: {
        countryDto: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          taxCountryCode: "string",
          countryName: "string",
        },
        taxRegistrationNo: this.restaurantForm.controls.taxRegistrationNo.value,
      },
      taxRegistrationNo: this.restaurantForm.controls.taxRegistrationNo.value,
      vatCountryId: this.restaurantForm.controls.taxCountryCode.value,
    };
    if (this.restaurantForm.valid == true) {
      await this.restaurantServiceService
        .addRestaurant(addObject)
        .subscribe((res: any) => {
          console.log(res);
          if (res.id) {
            this.restaurantForm.reset();
            this.dialogMessage = "Restaurant Successfully Added ..!!";
            this.openNavigationDialog();
          } else {
            this.dialogMessage =
              "Unable to Add the Client ! Please try again ...";
            this.openDialog();
          }
        });
    } else {
      this.dialogMessage = "Fill all the required fields";
      this.openDialog();
    }
  }
  openDialog() {
    // this.router.navigateByUrl('/clientLogin');

    this.dialog.open(this.secondDialog, { disableClose: true });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openNavigationDialog() {
    // this.router.navigateByUrl('/clientLogin');
    this.dialog.open(this.successDialog, { disableClose: true });
  }

  navigateToDashBoard() {
    this.dialog.closeAll();
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }

  openBackDialog() {
    this.dialog.open(this.backDialog, { disableClose: true });
  }
  copyPostalAddress() {
    this.restaurantForm.patchValue({
      physicalAddress: this.restaurantForm.controls.postalAddress.value,
      physicalZipCode: this.restaurantForm.controls.postalZipCode.value,
      physicalCity: this.restaurantForm.controls.postalCity.value,
      physicalState: this.restaurantForm.controls.postalState.value,
      physicalCountry: this.restaurantForm.controls.postalCountry.value,
    });
  }
  zipCodeData;
  postcode
  zipCodeDetails(zipCode) {
    if (zipCode.length > 6) {
      this.clientServiceService.getZipCodeDetails(zipCode).subscribe((data: any) => {
        if (data.status == 200) {
          this.zipCodeData = data.result;
          this.postcode = this.zipCodeData.postcode;
          this.restaurantForm.controls.postalCity.setValue(this.zipCodeData.european_electoral_region);
          this.restaurantForm.controls.postalState.setValue(this.zipCodeData.country);
        }
      });
    }
  }
  zipCodeDatas;
  postcodes
  zipCodeDetail(zipCode) {
    if (zipCode.length > 6) {
      this.clientServiceService.getZipCodeDetails(zipCode).subscribe((data: any) => {
        if (data.status == 200) {
          this.zipCodeDatas = data.result;
          this.postcodes = this.zipCodeDatas.postcode;
          this.restaurantForm.controls.physicalCity.setValue(this.zipCodeDatas.european_electoral_region);
          this.restaurantForm.controls.physicalState.setValue(this.zipCodeDatas.country);
        }
      });
    }
  }
}
