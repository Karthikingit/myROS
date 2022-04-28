import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseTypes } from "msal/lib-commonjs/utils/Constants";
import { throwError } from "rxjs";
import { catchError, delay, retry } from "rxjs/operators";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AzureService {
  private accessToken;

  constructor(private http: HttpClient) {}

  refreshToken() {
    let url = environment.adminURL + "azure/generateToken";

    return this.http
      .post(url, {})
      .pipe()
      .toPromise()
      .then((res: any) => {
        console.log("Access Token obj", res);
        this.accessToken = res;
        let now = new Date();
        now.setTime(now.getTime() + res.expires_in * 1000);
        this.accessToken.expiresOn = now;

        sessionStorage.setItem("az_acc_tk", JSON.stringify(this.accessToken));
      })
      .catch((err) => console.log("Error in getting token", err));
  }

  async getToken() {
    if (!this.hasValidAcessToken()) {
      await this.refreshToken();
    }

    let at = JSON.parse(sessionStorage.getItem("az_acc_tk"));
    if (at) at.expiresOn = new Date(at.expiresOn);
    return at;
  }

  hasValidAcessToken() {
    let at = JSON.parse(sessionStorage.getItem("az_acc_tk"));
    if (!at) return false;

    at.expiresOn = new Date(at.expiresOn);

    let now = new Date();
    if (now > at.expiresOn) {
      return false;
    }
    return true;
  }

  createUser(
    token: string,
    name: string,
    username: string,
    email: string,
    pass: string = "Password@123"
  ) {
    let url = environment.adminURL + "azure/signUp?token=" + token;

    let body = {
      displayName: name,
      givenName: email,
      identities: [
        {
          signInType: "emailAddress",
          issuer: "restaurantonesolutionapps.onmicrosoft.com",
          issuerAssignedId: email,
        },
        {
          signInType: "federated",
          issuer: "restaurantonesolutionapps.onmicrosoft.com",
          issuerAssignedId: email,
        },
      ],
      passwordProfile: {
        password: pass,
        forceChangePasswordNextSignIn: false,
      },
      passwordPolicies: "DisablePasswordExpiration, DisableStrongPassword",
    };
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    
    return this.http.post(url, body, {
      headers,
      responseType: "json" as any,
    })
  }

  deleteUser(token: string, upn: string) {
    let url = `${environment.adminURL}azure/deleteUser/${upn}?token=${token}`;
    return this.http.delete(url);
  }
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.json()}\nMessage: ${error.error}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
}
