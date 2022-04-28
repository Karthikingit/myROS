import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
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

@Component({
  selector: "ngx-client",
  templateUrl: "./view.client.component.html",
  styleUrls: ["./view.client.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ViewClientComponent implements OnInit {
  clientForm: FormGroup;
  dialogMessage: String;
  clientDetails: any;
  countries: any;
  midName: String;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private clientServiceService: ClientServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = localStorage.getItem("ClientId");
    let countryName = null;
    let countryTaxCode = null;
    this.clientForm = new FormGroup({
      businessName: new FormControl(null, Validators.required),
      tradeName: new FormControl(null),
      address: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      // accountMail: new FormControl(null, Validators.required),
      // password: new FormControl(null, Validators.required),
      // confrimPassword: new FormControl(null, Validators.required),
    });
    this.clientServiceService.getAllCountries().subscribe((count) => {
      this.countries = count;
    });

    if (id != null) {
      await this.clientServiceService.getClient(id).subscribe((res) => {
        if (res) {
          this.clientDetails = res;
          this.midName = this.clientDetails.primaryContact?.middleName;
        }
        this.countries?.forEach((element) => {
          if (element.id === this.clientDetails.address?.country.id) {
            countryName = element.countryName;
            countryTaxCode = element.taxCountryCode;
          }
        });
        if (this.clientDetails) {
          console.log(this.clientDetails);
          this.clientForm.patchValue({
            businessName: this.clientDetails.name,
            tradeName: this.clientDetails.legalName,
            address: this.clientDetails.address?.addressLine1,
            zipCode: this.clientDetails.address?.zipCode,
            city: this.clientDetails.address?.city,
            state: this.clientDetails.address?.state,
            country: countryName,
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
      });
    }
  }

  async back() {
    await this.router.navigateByUrl("/account");
  }
}
