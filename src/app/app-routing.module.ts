import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MsalGuard } from "@azure/msal-angular";
import { LoginComponent } from "./pas/auth/login/login.component";
import { RegisterComponent } from "./pas/auth/register/register.component";
import { DashboardComponent } from "./pas/dashboard/dashboard.component";
import { IntegrationComponent } from "./pas/integration/integration.component";
import { NewClientComponent } from "./pas/new-client/new-client.component";
import { AccountComponent } from "./pas/administration/account/account.component";
import { AddNewUserComponent } from "./pas/administration/account/addUser/add-new-user/add-new-user.component";
import { ClientComponent } from "./pas/administration/account/client/client.component";
import { ClientLoginComponent } from "./pas/administration/account/client-login/client-login.component";
import { RestaurantConfigComponent } from "./pas/administration/account/restaurant/restaurant-config/restaurant-config.component";
import { ViewClientComponent } from "./pas/administration/account/viewclient/view.client.component";
import { AddRestaurantComponent } from "./pas/administration/account/restaurant/add-restaurant/add-restaurant.component";
import { EditRestaurantComponent } from "./pas/administration/account/restaurant/edit-restaurant/edit-restaurant.component";
import { ViewRestaurantComponent } from "./pas/administration/account/viewrestaurant/view.restaurant.component";
import { EditUserComponent } from "./pas/administration/account/edit-user/edit-user.component";
import { NewRoleGuardService } from "./pas/auth/service/new-role-guard.service";

import { LoadingComponent } from "./pas/auth/loading/loading.component";
import { SubscriptionLandingComponent } from "./pas/administration/subscription/subscription-landing/subscription-landing.component";
import { AddnewsubscriptionComponent } from "./pas/administration/subscription/subscription-landing/addnewsubscription/addnewsubscription.component";
import { ConfigurationComponent } from "./pas/administration/subscription/subscription-landing/configuration/configuration.component";
import { ViewSubscriptionComponent } from "./pas/administration/account/view-subscription/view-subscription.component";

export const routes: Routes = [
  // {
  //   path: "ROS",
  //   loadChildren: () => import("./pas/pas.module").then((m) => m.ROSModule),
  // },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [MsalGuard, NewRoleGuardService],
    data: {
      roles:["ROLE_SUPERADMIN","ROLE_ACCOUNTOFFICER"],
      status:["ACTIVE"]
    },
  },
  {
    path: "clientLogin",
    component: ClientLoginComponent,
    canActivate: [MsalGuard, NewRoleGuardService],
    data: {roles:["ROLE_CLIENTADMIN","ROLE_SUPERADMIN","ROLE_ACCOUNTOFFICER"],status:["ACTIVE"]},
  },
  {
    path: "subscription",
    component: SubscriptionLandingComponent,
    canActivate: [MsalGuard, NewRoleGuardService],
    data: {roles:["ROLE_SUPERADMIN"],status:["ACTIVE"]},
  },
  {
    path: 'addnewsubscription',
    component: AddnewsubscriptionComponent,
  },

  {
    path: 'configuration',
    component: ConfigurationComponent,
  },
  {
    path: 'not-found',
    component: LoadingComponent,
  },
  {
    path: "accounting",
    canLoad: [],

    loadChildren: () =>
      import("./pas/cash-management/cash-management.module").then(
        (m) => m.CashManagementModule
      ),
  },
  {
    path: "integration",
    component: IntegrationComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "newclient",
    component: NewClientComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "client",
    component: ClientComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "viewclient",
    component: ViewClientComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "add-restaurant",
    component: AddRestaurantComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "edit-restaurant",
    component: EditRestaurantComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "view-subscription",
    component: ViewSubscriptionComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "restaurant-config",
    component: RestaurantConfigComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "addUser",
    component: AddNewUserComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "viewrestaurant",
    component: ViewRestaurantComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "editUser",
    component: EditUserComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "emp-management",
    canLoad: [],

    loadChildren: () =>
      import("./pas/employee/employee.module").then((m) => m.EmployeeModule),
  },

  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "redirecting", component: LoadingComponent },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  { path: '', redirectTo: 'ROS', pathMatch: 'full' },
  // { path: '**', redirectTo: 'not-found' },
  // { path: "", redirectTo: "ROS", pathMatch: "full" },
  { path: "**", redirectTo: "redirecting" },
];

const config: ExtraOptions = {
  useHash: false,
};

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      initialNavigation: !isIframe ? "enabled" : "disabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
