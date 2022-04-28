import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RestaurantConfigService {
  restData: any;

  constructor(public httpClient: HttpClient) {}

  getAllThirdParty() {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/third-party';
    const baseURL = `${environment.adminURL}` + "restconfiguration/third-party";
    return this.httpClient.get(baseURL);
  }

  getAllgetAllPettyCash() {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/petty-cash';
    const baseURL = `${environment.adminURL}` + "restconfiguration/petty-cash";
    return this.httpClient.get(baseURL);
  }

  getAllgetAllPDQS() {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/pdqs';
    const baseURL = `${environment.adminURL}` + "restconfiguration/pdqs";
    return this.httpClient.get(baseURL);
  }

  getAllPdqCards() {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/pdqs';
    const baseURL = `${environment.adminURL}` + "restconfiguration/pdqCards";
    return this.httpClient.get(baseURL);
  }
  getAllCurrencyTypes() {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/currency';
    const baseURL = `${environment.adminURL}` + "restconfiguration/currency";
    return this.httpClient.get(baseURL);
  }

  setRestaurantConfigData(data: any) {
    this.restData = data;
  }

  getRestaurantConfigData() {
    return this.restData;
  }

  getRestaurantConfigDataById(id: any) {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/loadrestconfig/' + id;
    const baseURL =
      `${environment.adminURL}` + "restconfiguration/loadrestconfig/" + id;
    return this.httpClient.get(baseURL);
  }

  updateDataInRestConfig(data: any, id: any) {
    console.log("Data ID", data);
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/' + data.id;
    const baseURL =
      `${environment.adminURL}` + "restconfiguration?restaurantId=" + id;
    return this.httpClient.put(baseURL, body, { headers: headers });
  }

  postDataInRestConfig(data: any) {
    console.log("Data ID", data);
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/restconfiguration/' + data.id;
    const baseURL = `${environment.adminURL}` + "restconfiguration/" + data.id;
    return this.httpClient.post(baseURL, body, { headers: headers });
  }
  postShiftType(data: any) {
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    const baseURL = `${environment.adminURL}restconfiguration`;
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  getShiftType(id: any) {
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}restconfiguration/getShiftConfigById/${id}`;
    return this.httpClient.get<any>(baseURL);
  }
  putShiftType(data: any) {
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}restconfiguration/editShiftConfig`;
    return this.httpClient.put(baseURL, body, { headers: headers });
  }
  deleteShiftType(shiftId , restaurantId){
    const bankUrl = `${environment.adminURL}restconfiguration?shiftId=${shiftId}&id=${restaurantId}`;
    return this.httpClient.delete<any>(bankUrl)
  }
  postDepartmentType(data: any) {
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    const baseURL = `${environment.adminURL}restconfiguration/deptConfig`;
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  getDepartmentType(id: any) {
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}restconfiguration/getDeptConfigById/${id}`;
    return this.httpClient.get<any>(baseURL);
  }
  putDepartmentType(data: any) {
    const body = JSON.stringify(data);
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}restconfiguration/editDeptConfig`;
    return this.httpClient.put(baseURL, body, { headers: headers });
  }
  deleteDepartmentType(restaurantId,customId){
    const bankUrl = `${environment.adminURL}restconfiguration/delet dept config?id=${restaurantId}&customId=${customId}`;
    return this.httpClient.delete<any>(bankUrl)
  }

  // Save unction
  // saveAndUpdateRestaurantConfig(addRestConfig: JSON){
  //    const body = JSON.stringify(addRestConfig);
  //   const headers = { 'content-type': 'application/json'};
  //   const baseURL = 'http://localhost:8095/admin/restconfiguration/';
  //   return this.httpClient.post(baseURL, body,{'headers': headers});
  // }
}
