import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-myleaves-action-cell',
  template: `<div class="">
  <i
    class="fa fa-pencil-alt  mr-3"
    aria-hidden="true"
    style="cursor: pointer" (click)="edit()"
  ></i>
  <i
    class="fa fa-trash mr-3"
    style="cursor: pointer; " (click)="delete()"
  ></i>
  <i class="fa fa-eye " style="cursor: pointer;" (click)="viewLeaves()"></i>
</div>`,
  styleUrls: ['./myleaves-action-cell.component.scss']
})
export class MyleavesActionCellComponent implements OnInit {

  constructor() { }
  data;
  params;
  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  edit(){
    this.params.context.componentParent.edit(this.data.id);
  }
  delete(){
    this.params.context.componentParent.delete(this.data.id);
  }
  
  viewLeaves(){
    this.params.context.componentParent.viewLeaves(this.data.id);
  }
}
