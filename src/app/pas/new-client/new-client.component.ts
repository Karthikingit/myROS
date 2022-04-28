import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ClientServiceService } from '../administration/account/service/client-service.service';

@Component({
  selector: 'ngx-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent{

  // clientForm: FormGroup;
  // dialogMessage: String;
  // @ViewChild('secondDialog') secondDialog: TemplateRef<any>;
  // @ViewChild('successDialog') successDialog: TemplateRef<any>;

  // constructor(private router: Router, 
  //   public dialog: MatDialog,
  //   private clientServiceService: ClientServiceService) { }

  // ngOnInit(): void {
  //   this.clientForm = new FormGroup({
  //     businessName: new FormControl(null, Validators.required),
  //     tradeName: new FormControl(null),
  //     address: new FormControl(null,Validators.required),
  //     zipCode: new FormControl(null, Validators.required),
  //     city: new FormControl(null, Validators.required),
  //     state: new FormControl(null, Validators.required),
  //     country: new FormControl(null, Validators.required),
  //     firstName: new FormControl(null, Validators.required),
  //     middleName: new FormControl(null, Validators.required),
  //     lastName: new FormControl(null, Validators.required),
  //     email: new FormControl(null, Validators.required),
  //     mobileNumber: new FormControl(null, Validators.required),
  //     telephone: new FormControl(null, Validators.required),
  //     accountMail: new FormControl(null, Validators.required),
  //     password: new FormControl(null, Validators.required),
  //     confrimPassword: new FormControl(null, Validators.required),
  //   });
  // }

  // back(){
  //   this.router.navigateByUrl("/account")
  // }

  // async saveClient(){
  //   const pass = this.clientForm.controls.password.value;
  //   const confrPass = this.clientForm.controls.confrimPassword.value;

  //   if(pass === confrPass){
  //     console.log("Password Matched You can continue ");
  //     if(this.clientForm.valid){
  //       console.log("Yay you are ready to go");
  //       const addObject:any = 
  //         {
  //           "name": this.clientForm.controls.businessName.value,
  //           "leagalName": this.clientForm.controls.tradeName.value,
  //           "accountEmail": this.clientForm.controls.accountMail.value,
  //           "password": this.clientForm.controls.password.value,
  //           "addressDto": {
  //             "city": this.clientForm.controls.city.value,
  //             "state": this.clientForm.controls.state.value,
  //             "addressLine1": this.clientForm.controls.address.value,
  //             "addressLine2": null,
  //             "zipCode": this.clientForm.controls.zipCode.value,
  //             "country": {
  //               "countryName": this.clientForm.controls.country.value
  //             }
  //           },
  //           "primaryContact": {
  //             "firstName": this.clientForm.controls.firstName.value,
  //             "middleName": this.clientForm.controls.middleName.value,
  //             "lastName": this.clientForm.controls.lastName.value,
  //             "primaryContactEmail": this.clientForm.controls.email.value,
  //             "primaryContactPhoneNo": this.clientForm.controls.mobileNumber.value,
  //             "primaryContactTelephoneNo": this.clientForm.controls.telephone.value
  //           }
  //         }
  //       await this.clientServiceService.addClient(addObject).subscribe((res : any) => {
  //         console.log(res);
  //         if(res.id){
  //           this.clientForm.reset();
  //           this.dialogMessage = "Client Successfully Added ..!!";
  //           this.openNavigationDialog();
  //         }
  //         else{
  //           this.dialogMessage = "Unable to Add the Client ! Please try again ...";
  //           this.openDialog();
  //         }
  //       });
  //     }
  //     else{
  //       this.dialogMessage = "Please Enter all the Mandatory Feilds To Save.";
  //       this.openDialog();
  //     }
  //   }
  //   else{
  //    this.dialogMessage = "Password Mismatch.Please make sure passwords match!!";
  //    this.openDialog();
  //   }
  // }

  // openDialog() {
  //   this.dialog.open(this.secondDialog,{ disableClose: true });
  // }

  // closeDialog(){
  //   this.dialog.closeAll();
  // }

  // openNavigationDialog(){
  //   this.dialog.open(this.successDialog,{ disableClose: true });
  // }

  // navigateToDashBoard(){
  //   this.router.navigateByUrl("/account")
  //   this.dialog.closeAll();
  // }
}
