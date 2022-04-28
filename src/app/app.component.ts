/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { filter, takeUntil } from "rxjs/operators";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";

@Component({
  selector: "ngx-app",
  template: `<ngx-one-column-layout>
  <ngx-sidebar
    *ngIf="
      !(
        router.url == '/login' ||
        router.url == '/accounting/cashup/edit' ||
        router.url == '/restaurant-config' ||
        router.url == '/emp-management/employees/add-employee' ||
        router.url == '/emp-management/employees/edit-employee' ||
        router.url == '/emp-management/shift-calendar/shift-schedular' ||
        router.url == '/register' ||

        includesEditURL(router.url) ||
        includesViewURL(router.url)
      )
    "
  ></ngx-sidebar>

  <router-outlet></router-outlet>
</ngx-one-column-layout>
`
})
export class AppComponent implements OnInit {
  router: Router
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private _router: Router
  ) {
    this.router = _router;

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
  includesEditURL(s: string) {
    return s.includes("/emp-management/employees/edit-employee/");
  }
  includesViewURL(r: string) {
    return r.includes("/emp-management/employees/view-employee/");
  }
}
