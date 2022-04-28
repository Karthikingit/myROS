import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { CashManagementComponent } from "./cash-management.component";
import { AllCashupComponent } from "./cash-up/all-cashup/all-cashup.component";
import { CashUpComponent } from "./cash-up/cash-up.component";
import { EditCashupComponent } from "./cash-up/edit-cashup/edit-cashup.component";
import { NewCashupComponent } from "./cash-up/new-cashup/new-cashup.component";
import { ViewCashupComponent } from "./cash-up/view-cashup/view-cashup.component";
import { AllReportComponent } from "./report/all-report/all-report.component";
import { EditReportComponent } from "./report/edit-report/edit-report.component";
import { NewReportComponent } from "./report/new-report/new-report.component";
import { ReportComponent } from "./report/report.component";
import { ViewReportComponent } from "./report/view-report/view-report.component";

const routes: Routes = [
  {
    path: "",
    component: CashManagementComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: "cashup",
        component: CashUpComponent,
      },
      {
        path: "cashup/deposit",
        component: CashUpComponent,
      },
      {
        path: "cashup/view",
        component: ViewCashupComponent,
      },
      {
        path: "cashup/new",
        component: NewCashupComponent,
      },
      {
        path: "cashup/edit",
        component: NewCashupComponent,
      },
      // {
      //   path: "deposit",
      //   component: DepositComponent,
      //   children: [
      //     {
      //       path: "",
      //       redirectTo: "pending",
      //       pathMatch: "full",
      //     },
      //     {
      //       path: "pending",
      //       component: PendingComponent,
      //     },
      //     {
      //       path: "banking",
      //       component: BankingComponent,
      //     },
      //   ],
      // },
      {
        path: "report",
        component: ReportComponent,
        children: [
          {
            path: "",
            redirectTo: "home",
            pathMatch: "full",
          },
          {
            path: "home",
            component: AllReportComponent,
          },
          {
            path: "new",
            component: NewReportComponent,
          },
          {
            path: "view/:id",
            component: ViewReportComponent,
          },
          {
            path: "edit/:id",
            component: EditReportComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashManagementRoutingModule {}
