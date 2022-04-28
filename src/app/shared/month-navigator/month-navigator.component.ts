import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

import { subDays, addDays, startOfWeek, endOfWeek, endOfMonth } from "date-fns";

import {
  startOfMonth,
  addMonths,
  addWeeks,
  subMonths,
  subWeeks,
} from "date-fns";

@Component({
  selector: "ngx-month-navigator",
  template: `
    <div class="month_navigator" style="display: flex; flex: 0 0 auto; width: 199px; text-align: center; padding: 4px 0; 
    border: 1px solid rgba(0, 0, 0, 0.5); border-radius: 4px; font-family: 'Roboto'; font-size: 14px;"
    >
      <div class="arrows" (click)="changeDates(true)">
        <i class="fa fa-arrow-left ml-2"></i>
      </div>
      <div class="show_date" style="width: 165px; font: normal normal normal 16px/19px Roboto; letter-spacing: 0px; 
      color: rgba(2, 2, 2, 1); opacity: 1;">
        <span *ngIf="state == 'D'">
          {{ viewDate | date: "d MMMM" }}
        </span>
        <span *ngIf="state == 'M'">
          {{ viewDate | date: "MMMM, y" }}
        </span>
        <span *ngIf="state == 'W'">
          {{ dates.startOfWeek | date: "d MMM" }} -
          {{ dates.endOfWeek | date: "d MMM" }}
        </span>
        <span *ngIf="state == '2W'">
          {{ dates.startOf2Week | date: "d MMM" }} -
          {{ dates.endOf2Week | date: "d MMM" }}
        </span>
      </div>
      <div class="arrows" (click)="changeDates(false)">
        <i class="fa fa-arrow-right mr-2"></i>
      </div>
    </div>
  `,
  styles: [
    `
      .month_navigator {
        display: flex;
        flex: 0 0 auto;
        border: 1px solid rgba(0, 0, 0);
        width: 199px;
        justify-content: space-between;
        text-align: center;
        padding: 4px 0;
      }
      .month_navigator .arrows {
        cursor: pointer;
        padding: 0 5px;
        flex-basis: 24px;
      }

      .month_navigator .show_date {
        flex-basis: 165px;
      }
    `,
  ],
})
export class MonthNavigatorComponent implements OnInit, OnChanges {
  /* -- Input -- : 
       viewDate - You can give a date object when u want to start the navigator.
       state    - Accepted values are 'W', 'M', 'D', '2W' for changing the date range by week, month, day, or 2 weeks.

    -- Output -- :
       (dateChange)  - It will emit all the dates starting and ending range. 

  */

  @Input() viewDate: Date = new Date();
  @Input() state: "W" | "M" | "D" | "2W" = "W";
  @Output() dateChange = new EventEmitter<any>();

  dates = {
    startOfMonth: null,
    endOfMonth: null,
    startOfWeek: null,
    endOfWeek: null,
    startOf2Week: null,
    endOf2Week: null,
    startOfDay: null,
    endOfDay: null,
    start: null,
    end: null,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.updateDates();
  }

  ngOnInit(): void {
    this.dates = {
      startOfMonth: startOfMonth(this.viewDate),
      endOfMonth: endOfMonth(this.viewDate),
      startOfWeek: startOfWeek(this.viewDate, { weekStartsOn: 1 }),
      endOfWeek: endOfWeek(this.viewDate, { weekStartsOn: 1 }),
      startOf2Week: startOfWeek(this.viewDate, { weekStartsOn: 1 }),
      endOf2Week: addDays(startOfWeek(this.viewDate, { weekStartsOn: 1 }), 13),
      startOfDay: this.viewDate,
      endOfDay: this.viewDate,
      start: new Date(),
      end: new Date(),
    };
  }

  changeDates(prev) {
    if (this.state == "D") {
      this.viewDate = prev
        ? subDays(this.viewDate, 1)
        : addDays(this.viewDate, 1);
    }
    if (this.state == "M") {
      this.viewDate = prev
        ? subMonths(this.viewDate, 1)
        : addMonths(this.viewDate, 1);
    }
    if (this.state == "W") {
      this.viewDate = prev
        ? subWeeks(this.viewDate, 1)
        : addWeeks(this.viewDate, 1);
    }
    if (this.state == "2W") {
      this.viewDate = prev
        ? subWeeks(this.viewDate, 2)
        : addWeeks(this.viewDate, 2);
    }
    this.updateDates();
  }

  updateDates() {
    // For Month
    this.dates.startOfMonth = startOfMonth(this.viewDate);
    this.dates.endOfMonth = endOfMonth(this.viewDate);

    if (this.state == "M") {
      this.dates.start = this.dates.startOfMonth;
      this.dates.end = this.dates.endOfMonth;
    }

    // For Week
    this.dates.startOfWeek = startOfWeek(this.viewDate, { weekStartsOn: 1 });
    this.dates.endOfWeek = endOfWeek(this.viewDate, { weekStartsOn: 1 });

    if (this.state == "W") {
      this.dates.start = this.dates.startOfWeek;
      this.dates.end = this.dates.endOfWeek;
    }

    // For 2 Week
    this.dates.startOf2Week = startOfWeek(this.viewDate, { weekStartsOn: 1 });
    this.dates.endOf2Week = addDays(
      startOfWeek(this.viewDate, { weekStartsOn: 1 }),
      13
    );

    if (this.state == "2W") {
      this.dates.start = this.dates.startOf2Week;
      this.dates.end = this.dates.endOf2Week;
    }

    // For day
    this.dates.startOfDay = this.viewDate;
    this.dates.endOfDay = this.viewDate;

    if (this.state == "D") {
      this.dates.start = this.dates.startOfDay;
      this.dates.end = this.dates.endOfDay;
    }

    // console.log(this.dates);
    this.dateChange.emit(this.dates);
  }
}
