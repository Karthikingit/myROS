import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AzureService } from "./azure.service";

@Injectable({
  providedIn: "root",
})
export class ClientServiceService {
  constructor(
    public httpClient: HttpClient,
    private azureService: AzureService
  ) {
    this.gettingToken();
  }

  access_token = null;

  async gettingToken() {
    this.access_token = await this.azureService.getToken();
    console.log("Access Token in Client service", this.access_token);
  }

  id: String;
  dataArray: any = [];
  clientDetails: any = [];

  getAllClientsByEmail(email: String){
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client" + '/' + id;
    const baseURL = `${environment.adminURL}client/getByEmail?primaryContactEmail=${email}`;
    return this.httpClient.get<any>(baseURL);
  }

  addClient(addClient: JSON) {
    const body = JSON.stringify(addClient);
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client";
    const baseURL = `${environment.adminURL}` + "client";

    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  getClient(id: String) {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client" + '/' + id;
    const baseURL = `${environment.adminURL}` + "client/" + id;
    return this.httpClient.get(baseURL);
  }

  getAllClinets() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client/getAllClients";
    const baseURL = `${environment.adminURL}` + "client/getAllClients";
    return this.httpClient.get<any>(baseURL);
  }
  getAllRestaurants() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client/getAllClients";
    const baseURL = `${environment.adminURL}` + "restaurant/restaurants/list";
    return this.httpClient.get(baseURL);
  }

  getAllCountries() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/country/list";
    const baseURL = `${environment.adminURL}` + "country/list";
    return this.httpClient.get(baseURL);
  }

  findClientByName(name: String) {
    const headers = { "content-type": "application/json" };
    //  const baseURL = "http://localhost:8095/admin/client/search" + '/' + name;
    const baseURL = `${environment.adminURL}` + "client/search/" + name;
    return this.httpClient.get(baseURL);
  }

  updateClient(updateClient: any) {
    const body = JSON.stringify(updateClient);
    const headers = { "content-type": "application/json" };
    //  const baseURL = "http://localhost:8095/admin/client";
    const baseURL = `${environment.adminURL}` + "client";
    return this.httpClient.put(baseURL, body, { headers: headers });
  }

  getDetailedClientInfoById(id: string) {
    const baseURL = `${environment.adminURL}client/DetailedclientInformation/${id}`;
    return this.httpClient.get<any>(baseURL);
  }
  getDetailedClientInfoByAccountId(id: string) {
    const baseURL = `${environment.adminURL}client/getByaccountId?id=${id}`;
    return this.httpClient.get<any>(baseURL);
  }

  setClientId(clientId: String) {
    this.id = clientId;
  }

  getClientId() {
    return this.id;
  }

  setDataArray(array: any) {
    this.dataArray = array;
  }

  getDataArray() {
    return this.dataArray;
  }
  setRestaurants(array: any) {
    this.dataArray = array;
  }

  getRestaurants() {
    return this.dataArray;
  }

  setClientDetail(data: any) {
    this.clientDetails = data;
  }

  getClientDetail() {
    return this.clientDetails;
  }
  setClientStatus(id, status){
    let body={
      id:id,
      access: status
    }
    const bankUrl = `${environment.adminURL}client/editClientEstatus?id=${id}&accountStatus=${status}` ;
    return this.httpClient.put<any>(bankUrl, body);
  }
  getZipCodeDetails(zipCode) {
    const zipCodeUrl = "https://api.postcodes.io/postcodes/" + zipCode;
    console.log(zipCodeUrl);
    return this.httpClient.get<any>(zipCodeUrl);
  }
}
