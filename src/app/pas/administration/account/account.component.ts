import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientServiceService } from "./service/client-service.service";
import { RestaurantServiceService } from "./service/restaurant-service.service";
import { FormGroup, FormControl } from "@angular/forms";
import { UserServiceService } from "./service/user-service.service";
import { DataService } from "./service/data-service.service";
import { MatDialog } from "@angular/material/dialog";
import { RestaurantConfigService } from "./service/restaurant-config.service";
import { AzureService } from "./service/azure.service";
import { AuthFacadeService } from "../../auth/facade/auth-facade.service";
import { NbColorHelper, NbThemeService } from "@nebular/theme";
import { timeStamp } from "console";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit, OnChanges {
  myDate = new Date();
  activeCard = "Client";
  clientData: any = [];
  clientInfo: any = [];
  selectDate = new Date();
  restaurantData: any = [];
  restTemp: any = [];
  restTemp1: any = [];
  usersData: any = [];
  ros_team_users = [];
  ros_users: any = [];
  rosTeam: any = [];
  userTemp: any = [];
  time = new Date();
  intervalId;
  filterrole: any = [];
  currentHour = this.time.getHours();
  messageDisplay: String;
  dialogMessage: string;
  userSelectedSubscriptionCode: String;
  stepperData: any;
  selectedLevel;
  userDepartment;
  sumLabour;

  // @Output() closeEvnt = new EventEmitter<boolean>();

  @ViewChild("deactivateClient") deactivateClient: TemplateRef<any>;
  @ViewChild("activateClient") activateClient: TemplateRef<any>;
  @ViewChild("deactivateUser") deactivateUser: TemplateRef<any>;
  @ViewChild("activateUser") activateUser: TemplateRef<any>;
  @ViewChild("loginClient") loginClient: TemplateRef<any>;
  firstday: any;
  accountUrl;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private clientServiceService: ClientServiceService,
    public dialog: MatDialog,
    private userService: UserServiceService,
    private restaurantServiceService: RestaurantServiceService,
    private restaurantConfigService: RestaurantConfigService,
    private azureService: AzureService,
    private dataService: DataService,
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
    this.accountUrl = environment.accountUrl;
  }
  ngOnChanges(): void {
    // this.selectrestID
    this.getLabourDataMain();
  }
  labour: any;
  currencySymbol: any;

  dateChange(a) {
    this.selectDate = a;
    // console.log("dateinclint",this.selectDate?this.selectDate:new Date());
    console.log("selectDate", new Date(this.selectDate));
    console.log("selectDateChanges", new Date(this.selectDate));
    var curr = new Date(this.selectDate); // get current date
    console.log("currLabourChanges", curr);
    var first = (curr.getDate() - curr.getDay()) + 1;
    console.log("firstLabourChanges", first); // First day is the day of the month - the day of the week
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    this.getLabourDataMain();

  }
  getLabourDataMain() {
    this.getLabourData(this.firstday, this.selectrestID ? this.selectrestID : this.restTemp1[0].id).subscribe(data => {
      this.labour = data;
      console.log("labour Data" + this.labour.mondayCount)
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
    },
      err => {
        this.sumLabour = 0;
        this.labour = null;
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
    )
  }

  //pie-chart
  selectedIndex: number = 0;
  selectedRestIndex: number = 0;

  setIndex(index: number) {
    this.selectedIndex = index;
  }
  setRestIndex(index: number) {
    this.selectedRestIndex = index;
  }
  selectrestID;
  setRestId(restID) {
    this.selectrestID = restID;
    this.sendRestId = this.selectrestID;
    console.log("restID:", this.selectrestID);
    this.restaurantConfigService.getRestaurantConfigDataById(this.sendRestId).subscribe(data => {
      this.currencySymbol = data;
      this.currency = this.currencySymbol.currency.symbol;
      console.log("currency", this.currency);
      console.log("currencysymbol", this.currencySymbol);
    });
    this.getLabourDataMain()
  }
  currency;
  sendRestId;
  setActiveCard(c: string) {
    if (this.activeCard != 'Restaurants')
      this.restTemp1 = this.restaurantData;
    if (this.activeCard == 'Client')
      this.clientData = this.clientInfo;
    if (this.activeCard == 'Team')
      this.ros_team_users = this.rosTeam;
    if (this.activeCard == 'Users')
      this.userTemp = this.ros_users;
    if (this.activeCard == 'Restaurants') {
      this.restTemp1 = this.clientServiceService.getDataArray();
    }
    if (c == 'Restaurants') {
      console.log("11 selectrestID", this.selectrestID);
      console.log("21 restTemp1[0].id", this.restTemp1[0].id);
      this.getLabourDataMain();
    }
    console.log("Oyee C", c);
    console.log("activeCard ", this.activeCard);
    this.activeCard = c;
    localStorage.setItem("activeCard", c);
    console.log(this.activeCard);
    console.log(this.restTemp1);
    console.log("1 selectrestID", this.selectrestID);
    console.log("2 restTemp1[0].id", this.restTemp1[0].id);
    this.sendRestId = this.selectrestID ? this.selectrestID : this.restTemp1[0].id;
    console.log("3 sendRestId", this.sendRestId);
    this.transferFeeTblCombBxRow = "ALL";
    this.restTemp = [...this.restaurantData];
    this.restaurantConfigService.getRestaurantConfigDataById(this.sendRestId).subscribe(data => {
      this.currencySymbol = data;
      this.currency = this.currencySymbol.currency.symbol;
      console.log("currency", this.currency);
      console.log("currencysymbol", this.currencySymbol);
    });


  }
  s;
  u;
  openDeactivate(clientdata) {
    this.s = clientdata
    console.log("clientdata", clientdata.account.accountStatus)
    if (clientdata.account.accountStatus == 'ACTIVE') {
      this.dialog.open(this.deactivateClient);
    }
    else
      this.dialog.open(this.activateClient);
  }
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
        this.userService.getAllUsers().subscribe((res: []) => {
          if (res?.length > 1) {
            this.usersData = res;
            this.ros_team_users = this.usersData.filter(
              (x) =>
                x.role.name == "ROLE_SUPERADMIN" ||
                x.role.name == "ROLE_ACCOUNTOFFICER"
            );
            this.rosTeam = this.ros_team_users
            this.ros_users = this.usersData.filter(
              (x) =>
                !(
                  x.role.name == "ROLE_SUPERADMIN" ||
                  x.role.name == "ROLE_ACCOUNTOFFICER"
                )
            );
            this.userTemp = this.ros_users.slice();
          }

          console.log("UserData", this.usersData);
          console.log("usertemp", this.userTemp)
          //this.clientServiceService.setDataArray(this.clientData);
        });
      })
    }
    else {
      this.userService.setUserStatus(this.u.id, 'INACTIVE').subscribe((res) => {
        this.userService.getAllUsers().subscribe((res: []) => {
          if (res?.length > 1) {
            this.usersData = res;
            this.ros_team_users = this.usersData.filter(
              (x) =>
                x.role.name == "ROLE_SUPERADMIN" ||
                x.role.name == "ROLE_ACCOUNTOFFICER"
            );
            this.rosTeam = this.ros_team_users
            this.ros_users = this.usersData.filter(
              (x) =>
                !(
                  x.role.name == "ROLE_SUPERADMIN" ||
                  x.role.name == "ROLE_ACCOUNTOFFICER"
                )
            );
            this.userTemp = this.ros_users.slice();
          }

          console.log("UserData", this.usersData);
          //this.clientServiceService.setDataArray(this.clientData);
        });
      })
    }
  }

  deactivate() {
    if (this.s.account.accountStatus == 'INACTIVE') {
      this.clientServiceService.setClientStatus(this.s.id, 'ACTIVE').subscribe((res) => {
        this.clientServiceService.getAllClinets().subscribe((res) => {
          this.clientData = res;
          this.clientInfo = res;
          this.clientServiceService.setDataArray(this.clientData);
        });
      })
    }
    else {
      this.clientServiceService.setClientStatus(this.s.id, 'INACTIVE').subscribe((res) => {
        this.clientServiceService.getAllClinets().subscribe((res) => {
          this.clientData = res;
          this.clientInfo = res;
          this.clientServiceService.setDataArray(this.clientData);
        });
      })
    }
  }

  dismissAll() {

    this.dialog.closeAll();
  }
  transferFeeTblCombBxRow: any = "ALL";
  changeClient(clientId) {
    if (clientId == "ALL") {
      this.restTemp = [...this.restaurantData];
      this.userService.getAllUsers().subscribe(
        (res) => {
          if (res) {
            this.filterrole = res;
            this.userTemp = this.filterrole.filter(
              (x) =>
                !(
                  x.role.name == "ROLE_SUPERADMIN" ||
                  x.role.name == "ROLE_ACCOUNTOFFICER"
                )
            );
          } else {
            this.userTemp = [];
          }
          console.log(this.userTemp);
        },
        (err) => (this.userTemp = [])
      );
    }
    else {
      if (this.clientData.find((x) => x.id == clientId.id)) {

        let client = this.clientData.find((x) => x.id == clientId.id);
        localStorage.setItem("clientName", client.name);
      }
      this.selectedRestaurant == "ALL"
      localStorage.setItem("ClientId", clientId.id),
        // localStorage.setItem("clientName", data.name);
        (this.restTemp = this.restaurantData.filter(
          (x) => x.clientId == clientId.id
        ));
      this.userTemp = [];
      this.userService.getAllUsers().subscribe(
        (res) => {
          if (res) {
            this.filterrole = res;

            this.userTemp = this.filterrole.filter(
              (x) =>
                x.account.id == clientId.account.id
            );
          } else {
            this.userTemp = [];
          }
          console.log(this.userTemp);
        },
        (err) => (this.userTemp = [])
      );
    }
  }
  changeRestaurantClient(clientId) {
    console.log(clientId);
    if (clientId == "ALL") this.restTemp1 = [...this.restaurantData];
    else {
      if (this.clientData.find((x) => x.id == clientId)) {
        let client = this.clientData.find((x) => x.id == clientId);
        localStorage.setItem("clientName", client.name);
      }
      localStorage.setItem("ClientId", clientId),
        // localStorage.setItem("clientName", data.name);
        (this.restTemp1 = this.restaurantData.filter(
          (x) => x.clientId == clientId
        ));
    }
  }
  selectedRestaurant;
  changeRes(restId) {
    console.log(restId);
    this.selectedRestaurant = restId;
    if (this.selectedRestaurant == "ALL") {
      this.transferFeeTblCombBxRow = "ALL";
      this.userTemp = [...this.ros_users];
      this.restTemp = [...this.restaurantData];
    }
    else {
      this.userTemp = [];
      this.userService.userInfoByRestaurantId(restId).subscribe(
        (res) => {
          if (res) {
            this.filterrole = res;
            this.userTemp = this.filterrole.filter(
              (x) =>
                !(
                  x.role.name == "ROLE_SUPERADMIN" ||
                  x.role.name == "ROLE_ACCOUNTOFFICER"
                )
            );
          } else {
            this.userTemp = [];
          }
          console.log(this.userTemp);
        },
        (err) => (this.userTemp = [])
      );

      // this.ros_users =  api call and get data
    }
  }

  async ngOnInit(): Promise<void> {
    this.userDepartment = this.authFacade.getUser();
    this.intervalId = setInterval(() => {
      this.time = new Date();
      this.activeCard = localStorage.getItem("activeCard");
    }, 1000);

    if (this.currentHour < 12) {
      this.messageDisplay = "Good Morning";
    } else if (this.currentHour < 18) {
      this.messageDisplay = "Good Afternoon";
    } else {
      this.messageDisplay = "Good Evening";
    }

    await this.clientServiceService.getAllClinets().subscribe((res) => {
      this.clientData = res;
      console.log(res)
      this.clientInfo = res;
      this.clientServiceService.setDataArray(this.clientData);
      this.clientData = this.clientData?.sort((a, b) => {
        if (a.name?.toLowerCase() < b.name?.toLowerCase()) { return -1; }
        if (a.name?.toLowerCase() > b.name?.toLowerCase()) { return 1; }
      })
    });

    await this.userService.getAllUsers().subscribe((res: []) => {
      if (res?.length > 1) {
        this.usersData = res;

        this.ros_team_users = this.usersData.filter(
          (x) =>
            x.role.name == "ROLE_SUPERADMIN" ||
            x.role.name == "ROLE_ACCOUNTOFFICER"
        );

        this.rosTeam = this.ros_team_users
        this.ros_users = this.usersData.filter(
          (x) =>
            !(
              x.role.name == "ROLE_SUPERADMIN" ||
              x.role.name == "ROLE_ACCOUNTOFFICER"
            )
        );
        this.userTemp = this.ros_users.slice();
      }

      console.log("UserData", this.usersData);
      //this.clientServiceService.setDataArray(this.clientData);

    });

    await this.clientServiceService.getAllRestaurants().subscribe((res) => {
      this.restaurantData = res;
      this.restTemp = res;
      this.restTemp1 = res;
      this.clientServiceService.setRestaurants(this.restaurantData);
      this.restTemp = this.restTemp?.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      })
    });

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
    this.authFacade.setUserPermissions()


    var curr = new Date; // get current date
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    console.log("selectrestID selectrestID", this.selectrestID);
    console.log("3 sendRestId", this.sendRestId);
  }

  searchRestaurant(event: any) {
    let restaurantSearchData: any = [];

    let value = event.target.value;

    if (value.length > 0) {
      let dataArray: any = this.clientServiceService.getDataArray();
      console.log("serachclient", dataArray)
      dataArray.forEach((element) => {
        let str: String = element.name;
        str = str.toLowerCase();
        value = value.toLowerCase();
        if (str.includes(value)) {
          restaurantSearchData.push(element);
        }
      });
      this.restTemp1 = [];
      this.restTemp1 = restaurantSearchData;
    } else {
      this.restTemp1 = this.clientServiceService.getDataArray();
    }
  }
  searchUser(event: any) {
    let userSearchData: any = [];

    let value = event.target.value;

    if (value.length > 0) {
      let dataArray: any = this.userService.getDataArray();
      console.log("serachuser", this.ros_users)
      this.ros_users.forEach((element) => {
        let str: String = element.userProfile?.firstName;
        let str2: String = element.userProfile?.lastName;
        str = str?.toLowerCase();
        str2 = str2?.toLowerCase();
        value = value?.toLowerCase();
        if (str?.includes(value) || str2?.includes(value)) {
          userSearchData.push(element);
        }
      });
      this.userTemp = [];
      this.userTemp = userSearchData;
    } else {
      this.userTemp = this.ros_users;
    }
  }
  searchROSUser(event: any) {
    let userROSSearchData: any = [];

    let value = event.target.value;

    if (value.length > 0) {
      // let dataArray: any = this.userService.getDataArray();
      console.log("serachuser", this.rosTeam)
      this.rosTeam.forEach((element) => {
        let str: String = element.userProfile?.firstName;
        let str2: String = element.userProfile?.lastName;
        str = str?.toLowerCase();
        str2 = str2?.toLowerCase();
        value = value?.toLowerCase();
        if (str?.includes(value) || str2?.includes(value)) {
          userROSSearchData.push(element);
        }
      });
      this.ros_team_users = [];
      this.ros_team_users = userROSSearchData;
    } else {
      this.ros_team_users = this.rosTeam;
    }
  }
  searchClients(event: any) {
    let clientSearchData: any = [];
    let value = event.target.value;

    if (value.length > 0) {
      // let dataArray: any = this.clientServiceService.getDataArray();
      console.log("serachclient", this.clientInfo)
      this.clientInfo.forEach((element) => {
        let str: String = element.name;
        str = str.toLowerCase();
        value = value.toLowerCase();
        if (str.includes(value)) {
          clientSearchData.push(element);
        }
      });
      this.clientData = [];
      this.clientData = clientSearchData;
    } else {
      this.clientData = this.clientInfo;
    }
  }


  addNew() {
    this.clientServiceService.setClientId(null);
    localStorage.setItem("ClientId", null);
    localStorage.setItem("clientHeader", "Add new Client");

    if (this.activeCard === "Client") this.router.navigate(["/client"]);
  }

  addNewRestaurant() {
    this.restaurantServiceService.setRestaurantId(null);

    this.router.navigate(["/add-restaurant"], { state: { isSuper: true } });
  }

  addNewROSUser() {
    this.userService.setUserId(null);
    this.userService.setUser(null);
    this.router.navigate(["/addUser"], { state: { isSuper: true, isROSTeam: true } });
  }

  addNewUser() {
    // Will need restaurant id
    //var restId = this.usersForm.get("restaurantNames").value;
    this.userService.setUserId(null);
    this.userService.setUser(null);
    // this.userService.setRestaurantId(restId);
    this.router.navigate(["/addUser"], { state: { isSuper: true, isROSTeam: false } });
  }

  navigateToEditClient(data: any) {
    localStorage.setItem("clientHeader", "Edit Client");
    localStorage.setItem("ClientId", data.id);
    this.clientServiceService.setClientId(data.id);
    this.router.navigate(["/client"], { state: { isSuper: true } });
  }
  navigateToViewClient(data: any) {
    localStorage.setItem("ClientId", data.id);
    this.clientServiceService.setClientId(data.id);
    this.router.navigate(["/viewclient"], { state: { isSuper: true } });
  }

  navigateToClientLogin(data) {
    if (data.account.accountStatus == 'ACTIVE') {
      localStorage.setItem("ClientId", data.id);
      localStorage.setItem("clientName", data.name);
      localStorage.setItem("activeCard", "Restaurants");
      this.clientServiceService.setClientDetail(data);
      this.clientServiceService.setClientId(data.id);
      this.router.navigate(["/clientLogin"]);
    }
    else {
      this.dialog.open(this.loginClient);
    }
  }

  navigateToEditRestaurant(data: any) {
    localStorage.setItem("resturantId", data.id);
    this.restaurantServiceService.setRestaurantId(data.id);
    this.router.navigate(["/edit-restaurant"], { state: { isSuper: true } });
  }

  navigateToViewRestaurant(data: any) {
    localStorage.setItem("resturantId", data.id);
    this.restaurantServiceService.setRestaurantId(data.id);
    this.router.navigate(["/viewrestaurant"], { state: { isSuper: true } });
  }

  navigateToRestConfig(data: any) {
    console.log("Rest ID: ", data);
    localStorage.setItem("resturantId", data.id);
    this.restaurantConfigService.setRestaurantConfigData(data);
    this.router.navigate(["/restaurant-config"], { state: { isSuper: true } });
  }

  navigateToEditUser(data: any) {
    localStorage.setItem("userName", data.username);
    this.userService.setUser(data);
    this.router.navigate(["/editUser"], { state: { isSuper: true, isROSTeam: false } });
  }
  navigateToEditUsers(data: any) {
    localStorage.setItem("userName", data.username);
    this.userService.setUser(data);
    this.router.navigate(["/editUser"], { state: { isSuper: true, isROSTeam: true } });
  }
  @ViewChild("userDelConfirmation") userDelConfirmation: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("userPermissionModal") userPermissionModal: TemplateRef<any>;

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
        this.userService.deleteUser(encodeURIComponent(this.delUser.username)).subscribe(
          (res) => {
            console.log("User Deleted From DB", res);
            if (res == "User Doesn't Exist") {
              console.log("k")
              this.dismissAll();
              this.dialogMessage = "User Doesn't exist";
              this.dialog.open(this.successDialog);
            } else {
              console.log("c")
              this.dismissAll();
              this.dialogMessage = "User Deleted Successfully";
              this.dialog.open(this.successDialog);
            }
            this.userTemp = this.usersData.filter(
              (x) => x.username != this.delUser.username && !(
                x.role.name == "ROLE_SUPERADMIN" ||
                x.role.name == "ROLE_ACCOUNTOFFICER"
              )
            );
            // this.usersData = this.usersData.filter(
            //   (x) => x.username != this.delUser.username && !(
            //     x.role.name == "ROLE_SUPERADMIN" ||
            //     x.role.name == "ROLE_ACCOUNTOFFICER"
            //   )
            // );

            // this.userService.setDataArray(this.usersData);
            // this.delUser = null;
          },
          (err) => {
            this.dismissAll();
            if (err == "OK") {
              console.log("s")
              this.dialogMessage = "User Deleted Successfully";
              this.dialog.open(this.successDialog);
              // this.usersData = this.usersData.filter(
              //   (x) => x.username != this.delUser.username
              // );
              this.userTemp = this.usersData.filter(
                (x) => x.username != this.delUser.username && !(
                  x.role.name == "ROLE_SUPERADMIN" ||
                  x.role.name == "ROLE_ACCOUNTOFFICER"
                )
              );

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
    // this.navigateToAccount();
  }

  navigateToAccount() {
    this.router.navigate(["/account"]);
  }

  closePerms(isClose) {
    if (isClose) this.modalService.dismissAll();
  }

  async requestAddUserConfig(data: any) {
    this.userService.setUserId(data.id);
    console.log("Add user Config data", data);
    this.userService.setUser(data);
    //need to be replaced once we get Subscription code in Data object
    // this.userSelectedSubscriptionCode ="ERP_PRM";

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
    await this.userService
      .getSubscriptions()
      .toPromise()
      .then(
        (res: any) => {
          let code = res.filter(
            (x) => x.subscriptionCode == this.userSelectedSubscriptionCode
          );
          this.userService.setUserSubscription(code[0].subscriptionFeatures);
        },
        (err) => {
          this.userService.setUserSubscription([]);
          console.log("subsciption error");
        }
      );

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

  // addNewRes() {
  //   this.restaurantServiceService.setRestaurantId(null);

  //   if (this.activeCard === "Restaurants")
  //     this.router.navigate(["/add-restaurant"]);

  //   if (this.activeCard === "Users") {
  //     var restId = this.usersForm.get("restaurantNames").value;
  //     this.userService.setUserId(null);
  //     this.userService.setUser(null);
  //     this.userService.setRestaurantId(restId);
  //     this.router.navigate(["/addUser"]);
  //   }
  // }


  data: any;
  options: any;
  themeSubscription: any;

  getLabourData(startDate, restaurantId) {
    const headers = { 'content-type': 'application/json' };
    const baseURL = `${environment.hrBackendUrl}` + `dashboard/labour?startDate=${startDate}&restaurantId=${restaurantId}`
      ;
    return this.httpClient.get<Labour>(baseURL);
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
