import { NgModule } from "@angular/core";
import { ROSRoutingModule } from "./pas-routing.module";
import { ROSComponent } from "./pas.component";
import { ThemeModule } from "../@theme/theme.module";

import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { CashManagementModule } from "./cash-management/cash-management.module";
import { EmployeeModule } from "./employee/employee.module";
import { StockModule } from "./stock/stock.module";
import { NbMenuModule, NbPopoverModule, NbSelectModule, NbToggleModule, NbTooltipModule } from "@nebular/theme";
import { NgxPermissionsModule } from "ngx-permissions";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IntegrationComponent } from './integration/integration.component';
import { NewClientComponent } from "./new-client/new-client.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CashManagementRoutingModule } from "./cash-management/cash-management-routing.module";
import { ClientComponent } from './administration/account/client/client.component';
import { AddRestaurantComponent } from './administration/account/restaurant/add-restaurant/add-restaurant.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AccountComponent } from './administration/account/account.component';
import { AddNewUserComponent } from './administration/account/addUser/add-new-user/add-new-user.component';
import { UserPermissionsComponent } from './administration/account/user/user-permissions/user-permissions.component';
import { ClientLoginComponent } from './administration/account/client-login/client-login.component';
import { RestaurantConfigComponent } from "./administration/account/restaurant/restaurant-config/restaurant-config.component";
import { ViewClientComponent } from "./administration/account/viewclient/view.client.component";
import { EditRestaurantComponent } from "./administration/account/restaurant/edit-restaurant/edit-restaurant.component";
import { ViewRestaurantComponent } from "./administration/account/viewrestaurant/view.restaurant.component";
import { EditUserComponent } from './administration/account/edit-user/edit-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfigurationSidebarComponent } from './administration/account/restaurant/configuration-sidebar/configuration-sidebar.component';
import { AgGridModule } from "ag-grid-angular";
import { ConfigurationActionCellRenderComponent } from './administration/account/restaurant/configuration-action-cell-render/configuration-action-cell-render.component';
import { DepartmentActionCellRenderComponent } from './administration/account/restaurant/department-action-cell-render/department-action-cell-render.component';
import { ViewSubscriptionComponent } from './administration/account/view-subscription/view-subscription.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ChartsComponent } from './administration/account/charts/charts.component';
import { ChartsBarComponent } from "./administration/account/charts/chart-bar.component";
import { ClientPieChartComponent } from './administration/account/charts/client-pie-chart/client-pie-chart.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



@NgModule({
  declarations: [ROSComponent, DashboardComponent, IntegrationComponent,
                    AddRestaurantComponent, EditRestaurantComponent,
                    NewClientComponent, ClientComponent , AccountComponent,
                    AddNewUserComponent, UserPermissionsComponent, ClientLoginComponent,
                    RestaurantConfigComponent, ViewClientComponent, ViewRestaurantComponent, EditUserComponent, ConfigurationSidebarComponent, ConfigurationActionCellRenderComponent, DepartmentActionCellRenderComponent, ViewSubscriptionComponent, ChartsComponent, ChartsBarComponent, ClientPieChartComponent],
  imports: [

    ThemeModule,
    // NbMenuModule,n
    // CashManagementModule,
    // EmployeeModule,
    // StockModule,
    AuthModule,
    MiscellaneousModule,
    SharedModule,
    CommonModule,
    CashManagementRoutingModule,
    MatSidenavModule,
    SharedModule,
    NgbModalModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    NgbModalModule,
    MatAutocompleteModule,
    FormsModule,
    MatTooltipModule,
    NbTooltipModule,
    NbPopoverModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NbSelectModule,
    NbToggleModule,
    NgbModule,
    ThemeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    NgxPermissionsModule,
    AgGridModule.withComponents([]),
    NgxEchartsModule,
    ChartModule,
    NgxChartsModule,
  ],
})
export class ROSModule {}
