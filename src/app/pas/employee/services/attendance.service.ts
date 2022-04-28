import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Attendance } from '../model/attendence.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAllAttendance(){
    const attUrl = `${environment.mockapiBaseurl}attendance`;
    return this.http.get<any>(attUrl);
  }

  getAttendanceById(id:number){
    const attUrl = `${environment.mockapiBaseurl}attendance/${id}`;
    return this.http.get<any>(attUrl)
  }

}
