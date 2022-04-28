import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllSubscriptionService {

  constructor(
    public httpClient: HttpClient,
  ) { }

  id: String;

  getSubsSummeryData(productCode) {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/client/getAllClients";
    const baseURL = `${environment.adminURL}` + "product/ProductModulesAndSubCount?productCode=" + productCode;
    return this.httpClient.get(baseURL);
  }

  getAllSubscriptions() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscriptio";
    const baseURL = `${environment.adminURL}` + "subscription/getAllSubscription";
    return this.httpClient.get(baseURL);
  }

  getSubscriptionPricingType() {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscriptio";
    const baseURL = `${environment.adminURL}` + "subscription/subcriptionPricingType";
    return this.httpClient.get(baseURL);
  }

  getSubscriptionFrequency(){
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscriptio";
    const baseURL = `${environment.adminURL}` + "subscription/subcriptionFrequency";
    return this.httpClient.get(baseURL);
  }

  getSubscriptionProduct(){
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscriptio";
    const baseURL = `${environment.adminURL}` + "subscription/getAllProductNames";
    return this.httpClient.get(baseURL);
  }

  // getSubscriptionName(){
  //   const headers = { "content-type": "application/json" };
  //   //const baseURL = "http://localhost:8095/admin/subscription/getAllSubscriptio";
  //   const baseURL = `${environment.adminURL}` + "subscription/subcriptionName";
  //   return this.httpClient.get(baseURL);
  // }

  getSubscriptions_ById(id : string) {
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/subscription/" + '/' + id;
    const baseURL = `${environment.adminURL}` + "subscription/getSubscriptionById?id=" + id;
    return this.httpClient.get(baseURL);
  }

  setSubscriptionById(subscriptionId: String) {
    this.id = subscriptionId;
  }

  getSubscriptionById(){
    return this.id;
  }

  addSubscription(addSubscription: JSON) {
    const body = JSON.stringify(addSubscription);
    const headers = { "content-type": "application/json" };
    console.log("Details of new Subscription added:", body);
    const baseURL = `${environment.adminURL}` + "subscription/add";
    console.log("baseURL:", baseURL);
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  // https://administrationservice.test.restaurantonesolution.com/admin/subscription/add
  // https://administrationservice.test.restaurantonesolution.com/admin/subscription/add


  updateSubscription(updateSubscription: any) {
    const body = JSON.stringify(updateSubscription);
    const headers = { "content-type": "application/json" };
    console.log("Details of edited Subscription:", body);
    const baseURL = `${environment.adminURL}` + "subscription/editSubscription";
    return this.httpClient.put(baseURL, body, { headers: headers });
  } 

  updateConfiguration(updateConfiguration: any) {
    const body = JSON.stringify(updateConfiguration);
    const headers = { "content-type": "application/json" };
    console.log("Details of edited Configuration:", body);
    const baseURL = `${environment.adminURL}` + "subscription/configure";
    return this.httpClient.put(baseURL, body, { headers: headers });
  } 

  deActivateSubscription(deActivateSubscription: any) {
    const body = JSON.stringify(deActivateSubscription);
    const headers = { "content-type": "application/json" };
    console.log("DetailWithActivationUpdated2:", body);

    const baseURL = `${environment.adminURL}` + "subscription/editSubscription";
    return this.httpClient.put(baseURL, body, { headers: headers });
  } 


}
