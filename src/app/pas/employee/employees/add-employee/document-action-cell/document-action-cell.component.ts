import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-document-action-cell",
  template: `<div class="">
    <i
      class="fa fa-eye action-icon"
      aria-hidden="true"
      style="cursor: pointer"
      (click)="viewDocument()"
    ></i>
    <i
      class="fa fa-download ml-2"
      aria-hidden="true"
      (click)="downloadDocument()"
      style="cursor: pointer"
    ></i>
    <i
      class="fa fa-trash action-icon ml-2"
      aria-hidden="true"
      style="cursor: pointer"
      (click)="deleteDocument()"
    ></i>
  </div>`,
})
export class DocumentActionCellComponent implements OnInit {
  constructor() {}

  data;
  params;

  ngOnInit(): void {}

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }
  viewDocument() {
    this.params.context.componentParent.viewDocument(this.data.id);
  }
  deleteDocument() {
    this.params.context.componentParent.editDocument(this.data.id);
  }
  downloadDocument() {
    this.params.context.componentParent.downloadDocument(this.data.id);
  }
}
