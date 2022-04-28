import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  OnChanges,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { RestaurantServiceService } from "../service/restaurant-service.service";
import { UserServiceService } from "../service/user-service.service";
import { DataService } from "../service/data-service.service";
import { RouteConfigLoadStart, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientServiceService } from "../service/client-service.service";
import { RestaurantConfigService } from "../service/restaurant-config.service";
import { MatDialog } from "@angular/material/dialog";
import { AzureService } from "../service/azure.service";
import { AuthFacadeService } from "../../../auth/facade/auth-facade.service";
import { NbColorHelper, NbThemeService } from "@nebular/theme";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

interface UserTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: "ngx-client-login",
  templateUrl: "./client-login.component.html",
  styleUrls: ["./client-login.component.scss"],
})
export class ClientLoginComponent implements OnInit, OnDestroy{
  time = new Date();
  intervalId;
  selectDate = new Date();
  myDate = new Date();
  clientName: String;
  clientCountryName: String;
  activeCard = "Restaurants";
  restaurantData: any = [];
  subscriptionData: any = [];
  restTemp: any = [];
  restaurantForm: FormGroup;
  usersData: any = [];
  usersForm: FormGroup;
  stepperData: any;
  clientData: any;
  userDepartment;
  userSelectedSubscriptionCode: String;
  selectedRestId;
  @ViewChild("userPermissionModal") userPermissionModal: TemplateRef<any>;
  @ViewChild("userViewPermissionModal") userViewPermissionModal: TemplateRef<any>;
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("userDelConfirmation") userDelConfirmation: TemplateRef<any>;

  userTypeList: UserTypes[] = [
    // { value: "ROLE_SUPERADMIN", viewValue: "Super Admin" },
    // { value: "ROLE_ACCOUNTOFFICER", viewValue: "Account Officer" },
    // { value: "ROLE_CLIENTADMIN", viewValue: "Client Admin" },
    { value: "ROLE_OPERATIONALMANAGERS", viewValue: "Operational Managers" },
    { value: "ROLE_GENERALMANAGERS", viewValue: "General Managers" },
    { value: "ROLE_ASSISTANTMANAGERS", viewValue: "Assistant Managers" },
    { value: "ROLE_RESTAURANTADMIN", viewValue: "Restaurant Admin" },
    { value: "ROLE_SUPERVISOR", viewValue: "Supervisor" },
    { value: "ROLE_FOH", viewValue: "FOH" },
    { value: "ROLE_BOH", viewValue: "BOH" },
  ];
  dialogMessage: string;

  constructor(
    private restaurantServiceService: RestaurantServiceService,
    private userService: UserServiceService,
    private azureService: AzureService,
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private clientServiceService: ClientServiceService,
    private readonly dataService: DataService,
    private restaurantConfigService: RestaurantConfigService,
    private authFacade: AuthFacadeService,
    private theme: NbThemeService,
    private httpClient: HttpClient
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "#468F49",
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: null,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  @ViewChild("deactivateUser") deactivateUser: TemplateRef<any>;
  @ViewChild("activateUser") activateUser: TemplateRef<any>;
  dateChange(a) {
    this.selectDate = a;
   // console.log("dateinclint",this.selectDate?this.selectDate:new Date());
    console.log("selectDate",new Date(this.selectDate));
    console.log("selectDateChanges",new Date(this.selectDate));
    var curr = new Date(this.selectDate); // get current date
    console.log("currLabourChanges",curr);
    var first = (curr.getDate() - curr.getDay()) + 1;
    console.log("firstLabourChanges",first); // First day is the day of the month - the day of the week
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    this.clientData = this.clientServiceService.getClientDetail();
    console.log("Client Data", this.clientData);

    this.clientCountryName = this.clientData.countryName;
    this.clientName = localStorage.getItem("clientName");
    this.restaurantForm.get("clientNames").setValue(this.clientData.id);
    this.viewRestaurants(localStorage.getItem("ClientId"));
  }

  async ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.activeCard = localStorage.getItem("activeCard");
    }, 1000);
    this.selectedRestId = localStorage.getItem("selectedRestId");
    this.restaurantForm = new FormGroup({
      clientNames: new FormControl(null),
    });
    //this.selectDate = new FormControl(null);
    //console.log("dateinclint",this.selectDate?this.selectDate:new Date());
    console.log("selectDate",new Date(this.selectDate));
    this.usersForm = new FormGroup({
      restaurantNames: new FormControl(this.selectedRestId ? this.selectedRestId : null),
    });

    this.clientData = this.clientServiceService.getClientDetail();
    console.log("Client Data", this.clientData);

    this.clientCountryName = this.clientData.countryName;
    this.clientName = localStorage.getItem("clientName");
    this.restaurantForm.get("clientNames").setValue(this.clientData.id);
    this.viewRestaurants(localStorage.getItem("ClientId"));
    this.viewSubscription(localStorage.getItem("ClientId"));

    //this service subscribes when ever the changes are made to the data elements in service
    this.dataService.sharedStepperData.subscribe((stepperData) => {
      this.stepperData = stepperData;
      if (
        this.stepperData.userPermissions &&
        this.stepperData.userPermissions.length > 0
      ) {
        this.dataService.setPermData(this.stepperData.userPermissions);
        this.saveUserPermissions();
      }
    });
    this.userDepartment = this.authFacade.getUser();
    this.authFacade.setUserPermissions()


    var curr = new Date(this.selectDate); // get current date
    console.log("currLabour",curr);
    var first = (curr.getDate() - curr.getDay()) + 1;
    console.log("firstLabour",first); // First day is the day of the month - the day of the week
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    // this.getLabourDataMain();
  }

  firstday: any;

  ngOnDestroy(): void {
    // clearImmediate(this.intervalId);
  }

  selectedIndex: number = 0;
  selectedRestIndex: number = 0;

  setIndex(index: number) {
    this.selectedIndex = index;
  }
  setRestIndex(index: number) {
    this.selectedRestIndex = index;
  }

  setActiveCard(c: string) {
    this.viewRestaurants(localStorage.getItem("ClientId"));
    if (c == "Restaurants") {
      this.clientName = localStorage.getItem("clientName");
    }
    if (c == "Users") {
      this.usersForm
        .get("restaurantNames")
        .setValue("All");
      this.viewUsers("All");
    }
    localStorage.setItem("activeCard", c);

  }

  closePerms(isClose) {
    if (isClose) this.modalService.dismissAll();
  }

  addNew() {
    this.restaurantServiceService.setRestaurantId(null);

    if (this.activeCard === "Restaurants")
      this.router.navigate(["/add-restaurant"]);

    if (this.activeCard === "Users") {
      var restId = this.usersForm.get("restaurantNames").value;
      this.selectedRestId = restId;
      this.userService.setUserId(null);
      this.userService.setUser(null);
      this.userService.setRestaurantId(restId);
      this.router.navigate(["/addUser"]);
    }
  }

  async requestAddUserConfig(data: any) {
    this.userService.setUserId(data.id);
    console.log("Add user Config data", data);
    this.userSelectedSubscriptionCode =
      data.accountSubscription?.subscription?.subscriptionCode;
    // console.log(
    //   "User Selected Subscription",
    //   this.userSelectedSubscriptionCode
    // );
    localStorage.setItem(
      "subsCode",
      JSON.stringify(this.userSelectedSubscriptionCode)
    );
    await this.userService.getSubscriptions()
      .toPromise()
      .then(
        (res: any) => {
          let code = res.filter((x) => x.subscriptionCode == this.userSelectedSubscriptionCode)
          this.userService.setUserSubscription(code[0].subscriptionFeatures)
        },
        (err) => {
          this.userService.setUserSubscription([])
          console.log("subsciption error")
        }
      )

    await this.userService
      .getUserPermissionsById(data.id)
      .toPromise()
      .then(
        (res: any) => {
          this.userService.setUserPermission(res.userPermissions);
        },
        (err) => {
          this.userService.setUserPermission([]);
        }
      );

    this.modalService.open(this.userPermissionModal, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });

  }
  viewsubscription() {
    this.modalService.open(this.userViewPermissionModal, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
  navigateToEditRestaurant(data: any) {
    localStorage.setItem("resturantId", data.id);
    this.restaurantServiceService.setRestaurantId(data.id);
    this.router.navigate(["/edit-restaurant"]);
  }

  searchRestaurants(event: any) {
    let restaurantSearchData: any = [];

    let value = event.target.value;

    if (value.length > 0) {
      let dataArray: any = this.restaurantServiceService.getDataArray();
      dataArray.forEach((element) => {
        let str: String = element.name;
        str = str.toLowerCase();
        value = value.toLowerCase();
        if (str.includes(value)) {
          restaurantSearchData.push(element);
        }
      });
      this.restaurantData = [];
      this.restaurantData = restaurantSearchData;
    } else {
      let id = this.restaurantForm.get("clientNames").value;
      this.viewRestaurants(id);
    }
  }

  searchUsers(event: any) {
    let usersSearchData: any = [];

    let value = event.target.value;

    if (value.length > 0) {
      let dataArray: any = this.userService.getDataArray();
      dataArray.forEach((element) => {
        let str: String = element.userProfile.firstName;
        str = str.toLowerCase();
        value = value.toLowerCase();
        if (str.includes(value)) {
          usersSearchData.push(element);
        }
      });
      this.usersData = [];
      this.usersData = usersSearchData;
    } else {
      let id = this.usersForm.get("restaurantNames").value;
      this.viewUsers(id);
      this.selectedRestId = id;
    }
  }

  async viewRestaurants(id: String) {
    await this.restaurantServiceService
      .getAllRestaurantsByClientId(id)
      .subscribe((res: any) => {
        if (res?.length > 0) {
          console.log("Restaurant ", res);
          this.restaurantData = res;
          this.restTemp = res;
          this.restaurantData = this.restaurantData?.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
          })
          this.restaurantServiceService.setDataArray(this.restaurantData);
          console.log("restaurantData", this.restaurantData)
          console.log("selectedRestId", this.selectedRestId)
          let present = false;
          this.restaurantData.forEach((x) => {
            if (x.id == this.selectedRestId) {
              present = true;
            }
          });
          if (!present) {
            console.log("selectedRestId is not present")
            this.selectedRestId = "All";
            localStorage.setItem("selectedRestId", this.selectedRestId);
          }
          this.usersForm
            .get("restaurantNames")
            .setValue(this.selectedRestId ? this.selectedRestId : "All");
          // this.usersForm.controls.restaurantNames.setValue("All");
          // this.viewUsers("All");
          this.viewUsers(this.selectedRestId ? this.selectedRestId : "All");
        } else {
          this.restaurantData = [];
        }

        this.sendRestId = this.selectrestID ? this.selectrestID : this.restaurantData[0].id;
        console.log("selectrestID", this.selectrestID);
        console.log("restaurantData[0].id", this.restaurantData[0].id);
        this.restaurantConfigService.getRestaurantConfigDataById(this.sendRestId).subscribe(data => {
          this.currencySymbol = data;
          this.currency = this.currencySymbol.currency.symbol;
          console.log("currency", this.currency);
          console.log("currencysymbol", this.currencySymbol);
        });
        this.getLabourDataMain();
      });
  }
  async viewSubscription(id: String) {
    await this.restaurantServiceService
      .getAllSubscriptionsByClientId(id)
      .subscribe((res: any) => {
        if (res.hasOwnProperty("error")) {
          console.log("can't get Subscriptions");
          this.subscriptionData = [];
        }
        else {
          this.subscriptionData = res.accountSubscriptions;
          console.log("Subscriptions ", this.subscriptionData);
        }
        // if (res?.length > 0) {
        //   console.log("Subscriptions ", res);
        //   this.subscriptionData = res;
        //   // this.restaurantServiceService.setDataArray(this.restaurantData);
        //   // this.usersForm
        //   //   .get("restaurantNames")
        //   //   .setValue(this.restaurantData[0].id);
        //   // this.viewUsers(this.restaurantData[0].id);
        // } else {
        //   this.subscriptionData = [];
        // }
      });
  }
  resname
  async viewUsers(id: String) {

    if (id == "All") {
      this.resname = "All"
      this.selectedRestId = id;
      localStorage.setItem("selectedRestId", this.selectedRestId);
      this.getAllUsersForClient();
    }
    else {
      let data = this.restaurantData.filter((data) => data.id == id);
      this.resname = data[0]?.name;
      this.selectedRestId = id;
      localStorage.setItem("selectedRestId", this.selectedRestId);
      await this.userService.userInfoByRestaurantId(id).subscribe((res) => {
        if (res) {
          this.usersData = res;
          this.usersData = this.usersData.filter(
            (x) =>
              !(
                x.role.name == "ROLE_SUPERADMIN" ||
                x.role.name == "ROLE_ACCOUNTOFFICER"
              )
          );
          this.userService.setDataArray(this.usersData);
        } else {
          this.usersData = [];
        }
      });
    }
  }

  saveUserPermissions() {
    const userid = this.userService.getUserId();
    console.log(this.stepperData);
    const dataObject = [];
    let permissions = this.dataService.getStepperData();
    let subsCode = JSON.parse(localStorage.getItem("subsCode"));
    console.log("local storage Subcode ", subsCode, permissions);
    permissions
      .filter((x) => x.completed)
      .forEach((element) => {
        let myObj = {
          featureCode: element.code,
          subscriptionCode: subsCode,
          permitted: element.completed,
        };
        dataObject.push(myObj);
      });

    // console.log("local storage Subcode ", subsCode);
    console.log("Data obj: ", dataObject, "User id: ", userid);

    this.userService.addUserConfiguration(dataObject, userid).subscribe(
      (res) => {
        console.log("User Permissions Updated", res);
        localStorage.removeItem("subsCode");
        this.modalService.dismissAll();
        this.dialogMessage = " User Permissions Saved <br /> Successfully";
        this.dialog.open(this.successDialog);
      },
      (err) => {
        console.log("Error in Updating User Permissions");
        this.dialogMessage = "Error in Saving User Permissions";
        this.dialog.open(this.secondDialog);
      }
    );
    this.stepperData.userPermissions = [];
    // this.navigateToClientLogin();
  }

  dismissAll() {
    this.dialog.closeAll();
  }

  delUser = null;
  openDelUser(user) {
    this.delUser = user;
    this.dialog.open(this.userDelConfirmation);
  }

  async deleteUser() {
    console.log("Deleting user: ", this.delUser);

    let tok = await this.azureService.getToken();
    let upn = this.delUser.azureUPN;

    this.azureService.deleteUser(tok.access_token, upn).subscribe(
      (res) => {
        this.userService.deleteUser(this.delUser.username).subscribe(
          (res) => {
            console.log("User Deleted From DB", res);
            if (res == "User Doesn't Exist") {
              this.dismissAll();
              this.dialogMessage = "User Doesn't exist";
              this.dialog.open(this.successDialog);
            } else {
              this.dismissAll();
              this.dialogMessage = "User Deleted Successfully";
              this.dialog.open(this.successDialog);
            }
            this.usersData = this.usersData.filter(
              (x) => x.username != this.delUser.username
            );
            this.userService.setDataArray(this.usersData);
            // this.delUser = null;
          },
          (err) => {
            this.dismissAll();
            if (err == "OK") {
              this.dialogMessage = "User Deleted Successfully";
              this.dialog.open(this.successDialog);
              this.usersData = this.usersData.filter(
                (x) => x.username != this.delUser.username
              );
              this.userService.setDataArray(this.usersData);
            }

            // console.log("Failed to delete user from Database ", err);
            // this.dialogMessage = "Error in Deleting User";
            // this.dialog.open(this.secondDialog);
          }
        );
      },
      (err) => {
        this.dismissAll();
        console.log("Cannot Delete Azure User", err);
        this.dialogMessage = "Error in Deleting Azure User";
        this.dialog.open(this.secondDialog);
      }
    );
  }

  navigateToRestConfig(data: any) {
    console.log("Rest ID: ", data);
    localStorage.setItem("resturantId", data.id);
    this.restaurantConfigService.setRestaurantConfigData(data);
    this.router.navigate(["/restaurant-config"]);
  }

  navigateToViewRestaurant(data: any) {
    localStorage.setItem("resturantId", data.id);
    this.restaurantServiceService.setRestaurantId(data.id);
    this.router.navigate(["/viewrestaurant"]);
  }

  navigateToClientLogin() {
    this.router.navigate(["/clientLogin"]);
  }

  navigateToEditUser(data: any) {
    localStorage.setItem("userName", data.username);
    this.userService.setUser(data);
    this.router.navigate(["/editUser"]);
  }
  back() {
    this.router.navigateByUrl("/account");
    localStorage.setItem("activeCard", 'Client');
  }
  addNewUSer() {
    this.router.navigate(["/addUser"]);
  }
  setResturantNames(id) {
    let resId = id;
    if (id == "Users") {
      let res = this.usersForm.value;
      resId = res.restaurantNames;
    }
    let data = this.restaurantData.filter((data) => data.id == resId);
    this.resname = data[0]?.name;
    this.selectedRestId = resId;
    localStorage.setItem("selectedRestId", this.selectedRestId);
    if (id == "All") {
      // this.selectedRestId = this.restaurantData;
      this.selectedRestId = resId;
      localStorage.setItem("selectedRestId", this.selectedRestId);
      this.resname = "All";
      this.getAllUsersForClient();
    }
  }
  allUsersForClient: any = [];

  getAllUsersForClient() {

    let user: any = [];
    console.log("rest Dtaa", this.restaurantData)
    this.restaurantData.forEach(async (x) => {
      await this.userService.userInfoByRestaurantId(x.id).subscribe((res) => {
        if (res) {
          user = res;
          user = user.filter(
            (z) =>
              !(
                z.role.name == "ROLE_SUPERADMIN" ||
                z.role.name == "ROLE_ACCOUNTOFFICER"
              )
          );
          console.log("res", user)
          const key = "id"
          user.forEach((y) => {
            this.allUsersForClient.push(y);
            const arrayUniqueByKey = [...new Map(this.allUsersForClient.map(item =>
              [item[key], item])).values()];
            this.allUsersForClient = arrayUniqueByKey
            // console.log("y", this.allUsersForClient, arrayUniqueByKey)
            this.usersData = this.allUsersForClient;
          });
        }
      })
    });
    console.log("allUsersForClient", this.allUsersForClient)



  }



  u;
  openDeactivateUser(userdata) {
    this.u = userdata
    console.log("userdata", userdata.userStatus)
    if (userdata.userStatus == 'ACTIVE') {
      this.dialog.open(this.deactivateUser);
    }
    else
      this.dialog.open(this.activateUser);
  }
  deactivateuser() {
    if (this.u.userStatus == 'INACTIVE') {
      this.userService.setUserStatus(this.u.id, 'ACTIVE').subscribe((res) => {
        this.viewRestaurants(localStorage.getItem("ClientId"));

      })
    }
    else {
      this.userService.setUserStatus(this.u.id, 'INACTIVE').subscribe((res) => {
        this.viewRestaurants(localStorage.getItem("ClientId"));

      })
    }
  }
  sendRestId;
  selectrestID;
  currencySymbol: any;
  currency;
  setRestId(restID) {
    this.selectrestID = restID;
    this.sendRestId = this.selectrestID;
    console.log("restIDClient:", this.selectrestID);
    this.restaurantConfigService.getRestaurantConfigDataById(this.sendRestId).subscribe(data => {
      this.currencySymbol = data;
      this.currency = this.currencySymbol.currency.symbol;
      console.log("currency", this.currency);
      console.log("currencysymbol", this.currencySymbol);
    });
    this.getLabourDataMain()
  }




  data: any;
  options: any;
  themeSubscription: any;

  getLabourData(startDate, restaurantId) {
    const headers = { 'content-type': 'application/json' };
    const baseURL = `${environment.hrBackendUrl}` + `dashboard/labour?startDate=${startDate}&restaurantId=${restaurantId}`
      ;
    return this.httpClient.get<Labour>(baseURL);
  }


  labour: Labour;
  sumLabour;

  getLabourDataMain() {
    this.getLabourData(this.firstday, this.sendRestId).subscribe(data => {
      this.labour = data;
      console.log("labour Data" + this.labour);
      console.log("labour Data firstday" + this.firstday);
      this.sumLabour = this.labour.mondayCount + this.labour.tuesdayCount + this.labour.wednesdayCount + this.labour.thursdayCount + this.labour.fridayCount + this.labour.saturdayCount + this.labour.sundayCount;
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;


        this.data = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{
            data: [this.labour.mondayCount, this.labour.tuesdayCount, this.labour.wednesdayCount, this.labour.thursdayCount, this.labour.fridayCount, this.labour.saturdayCount, this.labour.sundayCount],
            backgroundColor: "#468F49",
          }],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: null,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
    }, err => {
      this.sumLabour = 0;
      this.labour = null;
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;


        this.data = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{
            data: [0,0,0,0,0,0,0],
            backgroundColor: "#468F49",
          }],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: null,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
    })
  }


}

class Labour {
  fridayCount: number
  mondayCount: number
  saturdayCount: number
  sundayCount: number
  thursdayCount: number
  tuesdayCount: number
  wednesdayCount: number
}

class CurrencyData {
  currency: Currency
}

class Currency {
  currency: symbol
}
