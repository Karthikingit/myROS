import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Payroll } from '../model/Payroll.model';
import { PayrollService } from '../services/payroll.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollFacadeService {

  private payrollListSubject = new BehaviorSubject<Payroll[]>([]);
  payrollList$ = this.payrollListSubject.asObservable();

  constructor(private payrollService: PayrollService) { }

  load():void {
    this.payrollService.getAllPayroll()
    .pipe(take(1))
    .subscribe(
      payrollList => {
        return this.payrollListSubject.next(payrollList);
      },
      err => {
        console.log('err',err);
      }
    )
  }
}
