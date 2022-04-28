import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import Report from '../model/report.model';
import { ReportService } from '../service/report.service';
import { NGXLogger } from "ngx-logger";
import { AuthFacadeService } from '../../auth/facade/auth-facade.service';
import FacadeReport from '../model/facadeReport.model';

@Injectable()
export class ReportFacadeService {
  // private reportListSubject = new BehaviorSubject<Report[]>([]);
  private reportListSubject = new BehaviorSubject<FacadeReport[]>([]);
  reportList$ = this.reportListSubject.asObservable();
  constructor(
    private reportDataService: ReportService,
    // private authFacade: AuthFacadeService,
    private logger: NGXLogger
  ) { }

  private dataStore = { generateRreport: [], all_report: [] };

  load(): void {
    this.reportDataService.getAllReports()
      .pipe(take(1))
      .subscribe(
        reportList => {
          this.reportListSubject.next(reportList)
        },
        err => {
          console.error('err', err);
        }
      );
  }

  createReport(e: any): Observable<any> {
    return new Observable((subscriber) => {
      this.reportDataService
        .createReport(e)
        .pipe()
        .subscribe(
          (e) => {
            this.logger.log(e);
            this.dataStore.generateRreport.push(e);
            this.reportListSubject.next(
              Object.assign({}, this.dataStore).generateRreport
            );
            subscriber.next(e);
            subscriber.complete();
          },
          (err) => subscriber.error(err)
        );
    });
  }


  // getReportById(id)

}
