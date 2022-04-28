import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-payroll-action-cell-renderer',
  templateUrl: './payroll-action-cell-renderer.component.html',
  styleUrls: ['./payroll-action-cell-renderer.component.scss']
})
export class PayrollActionCellRendererComponent implements OnInit {

  constructor() { }

  data;
  params;

  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  download(){
    this.params.context.componentParent.download(this.data.id);
  }
}
