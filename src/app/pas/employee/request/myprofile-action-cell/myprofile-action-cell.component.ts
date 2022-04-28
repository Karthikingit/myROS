import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-myprofile-action-cell',
  template:` <div class="">
  <i
    class="fa fa-pencil-alt  mr-3"
    aria-hidden="true"
    style="cursor: pointer" (click) = "editprofile()"
  ></i>
  <i
    class="fa fa-trash mr-3"
    style="cursor: pointer;" (click)="deleteProfile()" 
  ></i>
  <i class="fa fa-eye " style="cursor: pointer;" (click) = "viewprofile()"></i>
</div>`,
  styleUrls: ['./myprofile-action-cell.component.scss']
})
export class MyprofileActionCellComponent implements OnInit {

  constructor() { }
  data;
  params;
  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  deleteProfile(){
    this.params.context.componentParent.deleteProfile(this.data.id);
  }
  viewprofile(){
    this.params.context.componentParent.viewprofile(this.data.id);

  }
  editprofile(){
    this.params.context.componentParent.editprofile(this.data.id);

  }

}
