import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-shift-actioncell',
   template:`<div class="">
   <i
     class="fa fa-pencil-alt action-icon"
     (click)="editEmployeeShift()"
     style="cursor: pointer"
   ></i>
 </div>`,
})
export class EditShiftActioncellComponent implements OnInit {

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
