import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { NGXLogger } from "ngx-logger";
import { Subject } from "rxjs";

import { AuthFacadeService } from "../facade/auth-facade.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  myimage: string = "assets/images/7.jpg";

  constructor(
    private router: Router,
    private authFacade: AuthFacadeService,
    private logger: NGXLogger,
    private title: Title
  ) {
    this.title.setTitle("ROS - Admin");
  }

  private readonly _destroying$ = new Subject<void>();

  ngOnInit(): void { }

  ngOnDestroy() { }

  // other methods

  loginToMicro() {
    // this.login("ros@gmail.com", "12345");
    this.authFacade.loginToMicro();
  }

  logout() {
    this.router.navigateByUrl("/login");
  }

  showDiv = {
    login: true,
    forgot: false,
    password: false,
    reset: false,
    confirm: false,
    update: false,
  };
  dashboard() {
    this.router.navigateByUrl("/dashboard");
  }
  register() {
    this.router.navigateByUrl("/register");
  }
}
