import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-client-pie-chart',
  templateUrl: './client-pie-chart.component.html',
  styleUrls: ['./client-pie-chart.component.scss']
})
export class ClientPieChartComponent implements OnInit {

  data: any;
  options: any;
  themeSubscription: any;
  colors: any

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      this.colors = colors;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Bespoke', 'Premium'],
        datasets: [{
          data: [0, 100],
          backgroundColor: ['#4662A2', '#468F49'],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: null,
      };
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
