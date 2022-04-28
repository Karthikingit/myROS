import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-calendar',
  template: `
  <nb-calendar [(date)]="date" [min]="min" [max]="max"></nb-calendar>
`,  styleUrls: ['./dashboard-calendar.component.scss']
})
export class DashboardCalendarComponent implements OnInit {

  date: Date;
  min: Date;
  max: Date;

  constructor(dateService: NbDateService<Date>) {
    this.date = dateService.today();
    this.date.setDate(10);
    this.min = dateService.addDay(this.date, -7);
    this.max = dateService.addDay(this.date, 7);
  }

  ngOnInit(): void {
  }

}
