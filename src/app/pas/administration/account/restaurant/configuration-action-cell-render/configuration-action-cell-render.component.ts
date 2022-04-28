import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-configuration-action-cell-render',
  templateUrl: './configuration-action-cell-render.component.html',
  styleUrls: ['./configuration-action-cell-render.component.scss']
})
export class ConfigurationActionCellRenderComponent implements OnInit {

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
    this.params.context.componentParent.editSafeSum(this.data);
  }
  
  delete(){
     this.params.context.componentParent.deleteSafesummary(this.data);
  }

}
