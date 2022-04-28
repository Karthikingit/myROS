import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AgGridCustomService {
  constructor(public datepipe: DatePipe) {}

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  currencyFormatter(currency, sign) {
    var sansDec = Math.abs(currency);
    return sign + ` ${sansDec}`;
  }

  getTimeHour(d: Date): string {
    let date = new Date(d);
    if (date.getHours() >= 12) return "PM";
    else return "AM";
  }

  currencyFormatterclr(currency, sign) {
    var sansDec = Math.abs(currency);
    if (currency < 0) {
      return " - " + sign + ` ${sansDec}`;
    } else if (currency == 0) {
      return sign + ` ${sansDec}`;
    } else {
      return " + " + sign + ` ${sansDec}`;
    }
  }

  dateFormatter(date: Date) {
    //console.log("datepipe",date)
    if(!date){
      return '';
    }
    let d = new Date(date);
    let now_date = this.datepipe.transform(d, "dd MMM yyyy");
    return now_date;
  }

  colorFormatter(val: number) {
    if (val < 0) return { color: "red" };
    else return { color: "green" };
  }
}
