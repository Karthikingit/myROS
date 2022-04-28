import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public  httpClient: HttpClient) { }
  id: String ;

  getAllProducts(){
    const headers = { 'content-type': 'application/json'};
    //const baseURL = "http://localhost:8095/admin/product/getAllProducts";
    const baseURL = `${environment.adminURL}` + "product/getAllProducts";
    return this.httpClient.get(baseURL);
  }
}

