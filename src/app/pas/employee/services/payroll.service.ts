import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Payroll } from '../model/Payroll.model';

@Injectable()
export class PayrollService {

  constructor(private http: HttpClient) { }

  getAllPayroll(){
    const payrollUrl = `${environment.mockapiBaseurl}Payroll`
    return this.http.get<Payroll[]>(payrollUrl);
  }

  getPayrollById(id:number){
    const payrollUrl = `${environment.mockapiBaseurl}Payroll/${id}`
    return this.http.get<Payroll[]>(payrollUrl)
  }
}
