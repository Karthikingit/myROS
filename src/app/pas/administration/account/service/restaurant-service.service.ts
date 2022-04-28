import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RestaurantServiceService {

  constructor(public  httpClient: HttpClient) { }

  id: String ;
  dataArray: any = [];

  addRestaurant(restaurant: JSON) {
    const body = JSON.stringify(restaurant);
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant';
    const baseURL = `${environment.adminURL}` + "restaurant";
    return this.httpClient.post(baseURL, body, {'headers': headers});
  }

  getRestaurant(id: String) {
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant' + '/' + id;
     const baseURL = `${environment.adminURL}` + "restaurant/" + id;
    return this.httpClient.get(baseURL);
  }

  getAllRestaurants() {
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant/restaurants/list';
     const baseURL = `${environment.adminURL}` + "restaurant/restaurants/list";
    return this.httpClient.get(baseURL);
  }

  getAllRestaurantsCashup(firstday,lastday,restauID) {
    const headers = { 'content-type': 'application/json'};
     const baseURL = `${environment.backendUrl}account/cashup/dashboard?toDate=${firstday}&fromDate=${lastday}&restaurantId=${restauID}`;
     //https://accounting-service.test.restaurantonesolution.com/account/cashup/dashboard?toDate=2021-12-19T18%3A38%3A39.614Z&fromDate=2021-12-25T18%3A38%3A39.614Z&restaurantId=d74ca1c0-1cb3-4e5f-8804-b7b9b09e51e9
    return this.httpClient.get(baseURL);
  }

  getAllRestaurantsByClientId(id: String) {
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant/restaurants?clientId=' + id;
     const baseURL = `${environment.adminURL}` + "restaurant/restaurants?clientId=" + id;

    return this.httpClient.get(baseURL);
  }

  getAllSubscriptionsByClientId(id: String) {
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant/restaurants?clientId=' + id;
     const baseURL = `${environment.adminURL}` + "client/getClientAccountSubscriptions?clientId=" + id;

    return this.httpClient.get<any>(baseURL);
  }

  updateRestaurant(restaurant: any) {
    const body = JSON.stringify(restaurant);
    const headers = { 'content-type': 'application/json'};
    //const baseURL = 'http://localhost:8095/admin/restaurant';
     const baseURL = `${environment.adminURL}` + "restaurant";
    return this.httpClient.put(baseURL, body, {'headers': headers});
  }

  setRestaurantId(restaurantId: String) { this.id = restaurantId; }

  getRestaurantId() { return this.id; }

  setDataArray(array: any){ this.dataArray = array}

  getDataArray(){ return this.dataArray }
}
