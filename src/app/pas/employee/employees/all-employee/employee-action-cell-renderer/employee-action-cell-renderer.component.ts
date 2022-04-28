import { Component, OnInit } from '@angular/core';
import { EmployeeFacadeService } from '../../../fascade/employee-facade.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'ngx-employee-action-cell-renderer',
  templateUrl: './employee-action-cell-renderer.component.html',
  styleUrls: ['./employee-action-cell-renderer.component.scss']
})
export class EmployeeActionCellRendererComponent implements OnInit {

  constructor(employeeFacade: EmployeeFacadeService) { }

  data;
  params;
  allemployee: Employee[];

  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
    
  }
  viewCalender(){
    this.params.context.componentParent.viewCalender(this.data.id);
  }
  editEmployee(){
    this.params.context.componentParent.editEmployee(this.data.id);
    
  }
  viewEmployee(){
    this.params.context.componentParent.viewEmployee(this.data.id);
    
  }
  deleteEmployee(){
    this.params.context.componentParent.deleteEmployee(this.data);
  }
   

}
