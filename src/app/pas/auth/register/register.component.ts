import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  myimage: string = "assets/images/pexels-anete-lusina-5721015.jpg";

  constructor(private router: Router, private title: Title) {
    this.title.setTitle("ROS - Register");
  }

  ngOnInit(): void {}
  /*otp: string;
  showOtpComponent = false;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }*/
  showDiv = {
    signup: true,
    otp: false,
    verify: false,
    reset: false,
    confirm: false,
    update: false,
  };
  dashboard() {
    this.router.navigateByUrl("/dashboard");
  }
  login() {
    this.router.navigateByUrl("/login");
  }
}
