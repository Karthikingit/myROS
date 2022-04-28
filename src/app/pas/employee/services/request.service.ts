import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import All_Request from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAllRequest(){
    const RequestUrl = `${environment.mockapiBaseurl}Request`
    return this.http.get<All_Request[]>(RequestUrl);
  }

  getRequestById(id:number){
    const RequestUrl = `${environment.mockapiBaseurl}Request/${id}`
    return this.http.get<All_Request[]>(RequestUrl)
  }
}
