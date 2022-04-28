import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-new-payroll-action-cell-renderer',
  templateUrl: './new-payroll-action-cell-renderer.component.html',
  styleUrls: ['./new-payroll-action-cell-renderer.component.scss']
})
export class NewPayrollActionCellRendererComponent implements OnInit {

  constructor() { }

  data;
  params;

  ngOnInit(): void {
  }
  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  deleteEmployee(){
    this.params.context.componentParent.deleteEmployee(this.data);
  }

}
