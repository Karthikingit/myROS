import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "ngx-cashup-sidebar",
  templateUrl: "./cashup-sidebar.component.html",
  styleUrls: ["./cashup-sidebar.component.scss"],
})
export class CashupSidebarComponent implements OnInit {
  constructor(private router: Router,
    private dialogService: NbDialogService) {}

  @Input() tab_name: string;
  
  ngOnInit(): void {
    this.tab_name = "epos";
    this.tabName.emit(this.tab_name);
  }

  @Output() tabName = new EventEmitter<string>();

  setFormTab(s: string) {
    this.tab_name = s;
    this.tabName.emit(this.tab_name);
  }
  back(){
    this.router.navigateByUrl("/accounting/cashup")
  }
  @ViewChild("popupContent") popupContent: TemplateRef<any>;
  popup() {
    this.dialogService.open(this.popupContent);
  }

}
