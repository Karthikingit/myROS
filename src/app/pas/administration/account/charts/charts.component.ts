import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { RestaurantServiceService } from '../service/restaurant-service.service';

@Component({
  selector: 'ngx-charts',
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"]
})
export class ChartsComponent implements OnInit, OnDestroy {


  data: any;
  options: any;
  themeSubscription: any;
  colors: any
  sum = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;
  constructor(private theme: NbThemeService, private restaurantService: RestaurantServiceService) {

  }
  firstday;
  lastday;
  @Input() selectDate;
  ngOnInit(): void {
    // var curr = new Date; // get current date
    var curr = new Date(this.selectDate);
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    this.firstday = new Date(curr.setDate(first));
    let fd = this.firstday;
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    this.lastday = new Date(curr.setDate(last));
    this.lastday.setDate(fd.getDate() + 6);
    this.lastday.setHours(23, 59, 59, 999);
    this.lastday = this.lastday.toISOString();
    console.log("firstday", this.firstday);
    console.log("lastday", this.lastday);
    console.log("selected restaurant", this.restaID);


    this.restaurantService.getAllRestaurantsCashup(this.firstday, this.lastday, this.restaID).subscribe((res) => {
      this.RestCashupData = res;
      console.log(this.restaID)
      console.log("cashuprestdata:", this.RestCashupData);
      this.sales = this.RestCashupData.map(x => x.sales);
      this.foodPayment = this.sales.map(x => x.foodPayment);
      console.log("sales", this.sales);
      this.sum = 0, this.sum2 = 0, this.sum3 = 0, this.sum4 = 0;
      for (let s of this.sales) {
        this.sum = this.sum + s.reduce((sum, x) => sum + x.foodPayment, 0);
        this.sum2 = this.sum2 + s.reduce((sum, x) => sum + x.drinksPayment, 0);
        this.sum3 = this.sum3 + s.reduce((sum, x) => sum + x.otherPayment, 0);
        this.sum4 = this.sum4 + s.reduce((sum, x) => sum + x.takeAwayPayment, 0);
      } console.log("s", this.sum, this.sum2, this.sum3, this.sum4);


      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        this.colors = colors;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['Food', 'Delivery', 'Drinks', 'Others'],
          datasets: [{
            data: [this.sum, this.sum4, this.sum2, this.sum3],
            backgroundColor: ['#4662A2', '#468F49', '#A24646', '#ECBC0F'],
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
    })
  }
  RestCashupData: any = [];
  sales: any;
  foodPayment: any;
  @Input() restaID;
  // @Input() restperId;
  ngOnChanges() {
    var curr = new Date(this.selectDate);
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    var last = first + 6;
    console.log("first", first);
    this.firstday = new Date(curr.setDate(first));
    let fd = this.firstday;
    this.firstday.setHours(0, 0, 0, 0);
    this.firstday = this.firstday.toISOString();
    this.lastday = new Date(curr.setDate(last));
    this.lastday.setDate(fd.getDate() + 6);
    this.lastday.setHours(23, 59, 59, 999);
    this.lastday = this.lastday.toISOString();
    console.log("restIDinchart", this.restaID);

    this.restaurantService.getAllRestaurantsCashup(this.firstday, this.lastday, this.restaID).subscribe((res) => {
      this.RestCashupData = res;
      console.log(this.restaID)
      console.log("cashuprestdata:", this.RestCashupData);
      this.sales = this.RestCashupData.map(x => x.sales);
      this.foodPayment = this.sales.map(x => x.foodPayment);
      console.log("sales", this.sales);
      this.sum = 0, this.sum2 = 0, this.sum3 = 0, this.sum4 = 0;
      for (let s of this.sales) {
        this.sum = this.sum + s.reduce((sum, x) => sum + x.foodPayment, 0);
        this.sum2 = this.sum2 + s.reduce((sum, x) => sum + x.drinksPayment, 0);
        this.sum3 = this.sum3 + s.reduce((sum, x) => sum + x.otherPayment, 0);
        this.sum4 = this.sum4 + s.reduce((sum, x) => sum + x.takeAwayPayment, 0);
      } console.log("s", this.sum, this.sum2, this.sum3, this.sum4);


      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        this.colors = colors;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['Food', 'Delivery', 'Drinks', 'Others'],
          datasets: [{
            data: [this.sum, this.sum4, this.sum2, this.sum3],
            backgroundColor: ['#4662A2', '#468F49', '#A24646', '#ECBC0F'],
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
    })



  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
