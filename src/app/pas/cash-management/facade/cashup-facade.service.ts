import { Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";

import { BehaviorSubject, Observable, pipe } from "rxjs";
import { take } from "rxjs/operators";
import { AuthFacadeService } from "../../auth/facade/auth-facade.service";

import { CashUp } from "../model/cashup.model";
import { CashupService } from "../service";

@Injectable()
export class CashupFacadeService {
  private cashupListSubject = new BehaviorSubject<CashUp[]>([]);
  cashupList$ = this.cashupListSubject.asObservable();

  constructor(
    private cashupDataService: CashupService,
    private authFacade: AuthFacadeService,
    private logger: NGXLogger
  ) {
    this.setCashupPermissions();
  }
  private dataStore = { all_cashup: [], cashupList: [] };
  setCashupPermissions() {
    let user = this.authFacade.getUserDetails();
    this.logger.log("User from cashup fascade", user);
  }

  load(): void {
    this.cashupDataService
      .getAllCashup()
      .pipe(take(1))
      .subscribe(
        (cashupList) => {
          // this.cashupListSubject.next(cashupList);
          if (cashupList.hasOwnProperty("error")) {
            this.logger.log("No Cashup Exist");
            this.dataStore.all_cashup = [];
          } else {
            this.logger.log("cashup data loaded");
            cashupList.map((x) => {
              x["difference"] = this.getCashupTotals(x).difference;
              x.cashUpDate = new Date(x.cashUpDate);
            });
            this.dataStore.all_cashup = cashupList;
          }
          console.log("allcashup", this.dataStore.all_cashup)
          return this.cashupListSubject.next(
            Object.assign({}, this.dataStore).all_cashup
          );
        },
        (err) => {
          this.logger.error("err", err);
        }
      );
  }

  addcashup(e: any): Observable<any> {
    return new Observable((subscriber) => {
      this.cashupDataService
        .addcashup(e)
        .pipe()
        .subscribe(
          (e) => {
            this.logger.log("Response of Add cashup: ", e);
            e.cashUpDate = new Date(e.cashUpDate);
            this.dataStore.all_cashup.push(e);
            this.cashupListSubject.next(
              Object.assign({}, this.dataStore).all_cashup
            );
            subscriber.next(e);
            subscriber.complete();
          },
          (err) => subscriber.error(err)
        );
    });
  }

  editcashup(e: any): Observable<any> {
    return new Observable((subscriber) => {
      this.cashupDataService
        .editcashup(e)
        .pipe()
        .subscribe(
          (e) => {
            this.logger.log("Response of Edit cashup: ", e);
            e.cashUpDate = new Date(e.cashUpDate);

            for (let i = 0; i < this.dataStore.all_cashup.length; i++) {
              if (this.dataStore.all_cashup[i].id === e.id) {
                this.dataStore.all_cashup[i] = e;
              }
            }
            this.logger.log("datastore", this.dataStore.all_cashup);
            this.cashupListSubject.next(
              Object.assign({}, this.dataStore).all_cashup
            );
            subscriber.next(e);
            subscriber.complete();
          },
          (err) => subscriber.error(err)
        );
    });
  }

  getAllAPIData() {
    return this.cashupDataService.fetchAllAPIData();
  }

  getAPIDataByDate(d) {
    return this.cashupDataService.fetchAPIDataByDate(d);
  }

  getCashupTotals(cash: CashUp) {
    let res = {
      epos: 0,
      cash: 0,
      pdq: 0,
      delivery: 0,
      kpi_total: 0,
      difference: 0,
      wages: 0,
      petty: 0,
      third_party: 0,
      covers: 0,
      refund_breakdown: 0,
      discount_breakdown: 0,
    };

    if (!cash || !cash.sales) return res;
    res.epos +=
      cash.sales[0].foodPayment +
      cash.sales[0].drinksPayment +
      cash.sales[0].otherPayment +
      cash.sales[0].serviceCharges +
      cash.sales[0].takeAwayPayment +
      cash.sales[0].creditCardTip +
      cash.sales[0].taxInfo[0].amount;

    res.cash += cash?.cashnPdq?.tillSystems?.reduce((sum, x) => sum + x.amount, 0);

    res.pdq += cash?.cashnPdq?.pdqSystems?.reduce((sum, x) => sum + x.amount, 0);
    res.petty += cash?.cashnPdq?.pettyCashs?.reduce((sum, x) => sum + x.amount, 0);
    res.third_party += cash?.thirdPartyInfo?.reduce(
      (sum, x) => sum + x.amount,
      0
    );
    res.covers += cash?.kpi?.kpiCovers?.reduce((sum, x) => sum + x.amount, 0);
    res.refund_breakdown += cash?.kpi?.breakDownDetails
      ?.filter((x) => x.name == "refund_breakdown")
      .reduce((sum, y) => sum + y.amount, 0);
    res.discount_breakdown += cash?.kpi?.breakDownDetails
      ?.filter((x) => x.name == "discount_breakdown")
      .reduce((sum, y) => sum + y.amount, 0);
    res.kpi_total += cash?.kpi?.breakDownDetails?.reduce(
      (sum, x) => sum + x.amount,
      0
    );
    res.wages += cash?.cashnPdq?.wageAdvances?.reduce(
      (sum, x) => sum + x.amount,
      0
    );
    // Third Party
    res.delivery += cash?.thirdPartyInfo?.reduce((sum, x) => sum + x.amount, 0);

    //  NOW ----  (Cash + Petty Cash + PDQ + Third Party ) - EPOS Total
    //  Prev ---- EPOS Total - (Cash Total +  PDQ Total + Third Party Total )
    res.difference += res.petty + res.cash + res.pdq + res.delivery - res.epos;

    return res;
  }

  deleteCashup(id) {
    this.cashupDataService
      .deleteCashupById(id)
      .pipe()
      .subscribe(
        (e) => {
          //this.logger.log("Deleted Successfully", e);
          this.dataStore.all_cashup.forEach((c, i) => {
            if (c.id === id) {
              this.dataStore.all_cashup.splice(i, 1);
            }
          });
          this.cashupListSubject.next(
            Object.assign({}, this.dataStore).all_cashup
          );
          this.logger.log("Cashup Sheet is deleted");
        },
        (err) => {
          if (err == "OK") {
            this.dataStore.all_cashup.forEach((c, i) => {
              if (c.id === id) {
                this.dataStore.all_cashup.splice(i, 1);
              }
            });
            this.cashupListSubject.next(
              Object.assign({}, this.dataStore).all_cashup
            );
            this.logger.log("Cashup Sheet is deleted");
          } else this.logger.error("Cashup Can't be deleted", err);
        }
      );
  }
  filterByDateRange(range) {
    this.logger.log("data", this.dataStore.all_cashup);

    this.dataStore.cashupList = this.dataStore.all_cashup.filter((y) => {
      return y.cashUpDate >= range.start_date && y.cashUpDate <= range.end_date;
    });

    this.cashupListSubject.next(this.dataStore.cashupList);
    this.logger.log("cashuplist", this.dataStore.cashupList);
    this.logger.log("range", this.dataStore.all_cashup);
  }
  // getViewTotal(cash: CashUp){
  //   let res={
  //     EPOS_Talkings: 0,
  //     Petty_Cash:0,
  //     Till:0,
  //     Wage_Advance:0,
  //     Pdq_Talkings:0,
  //     Third_Party:0,
  //     Covers:0,
  //     Refund_Breakdown:0,
  //     Discount_Breakdown:0
  //   }
  //   if (!cash || !cash.sales) return res;
  //   res.EPOS_Talkings +=
  //     cash.sales[0].foodPayment +
  //     cash.sales[0].drinksPayment +
  //     cash.sales[0].otherPayment +
  //     cash.sales[0].serviceCharges +
  //     cash.sales[0].takeAwayPayment +
  //     cash.sales[0].creditCardTip +
  //     cash.sales[0].taxInfo[0].amount;
  // }
}
