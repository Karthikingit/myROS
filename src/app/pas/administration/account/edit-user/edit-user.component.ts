import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UserServiceService } from "../service/user-service.service";
import { SubscriptionService } from "../service/subscription.serivce";
import { ProductService } from "../service/product.service";
import { RestaurantServiceService } from "../service/restaurant-service.service";
import { ClientServiceService } from "../service/client-service.service";
import { MatOptionSelectionChange } from "@angular/material/core";

interface UserTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: "ngx-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  productList: any;
  userForm: FormGroup;
  dialogMessage: String;
  userTypeList: UserTypes[] = [
    // { value: "ROLE_SUPERADMIN", viewValue: "Super Admin" },
    // { value: "ROLE_ACCOUNTOFFICER", viewValue: "Account Officer" },
    // { value: "ROLE_CLIENTADMIN", viewValue: "Client Admin" },
    { value: "ROLE_ASSISTANTMANAGER", viewValue: "Assistant Manager" },
    { value: "ROLE_BOH", viewValue: "BOH" },
    { value: "ROLE_FOH", viewValue: "FOH" },
    { value: "ROLE_GENERALMANAGER", viewValue: "General Manager" },
    { value: "ROLE_OPERATIONALMANAGER", viewValue: "Operational Manager" },
    { value: "ROLE_RESTAURANTADMIN", viewValue: "Restaurant Admin" },
    { value: "ROLE_SUPERVISOR", viewValue: "Supervisor" },
  ];
  rosuserTypeList: UserTypes[] = [
    { value: "ROLE_ACCOUNTOFFICER", viewValue: "Account Officer" },
    { value: "ROLE_SUPERADMIN", viewValue: "Super Admin" },
  ];
  subList: any;
  subLists: any;
  userDetails: any;
  detailedUserInfo: any;
  superInfo = null;
  rosInfo = null;
  clients = [];
  accountId = null;
  clientId = null;
  clientid;
  selClient;

  constructor(
    private router: Router,
    private productService: ProductService,
    private userService: UserServiceService,
    public dialog: MatDialog,
    public resturantService: RestaurantServiceService,
    private subServices: SubscriptionService,
    private clientServiceService: ClientServiceService,
    private restaurantServiceService: RestaurantServiceService,


  ) {
    console.log("ROute", this.router.getCurrentNavigation());

    if (this.router.getCurrentNavigation().extras.state) {
      this.superInfo = this.router.getCurrentNavigation().extras.state.isSuper;
      this.rosInfo = this.router.getCurrentNavigation().extras.state.isROSTeam;
      console.log("from superAdmin", this.superInfo);
      console.log("from rosTeam", this.rosInfo);
    }

    if (this.superInfo) {
      this.clientServiceService.getAllClinets().subscribe((res: any) => {
        this.clients = res;
      });
    }

    history.pushState(null, document.title, location.href);
    let sup = this.superInfo;
    let rosInfo = this.rosInfo;
    let url = location.href;
    console.log("URL: ", url)
    url = url.substr(0, url.lastIndexOf('/'));
    console.log("URL slash: ", url)
    window.addEventListener('popstate', function (event) {
      const leavePage = confirm("Do you want to Exit without Saving??");
      if (leavePage) {
        if (rosInfo && sup) {
          localStorage.setItem("activeCard", "Team");
          history.pushState(null, document.title, url + "/account");
          console.log("URL: ", url)
          window.location.reload();
        }
        else if (sup && !rosInfo) {
          localStorage.setItem("activeCard", "Users");
          history.pushState(null, document.title, url + "/account");
          console.log("URL: ", url)
          window.location.reload();
        }
        else {
          localStorage.setItem("activeCard", "Users");
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

  changeClient(clientId) {
    console.log("clientId", clientId);
    this.clientServiceService.getDetailedClientInfoById(clientId).subscribe(
      (res: any) => {
        this.accountId = res.account.id;
      },
      (err) => {
        console.error("Cannot Fetch Client Account Information");
      }
    );
    if (!this.rosInfo) {
      this.selectedRestaurants = [];
    }
    this.viewRestaurants(clientId);
    this.viewSubscriptions(clientId);

  }

  ngOnInit(): void {
    //   this.userService.getDetailedUserInfoByuserName(localStorage.getItem("userName")).subscribe(data => {
    //     this.detailedUserInfo = data;
    //   });
    //   if (this.detailedUserInfo) {
    //     console.log("retrieved account details...")
    //     this.clientServiceService.getDetailedClientInfoByAccountId(this.detailedUserInfo?.account?.id).subscribe((x) => {
    //       console.log("retrieved ClientInfoByAccountId...", x)
    //       this.selClient = x;
    //     });
    //     localStorage.setItem("clientName", this.selClient.name);
    //     localStorage.setItem("ClientId", this.selClient.id);
    //     console.log("..getItem clientName..", localStorage.getItem("clientName"));
    //     console.log("..getItem ClientId..", localStorage.getItem("ClientId"));
    //   }
    // }

    this.getUserMappedResturants();
    this.productList = [];
    this.subList = [];
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;
    });

    // this.subServices.getAllSubscription().subscribe((res) => {
    //   this.subList = res;
    // });

    this.userForm = new FormGroup(
      {
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl(null),
        email: new FormControl(null, Validators.required),
        phNo: new FormControl(null),
        email1: new FormControl(null, Validators.required),
        password: new FormControl(null),
        client: new FormControl(null),
        confirmpassword: new FormControl(null),
        userTyp: new FormControl(null),
        product: new FormControl(null, Validators.required),
        subscription: new FormControl(null, Validators.required),
      },
      passwordMatchValidator
    );

    function passwordMatchValidator(g: FormGroup) {
      return g.get("password").value === g.get("confirmpassword").value
        ? null
        : { mismatch: true };
    }
    this.clientId = localStorage.getItem("ClientId");
    if (this.userService.getUserByusername(localStorage.getItem("userName")) != null) {
      this.userService.getUserByusername(localStorage.getItem("userName")).subscribe(data => {
        this.userDetails = data;
        console.log("userDetails ", this.userDetails)
        let subscription;
        let product
        this.userService.getDetailedUserInfoByuserName(localStorage.getItem("userName")).subscribe(data => {
          this.detailedUserInfo = data;
          if (data.role.name == 'ROLE_SUPERADMIN' || data.role.name == 'ROLE_ACCOUNTOFFICER') {
            if(data.role.name == 'ROLE_ACCOUNTOFFICER'){
              this.showClients = true
            }
            console.log("detailedUserInfoofsuperadmin", this.detailedUserInfo, this.subList)
            this.userService.getSubscriptions().subscribe((res: any) => {
              console.log("Subscriptions ", res);
              console.log("sublist", res, this.subLists);
              subscription = res.filter(data => data?.id == this.detailedUserInfo?.accountSubscription?.subscription?.id)
              this.subLists = subscription
              product = this.productList.filter(data => data?.productCode == this.detailedUserInfo?.accountSubscription?.subscription?.productCode)
              if (this.userDetails != null) {
                this.userForm.patchValue({
                  firstName: this.userDetails?.userProfile?.firstName,
                  lastName: this.userDetails?.userProfile?.lastName,
                  email: this.userDetails?.userProfile?.email,
                  phNo: this.userDetails?.userProfile?.phoneNo,
                  email1: this.userDetails?.username,
                  password: "",
                  confirmpassword: "",
                  userTyp: this.userDetails?.role?.name,
                  product: product[0]?.productCode,
                  subscription: subscription[0]?.name,
                  client: this.clients.length > 0 ? this.clientId : null,
                });
              }
            });
          }
          else {
            console.log("detailedUserInfo ", this.detailedUserInfo, this.subList)
            this.clientServiceService.getDetailedClientInfoByAccountId(data?.account?.id).subscribe((x) => {
              console.log("ClientInfoByAccountId", x)
              localStorage.setItem("clientName", x?.name);
              localStorage.setItem("ClientId", x?.id);
              this.getUserMappedResturants();
              this.initialChk()
              this.resturants.setValue(this.selectedRestaurants);
              this.restaurantServiceService.getAllSubscriptionsByClientId(x?.id).subscribe((res: any) => {
                console.log("Subscriptions ", res);
                this.subList = res.accountSubscriptions
                console.log("sublist", this.subList);
                subscription = this.subList.filter(data => data?.subscription?.id == this.detailedUserInfo?.accountSubscription?.subscription?.id)
                product = this.productList.filter(data => data?.productCode == this.detailedUserInfo?.accountSubscription?.subscription?.productCode)
                if (this.userDetails != null) {
                  this.userForm.patchValue({
                    firstName: this.userDetails?.userProfile?.firstName,
                    lastName: this.userDetails?.userProfile?.lastName,
                    email: this.userDetails?.userProfile?.email,
                    phNo: this.userDetails?.userProfile?.phoneNo,
                    email1: this.userDetails?.username,
                    password: "",
                    confirmpassword: "",
                    userTyp: this.userDetails?.role?.name,
                    product: product[0]?.productCode,
                    subscription: subscription[0]?.subscription?.name,
                    client: this.clients.length > 0 ? x?.name : null,
                  });
                }
              });
            })
          }
        })
      })
    }

    this.clientServiceService
      .getDetailedClientInfoById(this.clientId)
      .subscribe((res: any) => {
        this.accountId = res.account.id;
      });


    this.viewRestaurants(localStorage.getItem("ClientId"));
    this.viewSubscriptions(localStorage.getItem("ClientId"));
    this.initialChk();
  }
  async viewRestaurants(id: String) {
    await this.restaurantServiceService
      .getAllRestaurantsByClientId(id)
      .subscribe((res: any) => {
        if (res?.length > 0) {
          console.log("Restaurant ", res);
          this.restaurantData = res;
          this.updateSelected();
          this.restaurantServiceService.setDataArray(this.restaurantData);
        } else {
          this.restaurantData = [];
        }
      });
  }
  viewSubscriptions(id: String) {
    this.restaurantServiceService
      .getAllSubscriptionsByClientId(id)
      .subscribe((res: any) => {
        console.log("Subscriptions ", res);
        this.subList = res.accountSubscriptions
        console.log("sssublist", res, this.subList)
      });
  }
  k;
  async updateUser() {
    const pass = this.userForm.controls.password.value;
    const confPass = this.userForm.controls.confirmpassword.value;
    let userRegister = this.userForm.value
    let role = this.userTypeList.filter(data => data?.value == userRegister?.userTyp)
    let roles = this.rosuserTypeList.filter(data => data?.value == userRegister?.userTyp)
    let pro = this.productList.filter(data => data?.productCode == userRegister?.product)
    if (pass === confPass) {
      if (userRegister?.userTyp == 'ROLE_SUPERADMIN' || userRegister?.userTyp == 'ROLE_ACCOUNTOFFICER') {
        let subs = this.subList.filter(data => data?.name == userRegister?.subscription)
        const addObject = {
          "id": this.userDetails?.id,
          "email": userRegister?.email,
          "username": userRegister?.email1,
          "createdDate": this.userDetails.createdDate,
          "code": null,
          "role": {
            "id": this.userDetails?.role?.id,
            "name": userRegister?.userTyp,
            "code": ""
          },
          "userStatus": this.detailedUserInfo?.userStatus,
          "lastModifiedDate": new Date(),
          "recordCreatedBy": this.userDetails.recordCreatedBy,
          "modifiedBy": localStorage.getItem("AzureName"),
          "userProfile": {
            "id": this.userDetails?.userProfile?.id,
            "firstName": userRegister?.firstName,
            "lastName": userRegister?.lastName,
            "email": userRegister?.email1,
            "phoneNo": userRegister?.phNo,
            "personalEmail": userRegister?.email,
            "gender": this.userDetails?.userProfile?.gender,
            "dob": this.userDetails?.userProfile?.dob,
            "imageURL": this.userDetails?.userProfile?.imageURL
          },
          "account": {
            "id": this.detailedUserInfo?.account?.id,
            "accountStatus": this.detailedUserInfo?.accountSubscription?.status
          },
          "accountSubscription": {
            "id": this.detailedUserInfo?.accountSubscription?.id,
            "status": this.detailedUserInfo?.accountSubscription?.status,
            "subscription": {
              "id": this.detailedUserInfo?.accountSubscription?.subscription?.id,
              "productCode": pro[0]?.productCode,
              "subscriptionCode": this.detailedUserInfo?.accountSubscription?.subscription?.subscriptionCode
            },
          },
          // "azureUPN": "string",
          // "createdDate": "2021-08-18T05:07:01.130Z",
          "azureUUID": this.userDetails?.azureUUID
        }
        console.log("addObject", addObject)
        this.userService.updateUser(addObject).subscribe((data: any) => {
          console.log(data)
          if (data.id && !this.isRestaurantAdded) {
            this.userService
              .updateLinkUserAndRestaurant(data.id, this.selectedRestaurants)
              .subscribe(
                (resp: any) => {
                  console.log("User and Rest is linked");
                },
                (err) => {
                  console.log("Error In Linking Restaurant");
                }
              );
            this.userForm.reset();
            this.dialogMessage = "User Successfully Updated ..!!";
            this.openNavigationDialog();
          }
          else {
            this.dialogMessage = "Unable to Update User ! Please try again ...";
            this.openDialog();
          }
        })
      }
      else if (userRegister?.userTyp == "ROLE_CLIENTADMIN") {
        let sub = this.subList.filter(data => data?.subscription.name == userRegister?.subscription);
        console.log("sib", sub)
        const addObject = {
          "id": this.userDetails?.id,
          "email": userRegister?.email,
          "username": userRegister?.email1,
          "createdDate": this.userDetails.createdDate,
          "code": null,
          "role": {
            "id": this.userDetails?.role?.id,
            "name": userRegister?.userTyp,
            "code": ""
          },
          "userStatus": this.detailedUserInfo?.userStatus,
          "lastModifiedDate": new Date(),
          "recordCreatedBy": this.userDetails.recordCreatedBy,
          "modifiedBy": localStorage.getItem("AzureName"),
          "userProfile": {
            "id": this.userDetails?.userProfile?.id,
            "firstName": userRegister?.firstName,
            "lastName": userRegister?.lastName,
            "email": userRegister?.email1,
            "phoneNo": userRegister?.phNo,
            "personalEmail": userRegister?.email,
            "gender": this.userDetails?.userProfile?.gender,
            "dob": this.userDetails?.userProfile?.dob,
            "imageURL": this.userDetails?.userProfile?.imageURL
          },
          "account": {
            "id": this.detailedUserInfo?.account?.id,
            "accountStatus": this.detailedUserInfo?.accountSubscription?.status
          },
          "accountSubscription": {
            "id": this.detailedUserInfo?.accountSubscription?.id,
            "status": this.detailedUserInfo?.accountSubscription?.status,
            "subscription": {
              "id": sub[0]?.subscription.id,
              "productCode": pro[0]?.productCode,
              "subscriptionCode": sub[0]?.subscription.subscriptionCode
            },
          },
          // "azureUPN": "string",
          // "createdDate": "2021-08-18T05:07:01.130Z",
          "azureUUID": this.userDetails?.azureUUID
        }
        console.log("addObject", addObject)
        this.userService.updateUser(addObject).subscribe((data: any) => {
          console.log(data)
          if (data.id && !this.isRestaurantAdded) {
            this.userService
              .updateLinkUserAndRestaurant(data.id, this.selectedRestaurants)
              .subscribe(
                (resp: any) => {
                  console.log("User and Rest is linked");
                },
                (err) => {
                  console.log("Error In Linking Restaurant");
                }
              );
            this.userForm.reset();
            this.dialogMessage = "User Successfully Updated ..!!";
            this.openNavigationDialog();
          }
          else {
            this.dialogMessage = "Unable to Update User ! Please try again ...";
            this.openDialog();
          }
        })
      }
      else {
        let sub = this.subList.filter(data => data?.subscription.name == userRegister?.subscription);
        console.log("sib", sub)
        const addObject = {
          "id": this.userDetails?.id,
          "email": userRegister?.email,
          "username": userRegister?.email1,
          "createdDate": this.userDetails.createdDate,
          "code": null,
          "role": {
            "id": this.userDetails?.role?.id,
            "name": role[0].value,
            "code": role[0].value
          },
          "userStatus": this.detailedUserInfo?.userStatus,
          "lastModifiedDate": new Date(),
          "recordCreatedBy": this.userDetails.recordCreatedBy,
          "modifiedBy": localStorage.getItem("AzureName"),
          "userProfile": {
            "id": this.userDetails?.userProfile?.id,
            "firstName": userRegister?.firstName,
            "lastName": userRegister?.lastName,
            "email": userRegister?.email1,
            "phoneNo": userRegister?.phNo,
            "personalEmail": userRegister?.email,
            "gender": this.userDetails?.userProfile?.gender,
            "dob": this.userDetails?.userProfile?.dob,
            "imageURL": this.userDetails?.userProfile?.imageURL
          },
          "account": {
            "id": this.detailedUserInfo?.account?.id,
            "accountStatus": this.detailedUserInfo?.accountSubscription?.status
          },
          "accountSubscription": {
            "id": this.detailedUserInfo?.accountSubscription?.id,
            "status": this.detailedUserInfo?.accountSubscription?.status,
            "subscription": {
              "id": sub[0]?.subscription.id,
              "productCode": pro[0]?.productCode,
              "subscriptionCode": sub[0]?.subscription.subscriptionCode
            },
          },
          // "azureUPN": "string",
          // "createdDate": "2021-08-18T05:07:01.130Z",
          "azureUUID": this.userDetails?.azureUUID
        }
        console.log("addObject", addObject)
        this.userService.updateUser(addObject).subscribe((data: any) => {
          console.log(data)
          if (data.id && !this.isRestaurantAdded) {
            this.userService
              .updateLinkUserAndRestaurant(data.id, this.selectedRestaurants)
              .subscribe(
                (resp: any) => {
                  console.log("User and Rest is linked");
                },
                (err) => {
                  console.log("Error In Linking Restaurant");
                }
              );
            this.userForm.reset();
            this.dialogMessage = "User Successfully Updated ..!!";
            this.openNavigationDialog();
          }
          else {
            this.dialogMessage = "Unable to Update User ! Please try again ...";
            this.openDialog();
          }
        })
      }
      // addObject.email = this.userForm.controls.email.value;
      // addObject.username = this.userForm.controls.email.value;
      // addObject.role.name = this.userForm.controls.userTyp.value;
      // addObject.userProfile.firstName =
      //   this.userForm.controls.firstName.value;
      // addObject.userProfile.lastName = this.userForm.controls.lastName.value;
      // addObject.userProfile.email = this.userForm.controls.email1.value;
      // addObject.userProfile.phoneNo = this.userForm.controls.phNo.value;
      // addObject.accountSubscription.subscription.name =
      //   this.userForm.controls.subscription.value;
      // addObject.accountSubscription.subscription.productName =
      //   this.userForm.controls.product.value;

      // await this.userService.updateUser(addObject).subscribe((res: any) => {
      //   if (res.id) {
      //     this.userForm.reset();
      //     this.dialogMessage = "User Successfully Updated ..!!";
      //     this.openNavigationDialog();
      //   }
      //   else {
      //     this.dialogMessage = "Unable to Update User ! Please try again ...";
      //     this.openDialog();
      //   }
      // });
      // } else {
      //   console.log("userform", this.userForm.value)
      //   this.dialogMessage = "Please Enter all the Mandatory Fields To Save.";
      //   this.openDialog();
      // }
    } else {
      this.dialogMessage =
        "Password Mismatch.Please make sure passwords match!!";
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
    if (this.rosInfo && this.superInfo) {
      localStorage.setItem("activeCard", "Team");
      await this.router.navigateByUrl("/account");
    }
    else if (this.superInfo && !this.rosInfo) {
      localStorage.setItem("activeCard", "Users")
      await this.router.navigateByUrl("/account");
    }
    else {
      localStorage.setItem("activeCard", "Users")
      await this.router.navigateByUrl("/clientLogin")
    };
  }

  back() {
    if (this.userForm.dirty)
      this.openBackDialog();
    else
      this.navigateToDashBoard();
  }

  getSelectedSub(data: any) {
    window.alert(data);
  }

  selectedRestaurants: any = [];
  restaurantData: any = [];
  resturants = new FormControl();
  isRestaurantAdded: boolean = false;

  getUserMappedResturants() {
    this.selectedRestaurants = [];
    this.userService.getResturantsLinkWithUser(localStorage.getItem("userName")).subscribe((data: any) => {
      for (let i = 0; i < data.restaurants.length; i++) {
        let d = {
          id: data.restaurants[i].id,
          name: data.restaurants[i].name
        }
        this.selectedRestaurants.push(d)
      }
    })
    this.resturantService.getAllRestaurantsByClientId(localStorage.getItem("ClientId")).subscribe((data: any) => {
      this.restaurantData = data
      for (let i = 0; i < this.restaurantData.length; i++) {
        for (let k = 0; k < this.selectedRestaurants.length; k++) {
          if (this.selectedRestaurants[k].id == this.restaurantData[i].id) {
            this.restaurantData[i].checked = true;
            break;
          }
          else {
            this.restaurantData[i].checked = false;
            break;
          }
        }
      }
    })
  }

  updateSelected() {
    let checkedRest = [];
    // this.unCheckResturant(r)
    if (this.rosInfo) {
      checkedRest = this.selectedRestaurants.map((z) => z.name)
    }
    else {
      checkedRest = this.restaurantData.filter((x) => {
        return this.selectedRestaurants.find((y) => x.name == y.name)
      }).map((z) => z.name)
    }
    this.resturants.setValue(checkedRest);
    console.log("checkedRest", checkedRest)
  }
  initialChk() {
    let checkedRest = this.restaurantData.filter((x) => {
      return this.selectedRestaurants.find((y) => x.name == y.name)
    }).map((z) => z.name)
    this.resturants.setValue(checkedRest);
  }

  delRestaurant(i, r) {
    this.selectedRestaurants.splice(i, 1);
    if (this.selectedRestaurants.length == 0) {
      this.isRestaurantAdded = true;
    }
    else {
      this.isRestaurantAdded = false;
    }
    this.updateSelected()
  }

  // unCheckResturant(r) {
  //   let id = r.id;
  //   for (let i = 0; i < this.restaurantData.length; i++) {
  //     if (this.restaurantData[i].id == id) {
  //       this.restaurantData[i].checked = false
  //       console.log("this.resturants", this.resturants);
  //       console.log("this.restaurantData", this.restaurantData);
  //     }
  //   }
  // }

  addSelectResturant(id, name) {
    let notAdded = true;
    for (let i = 0; i < this.selectedRestaurants.length; i++) {
      if (this.selectedRestaurants[i].id == id) {
        this.selectedRestaurants.splice(i, 1)
        notAdded = false;
        break;
      }
      else {
        notAdded = true;
      }
    }
    if (notAdded) {
      this.selectedRestaurants.push({
        id: id,
        name: name,
      });
    }
    if (this.selectedRestaurants.length == 0) {
      this.isRestaurantAdded = true;
    }
    else {
      this.isRestaurantAdded = false;
    }
  }

  showClients: boolean;
  setUserType(role) {
    console.log("role", role)
    if (role == "ROLE_ACCOUNTOFFICER") {
      this.showClients = true
    }
    else
      this.showClients = false;
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
