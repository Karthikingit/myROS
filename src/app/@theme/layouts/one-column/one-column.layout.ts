import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header>
        <ngx-header
          *ngIf="!(router.url == '/login' || router.url == '/register')"
        ></ngx-header>
      </nb-layout-header>

      <nb-layout-column class="sb">
        <ng-content select="ngx-sidebar"></ng-content>
      </nb-layout-column>

      <nb-layout-column class="ros-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  router: Router;
  constructor(private _router: Router) {
    this.router = _router;
  }
}
