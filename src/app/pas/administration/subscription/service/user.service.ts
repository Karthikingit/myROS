import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    id: String;
  //dataArray: any = [];
  // userData: any;
   configuration = [];
   userConfiguration = [];

  constructor(
    public httpClient: HttpClient
  ) { }

  getConfiguration() {
    return this.configuration;
  }

  getUserConfiguration() {
    return this.userConfiguration;
  }

  setUserId(id: String) {
    this.id = id;
  }

  getUserId() {
    return this.id;
  }

  // getSubscriptions_ById(id : string) {
  //   const headers = { "content-type": "application/json" };
  //   //const baseURL = "http://localhost:8095/admin/subscription/" + '/' + id;
  //   const baseURL = `${environment.adminURL}` + "subscription/getSubscriptionById?id=" + id;
  //   return this.httpClient.get(baseURL);
  // }

  addSubscriptionConfiguration(dataArray) {
    const body = JSON.stringify(dataArray);
    console.log("add configuration",body);
    const headers = { "content-type": "application/json" };
    //const baseURL = 'http://localhost:8095/admin/restaurant/addRestaurantToUser?clientId=' + id;
    // https://administrationservice.test.restaurantonesolution.com/admin/userpermission?userId=2602ccff-2f81-41e8-abff-fccc1cf73f2b
     //const baseURL =
      // `${environment.adminURL}` + "subscription/configure?userId=" + userId;
     //return this.httpClient.post(baseURL, body, { headers: headers });
  }
}
