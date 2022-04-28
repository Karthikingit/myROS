import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { DownloadService } from '../../../../../shared/services/download.service';
import { ReportService } from '../../../service/report.service';

@Component({
  selector: 'ngx-reports-action-cell-renderer',
  templateUrl: './reports-action-cell-renderer.component.html',
  styleUrls: ['./reports-action-cell-renderer.component.scss']
})
export class ReportsActionCellRendererComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: NGXLogger,
    private report_service: ReportService,
    private downloadService: DownloadService
  ) { }

  params;
  data;

  id;
  reportData;

  ngOnInit(): void {
  }

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  /*editReport() {
    this.router.navigate(['../edit-report/' + this.data.id], { relativeTo: this.route });
  }*/

  viewReport() {
    this.router.navigate(['/accounting/report/view/' + this.data.id], { relativeTo: this.route });
  }

  deleteReport() {
    this.params.context.componentParent.deleteReport(this.data);
  }

  downloadEXCEL() {
    this.id = this.data.id;
    this.logger.log("Selected ID: " + this.id);
    this.reportData = this.report_service.getDummyReportById(this.id);
    this.downloadService.downloadExcel(this.reportData);
    // this.downloadService.downloadCSV(this.reportData);
  }
}
