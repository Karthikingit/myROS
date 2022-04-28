import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BroadcastService, MsalService } from "@azure/msal-angular";

import { NGXLogger } from "ngx-logger";
import { NgxPermissionsService } from "ngx-permissions";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AuthServiceService } from "../service/auth-service.service";

import { Logger, CryptoUtils } from "msal";
import { isIE, b2cPolicies } from "../../../app-config";
import { UserServiceService } from "../../administration/account/service/user-service.service";
import { ClientServiceService } from "../../administration/account/service/client-service.service";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthFacadeService implements OnDestroy, OnInit {
  // loggedIn: Boolean = false;
  user = null;
  token = "";
  restaurants: [];
  selectedRestaurant = {};

  subscriptions: Subscription[] = [];

  isIframe = false;
  loggedIn = false;
  AzureName;
  given_name;
  roleUser;
  private permissionListSubject = new BehaviorSubject<any>([]);
  permissionList$ = this.permissionListSubject.asObservable();
  private readonly _destroying$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  private dataStore = {
    all_Permissions: [],
  };
  ngOnInit() {
    this.setUserPermissions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  async accessUserInfo(username){
    await this.userInfoService.getDetailedUserInfoByuserName(username).toPromise().then((res) => {
      if (res) {
         this.setUser(res);
         console.log("user",res);
        //  console.log("userrole",res.role.name);
      } 
      else {
        console.log("Couldn't access Userinfo form api")
      }
    });
  }
  setUser(user){
      this.roleUser = user;
      // localStorage.setItem("activeCard", 'Client');
      console.log("setReached ",this.roleUser)
  }
  getUser(){
    console.log("getReached ",this.roleUser);
    return this.roleUser;
  }
  clientData;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private ngxPermissions: NgxPermissionsService,
    private logger: NGXLogger,
    private msalService: MsalService,
    private broadcastService: BroadcastService,
    private userInfoService:UserServiceService,
    private clientServiceService: ClientServiceService
  ) {
    // this.login("ros@gmail.com", 12345);
    // this.setUserPermissions();
    //this.setUserPermissions();
   

    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;
    let acquireTokenSuccess: Subscription;
    let acquireTokenFailure: Subscription;

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    // event listeners for authentication status
    loginSuccessSubscription = this.broadcastService.subscribe(
      "msal:loginSuccess",
      async (success) => {
        // this.login("ros@gmail.com", 12345);
        this.AzureName = success.idToken.name;
        localStorage.setItem("AzureName", this.AzureName);
      
        this.logger.log("Success", success);
        this.given_name = success.idToken.claims.given_name;
        localStorage.setItem('given_name', this.given_name);
       await this.accessUserInfo(this.given_name)
    this.broadcastService.subscribe("", (res) => {
      console.log("BS", res);
    });

        // We need to reject id tokens that were not issued with the default sign-in policy.
        // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
          window.alert(
            "Password has been reset successfully. \nPlease sign-in with your new password"
          );
          return this.authService.logout();
        }

        // this.msalService.loginRedirect(b2cPolicies.authorities.resetPassword);

        console.log(
          "login succeeded. id token acquired at: " + new Date().toString()
        );
        console.log(success);

        this.checkAccount();
        this.getUser();
        console.log("userdeatils" , this.getUser())
        let user = this.getUser()
        if((user?.role.name == "ROLE_SUPERADMIN" && user?.userStatus == 'ACTIVE') || (user?.role.name == "ROLE_ACCOUNTOFFICER"  && user?.userStatus == 'ACTIVE')){
          this.getUserPermissions(user.email)
          console.log("this",this.getUserPermissions(user.email))
          localStorage.setItem("activeCard", 'Client');
          this.router.navigate(["account"])
        }
        else if(user?.role.name == "ROLE_CLIENTADMIN" && user?.userStatus == 'ACTIVE'){
          this.getUserPermissions(user.email)
          localStorage.setItem("activeCard", 'Restaurants');
          let email= user.email
          this.clientServiceService.getAllClientsByEmail(email).subscribe((x)=> {
             this.clientData = x;
            console.log("cleintdata", this.clientData)
    localStorage.setItem("ClientId", this.clientData.id);
     localStorage.setItem("clientName", this.clientData.name);
     localStorage.setItem("activeCard", "Restaurants");
     this.clientServiceService.setClientDetail(this.clientData);
     this.clientServiceService.setClientId(this.clientData.id);
     this.router.navigate(["/clientLogin"]);

          })
    
        }
        
      }

    );

    loginFailureSubscription = this.broadcastService.subscribe(
      "msal:loginFailure",
      (error) => {
        console.log("login failed");
        console.log(error);

        if (error.errorMessage) {
          // Check for forgot password error
          // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (error.errorMessage.indexOf("AADB2C90118") > -1) {
            if (isIE) {
              this.msalService.loginRedirect(
                b2cPolicies.authorities.resetPassword
              );
            } else {
              this.msalService.loginRedirect(
                b2cPolicies.authorities.resetPassword
              );
            }
          }
        }
      }
    );

    acquireTokenSuccess = this.broadcastService.subscribe(
      "msal:acquireTokenSuccess",
      (payload) => {
        this.logger.log("msal:acquireTokenSuccess", payload);
      }
    );

    acquireTokenFailure = this.broadcastService.subscribe(
      "msal:acquireTokenFailure",
      (payload) => {
        // do something here
        this.logger.log("msal:acquireTokenFailure", payload);
      }
    );

    // redirect callback for redirect flow (IE)
    this.msalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        //this.login("ros@gmail.com", 12345);
        this.logger.error("Redirect Error: ", authError.errorMessage);
        return;
      }

      this.logger.log("Redirect Success: ", response);
    });

    this.msalService.setLogger(
      new Logger(
        (logLevel, message, piiEnabled) => {
          this.logger.log("MSAL Logging: ", message);
        },
        {
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false,
        }
      )
    );

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
    this.subscriptions.push(acquireTokenSuccess);
    this.subscriptions.push(acquireTokenFailure);
  }

  login(email, password) {
    let data = { email: email, pass: password };
    let res = this.authService.login(data);
    this.logger.log("Result Authentication", res);

    if (res.authenticated) {
      this.loggedIn = true;
      this.setAuthToken(res.token);

      this.user = {
        email: "ros@gmail.com",
        token: res.token,
        username: "Ashvita",
        role: "ADMIN",
        restaurants: [
          {
            name: "Creams Cafe",
            location: "London",
            isPrimary: true,
            permissions: [
              "READ_CASHUP",
              "DOWNLOAD_CASHUP",
              "ALL",
              "EDIT_BANKING",
              "DELETE_BANKING",
              "VIEW_BANKING",
              "ALL_ACTION_IN_BANKING",
            ],
            configurations: {
              currency: "GBQ",
              currency_sym: "£",
              company_code: "CR_CA",
              complaints: [
                { value: "Damaged Accessories", code: "Damaged_Accessories" },
                {
                  value: "Food had a foreign object",
                  code: "Food_had_a_foreign_object",
                },
                { value: "Lack of maintenance", code: "Lack_of_maintenance" },
                {
                  value: "Food came out at the wrong temperature",
                  code: "Food_came_out_at_the_wrong_temperature",
                },
                { value: "Wrong menu received", code: "Wrong_menu_received" },
              ],
              reasons: [
                { value: "Damaged Accessories", code: "Damaged_Accessories" },
                {
                  value: "Food had a foreign object",
                  code: "Food_had_a_foreign_object",
                },
                { value: "Lack of maintenance", code: "Lack_of_maintenance" },
                {
                  value: "Food came out at the wrong temperature",
                  code: "Food_came_out_at_the_wrong_temperature",
                },
                { value: "Wrong menu received", code: "Wrong_menu_received" },
              ],
              cashup_config: {
                time_config: [
                  {
                    value: "AM",
                    id: "1",
                    start_time: "06:00",
                    end_time: "12:00",
                  },
                  {
                    value: "PM",
                    id: "2",
                    start_time: "12:00",
                    end_time: "23:00",
                  },
                ],
              },
              active_integrations: [
                {
                  name: "Uber Eats",
                  id: "1",
                  base64Img:
                    "https://web.deliverect.com/hubfs/Deliverect2019/Theme/Integrations%20Page/Delivery-logos_Uber-eats.svg",
                  type: "CARD",
                  integration_status: true,
                  description:
                    "Uber Eats orders push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly to your kitchen using your existing printer configurations and facilitating faster delivery.",
                  code: "",
                  date: "",
                },
                {
                  name: "IZettle",
                  id: "3",
                  base64Img:
                    "https://upload.wikimedia.org/wikipedia/commons/2/25/IZettle_Logo.svg",
                  type: "CARD",
                  integration_status: true,
                  code: "",
                  date: "",
                  description:
                    "iZettle integration Description push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly",
                },
                {
                  name: "ShopWave",
                  id: "3",
                  base64Img:
                    "https://media-exp3.licdn.com/dms/image/C4E0BAQHPw9K691wb-w/company-logo_200_200/0/1519873897120?e=2159024400&v=beta&t=dr3GnYCsTPEBTBkg3jvSgZUPwdu8Zi7sH56Lk3kyZb8",
                  type: "EPOS",
                  integration_status: false,
                  code: "",
                  date: "",
                  description:
                    "iZettle integration Description push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly",
                },
              ],
              kpi_covers: [
                { id: 1, field_name: "Table Covers", code: "TBC" },
                { id: 2, field_name: "Third Party", code: "TPT" },
                { id: 3, field_name: "Take Away Covers", code: "TAC" },
                { id: 4, field_name: "Void", code: "VOD" },
              ],

              third_party: [
                { id: 1, field_name: "Just Eat", code: "JEA" },
                { id: 3, field_name: "Deliveroo", code: "DLV" },
                { id: 3, field_name: "Zomato", code: "ZMT" },
                { id: 3, field_name: "Uber Eats", code: "UBR" },
              ],
              tills: [
                { id: 1, till_name: "Till 1", code: "TL1" },
                { id: 2, till_name: "Till 2", code: "TL2" },
                { id: 3, till_name: "Till 3", code: "TL3" },
              ],

              petty_cash: [
                { id: 3, field_name: "Food & Drinks", code: "FND" },
                { id: 3, field_name: "Sundries", code: "SND" },
                { id: 3, field_name: "Maintenance", code: "MNT" },
              ],
              Res_Employees_conf: [
                { empid: 1, empname: "Charan" },
                { empid: 2, empname: "Bhargavi" },
              ],
              pdqs: [
                { id: 1, field_name: "iZettle", code: "ZTL" },
                { id: 1, field_name: "Vouchers", code: "VCR" },
              ],
              pdq_card: [
                { id: 1, field_name: "Visa", code: "VSA" },
                { id: 2, field_name: "Amex", code: "AMX" },
                { id: 3, field_name: "Master Card", code: "MSC" },
              ],
              shift_types: [
                {
                  id: 1,
                  shift_name: "Furlough",
                  description: "Starts at 2",
                  allow_booking: true,
                  count_hrs_in_payroll: true,
                  include_schedule: false,
                },
              ],
              departments: [
                {
                  id: 1,
                  dept_name: "Management",
                  description: "Management Level",
                },
                { id: 2, dept_name: "FOH", description: "Front Of House " },
                { id: 3, dept_name: "BOH", description: "Back of House " },
              ],
            },
          },
          {
            name: "ABT Cafeteria",
            location: "India",
            isPrimary: false,
            permissions: [
              "READ_CASHUP",
              "EDIT_BANKING",
              "DELETE_BANKING",
              "VIEW_BANKING",
              "ALL_ACTION_IN_BANKING",
            ],
            configurations: {
              currency: "USD",
              currency_sym: "$",
              company_code: "ABT_CS",
              complaints: [
                { value: "Damaged Accessories", code: "C1" },
                { value: "Food had a foreign object", code: "C2" },
                { value: "Lack of maintenance", code: "C3" },
                { value: "Food came out at the wrong temperature", code: "C4" },
                { value: "Wrong menu received", code: "C5" },
              ],
              reasons: [
                { value: "Damaged Accessories", code: "R1" },
                { value: "Food had a foreign object", code: "R2" },
                { value: "Lack of maintenance", code: "R3" },
                { value: "Food came out at the wrong temperature", code: "R4" },
                { value: "Wrong menu received", code: "R5" },
              ],
              time_config: [
                {
                  value: "PM",
                  id: "2",
                  start_time: "12:00",
                  end_time: "23:00",
                },
              ],
              active_integrations: [
                {
                  name: "Uber Eats",
                  id: "1",
                  base64Img:
                    "https://web.deliverect.com/hubfs/Deliverect2019/Theme/Integrations%20Page/Delivery-logos_Uber-eats.svg",
                  type: "CARD",
                  integration_status: true,
                  description:
                    "Uber Eats orders push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly to your kitchen using your existing printer configurations and facilitating faster delivery.",
                  code: "",
                  date: "",
                },
                {
                  name: "IZettle",
                  id: "3",
                  base64Img:
                    "https://upload.wikimedia.org/wikipedia/commons/2/25/IZettle_Logo.svg",
                  type: "CARD",
                  integration_status: true,
                  code: "",
                  date: "",
                  description:
                    "iZettle integration Description push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly",
                },
                {
                  name: "ShopWave",
                  id: "3",
                  base64Img:
                    "https://media-exp3.licdn.com/dms/image/C4E0BAQHPw9K691wb-w/company-logo_200_200/0/1519873897120?e=2159024400&v=beta&t=dr3GnYCsTPEBTBkg3jvSgZUPwdu8Zi7sH56Lk3kyZb8",
                  type: "EPOS",
                  integration_status: false,
                  code: "",
                  date: "",
                  description:
                    "iZettle integration Description push directly into your POS system, eliminating the need to re-punch orders, saving time and reducing errors.Uber Eats orders print directly",
                },
              ],
              kpi_covers: [
                { id: 1, field_name: "Table Covers", code: "TBC" },
                { id: 2, field_name: "Third Party", code: "TPT" },
                { id: 3, field_name: "Take Away Covers", code: "TAC" },
                { id: 4, field_name: "Void", code: "VOD" },
              ],
              third_party: [
                { id: 1, field_name: "Just Eat", code: "JEA" },
                { id: 3, field_name: "Deliveroo", code: "DLV" },
                { id: 3, field_name: "Zomato", code: "ZMT" },
              ],
              tills: [
                { id: 1, till_name: "Till 1", code: "TL1" },
                { id: 2, till_name: "Till 2", code: "TL2" },
              ],

              petty_cash: [
                { id: 3, field_name: "Food & Drinks", code: "FND" },
                { id: 3, field_name: "Sundries", code: "SND" },
                { id: 3, field_name: "Maintenance", code: "MNT" },
                { id: 3, field_name: "Repairs", code: "RPR" },
              ],
              Res_Employees_conf: [
                { empid: 1, empname: "Charan" },
                { empid: 2, empname: "Bhargavi" },
              ],
              pdqs: [
                { id: 1, field_name: "iZettle", code: "ZTL" },
                { id: 1, field_name: "Vouchers", code: "VCR" },
              ],
              shift_types: [
                {
                  id: 1,
                  shift_name: "Furlough",
                  description: "Starts at 2",
                  allow_booking: true,
                  count_hrs_in_payroll: true,
                  include_schedule: false,
                },
              ],
              departments: [
                {
                  id: 1,
                  dept_name: "Management",
                  description: "Management Level",
                },
                { id: 2, dept_name: "FOH", description: "Front Of House " },
                { id: 3, dept_name: "BOH", description: "Back of House " },
              ],
            },
          },
        ],
      };

      localStorage.setItem("ROSuser", JSON.stringify(this.user));
      this.logger.log("User", this.user);
      this.setRestaurants(this.getUserDetails());
      this.setUserPermissions();

      this.logger.log("User Logged Successfully", this.user);
      this.logger.log("Selected Restaurant", this.selectedRestaurant);

      if (this.user == null || this.restaurants == null) {
        // this.router.navigateByUrl("/ROS/login");
        this.logger.log("Something Went Wrong! Login Again");
      }

      //this.router.navigateByUrl("/ROS/dashboard");
    } else this.logger.log("Login Failed");
  }

  loginToMicro() {
    // this.login("ros@gmail.com", "12345");
    try {
      if (isIE) {
        this.msalService.loginRedirect();
      } else {
        this.msalService.loginRedirect();
      }
    } catch (error) {
      this.logger.error("There's an error during authentication", error);
    }
  }

  logout() {
    //this.authService.logout();
    this.user = null;
    this.token = null;
    localStorage.removeItem("ROStoken");
    localStorage.removeItem("ROSrestaurants");
    localStorage.removeItem("ROSselectedRestaurant");
    localStorage.removeItem("ROSuser");
    localStorage.removeItem("resturantId");
    localStorage.removeItem("AzureName");
    localStorage.removeItem("given_name");
    localStorage.removeItem("clientHeader");
    localStorage.removeItem("activeCard");
    localStorage.removeItem("userName");
    localStorage.removeItem("clientName");
    localStorage.removeItem("ClientId");
    localStorage.removeItem("Permissions")
    this.logger.log("User Logged Out");
    //this.router.navigateByUrl("");
    this.ngxPermissions.flushPermissions();
    this.msalService.logout();
  }

  checkAccount() {
    this.loggedIn = !!this.msalService.getAccount();
  }

  setUserPermissions() {
    this.ngxPermissions.flushPermissions();
    let permissions = JSON.parse(localStorage.getItem("Permissions"));
    if (permissions) {
      this.ngxPermissions.loadPermissions(permissions);
    }
    this.logger.log("Permisssions ", permissions);
    this.logger.log("Permissions has been loaded again");
  }

  setRestaurants(user) {
    this.restaurants = user.restaurants;
    this.selectedRestaurant = user.restaurants
      ? user.restaurants.find((x) => x["isPrimary"])
      : null;

    localStorage.setItem("ROSrestaurants", JSON.stringify(this.restaurants));
    localStorage.setItem(
      "ROSselectedRestaurant",
      JSON.stringify(this.selectedRestaurant)
    );
  }

  setAuthToken(token) {
    localStorage.setItem("ROStoken", token);
    this.token = token;
    this.loggedIn = false;
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem("ROStoken"));
    if (token) return token;
    return this.token;
  }

  getAllUserRestaurants() {
    let restaurants = JSON.parse(localStorage.getItem("ROSrestaurants"));
    if (restaurants) return restaurants;
    return this.restaurants;
  }

  getRestaurant() {
    let selectedRestaurant = JSON.parse(
      localStorage.getItem("ROSselectedRestaurant")
    );
    if (selectedRestaurant) return selectedRestaurant;
    return this.selectedRestaurant;
  }

  getUserDetails() {
    let user = JSON.parse(localStorage.getItem("ROSuser"));
    this.logger.log("sf", this.user, user);
    if (user) return user;
    return this.user;
  }

  changeRestaurants(resName: string) {
    this.selectedRestaurant = this.getAllUserRestaurants().find(
      (x) => x.name === resName
    );
    localStorage.setItem(
      "ROSselectedRestaurant",
      JSON.stringify(this.selectedRestaurant)
    );
    this.setUserPermissions();
  }

  isLoggedIn() {
    this.logger.log("User is logged in", this.loggedIn);
    return this.loggedIn;
  }
  UserPermissions;          
  getUserPermissions(id){
    this.authService.getUserPermissions(id).subscribe((res)=>{
      let filter = res?.userPermissions.filter((z) => z.permitted == true);
      this.UserPermissions = filter.map((a) => a.featureCode);
      console.log("userpermissions", this.UserPermissions);
      localStorage.setItem(
        "Permissions",
        JSON.stringify(this.UserPermissions)
      );
      this.ngxPermissions.loadPermissions(
        JSON.parse(localStorage.getItem("Permissions"))
      );
    })
  }
}
