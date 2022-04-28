import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'ngx-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
})
export class EditReportComponent implements OnInit {
  public obj;
  public obj1;
  public obj2;
  public obj3;
  public obj4;
  public obj5;
  public obj6;

  id;

  reports = [];
  report;
  constructor(private route: ActivatedRoute, private report_service: ReportService, private logger: NGXLogger) { }

  ngOnInit(): void {
    // this.reports = this.report_service.getAllReports();
    this.id = this.route.snapshot.paramMap.get('id');
    this.report = this.report_service.getReportById(this.id);


  }

  onSubmit() {
    this.logger.log ("ok");

  }

  onChecked2(obj2: any, isChecked: boolean) {
    this.logger.log ("working"); // {}, true || false
  }
  onChecked3(obj3: any, isChecked: boolean) {
    this.logger.log ("working"); // {}, true || false
  }
  onChecked4(obj4: any, isChecked: boolean) {
    this.logger.log ("working"); // {}, true || false
  }
  onChecked5(obj5: any, isChecked: boolean) {
    this.logger.log ("working"); // {}, true || false
  }
  onChecked6(obj6: any, isChecked: boolean) {
    this.logger.log ("working"); // {}, true || false
  }


  showDiv = {
    Epo: true,
    food: true,
    drinks: true,
    takeAway: true,
    others: false,
    vat: true,
    seviceCharges: false,
    creditCardTips: false,


    PettyCash: true,
    fd: true,
    repair: true,
    maintenance: true,
    sundries: true,


    Pdq: false,
    debit: true,
    visa: true,
    amex: true,


    Tpt: false,
    zomato: true,
    delivaro: true,


    Pdd: false,


    Brf: false,
    giro: true,
    banking: true,
    banked: true,
    cashup: false,
    sealed: false,

  }
}
