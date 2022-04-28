import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isSameDay } from "ngx-bootstrap/chronos";
import { NGXLogger } from "ngx-logger";
import { environment } from "../../../../environments/environment";
import All_Cashup from "../model/all-cashup.model";
import { CashUp } from "../model/cashup.model";

@Injectable()
export class CashupService {
  constructor(private http: HttpClient, private logger: NGXLogger) {}

  getAllCashup() {
    const url = `${environment.backendUrl}` + "account/cashup?limit=100&pageNo=0";
    return this.http.get<CashUp[]>(url);
  }

  // getAllCashup() {
  //   const cashupUrl = `${environment.mockapiBaseurl}` + "cashup";
  //   // debugger;
  //   /*
  //   const params = new HttpParams().set('param', 'value');
  //   const headers = new HttpHeaders().set('Accept', 'application/json');
  //   return this.http.get<Cashup[]>(url, {params, headers});
  //   */
  //   return this.http.get<All_Cashup[]>(cashupUrl);
  // }

  getCashupById(id: string) {
    return null; //this.cashup_data.find(x => x.id == id);
  }

  deleteCashupById(id: string) {
    const cashupUrl = `${environment.backendUrl}account/cashup/${id}`;
    return this.http.delete<any>(cashupUrl);
  }
  addcashup(cash: CashUp) {
    const cashupUrl = `${environment.backendUrl}` + "account/cashup";
    return this.http.post<CashUp>(cashupUrl, cash);
  }
  editcashup(cash: CashUp) {
    const bankUrl = `${environment.backendUrl}` + "account/cashup";
    this.logger.log("cash", cash);
    return this.http.put<CashUp>(bankUrl, cash);
  }

  epos_data = [
    {
      date: "2021-07-02T07:15:53.548Z",
      time: "AM",
      data: [
        {
          pos_type: "api",
          pos_name: "Shopwave",
          category: "POS",
          foodPayment: 47,
          drinksPayment: 7,
          takeAwayPayment: 77,
          otherPayment: 7,
          serviceCharges: 7,
          creditCardTip: 77,
          taxInfo: [
            {
              name: "Vat",
              amount: 12,
            },
          ],
        },
        {
          pos_type: "manual",
          pos_name: "manual",
          foodPayment: 57,
          drinksPayment: 17,
          takeAwayPayment: 77,
          otherPayment: 37,
          serviceCharges: 47,
          creditCardTip: 77,
          taxInfo: [
            {
              name: "Vat",
              amount: 17,
            },
          ],
        },
      ],
    },
    {
      date: "2021-07-01T07:15:53.548Z",
      time: "AM",
      data: [
        {
          pos_type: "api",
          pos_name: "Shopwave",
          foodPayment: 23,
          drinksPayment: 3,
          takeAwayPayment: 54,
          otherPayment: 7,
          serviceCharges: 7,
          creditCardTip: 47,
          taxInfo: [
            {
              name: "Vat",
              amount: 7,
            },
          ],
        },
        {
          pos_type: "manual",
          pos_name: "manual",
          foodPayment: 13,
          drinksPayment: 3,
          takeAwayPayment: 34,
          otherPayment: 17,
          serviceCharges: 7,
          creditCardTip: 47,
          taxInfo: [
            {
              name: "Vat",
              amount: 7,
            },
          ],
        },
      ],
    },
    {
      date: "2021-07-03T07:15:53.548Z",
      time: "AM",
      data: [
        {
          pos_type: "api",
          pos_name: "Shopwave",
          foodPayment: 23.0,
          drinksPayment: 13.0,
          takeAwayPayment: 54.0,
          otherPayment: 37,
          serviceCharges: 27,
          creditCardTip: 46.0,
          taxInfo: [
            {
              name: "Vat",
              amount: 7,
            },
          ],
        },
        {
          pos_type: "manual",
          pos_name: "manual",
          foodPayment: 13,
          drinksPayment: 3,
          takeAwayPayment: 34,
          otherPayment: 17,
          serviceCharges: 7,
          creditCardTip: 47,
          taxInfo: [
            {
              name: "Vat",
              amount: 7,
            },
          ],
        },
      ],
    },
  ];

  fetchAllAPIData() {
    return this.epos_data;
  }

  fetchAPIDataByDate(d) {
    console.log(d);
    return this.epos_data.find((x) => isSameDay(new Date(d), new Date(x.date)));
  }
}
