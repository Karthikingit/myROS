import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-leaves-action-cell',
  template: `<div class="">
  <i
    class="fa fa-eye mr-3"
    aria-hidden="true"
    (click)="viewLeavesRequest()"
    style="cursor: pointer"
  ></i>
  <i
    class="fa fa-times mr-3 reject"
  ></i>
  <i class="fa fa-check approve"></i>
</div>`,
  styleUrls: ['./leaves-action-cell.component.scss']
})
export class LeavesActionCellComponent implements OnInit {

  constructor() { }

  data;
  params;
  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }

 
  viewLeavesRequest(){
    this.params.context.componentParent.viewLeavesRequest(this.data.id);
  }

}
