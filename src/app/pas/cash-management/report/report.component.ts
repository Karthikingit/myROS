

import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  public title = 'Avinash Kumar';
  public employees = [];

  constructor(private logger: NGXLogger) { }

  ngOnInit(): void {

 }

}
