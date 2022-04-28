import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-attendance-cell-renderer-actions',
  templateUrl: './attendance-cell-renderer-actions.component.html',
  styleUrls: ['./attendance-cell-renderer-actions.component.scss']
})
export class AttendanceCellRendererActionsComponent implements OnInit {

  constructor() { }

  data;
  params;
  ngOnInit(): void {
  }
  agInit(params){
    this.params = params;
    this.data = params.data;
  }
  
  viewCalender(){
    this.params.context.componentParent.viewCalender(this.data.id);
  }

}
