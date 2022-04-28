import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { Console, timeStamp } from 'console';
import { getWeek, parse } from 'date-fns';
import { isSameDay } from 'date-fns/esm';
import { filter } from 'rxjs-compat/operator/filter';
import { RestaurantConfigService } from '../service/restaurant-config.service';
import { RestaurantServiceService } from '../service/restaurant-service.service';

@Component({
  selector: 'ngx-chartjs-bar',
  templateUrl: "./chart-bar.component.html",
  styleUrls: ["./chart-bar.component.scss"]
})
export class ChartsBarComponent implements OnDestroy, OnInit, OnChanges {
  data: any;
  options: any;
  themeSubscription: any;
  @Input() restaID;
  @Input() currencySymbolChart;
  @Input() selectDate;

  constructor(private theme: NbThemeService,
    private restaurantService: RestaurantServiceService,
  ) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [this.sale],
          label: 'Sales',
          backgroundColor: '#4662A2',
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: null,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }
  firstday;
  lastday;
  week = [];
  newDay;

  ngOnInit(): void {
    var curr = new Date(this.selectDate); // get current date
    console.log("selectDatecurr", curr);
    //var curr =  new Date("2021-12-29T06:28:06.057Z");
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    var last = first + 6;
    console.log("first", first);
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    var fd = new Date(this.firstday);
    this.firstday = this.firstday.toISOString();
    console.log("restIDinchart", this.restaID);
    this.lastday = new Date(curr.setDate(last));
    this.lastday.setDate(fd.getDate() + 6);
    this.lastday.setHours(23, 59, 59, 999);
    this.lastday = this.lastday.toISOString();
    this.getThisWeek(fd);
    this.sale = [0, 0, 0, 0, 0, 0, 0];
    this.restaurantService.getAllRestaurantsCashup(this.firstday, this.lastday, this.restaID).subscribe((res) => {
      this.RestCashupData = res;
      console.log("cashuprestdata:", this.RestCashupData);
      //this.sales = this.RestCashupData.map(x=>x.sales);
      //this.foodPayment = this.sales.map(x=>x.foodPayment);
      //console.log("sales",this.sales);
      this.sale = []
      for (let w of this.week) {
        console.log("w", parse(w, "yyyy-M-dd'T'HH:mm:ss.SSSX", new Date()));
        let c = parse(w, "yyyy-M-dd'T'HH:mm:ss.SSSX", new Date());
        this.totalsale = 0;
        // var curr = new Date;
        // var converts = new Date(curr.setDate(s));
        // console.log("converts", converts);
        this.filtercashup = this.RestCashupData.filter((x) =>
          isSameDay(new Date(x.cashUpDate), c));

        console.log('filter', this.filtercashup);
        this.filtercashup.forEach(element => {
          this.till = element.cashnPdq.tillSystems.reduce((sum, x) => sum + x.amount, 0);
          /*  element.cashnPdq.tillSystems.forEach((x) => {
             this.till += x.amount;
           }); */
          /*  element.cashnPdq.pettyCashs.forEach((x) => {
             this.petty += x.amount;
           }); */
          this.petty = element.cashnPdq.pettyCashs.reduce((sum, x) => sum + x.amount, 0);
          console.log("till sum for a day", this.till);
          console.log("petty sum for a day", this.petty);
          this.totalsale = this.till + this.petty;
          console.log("totalsale", this.totalsale);
          // this.sale.push(this.totalsale);
          console.log("salesdata:", this.sale);
        });

        this.sale.push(this.totalsale);
        console.log("salesdata:", this.sale);
      }
      this.totalSaleValue = this.sale.reduce((sum, a) => sum + a, 0);
      console.log("totalsalevalue:", this.totalSaleValue);
      console.log("currencySymbolChart", this.currencySymbolChart);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{
            data: [this.sale[0], this.sale[1], this.sale[2], this.sale[3], this.sale[4], this.sale[5], this.sale[6]],
            label: 'Sales',
            backgroundColor: '#4662A2',
          }],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: null,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });



      this.sale = [0, 0, 0, 0, 0, 0, 0];

    })
    /*    this.restaurantConfigService.getRestaurantConfigDataById(this.restaID).subscribe(data => console.log(this.currencyData = data))
         this.currencySymbol = this.currencyData?.currency?.symbol;
         console.log("currencySymbol",this.currencySymbol); */
  }
  RestCashupData: any = [];
  sales: any;
  foodPayment: any;
  filtercashup: any;
  sumtillsys = [];
  till;
  petty;
  totalsale;
  sale = [];
  totalSaleValue: Number;
  // getWeek(curr, first) {
  //   this.week = [];
  //   for (let i = 0; i <= 6; i++) {
  //     this.newDay = new Date(curr.setDate(first + i)).toISOString();
  //     // console.log("new Day", this.newDay);
  //     this.week.push(this.newDay);
  //   }
  //   console.log("getWeek --------------------", this.week)
  // }
  getThisWeek(fd: Date) {
    console.log("fdfd inside", typeof (fd), fd);
    this.week = [];
    for (let i = 0; i <= 6; i++) {
      fd.setDate(fd.getDate() + 1);
      this.week.push(fd.toISOString());
    }
    console.log("week", this.week)
  }
  ngOnChanges() {
    var curr = new Date(this.selectDate); // get current date
    console.log("selectdatecurrchange", curr, "--", this.selectDate);
    //var curr =  new Date("2021-12-29T06:28:06.057Z");
    var first = (curr.getDate() - curr.getDay()) + 1; // First day is the day of the month - the day of the week
    var last = first + 6;
    console.log("first----------------", first);
    console.log("curr------------", curr);
    this.firstday = new Date(curr.setDate(first));
    this.firstday.setHours(0, 0, 0, 0);
    var fd = new Date(this.firstday);
    this.firstday = this.firstday.toISOString();
    this.lastday = new Date(curr.setDate(last));
    this.lastday.setDate(fd.getDate() + 6);
    this.lastday.setHours(23, 59, 59, 999);
    this.lastday = this.lastday.toISOString();
    // this.getWeek(curr, first);
    this.getThisWeek(fd);
    this.sale = [0, 0, 0, 0, 0, 0, 0];
    console.log("restIDinchart", this.restaID);

    this.restaurantService.getAllRestaurantsCashup(this.firstday, this.lastday, this.restaID).subscribe((res) => {
      this.RestCashupData = res;
      console.log("cashuprestdata:", this.RestCashupData);

      this.sale = []
      for (let w of this.week) {
        console.log("w", parse(w, "yyyy-M-dd'T'HH:mm:ss.SSSX", new Date()));
        let c = parse(w, "yyyy-M-dd'T'HH:mm:ss.SSSX", new Date());
        this.totalsale = 0;

        this.filtercashup = this.RestCashupData.filter((x) =>
          isSameDay(new Date(x.cashUpDate), c));

        console.log('filter', this.filtercashup);
        this.filtercashup.forEach(element => {
          this.till = element.cashnPdq.tillSystems.reduce((sum, x) => sum + x.amount, 0);

          this.petty = element.cashnPdq.pettyCashs.reduce((sum, x) => sum + x.amount, 0);
          console.log("till sum for a day", this.till);
          console.log("petty sum for a day", this.petty);
          this.totalsale = this.till + this.petty;
          console.log("totalsale", this.totalsale);

          console.log("salesdata:", this.sale);
        });

        this.sale.push(this.totalsale);
        console.log("salesdata:", this.sale);


      }
      this.totalSaleValue = this.sale.reduce((sum, a) => sum + a, 0);
      console.log("totalsalevalue:", this.totalSaleValue);
      console.log("currencySymbolChart", this.currencySymbolChart);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{
            data: [this.sale[0], this.sale[1], this.sale[2], this.sale[3], this.sale[4], this.sale[5], this.sale[6]],
            label: 'Sales',
            backgroundColor: '#4662A2',
          }],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: null,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });

      this.sale = [0, 0, 0, 0, 0, 0, 0];

    })
    /*   this.restaurantConfigService.getRestaurantConfigDataById(this.restaID).subscribe(data => console.log(this.currencyData = data))
      this.currencySymbol = this.currencyData?.currency?.symbol;
      console.log("currencySymbol",this.currencySymbol); */
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

