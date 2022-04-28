import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  constructor(public httpClient: HttpClient) {}
  id: String;

  getAllSubscription() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscription";
    const baseURL =
      `${environment.adminURL}` + "subscription/getAllSubscription";
    return this.httpClient.get(baseURL);
  }
}
