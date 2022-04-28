import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../service/product.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";
import { UserServiceService } from "../../service/user-service.service";
import { SubscriptionService } from "../../service/subscription.serivce";
import { AzureService } from "../../service/azure.service";
import { RestaurantServiceService } from "../../service/restaurant-service.service";
import { ClientServiceService } from "../../service/client-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";

interface UserTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: "ngx-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.scss"],
})
export class AddNewUserComponent implements OnInit {
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
  clientData: any;
  restaurantForm: FormGroup;
  isRestaurantAdded: boolean = false;

  clientId = null;
  accountId = null;
  superInfo = null;
  rosInfo = null;
  clients = [];
  selected;
  constructor(
    private router: Router,
    private productService: ProductService,
    private userService: UserServiceService,
    public dialog: MatDialog,
    private subServices: SubscriptionService,
    private azureService: AzureService,
    private restaurantServiceService: RestaurantServiceService,
    private clientServiceService: ClientServiceService,
    private snackBar: MatSnackBar
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
        this.clients = this.clients?.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        })
      });
    }

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

  ngOnInit(): void {
    this.clientId = localStorage.getItem("ClientId");
    this.productList = [];
    this.subList = [];
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;

      console.log("Product List :: " + this.productList);
    });
    //this.viewSubscriptions(localStorage.getItem("ClientId"))

    // this.subServices.getAllSubscription().subscribe((res: any) => {
    //   // this.subList = res; Use this once BE is fixed
    //   this.subList = res.filter((x) => x.subscriptionCode != null);
    //   console.log("Subscription List :: " + this.subList);
    // });

    //



    this.clientServiceService
      .getDetailedClientInfoById(this.clientId)
      .subscribe((res: any) => {
        console.log("ros", res)
        this.accountId = res.account.id;
      });

    this.userForm = new FormGroup(
      {
        client: new FormControl(""),
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phNo: new FormControl(null),
        email1: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        confirmpassword: new FormControl(null, Validators.required),
        userTyp: new FormControl(null, Validators.required),
        product: new FormControl(null),
        subscription: new FormControl(null),
      },
      passwordMatchValidator
    );

    function passwordMatchValidator(g: FormGroup) {
      return g.get("password").value === g.get("confirmpassword").value
        ? null
        : { mismatch: true };
    }
    this.restaurantForm = new FormGroup({
      clientNames: new FormControl(null),
    });
    this.clientData = this.clientServiceService.getClientDetail();
    console.log("Client Data", this.clientData);
    this.restaurantForm.get("clientNames").setValue(this.clientData.id);
    this.viewRestaurants(localStorage.getItem("ClientId"));
    this.viewSubscriptions(localStorage.getItem("ClientId"));

  }

  dataCheck() {
    if (this.rosInfo)
      this.createNewRosUserObj()
    else
      this.createNewUserObj()
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
    this.viewSubscriptions(clientId)
  }

  createNewUserObj() {
    let subCode = this.userForm.controls.subscription.value;

    let newUser = {
      id: "1d55af86-f70f-4ad8-870c-0c212bdcea7e",
      email: this.userForm.controls.email.value,
      azureUPN: null,
      username: this.userForm.controls.email.value,
      role: {
        name: this.userForm.controls.userTyp.value,
        code: "ABC",
      },
      userStatus: "ACTIVE",
      createdDate: "2021-09-08T17:35:52.657Z",
      lastModifiedDate: null,
      recordCreatedBy: localStorage.getItem("AzureName"),
      modifiedBy: "string",
      userProfile: {
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        email: this.userForm.controls.email.value,
        personalEmail: "string",
        gender: "MALE",
        dob: "2021-07-31T04:30:31.988Z",
        imageURL: "string",
        phoneNo: this.userForm.controls.phNo.value,
      },
      account: {
        //clientName: "string", //has to removed for the new api
        id: this.accountId,
        accountStatus: "ACTIVE",
      },
      accountSubscription: {
        //has to removed for the new api
        id: this.accountId,
        status: "ACTIVE",
        //Get Subscription Object
        subscription: this.subList?.filter((x) => x.subscription.subscriptionCode === subCode)[0].subscription,

      },
    };

    //this.subList.find((x) => x.subscriptionCode === subCode);
    console.log("Selected SUB", this.userForm.controls.subscription.value);
    console.log("Form User Obj", newUser);

    //console.log(this.subList);
    return newUser;
  }
  check() {
    let a = this.subList.filter((x) => x.subscription.subscriptionCode)[0].subscription
    console.log(a)
  }
  createNewRosUserObj() {
    let newUser = {
      id: "1d55af86-f70f-4ad8-870c-0c212bdcea7e",
      email: this.userForm.controls.email.value,
      azureUPN: null,
      username: this.userForm.controls.email.value,
      role: {
        name: this.userForm.controls.userTyp.value,
        code: "ABC",
      },
      userStatus: "ACTIVE",
      createdDate: "2021-09-08T17:35:52.657Z",
      lastModifiedDate: null,
      recordCreatedBy: localStorage.getItem("AzureName"),
      modifiedBy: "string",
      userProfile: {
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        email: this.userForm.controls.email.value,
        personalEmail: "string",
        gender: "MALE",
        dob: "2021-07-31T04:30:31.988Z",
        imageURL: "string",
        phoneNo: this.userForm.controls.phNo.value,
      },
    };

    //this.subList.find((x) => x.subscriptionCode === subCode);
    console.log("Selected SUB", this.userForm.controls.subscription.value);
    console.log("Form ROS_User Obj", newUser);

    //console.log(this.subList);
    return newUser;
  }
  addUserToDB(addObject) {
    this.userService.addUser(addObject).subscribe(
      (res: any) => {
        console.log("User Added to Database", res);
        if (res.id) {
          this.userService
            .linkUserAndRestaurant(res.id, this.selectedRestaurants)
            .subscribe(
              (resp: any) => {
                console.log("User and Rest is linked");
              },
              (err) => {
                console.log("Error In Linking Restaurant");
              }
            );
          this.userForm.reset();
          this.dialogMessage = "User Successfully Added.";
          this.openNavigationDialog();
        } else {
          this.dialogMessage =
            "Unable to Add the User to Database! Please try again.";
          this.openDialog();
        }
      },
      (err) => {
        this.dialogMessage = "Unable to Add the User to Database!";
        this.openDialog();
      }
    );
  }
  addRosUserToDB(addObject) {
    var restId = this.userService.getRestaurantId();
    this.userService.addRosUser(addObject).subscribe(
      (res: any) => {
        console.log("User Added to Database", res);
        if (this.showClients) {
          if (res.id) {
            this.userService
              .linkUserAndRestaurant(res.id, this.selectedRestaurants)
              .subscribe(
                (resp: any) => {
                  console.log("User and Rest is linked");
                },
                (err) => {
                  console.log("Error In Linking Restaurant");
                }
              );
            this.userForm.reset();
            this.dialogMessage = "User Successfully Added.";
            this.openNavigationDialog();
          } else {
            this.dialogMessage =
              "Unable to Add the User to Database! Please try again.";
            this.openDialog();
          }
        }
        else {
          this.userForm.reset();
          this.dialogMessage = "User Successfully Added.";
          this.openNavigationDialog();
        }

      },
      (err) => {
        console.log("error", err)
        this.dialogMessage = "Unable to Add the User to Database!";
        this.openDialog();
      }
    );
  }
  async saveUser() {
    const pass = this.userForm.controls.password.value;
    const confPass = this.userForm.controls.confirmpassword.value;

    if (pass === confPass) {
      if (this.userForm.valid) {
        console.log(this.userForm.controls.userTyp.value);

        let addObject: any = this.rosInfo ? this.createNewRosUserObj() : this.createNewUserObj();
        var restId = this.userService.getRestaurantId();

        let access_token = await this.azureService.getToken();
        this.azureService
          .createUser(
            access_token.access_token,
            addObject.userProfile.firstName +
            " " +
            addObject.userProfile.lastName,
            addObject.userProfile.email.split("@")[0],
            addObject.userProfile.email,
            pass
          )
          .subscribe(
            (res: any) => {
              console.log(
                "Azure User Created with ",
                addObject.userProfile?.email,
                res.givenName
              );
              addObject.username = res.givenName;
              addObject.azureUPN = res.userPrincipalName;

              console.log("Storing User", addObject);
              if (this.rosInfo)
                this.addRosUserToDB(addObject)
              else
                this.addUserToDB(addObject)
            },
            (err) => {
              console.log("User was not added to Azure!", err);
              this.dialogMessage =
                "User Already Exist with this Email, Please try with different Email";
              this.openDialog();
            }
          );

        // this.userService.addUser(addObject).subscribe((res: any) => {
        //   console.log(res);
        //   if (res.id) {
        //     this.userService
        //       .linkUserAndRestaurant(res.id, restId)
        //       .subscribe((resp: any) => {
        //         console.log("User and Rest is linked");
        //       });
        //     this.userForm.reset();
        //     this.dialogMessage = "User Successfully Saved ..!!";
        //     this.openNavigationDialog();
        //   } else {
        //     this.dialogMessage = "Unable to Add the User! Please try again ...";
        //     this.openDialog();
        //   }
        // });
      } else {
        this.dialogMessage = "Please Enter all the Mandatory Fields To Save.";
        this.openDialog();
      }
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
    if (this.superInfo) {
      await this.router.navigateByUrl("/account");
    } else await this.router.navigateByUrl("/clientLogin");
  }

  back() {
    if (this.userForm.dirty)
      this.openBackDialog();
    else
      this.navigateToDashBoard();
  }
  restaurantData: any = [];
  async viewRestaurants(id: String) {
    await this.restaurantServiceService
      .getAllRestaurantsByClientId(id)
      .subscribe((res: any) => {
        if (res?.length > 0) {
          console.log("Restaurant ", res);
          this.restaurantData = res;
          this.restaurantServiceService.setDataArray(this.restaurantData);
          this.restaurantData = this.restaurantData?.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          })
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
        console.log("sublist", res, this.subList)
      });
  }
  resturants = new FormControl();
  selectedUser: any;
  selectedRestaurants: any = [];
  filterdOptions = [];
  search() {
    console.log("aa", this.selectedUser.length);
    if (this.selectedUser.length > 0) {
      this.isRestaurantAdded = false;
    } else {
      this.isRestaurantAdded = true;
    }
    this.filterdOptions = this.restaurantData.filter(
      (item) =>
        item.name?.toLowerCase().includes(this.selectedUser?.toLowerCase()) ||
        item.ownerEmail
          ?.toLowerCase()
          .includes(this.selectedUser?.toLowerCase())
    );
    return this.filterdOptions;
  }
  s = [];
  addSelectResturant(id, name) {
    console.log(this.restaurantData);
    let notAdded = true;
    for (let i = 0; i < this.selectedRestaurants.length; i++) {
      if (this.selectedRestaurants[i].id == id) {
        this.selectedRestaurants.splice(i, 1);
        notAdded = false;
        break;
      } else {
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
    } else {
      this.isRestaurantAdded = false;
    }
    console.log(this.selectedRestaurants);
  }
  addRestaurants(s) {
    console.log(s);
    this.s = [];
    for (let k = 0; k < this.selectedRestaurants.length; k++) {
      if (this.selectedRestaurants[k].id != this.filterdOptions[s].id) {
        this.s.push(true);
        // this.isRestaurantAdded=true;
      } else {
        this.s.push(false);
      }
    }
    console.log(this.s);
    let checker = (arr) => arr.every((v) => v === true);
    if (checker(this.s)) {
      this.selectedRestaurants.push({
        id: this.filterdOptions[s].id,
        name: this.filterdOptions[s].name,
      });
    } else {
      this.snackBar.open("Selected Restaurant Exist", "Close", {
        duration: 2000,
      });
    }

    console.log("selectedRestaurants", this.selectedRestaurants);
  }
  delRestaurant(i, name) {
    this.selectedRestaurants.splice(i, 1);
    let data = this.resturants.value;
    console.log("before", this.resturants.value);
    for (let i = 0; i < data.length; i++) {
      if (data[i] == name) {
        data.splice(i, 1);
        break;
      }
    }
    let checkedRest = this.restaurantData.filter((x) => {
      return this.selectedRestaurants.find((y) => x.name == y.name)
    }).map((z) => z.name)

    this.resturants.setValue(checkedRest);
    console.log("after", this.resturants.value);
    console.log("delete", this.selectedRestaurants);
  }
  setUpEmail() {
    this.userForm.patchValue({
      email1: this.userForm.controls.email.value,
    });
  }
  showClients: boolean;
  setUserType(role) {
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
