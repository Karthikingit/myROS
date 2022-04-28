import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-configuration-sidebar',
  templateUrl: './configuration-sidebar.component.html',
  styleUrls: ['./configuration-sidebar.component.scss']
})
export class ConfigurationSidebarComponent implements OnInit {
  superInfo = null;
  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    public dialog: MatDialog,

  ) {
    this.superInfo = this.router.getCurrentNavigation().extras.state;
    console.log("from superAdminsss", this.superInfo);
  }
  @Input() tab_name: string;
  @Input() checker: string;
  @Input() checkerNew: string;

  ngOnInit(): void {
    this.tab_name = "Accounting";
    this.tabName.emit(this.tab_name);
  }
  @Output() tabName = new EventEmitter<string>();

  setFormTab(s: string) {
    this.tab_name = s;
    this.tabName.emit(this.tab_name);
  }
  @ViewChild("backDialog") backDialog: TemplateRef<any>;

  openBackDialog() {
    this.dialog.open(this.backDialog, { disableClose: true });
  }
  popup() {
    // console.log(this.checker)
    if (this.checkerNew) {
      this.openBackDialog();
      localStorage.setItem("activeCard", "Restaurants")
    }
    else {
      this.navigateToDashBoard()
    }
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  navigateToDashBoard() {
    this.dialog.closeAll();
    localStorage.setItem("activeCard", "Restaurants")
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }
}
