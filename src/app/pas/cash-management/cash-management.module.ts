import { NgModule } from "@angular/core";
import { CashManagementRoutingModule } from "./cash-management-routing.module";
import { CashUpComponent } from "./cash-up/cash-up.component";
import { ReportComponent } from "./report/report.component";
import { CashManagementComponent } from "./cash-management.component";
import { NewCashupComponent } from "./cash-up/new-cashup/new-cashup.component";
import { ViewCashupComponent } from "./cash-up/view-cashup/view-cashup.component";
import { ViewReportComponent } from "./report/view-report/view-report.component";
import { NewReportComponent } from "./report/new-report/new-report.component";
import { EditReportComponent } from "./report/edit-report/edit-report.component";
import { AllReportComponent } from "./report/all-report/all-report.component";

import { SharedModule } from "../../shared/shared.module";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
  MatError,
  MatFormFieldModule,
  MatHint,
} from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from "@angular/material/select";
import { AgGridModule } from "ag-grid-angular";
import { AllCashupComponent } from "./cash-up/all-cashup/all-cashup.component";
import { CashupActionCellRendererComponentComponent } from "./cash-up/all-cashup/cashup-action-cell-renderer-component/cashup-action-cell-renderer-component.component";
import { EditCashupComponent } from "./cash-up/edit-cashup/edit-cashup.component";
import { ReportsActionCellRendererComponent } from "./report/all-report/reports-action-cell-renderer/reports-action-cell-renderer.component";
import {
  NbPopoverComponent,
  NbPopoverModule,
  NbSelectModule,
  NbToggleModule,
  NbTooltipModule,
} from "@nebular/theme";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CashupService } from "./service";
import { CashupFacadeService } from "./facade/cashup-facade.service";
import { ReportFacadeService } from "./facade/report-facade.service";
import { ReportService } from "./service/report.service";
import { ThemeModule } from "../../@theme/theme.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_FORMATS } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CashupSidebarComponent } from "./cash-up/cashup-sidebar/cashup-sidebar.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxPermissionsModule } from "ngx-permissions";
import { AuthModule } from "../auth/auth.module";
import { CashupSummaryBoxComponent } from "./cash-up/cashup-summary-box/cashup-summary-box.component";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { MatTooltipModule } from "@angular/material/tooltip";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD MMM YYYY",
  },
  display: {
    dateInput: "DD MMM YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  imports: [
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
    AgGridModule.withComponents([]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxPermissionsModule,
    AuthModule,
    MatSnackBarModule,
    MomentDateModule,
  ],

  declarations: [
    CashManagementComponent,
    CashUpComponent,
    ReportComponent,
    NewCashupComponent,
    ViewCashupComponent,
    ViewReportComponent,
    NewReportComponent,
    EditReportComponent,
    AllReportComponent,
    AllCashupComponent,
    CashupActionCellRendererComponentComponent,
    EditCashupComponent,
    ReportsActionCellRendererComponent,
    CashupSidebarComponent,
    CashupSummaryBoxComponent,
  ],
  providers: [
    DatePipe,
    CashupService,
    ReportService,
    ReportFacadeService,
    CashupFacadeService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  entryComponents: [
    CashupActionCellRendererComponentComponent,
    ReportsActionCellRendererComponent,
  ],
})
export class CashManagementModule {}
