import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { AuthFacadeService } from "../auth/facade/auth-facade.service";
// import { routerTransition } from '../../router.animations';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  // animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  myDate = new Date();
  prevDate = new Date();
  net_sales_filter = "D";
  cashup_filter = "D";
  purchase_orders_filter = "default";

  staff_requests = [
    {
      img: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1061&q=80",
      name: "Francessca",
      request_type: "Shift Change",
      approved: false,
    },
    {
      img: "https://images.unsplash.com/photo-1578774296842-c45e472b3028?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=321&q=80",
      name: "John Doe",
      request_type: "Vacation Request",
      approved: false,
    },
    {
      img: "https://images.unsplash.com/photo-1568707043650-eb03f2536825?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      name: "Aaron Cooper",
      request_type: "Edit Profile Request",
      approved: false,
    },
    {
      img: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      name: "Francessca",
      request_type: "Shift Request",
      approved: false,
    },
    {
      img: "https://images.unsplash.com/photo-1545506475-5a0985c3ca79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      name: "Francessca",
      request_type: "Shift Change",
      approved: false,
    },
    {
      img: "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1061&q=80",
      name: "Francessca",
      request_type: "Shift Change",
      approved: false,
    },
  ];

  constructor(
    private title: Title,
    private router: Router,
    private authFacade: AuthFacadeService,
    private logger: NGXLogger
  ) {
    this.title.setTitle("ROS - Dashboard");
    this.prevDate.setDate(this.myDate.getDate() - 1);
  }

  ngOnInit() {}

  set_purchase_orders(s: string) {
    this.purchase_orders_filter = s;
  }

  reset_net_sales(s: string) {
    this.net_sales_filter = s;
  }

  reset_cashup(s: string) {
    this.cashup_filter = s;
  }

  goToCashup(s) {
    this.router.navigateByUrl("/accounting/cashup", {
      state: { viewState: s },
    });
  }
}
