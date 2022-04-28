import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { ROSComponent } from "./pas.component";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";
import { MsalGuard } from "@azure/msal-angular";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IntegrationComponent } from "./integration/integration.component";
import { NewClientComponent } from "./new-client/new-client.component";

const routes: Routes = [
  {
    path: "",

    component: ROSComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [MsalGuard],
      },
      {
        path: "accounting",
        canLoad: [],

        loadChildren: () =>
          import("./cash-management/cash-management.module").then(
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
        path: "emp-management",
        canLoad: [],

        loadChildren: () =>
          import("./employee/employee.module").then((m) => m.EmployeeModule),
      },
      {
        path: "restaurant-setting",
        component: LoginComponent,
      },

      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },

      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ROSRoutingModule {}
