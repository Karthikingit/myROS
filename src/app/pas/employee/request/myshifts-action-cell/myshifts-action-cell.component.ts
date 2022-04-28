import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myshifts-action-cell',
  template: `<div class="">
  <i
    class="fa fa-pencil-alt  mr-3"
    aria-hidden="true"
    style="cursor: pointer" (click)="editShifts()"
  ></i>
  <i
    class="fa fa-trash mr-3"
    style="cursor: pointer; " (click)=" deleteShifts()"
  ></i>
  <i class="fa fa-eye " style="cursor: pointer;" (click)=" viewShifts()"></i>
</div>`,
  styleUrls: ['./myshifts-action-cell.component.scss']
})
export class MyshiftsActionCellComponent implements OnInit {

  constructor() { }
  data;
  params;
  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  editShifts(){
    this.params.context.componentParent.editShifts(this.data.id);
  }
  deleteShifts(){
    this.params.context.componentParent.deleteShifts(this.data.id);
  }
  
  viewShifts(){
    this.params.context.componentParent.viewShifts(this.data.id);
  }

}
