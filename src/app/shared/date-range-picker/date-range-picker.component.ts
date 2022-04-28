import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

@Component({
  selector: "ngx-date-range-picker",
  templateUrl: "./date-range-picker.component.html",
  styleUrls: ["./date-range-picker.component.scss"],
})
export class DateRangePickerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  range = {
    start_date: new Date(),
    end_date: new Date(),
  };
  custom_date = false;

  today_date = new Date();
  @Output() date_range = new EventEmitter<any>();


  filter_string = "M";
  reset_filter(s) {
    this.filter_string = s;
    this.custom_date =false;
    if (s === "W") {
      this.range.start_date = startOfWeek(this.today_date, { weekStartsOn: 1 });
      this.range.end_date = endOfWeek(this.today_date, { weekStartsOn: 1 });
    }
    if (s === "M") {
      this.range.start_date = startOfMonth(this.today_date);
      this.range.end_date = endOfMonth(this.today_date);
    }
    if (s === "Y") {
      
      this.range.start_date = startOfYear(this.today_date);
      this.range.end_date = endOfYear(this.today_date);
    }
    this.date_range.emit(this.range);
  }
  dateRangeCreated($event) {  
    this.custom_date = true;
        this.range.start_date = $event[0];  
        this.range.end_date = $event[1];   
        this.date_range.emit(this.range)    
      }  
}
