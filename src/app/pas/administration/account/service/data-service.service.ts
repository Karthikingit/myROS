import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stepperData = new BehaviorSubject({});
  sharedStepperData = this.stepperData.asObservable();
  data = [];
  constructor() { }

  setStepperData(stepperData: any) {
    this.stepperData.next(stepperData);
  }

  getStepperData() {
    return this.data;
  }

  setPermData(perms) {
    this.data = perms;
  }

}