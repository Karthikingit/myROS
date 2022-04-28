import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-cashup-action-cell-renderer-component",
  templateUrl: "./cashup-action-cell-renderer-component.component.html",
  styleUrls: ["./cashup-action-cell-renderer-component.component.scss"],
})
export class CashupActionCellRendererComponentComponent implements OnInit {
  constructor() { }

  data;
  params;

  ngOnInit(): void { }

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  editCashup() {
    //console.log("Edit cashup from custom Component");
    this.params.context.componentParent.editCashup(this.data);
  }
  viewCashup() {
    //console.log("Edit cashup from custom Component");
    this.params.context.componentParent.viewCashup(this.data);
  }
  deleteCashup() {
    //console.log("Edit cashup from custom Component");
    this.params.context.componentParent.deleteCashup(this.data);
  }
  // downloadEXCEL() {
  //   console.log("Cashup sheet should be downloaded");
  // }
}
