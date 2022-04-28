import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import All_Request from '../model/request.model';
import { RequestService } from '../services/request.service';

@Injectable()
export class RequestFacadeService {

  private requestListSubject = new BehaviorSubject<All_Request[]>([]);
  requestList$ = this.requestListSubject.asObservable();

  constructor(private requestService: RequestService) { }

  load():void {
    this.requestService.getAllRequest()
    .pipe(take(1))
    .subscribe(
      requestList => {
        return this.requestListSubject.next(requestList);
      },
      err => {
        console.log('err',err);
      }
    )
  }
}
