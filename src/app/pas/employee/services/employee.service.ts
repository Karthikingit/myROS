import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Employee } from '../model/employee.model';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(){
    const empUrl = `${environment.mockapiBaseurl}employees`;
    return this.http.get<Employee[]>(empUrl);
  }

  addEmployee(emp: Employee){
    const empUrl = `${environment.mockapiBaseurl}employees` ;
    return this.http.post<Employee>(empUrl, emp);
  }

  getEmployById(id:number){
    const empUrl = `${environment.mockapiBaseurl}employees/${id}`;
    return this.http.get<Employee>(empUrl)
  }
  deleteEmployeeById(id){
    const empUrl = `${environment.mockapiBaseurl}employees/${id}`;
    return this.http.delete<Employee>(empUrl)
  }
  addShift( emp: any){
    const empUrl = `${environment.mockapiBaseurl}shift` ;
    return this.http.post<any>(empUrl , emp);
  }
  addvacationshift( emp: any){
    const empUrl = `${environment.mockapiBaseurl}shift` ;
    return this.http.post<any>(empUrl , emp);
  }
  editShift(emp: any,id){
    const empUrl = `${environment.mockapiBaseurl}shift/${id}` ;
    return this.http.put<any>(empUrl, emp);
  }
  editvacationShift(emp: any,id){
    const empUrl = `${environment.mockapiBaseurl}shift/${id}` ;
    return this.http.put<any>(empUrl, emp);
  }

  deleteshiftById(id){
    const empUrl = `${environment.mockapiBaseurl}shift/${id}`;
    return this.http.delete<any>(empUrl)
  }


}
