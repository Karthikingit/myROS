import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PrivilegeService {
  constructor(httpClient: HttpClient) {}

  getUserPermisssions() {
    //  let perms = this.httpClient.get(url)
    let perms = ["ADD_CASHUP", "READ_CASHUP", "DOWNLOAD_CASHUP"];

    return perms;
  }
}
