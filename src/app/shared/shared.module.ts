import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedRoutingModule } from "./shared-routing.module";
import { MonthNavigatorComponent } from "./month-navigator/month-navigator.component";

import { PopupWithReasonComponent } from "./popup-with-reason/popup-with-reason/popup-with-reason.component";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbInputModule,
  NbMenuModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbCalendarModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PopupWithNameComponent } from "./popup-with-reason/popup-with-name/popup-with-name/popup-with-name.component";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { FloatingBadgeComponent } from "./floating-badge/floating-badge.component";
import { ToggleTabComponent } from "./toggle-tab/toggle-tab.component";
import { DateRangePickerComponent } from "./date-range-picker/date-range-picker.component";
import { AgGridCustomService } from "./services/ag-grid-custom.service";
import { DownloadService } from "./services/download.service";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { DashboardCalendarComponent } from "./dashboard-calendar/dashboard-calendar.component";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';  

const COMPONENTS = [
  MonthNavigatorComponent,
  FloatingBadgeComponent,
  SidebarComponent,
  PopupWithReasonComponent,
  PopupWithNameComponent,
  ToggleTabComponent,
  DateRangePickerComponent,
  DashboardCalendarComponent,
];

const PIPES = [];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NbTooltipModule,
    NbCardModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbDatepickerModule,
    BsDatepickerModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NbCalendarModule,
  ],
  exports: [...COMPONENTS, ...PIPES],
  providers: [AgGridCustomService, DownloadService],
})
export class SharedModule {}
