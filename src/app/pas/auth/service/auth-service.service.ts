import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, router: Router) {}

  login(data) {
    console.log(data);
    let result = { status: "200", authenticated: false, token: "" };
    if (data.email === "ros@gmail.com" && data.pass == "12345") {
      result.authenticated = true;
      result.token = "ABCD1234";
    }
    return result;
  }
  logout() {
    let url = "http:ROS/api/logout";
    // this.http.get(url)
    console.log("Logout successfull");
  }
  getUserPermissions(id){
    const url = `${environment.administrationUrl}user/permission?username=${id}`;
    return this.http.get<any>(url);
  }
}
