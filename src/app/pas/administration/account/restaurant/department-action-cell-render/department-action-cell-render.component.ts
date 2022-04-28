import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-department-action-cell-render',
  templateUrl: './department-action-cell-render.component.html',
  styleUrls: ['./department-action-cell-render.component.scss']
})
export class DepartmentActionCellRenderComponent implements OnInit {

  constructor() { }

  params;
  data;

  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }

  edit(){
    this.params.context.componentParent.editDepartment(this.data);
  }
  
  delete(){
     this.params.context.componentParent.deleteDepartment(this.data);
  }

}
