import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import { ClientServiceService } from "../service/client-service.service";
import { AzureService } from "../service/azure.service";
import { access } from "node:fs";

@Component({
  selector: "ngx-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  clientForm: FormGroup;
  dialogMessage: String;
  clientDetails: any;
  editFlag: boolean;
  clientHeader: String;
  countries: any;
  sortedCountries;
  postcode: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private clientServiceService: ClientServiceService,
    private azureService: AzureService
  ) {
    this.clientServiceService.getAllCountries().subscribe((count) => {
      this.countries = count;
      this.countries = this.countries?.sort((a, b) => {
        if (a.countryName < b.countryName) { return -1; }
        if (a.countryName > b.countryName) { return 1; }
      })
      console.log("countries", this.countries)
    });
    // if (this.clientForm.dirty) {
    // console.log("form check", this.clientForm.dirty)
    history.pushState(null, document.title, location.href);
    let url = location.href;
    console.log("URL: ", url)
    url = url.substr(0, url.lastIndexOf('/'));
    console.log("URL slash: ", url)
    window.addEventListener('popstate', function (event) {
      const leavePage = confirm("Do you want to Exit without Saving??");
      if (leavePage) {
        history.pushState(null, document.title, url + "/account");
        console.log("URL: ", url)
        window.location.reload();
      } else {
        console.log(document.title, location.href)
        history.pushState(null, document.title, location.href);
      }
    });
    // }
  }

  async ngOnInit(): Promise<void> {
    // const id = this.clientServiceService.getClientId();
    const id = localStorage.getItem("ClientId");
    this.clientForm = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      tradeName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null,),
      telephone: new FormControl(null),
      password: new FormControl(null),
      confirmpassword: new FormControl(null),

    },
      passwordMatchValidator
    );


    this.clientHeader = localStorage.getItem("clientHeader");
    if (id && id != "null") {
      await this.clientServiceService.getClient(id).subscribe((res) => {
        if (res) {
          this.clientDetails = res;
        }
        if (this.clientDetails) {
          console.log(this.clientDetails);
          this.clientForm.patchValue({
            businessName: this.clientDetails.name,
            tradeName: this.clientDetails.legalName,
            address: this.clientDetails.address?.addressLine1,
            zipCode: this.clientDetails.address?.zipCode,
            city: this.clientDetails.address?.city,
            state: this.clientDetails.address?.state,
            country: this.clientDetails.address?.country?.id,
            firstName: this.clientDetails.primaryContact?.firstName,
            middleName: this.clientDetails.primaryContact?.middleName,
            lastName: this.clientDetails.primaryContact?.lastName,
            email: this.clientDetails.primaryContact?.primaryContactEmail,
            mobileNumber:
              this.clientDetails.primaryContact?.primaryContactPhoneNo,
            telephone:
              this.clientDetails.primaryContact?.primaryContactTelephoneNo,
          });
        }
        this.editFlag = true;
      });
    }

    console.log("sort", this.sortedCountries)
    function passwordMatchValidator(g: FormGroup) {
      return g.get("password").value === g.get("confirmpassword").value
        ? null
        : { mismatch: true };
    }
  }

  back() {
    if (this.clientForm.dirty)
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
  

  async saveClient() {
    const pass = this.clientForm.controls.password.value;
    const confrPass = this.clientForm.controls.confirmpassword.value;

    if (pass === confrPass) {
      console.log("Password Matched You can continue ");
      let countryName = null;
      let countryTaxCode = null;

      
        if (this.editFlag) {
          this.saveEditedDetails();
        }
        else {
          if(this.clientForm.valid){

                    this.countries?.forEach((element) => {
            if (element.id === this.clientForm.controls.country.value) {
              countryName = element.countryName;
              countryTaxCode = element.taxCountryCode;
            }
          });
          let addObject: any = {
            name: this.clientForm.controls.businessName.value,
            legalName: this.clientForm.controls.tradeName.value,
            address: {
              city: this.clientForm.controls.city.value,
              state: this.clientForm.controls.state.value,
              addressLine1: this.clientForm.controls.address.value,
              addressLine2: null,
              zipCode: this.clientForm.controls.zipCode.value,
              country: {
                id: this.clientForm.controls.country.value,
                taxCountryCode: countryTaxCode,
                countryName: countryName,
              },
            },
            primaryContact: {
              firstName: this.clientForm.controls.firstName.value,
              middleName: this.clientForm.controls.middleName.value,
              lastName: this.clientForm.controls.lastName.value,
              primaryContactEmail: this.clientForm.controls.email.value,
              primaryContactPhoneNo: this.clientForm.controls.mobileNumber.value,
              primaryContactTelephoneNo: this.clientForm.controls.telephone.value,
            },
          };

          let access_token = await this.azureService.getToken();

          this.azureService
            .createUser(
              access_token.access_token,
              addObject.primaryContact.firstName + " " + addObject.primaryContact.lastName,
              addObject.primaryContact.primaryContactEmail.split("@")[0],
              addObject.primaryContact.primaryContactEmail,
              pass
            )
            .subscribe(
              (res: any) => {
                console.log(
                  "Azure User Created with ",
                  addObject.primaryContact.primaryContactEmail
                );
                // addObject.primaryContact.primaryContactEmail = res.givenName;
                addObject.azureUPN = res.userPrincipalName;
                console.log(res.userPrincipalName, "Dipti Gupta")
                this.clientServiceService
                  .addClient(addObject)
                  .subscribe((res: any) => {
                    console.log(res);

                    if (res.id) {
                      this.clientForm.reset();
                      this.dialogMessage = "Client Successfully Added ..!!";
                      this.openNavigationDialog();
                    } else {
                      this.dialogMessage =
                        "Unable to Add the Client ! Please try again ...";
                      this.azureService.deleteUser(access_token.access_token, res.userPrincipalName).subscribe(
                        (res) => {
                          console.log("User deleted form Azure, since User was not added in Database", res);
                        }
                      );
                      this.openDialog();
                    }
                  });
              },
              (err) => {
                this.dialogMessage =
                  "Client Already Exist with this Email, Please try with different Email";
                ;
                this.openDialog();
                console.log(err)

              }
            );
        }
        else {
          this.dialogMessage = "Please Enter all the Mandatory Feilds To Save.";
          this.openDialog();
        }
      }
    }
    else {
      this.dialogMessage = "Password Mismatch.Please make sure passwords match!!";
      this.openDialog();
    }
  }

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
    await this.router.navigateByUrl("/account");
  }
  zipCodeData;
  zipCodeDetails(zipCode) {
    if (zipCode.length > 6) {
      this.clientServiceService.getZipCodeDetails(zipCode).subscribe((data: any) => {
        if (data.status == 200) {
           this.zipCodeData = data.result;
          this.postcode = this.zipCodeData.postcode;
          this.clientForm.controls.city.setValue(this.zipCodeData.european_electoral_region);
          this.clientForm.controls.state.setValue(this.zipCodeData.country);
        }
      });
    }
  }

  async saveEditedDetails() {
    if(this.clientForm.controls.businessName.value && 
      this.clientForm.controls.tradeName.value && 
      this.clientForm.controls.city.value &&
      this.clientForm.controls.state.value && 
      this.clientForm.controls.address.value && 
      this.clientForm.controls.zipCode.value && 
      this.clientForm.controls.firstName.value &&
      this.clientForm.controls.lastName.value &&
      this.clientForm.controls.email.value 

         )
    {
      let countryName = null;
      let countryTaxCode = null;
  
      this.countries.forEach((element) => {
        if (element.id === this.clientForm.controls.country.value) {
          countryName = element.countryName;
          countryTaxCode = element.taxCountryCode;
        }
      });
  
      const addObject: any = {
        id: this.clientDetails.id,
        name: this.clientForm.controls.businessName.value,
        legalName: this.clientForm.controls.tradeName.value,
        address: {
          id: this.clientDetails.address?.id,
          city: this.clientForm.controls.city.value,
          state: this.clientForm.controls.state.value,
          addressLine1: this.clientForm.controls.address.value,
          addressLine2: null,
          zipCode: this.clientForm.controls.zipCode.value,
          country: {
            id: this.clientForm.controls.country.value,
            taxCountryCode: countryTaxCode,
            countryName: countryName,
          },
        },
        primaryContact: {
          id: this.clientDetails.primaryContact?.id,
          firstName: this.clientForm.controls.firstName.value,
          middleName: this.clientForm.controls.middleName.value,
          lastName: this.clientForm.controls.lastName.value,
          primaryContactEmail: this.clientForm.controls.email.value,
          primaryContactPhoneNo: this.clientForm.controls.mobileNumber.value,
          primaryContactTelephoneNo: this.clientForm.controls.telephone.value,
        },
      };
      await this.clientServiceService
        .updateClient(addObject)
        .subscribe((res: any) => {
          if (res.id) {
            this.clientForm.reset();
            this.dialogMessage = "Client Successfully Updated ..!!";
            this.openNavigationDialog();
            this.editFlag = false;
          } else {
            this.dialogMessage =
              "Unable to Add the Client ! Please try again ...";
            this.openDialog();
          }
        });
    }
    else
    {
      this.dialogMessage = "Please Enter all the Mandatory Feilds To Save.";
          this.openDialog();
    }
    
  }
}
