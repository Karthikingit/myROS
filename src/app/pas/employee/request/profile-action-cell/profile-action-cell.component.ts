import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-profile-action-cell',
  template: `<div class="">
  <i
    class="fa fa-eye mr-3"
    aria-hidden="true"
    (click)="viewProfileRequest()"
    style="cursor: pointer"
  ></i>
  <i
    class="fa fa-times mr-3 reject"
  ></i>
  <i class="fa fa-check approve"></i>
</div>`,
  styleUrls: ['./profile-action-cell.component.scss']
})
export class ProfileActionCellComponent implements OnInit {

  constructor() { }

  data;
  params;
  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }

 
  viewProfileRequest(){
    this.params.context.componentParent.viewProfileRequest(this.data.id);
  }

}
