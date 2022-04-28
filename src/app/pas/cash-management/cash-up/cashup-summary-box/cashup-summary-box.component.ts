import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "ngx-cashup-summary-box",
  templateUrl: "./cashup-summary-box.component.html",
  styleUrls: ["./cashup-summary-box.component.scss"],
})
export class CashupSummaryBoxComponent implements OnInit, OnChanges {
  @Input() summaryBox = [
    { header: "EPOs Takings", total: 0, items: [] },
    { header: "Cash Takings", total: 0, items: [] },
    { header: "PDQ Takings", total: 0, items: [] },
    { header: "Third Party Takings", total: 0, items: [] },
  ];

  @Input() currSym;
  @Input() difference = 0;
  diffColor = "black";
  expand_all = false;

  constructor() {}

  toggleExpandAll() {
    this.expand_all = !this.expand_all;
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.difference < 0) this.diffColor = "#A24646";
    else if (this.difference == 0) this.diffColor = "#000000";
    else this.diffColor = "#468F49";
  }
}
