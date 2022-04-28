import { NgModule } from "@angular/core";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { AttendanceComponent } from "./attendance/attendance.component";
import { RequestComponent } from "./request/request.component";
import { PayrollComponent } from "./payroll/payroll.component";
import { AllEmployeeComponent } from "./employees/all-employee/all-employee.component";
import { ViewEmployeeComponent } from "./employees/view-employee/view-employee.component";
import { EmployeesComponent } from "./employees/employees.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { EmployeeService } from "./services/employee.service";
import { EmployeeFacadeService } from "./fascade/employee-facade.service";
import { EmployeeComponent } from "./employee.component";
import { LeavesComponent } from "./leaves/leaves.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ShiftCalendarComponent } from "./shift-calendar/shift-calendar.component";
import { ShiftCalendarLandingComponent } from "./shift-calendar/shift-calendar-landing/shift-calendar-landing.component";
import { ShiftSchedularComponent } from "./shift-calendar/shift-schedular/shift-schedular.component";
import { AgGridModule } from "ag-grid-angular";
import { ShiftCalenderActionRendererComponent } from "./shift-calendar/shift-calendar-landing/shift-calender-action-renderer/shift-calender-action-renderer.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { EmpProfileComponent } from "./emp-profile/emp-profile.component";
import { EmployeeActionCellRendererComponent } from "./employees/all-employee/employee-action-cell-renderer/employee-action-cell-renderer.component";
import { EditEmployeeComponent } from "./employees/edit-employee/edit-employee.component";
import { ViewCalenderComponent } from "./employees/view-calender/view-calender.component";
import { NbDatepickerModule, NbSelectModule } from "@nebular/theme";
import { ShiftCalendarFacadeService } from "./fascade/shift-calendar-facade.service";
import { ShiftCalendarService } from "./services/shift-calendar.service";

import { AttendanceCellRendererActionsComponent } from "./attendance/attendance-cell-renderer-actions/attendance-cell-renderer-actions.component";

import { NbToggleModule } from "@nebular/theme";
import { MatExpansionModule } from "@angular/material/expansion";
import { NewPayrollActionCellRendererComponent } from "./payroll/new-payroll/new-payroll-action-cell-renderer/new-payroll-action-cell-renderer.component";
import { MatTabsModule } from "@angular/material/tabs";
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { RequestActionCellRendererComponent } from "./request/request-action-cell-renderer/request-action-cell-renderer.component";

import { RequestFacadeService } from "./fascade/request-facade.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { AddEmployeeComponent } from "./employees/add-employee/add-employee.component";
import { DocumentActionCellComponent } from "./employees/add-employee/document-action-cell/document-action-cell.component";
import { EditDocumentActionCellComponent } from "./employees/edit-employee/document-action-cell/edit-document-action-cell.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { LeavesActionCellComponent } from "./request/leaves-action-cell/leaves-action-cell.component";
import { ProfileActionCellComponent } from "./request/profile-action-cell/profile-action-cell.component";
import { ViewShiftActionCellComponent } from "./employees/view-employee/shift-action-cell/view-shift-action-cell.component";
import { EditShiftActioncellComponent } from "./employees/edit-employee/shift-actioncell/edit-shift-actioncell.component";
import { ViewDocumentActionCellComponent } from "./employees/view-employee/document-action-cell/view-document-action-cell.component";
import { MyleavesActionCellComponent } from './request/myleaves-action-cell/myleaves-action-cell.component';
import { MyprofileActionCellComponent } from './request/myprofile-action-cell/myprofile-action-cell.component';
import { MyshiftsActionCellComponent } from './request/myshifts-action-cell/myshifts-action-cell.component';
import { MyprofileActionCellRendererComponent } from './emp-profile/myprofile-action-cell-renderer/myprofile-action-cell-renderer.component';
import { MyprofileShiftActionCellComponent } from './emp-profile/myprofile-shift-action-cell/myprofile-shift-action-cell.component';



import { AttendanceService } from "./services/attendance.service";
import { AttendenceFacadeService } from "./fascade/attendence-facade.service";
import { PayrollFacadeService } from "./fascade/payroll-facade.service";
import { AllPayrollComponent } from "./payroll/all-payroll/all-payroll.component";
import { PayrollActionCellRendererComponent } from "./payroll/all-payroll/payroll-action-cell-renderer/payroll-action-cell-renderer.component";
import { NewPayrollComponent } from "./payroll/new-payroll/new-payroll.component";
import { PayrollService } from "./services/payroll.service";
import { RequestService } from "./services/request.service";

@NgModule({
  imports: [
    ReactiveFormsModule,
    EmployeeRoutingModule,
    SharedModule,
    CommonModule,
    NbToggleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    NgbModalModule,
    NgbModule,
    MatExpansionModule,
    NbSelectModule,
    NbDatepickerModule,
    MatTabsModule,
    FormsModule,
    NbDateFnsDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    EmployeeComponent,
    EmployeesComponent,
    AttendanceComponent,
    RequestComponent,
    PayrollComponent,
    AllEmployeeComponent,
    ViewEmployeeComponent,
    LeavesComponent,
    ShiftCalendarComponent,
    ShiftCalendarLandingComponent,
    ShiftSchedularComponent,
    ShiftCalenderActionRendererComponent,
    EmpProfileComponent,
    EditEmployeeComponent,
    ViewCalenderComponent,
    EmployeeActionCellRendererComponent,
    AttendanceCellRendererActionsComponent,
    PayrollActionCellRendererComponent,
    AllPayrollComponent,
    NewPayrollComponent,
    NewPayrollActionCellRendererComponent,
    RequestActionCellRendererComponent,
    AddEmployeeComponent,
    DocumentActionCellComponent,
    EditDocumentActionCellComponent,
    LeavesActionCellComponent,
    ProfileActionCellComponent,
    EditShiftActioncellComponent,
    ViewShiftActionCellComponent,
    ViewDocumentActionCellComponent,
    MyleavesActionCellComponent,
    MyprofileActionCellComponent,
    MyshiftsActionCellComponent,
    MyprofileActionCellRendererComponent,
    MyprofileShiftActionCellComponent,
  ],
  providers: [
    EmployeeService,
    EmployeeFacadeService,
    ShiftCalendarService,
    ShiftCalendarFacadeService,
    AttendanceService,
    AttendenceFacadeService,
    PayrollService,
    PayrollFacadeService,
    RequestService,
    RequestFacadeService,
  ],
  entryComponents: [
    ShiftCalenderActionRendererComponent,
    EmployeeActionCellRendererComponent,
    NewPayrollActionCellRendererComponent,
    AttendanceCellRendererActionsComponent,
    PayrollActionCellRendererComponent,
    RequestActionCellRendererComponent,
    DocumentActionCellComponent,
    EditDocumentActionCellComponent,
    EditShiftActioncellComponent,
    ViewShiftActionCellComponent,
    ViewDocumentActionCellComponent,
    MyleavesActionCellComponent,
    MyprofileActionCellComponent,
    MyshiftsActionCellComponent,
    MyprofileActionCellRendererComponent,
    MyprofileShiftActionCellComponent,
  ],
})
export class EmployeeModule {}
