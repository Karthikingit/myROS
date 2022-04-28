import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "ngx-request-action-cell-renderer",
  template: `<div class="">
    <i
      class="fa fa-eye mr-3"
      aria-hidden="true"
      (click)="viewShiftRequest()"
      style="cursor: pointer"
    ></i>
    <i class="fa fa-times mr-3 reject"></i>
    <i class="fa fa-check approve"></i>
  </div>`,
  styleUrls: ["./request-action-cell-renderer.component.scss"],
})
export class RequestActionCellRendererComponent implements OnInit {
  constructor() {}

  data;
  params;
  ngOnInit(): void {}

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  viewShiftRequest() {
    this.params.context.componentParent.viewShiftRequest(this.data.id);
  }
}
