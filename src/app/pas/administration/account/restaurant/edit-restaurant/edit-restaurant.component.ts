import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RestaurantServiceService } from "../../service/restaurant-service.service";
import { ClientServiceService } from "../../service/client-service.service";

@Component({
  selector: "ngx-restaurant",
  templateUrl: "./edit-restaurant.component.html",
  styleUrls: ["./edit-restaurant.component.scss"],
})
export class EditRestaurantComponent implements OnInit {
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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private restaurantServiceService: RestaurantServiceService,
    private clientServiceService: ClientServiceService
  ) {
    console.log("ROute", this.router.getCurrentNavigation());
    if (this.router.getCurrentNavigation().extras.state) {
      this.superInfo = this.router.getCurrentNavigation().extras.state;
      console.log("from superAdminsss", this.superInfo);
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
    /*this.clientServiceService.getAllClinets().subscribe((res) => {
      this.clients = res;
    });*/

    history.pushState(null, document.title, location.href);
    let sup = this.superInfo;
    let url = location.href;
    console.log("URL: ", url)
    url = url.substr(0, url.lastIndexOf('/'));
    console.log("URL slash: ", url)
    window.addEventListener('popstate', function (event) {
      const leavePage = confirm("Do you want to Exit without Saving??");
      if (leavePage) {
        localStorage.setItem("activeCard", "Restaurants");
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
  async ngOnInit(): Promise<void> {
    // const id = this.restaurantServiceService.getRestaurantId();
    const id = localStorage.getItem("resturantId");
    this.restaurantForm = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      tradeName: new FormControl(null, Validators.required),
      ownerName: new FormControl(null),
      ownerEmail: new FormControl(null),
      // client: new FormControl(null, Validators.required),
      postalAddress: new FormControl(null, Validators.required),
      postalZipCode: new FormControl(null, Validators.required),
      postalCity: new FormControl(null, Validators.required),
      postalState: new FormControl(null),
      postalCountryid: new FormControl(null),
      postalCountrytaxCountryCode: new FormControl(null),
      postalCountry: new FormControl(null, Validators.required),
      physicalAddress: new FormControl(null),
      physicalZipCode: new FormControl(null),
      physicalCity: new FormControl(null),
      physicalState: new FormControl(null),
      physicalCountryid: new FormControl(null),
      physicalCountry: new FormControl(null),
      physicalCountrytaxCountryCode: new FormControl(null),
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

    if (id != null) {
      await this.restaurantServiceService.getRestaurant(id).subscribe((res) => {
        if (res) {
          this.restaurantDetails = res;
        }
        if (this.restaurantDetails) {
          console.log(this.restaurantDetails);
          this.restaurantForm.patchValue({
            businessName: this.restaurantDetails.name,
            tradeName: this.restaurantDetails.legalName,
            ownerName: this.restaurantDetails.ownerName,
            ownerEmail: this.restaurantDetails.ownerEmail,
            // client: this.clientServiceService.getClientId(),
            postalAddress: this.restaurantDetails.postalAddress?.addressLine1,
            postalZipCode: this.restaurantDetails.postalAddress?.zipCode,
            postalCity: this.restaurantDetails.postalAddress?.city,
            postalState: this.restaurantDetails.postalAddress?.state,
            postalCountryid: this.restaurantDetails?.postalId,
            postalCountrytaxCountryCode:
              this.restaurantDetails?.postalTaxCode,
            postalCountry: this.restaurantDetails?.postalId,
            physicalAddress:
              this.restaurantDetails.physicalAddress?.addressLine1,
            physicalZipCode: this.restaurantDetails.physicalAddress?.zipCode,
            physicalCity: this.restaurantDetails.physicalAddress?.city,
            physicalState: this.restaurantDetails.physicalAddress?.state,
            physicalCountryid:
              this.restaurantDetails?.physicalId,
            physicalCountry:
              this.restaurantDetails?.physicalId,
            physicalCountrytaxCountryCode:
              this.restaurantDetails?.physicalTaxCode,
            firstName: this.restaurantDetails.primaryContact?.firstName,
            middleName: this.restaurantDetails.primaryContact?.middleName,
            lastName: this.restaurantDetails.primaryContact?.lastName,
            email: this.restaurantDetails.primaryContact?.primaryContactEmail,
            mobileNumber:
              this.restaurantDetails.primaryContact?.primaryContactPhoneNo,
            telephone:
              this.restaurantDetails.primaryContact?.primaryContactTelephoneNo,
            contactEmail:
              this.restaurantDetails.contactInformation?.contactEmail,
            contactMobileNumber:
              this.restaurantDetails.contactInformation?.contactPhoneNo,
            contactTelephone:
              this.restaurantDetails?.contactInformation?.contactTelephoneNo,
            fax: this.restaurantDetails?.contactInformation?.faxNo,
            website: this.restaurantDetails?.contactInformation?.websiteURL,
            taxCountryCode: this.restaurantDetails?.postalAddress?.country?.id,
            taxRegistrationNo: this.restaurantDetails.taxRegistrationNo,
            vatInfoId: this.restaurantDetails.vatInfo?.countryDto?.id,
          });
        }
      });
    }
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

  async navigateToDashBoard() {
    this.closeDialog();
    localStorage.setItem("activeCard", "Restaurants");
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }

  openBackDialog() {
    this.dialog.open(this.backDialog, { disableClose: true });
  }

  async saveEditedDetails() {
    let postalCountry = this.countries.filter(
      (data) => data.id == this.restaurantForm.controls.postalCountry.value
    );
    let physicalCountry = this.countries.filter(
      (data) => data.id == this.restaurantForm.controls.physicalCountry.value
    );
    let taxCountry = this.countries.filter(
      (data) => data.id == this.restaurantForm.controls.taxCountryCode.value
    );
    const addObject: any = {
      id: this.restaurantDetails.id,
      name: this.restaurantForm.controls.businessName.value,
      legalName: this.restaurantForm.controls.tradeName.value,
      ownerName: this.restaurantForm.controls.ownerName.value,
      ownerEmail: this.restaurantForm.controls.ownerEmail.value,
      // clientId: "string",
      clientLegalName: this.restaurantDetails.clientLegalName,
      vatEditableCountryId: "string",
      physicalId: physicalCountry[0]?.id,
      postalId: postalCountry[0]?.id,
      postalAddressCountry: postalCountry[0]?.countryName,
      physicalAddressCountry: physicalCountry[0]?.countryName,
      postalTaxCode: postalCountry[0]?.taxCountryCode,
      physicalTaxCode: physicalCountry[0]?.taxCountryCode,
      vatCountryCode: "string",
      vatCountryName: "string",
      postalAddress: {
        id: this.restaurantDetails.postalAddress?.id,
        city: this.restaurantForm.controls.postalCity.value,
        state: this.restaurantForm.controls.postalState.value,
        addressLine1: this.restaurantForm.controls.postalAddress.value,
        addressLine2: null,
        zipCode: this.restaurantForm.controls.postalZipCode.value,
        country: {
          id: this.restaurantDetails.postalAddress?.country?.id,
          taxCountryCode: this.restaurantDetails.postalAddress?.country?.taxCountryCode,
          countryName: this.restaurantDetails.postalAddress?.country?.countryName,
        },
      },
      physicalAddress: {
        id: this.restaurantDetails.physicalAddress?.id,
        city: this.restaurantForm.controls.physicalCity.value,
        state: this.restaurantForm.controls.physicalState.value,
        addressLine1: this.restaurantForm.controls.physicalAddress.value,
        addressLine2: null,
        zipCode: this.restaurantForm.controls.physicalZipCode.value,
        country: {
          id: this.restaurantDetails?.physicalAddress?.country?.id,
          taxCountryCode: this.restaurantDetails?.physicalAddress?.country?.taxCountryCode,
          countryName: this.restaurantDetails?.physicalAddress?.country?.countryName,
        },
      },
      primaryContact: {
        id: this.restaurantDetails.primaryContact?.id,
        firstName: this.restaurantForm.controls.firstName.value,
        middleName: this.restaurantForm.controls.middleName.value,
        lastName: this.restaurantForm.controls.lastName.value,
        primaryContactEmail: this.restaurantForm.controls.email.value,
        primaryContactPhoneNo: this.restaurantForm.controls.mobileNumber.value,
        primaryContactTelephoneNo: this.restaurantForm.controls.telephone.value,
      },
      contactInformation: {
        id: this.restaurantDetails.contactInformation?.id,
        contactEmail: this.restaurantForm.controls.contactEmail.value,
        contactPhoneNo: this.restaurantForm.controls.contactMobileNumber.value,
        contactTelephoneNo: this.restaurantForm.controls.contactTelephone.value,
        faxNo: this.restaurantForm.controls.fax.value,
        websiteURL: this.restaurantForm.controls.website.value,
      },
      taxRegistrationNo: this.restaurantForm.controls.taxRegistrationNo.value,
      vatCountryId: this.restaurantForm.controls.taxCountryCode.value,
      vatInfo: {
        id: this.restaurantDetails.vatInfo.id,
        taxRegistrationNo: this.restaurantForm.controls.taxRegistrationNo.value,
        countryDto: {
          id: taxCountry[0]?.id,
          taxCountryCode: taxCountry[0]?.taxCountryCode,
          countryName: taxCountry[0]?.countryName,
        },
        // {
        //   // id: this.restaurantForm.controls.vatInfoId.value,
        //   // taxCountryCode: this.restaurantForm.controls.postalCountry.value,
        //   // countryName: this.restaurantForm.controls.postalCountry.value,
        // },
      },
      // departments: [],
      appConfiguration: null,
      // integrations: [],
    };
    console.log(addObject);
    if (this.restaurantForm.valid == true) {
      await this.restaurantServiceService
        .updateRestaurant(addObject)
        .subscribe((res: any) => {
          console.log(res);
          if (res.id) {
            this.restaurantForm.reset();
            this.dialogMessage = "Restaurant Successfully Updated ..!!";
            this.openNavigationDialog();
          } else {
            this.dialogMessage =
              "Unable to Add the Restaurant ! Please try again ...";
            this.openDialog();
          }
        });
    } else {
      this.dialogMessage = "Fill all the required fields";
      this.openDialog();
    }
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
}
