import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { ShiftCalendar } from "../model/shift-calendar.model";

@Injectable()
export class ShiftCalendarService {
  constructor(private http: HttpClient) {}

  getAllShifts() {
    const empUrl = `${environment.mockapiBaseurl}shift`;
    return this.http.get<any>(empUrl);
  }

  getShiftById(id: number) {
    const empUrl = `${environment.mockapiBaseurl}shift/${id}`;
    return this.http.get<any>(empUrl);
  }

  getAllShiftCalendar() {
    const empUrl = `${environment.mockapiBaseurl}shift_calendar`;
    return this.http.get<ShiftCalendar[]>(empUrl);
  }

  addShiftCalendar(emp: ShiftCalendar) {
    const empUrl = `${environment.mockapiBaseurl}shift_calendar`;
    return this.http.post<ShiftCalendar>(empUrl, emp);
  }
  editShiftCalendar(emp: any,id) {
    const empUrl = `${environment.mockapiBaseurl}shift/${id}`;
    return this.http.put<any>(empUrl, emp);
  }

  getShiftCalendarById(id: number) {
    const empUrl = `${environment.mockapiBaseurl}shift_calendar/${id}`;
    return this.http.get<ShiftCalendar>(empUrl);
  }
  deleteShiftCalendarById(id) {
    const empUrl = `${environment.mockapiBaseurl}shift_calendar/${id}`;
    return this.http.delete<ShiftCalendar>(empUrl);
  }
}
