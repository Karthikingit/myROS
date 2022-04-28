import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myprofile-shift-action-cell',
  template:`<div class="">
  <i
    class="fa fa-pencil-alt action-icon"
    (click)="editEmployeeShift()"
    style="cursor: pointer; 
    vertical-align: middle;
    margin-right: 10px;"
  ></i>
</div>`,
})
export class MyprofileShiftActionCellComponent implements OnInit {

  constructor() { }

  data;
  params;
 

  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
    
  }
 
  editEmployeeShift(){
    this.params.context.componentParent.editEmployee(this.data.id);
  }


}
