import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionLandingComponent } from './subscription-landing/subscription-landing.component';
import { RouterModule } from '@angular/router';
import { AddnewsubscriptionComponent } from './subscription-landing/addnewsubscription/addnewsubscription.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationComponent } from './subscription-landing/configuration/configuration.component';
import { AgGridModule } from "ag-grid-angular";
import { SubscriptionActionCellRendererComponent } from './subscription-landing/subscription-action-cell-renderer/subscription-action-cell-renderer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [SubscriptionLandingComponent, AddnewsubscriptionComponent, ConfigurationComponent, SubscriptionActionCellRendererComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatTooltipModule,
    AgGridModule.withComponents([]),
  ],
  entryComponents: [
    SubscriptionActionCellRendererComponent
  ]
})
export class SubscriptionModule { }
