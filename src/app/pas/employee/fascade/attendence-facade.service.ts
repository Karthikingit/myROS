import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Attendance } from '../model/attendence.model';
import { AttendanceService } from '../services/attendance.service';


@Injectable()
export class AttendenceFacadeService {

  private attendanceListSubject = new BehaviorSubject<Attendance[]>([]);
  attendanceList$ = this.attendanceListSubject.asObservable();

  constructor(private attendanceService: AttendanceService) { }

  load():void {
    this.attendanceService.getAllAttendance()
    .pipe(take(1))
    .subscribe(
      attList => {
        return this.attendanceListSubject.next(attList);
      },
      err => {
        console.log('err',err);
      }
    )
  }
}
