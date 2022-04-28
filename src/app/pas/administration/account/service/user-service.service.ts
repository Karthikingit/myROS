import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { SelectCellEditor } from "ag-grid-community";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  constructor(public httpClient: HttpClient) {}

  id: String;
  restaurantId: String;
  dataArray: any = [];
  userData: any;
  userPermission = [];
  userSubscription=[];

  getUsersInfo(userName: string) {
    const headers = { 'content-type': 'application/json'};
    const baseURL = `${environment.adminURL}` + "user/userInfo?username=" + userName;
    return this.httpClient.get<any>(baseURL);
  }

  getAllUsers() {
    const headers = { "content-type": "application/json" };
    //const baseURL = 'http://localhost:8095/admin/user/allUserInfo';
    const baseURL = `${environment.adminURL}` + "user/allUserInfo";
    return this.httpClient.get(baseURL);
  }

  getUserByusername(userName) {
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}` + "user/userInfo?username=" + userName;
    return this.httpClient.get(baseURL);
  }

  getDetailedUserInfoByuserName(userName) {
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}` + "user/detailedUserInfo?username=" + userName;
    return this.httpClient.get<any>(baseURL);
  }

  updateUser(data) {
    const headers = { "content-type": "application/json" };
    const baseURL = `${environment.adminURL}` + "user";
    return this.httpClient.put(baseURL, data);
  }

  deleteUser(username: string) {
    const baseURL = `${environment.adminURL}user?username=${username}`;
    return this.httpClient.delete(baseURL);
  }

  userInfoByRestaurantId(id: String) {
    const headers = { "content-type": "application/json" };
    // const baseURL = 'http://localhost:8095/admin/user/userInfoByRestaurantId?restaurantId=' + id;
    const baseURL =
      `${environment.adminURL}` +
      "user/userInfoByRestaurantId?restaurantId=" +
      id;
    return this.httpClient.get(baseURL);
  }

  setDataArray(array: any) {
    this.dataArray = array;
  }

  getDataArray() {
    return this.dataArray;
  }

  setUserId(id: String) {
    this.id = id;
  }

  getUserId() {
    return this.id;
  }

  setUser(data: any) {
    this.userData = data;
  }

  getUser() {
    return this.userData;
  }

  setRestaurantId(rest: String) {
    this.restaurantId = rest;
  }

  getRestaurantId() {
    return this.restaurantId;
  }

  setUserPermission(perms) {
    this.userPermission = perms;
  }

  getUserPermission() {
    return this.userPermission;
  }
  setUserSubscription(perms) {
    this.userSubscription= perms;
  }

  getUserSubscription() {
    return this.userSubscription;
  }

  addUser(user: JSON) {
    const body = JSON.stringify(user);
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/user";
    const baseURL = `${environment.adminURL}` + "user";
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  addRosUser(user: JSON) {
    const body = JSON.stringify(user);
    const headers = { "content-type": "application/json" };
    //const baseURL = "http://localhost:8095/admin/user";
    const baseURL = `${environment.adminURL}` + "user/addRosTeam";
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  linkUserAndRestaurant(UserId, resList) {
    const body = JSON.stringify(resList.map((x) => x.id));
    const headers = { "content-type": "application/json" };
    //const baseURL = 'http://localhost:8095/admin/restaurant/addRestaurantToUser?clientId=' + id;
    const baseURL =
      `${environment.adminURL}` +
      "restaurant/addRestaurantToUser?userId=" +
      UserId;

    return this.httpClient.post(baseURL, body, { headers: headers });
  }
  updateLinkUserAndRestaurant(UserId, resList) {
    const body = JSON.stringify(resList.map((x) => x.id));
    const headers = { "content-type": "application/json" };
    //const baseURL = 'http://localhost:8095/admin/restaurant/addRestaurantToUser?clientId=' + id;
    const baseURL =
      `${environment.adminURL}` +
      "restaurant/addRestaurantToUser?userId=" +
      UserId;

    return this.httpClient.put(baseURL, body, { headers: headers });
  }

  getResturantsLinkWithUser(userName) {
    const headers = { "content-type": "application/json" };
    const baseURL =
      `${environment.adminURL}` + "user/userRestaurants?username=" + userName;
    return this.httpClient.get(baseURL);
  }

  addUserConfiguration(dataArray, userId) {
    const body = JSON.stringify(dataArray);
    const headers = { "content-type": "application/json" };
    //const baseURL = 'http://localhost:8095/admin/restaurant/addRestaurantToUser?clientId=' + id;
    // https://administrationservice.test.restaurantonesolution.com/admin/userpermission?userId=2602ccff-2f81-41e8-abff-fccc1cf73f2b
    const baseURL =
      `${environment.adminURL}` + "userpermission?userId=" + userId;
    return this.httpClient.post(baseURL, body, { headers: headers });
  }

  getUserPermissionsById(user_id) {
    const baseURL =
      `${environment.adminURL}` + "/user/permissions?userUUID=" + user_id;
    return this.httpClient.get(baseURL);
  }
  getSubscriptions(){
    const baseURL =
      `${environment.adminURL}` + "subscription/getAllSubscription";
    return this.httpClient.get(baseURL);
  }

  setUserStatus(id, status){
    let body={
      id:id,
      access: status
    }
    const bankUrl = `${environment.adminURL}user/editUserStatus?userId=${id}&status=${status}` ;
    return this.httpClient.put<any>(bankUrl, body);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
}
}
