import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MENU_ITEMS } from "./pas-menu";

@Component({
  selector: "ngx-pas",
  templateUrl: "./pas.component.html",
  styleUrls: ["./pas.component.scss"],
})
export class ROSComponent {
  router: Router;
  constructor(private _router: Router) {
    this.router = _router;
  }

  includesEditURL(s: string) {
    return s.includes("/ROS/emp-management/employees/edit-employee/");
  }
  includesViewURL(r: string) {
    return r.includes("/ROS/emp-management/employees/view-employee/");
  }
}
