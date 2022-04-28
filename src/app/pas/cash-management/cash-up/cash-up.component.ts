import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { range, Subject } from "rxjs";
import { filter, map, retry, takeUntil } from "rxjs/operators";
import { CashupFacadeService } from "../facade/cashup-facade.service";
import { CashupService } from "../service/cashup.service";
import All_Cashup from "../model/all-cashup.model";
import { CashUp } from "../model/cashup.model";
import { Title } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { isSameDay, subDays } from "date-fns";
import { ReturnStatement } from "@angular/compiler";
import { isNumber } from "@ng-bootstrap/ng-bootstrap/util/util";
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "ngx-cash-up",
  templateUrl: "./cash-up.component.html",
  styleUrls: ["./cash-up.component.scss"],
})
export class CashUpComponent implements OnInit, OnDestroy {
  cashupList$ = this.cashupFacade.cashupList$;

  // Selected Card will set the view to DRAFTS, ALL, DEPOSITS, BANKED

  selectedCard = "ALL";
  state = "ALL";

  private readonly destroy$ = new Subject<void>();
  cashupDraft$ = this.cashupFacade.cashupList$.pipe(
    takeUntil(this.destroy$),
    map((data) => data.filter((x) => x.cashUpStatus == "DRAFT")?.length)
  );

  constructor(
    private router: Router,
    private cashupFacade: CashupFacadeService,
    private title: Title,
    public datepipe: DatePipe,
    private logger: NGXLogger
  ) {
    this.title.setTitle("ROS - Cashup");
    this.prevDate.setDate(this.myDate.getDate() - 1);
    this.selectedCard = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.viewState
      : "ALL";
  }

  myDate = new Date();
  prevDate = new Date();
  deposits_filter = "M";
  allDeposit = [];
  filterDeposit = [];
  allBanking = [];
  filterBanking = [];
  allCashup: CashUp[] = [];
  filterCashup: CashUp[] = [];
  totalDrafts = 0;
  range = {
    start_date: new Date(),
    end_date: new Date(),
  };
  percentage = -200;
  ngOnInit(): void {
    // this.cashupList$.pipe(takeUntil(this.destroy$)).subscribe((cashupData) => {
    //   this.allDeposit = Object.assign(
    //     [],
    //     cashupData.filter(
    //       (x) =>
    //         x.cashUpStatus === "PUBLISHED" &&
    //         !(
    //           x.cashnPdq.tillSystems.reduce((sum, x) => sum + x.amount, 0) === 0
    //         )
    //     )
    //   );
    //   this.logger.log("Deposit List is updated", this.allDeposit);
    // });
    this.refreshBankingData();
   
    this.cashupList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cashupData: CashUp[]) => {
        this.allCashup = cashupData
          .slice()
          .sort((a, b) => b.cashUpDate.getTime() - a.cashUpDate.getTime());
        this.filterCashup = this.cashupDataFilter();
        this.logger.log("Cashup List is updated", this.allCashup);
        this.totalDrafts = this.getTotalDrafts();
        this.allDeposit = cashupData.filter(
          (x) => x.cashUpStatus === "PUBLISHED" && !(x.cashtotal === 0)
        );
        this.logger.log("Deposit List is updated", this.allDeposit);
      });
  }

  cashupDataFilter() {
    //console.log(this.selectedCard);
    if (this.selectedCard === "DRAFTS")
      return this.allCashup.filter(
        (x) => x.cashUpStatus == "DRAFT" || x.cashUpStatus === "IMPORT DRAFT"
      );
    else
      return this.allCashup.filter(
        (x) =>
          x.cashUpStatus == "DRAFT" ||
          x.cashUpStatus === "IMPORT DRAFT" ||
          x.cashUpStatus === "PUBLISHED"
      );
  }
  setSelectedCard(s: string) {
    if (this.selectedCard == s) {
      this.selectedCard = "ALL";
    } else this.selectedCard = s;
    this.logger.log("Filtering", this.cashupDataFilter());
    this.filterCashup = Object.assign([], this.cashupDataFilter());
  }

  reset_deposits(s: string) {
    this.deposits_filter = s;
  }

  addNew() {
    this.router.navigateByUrl("/accounting/cashup/new");
  }
  filterbyDraft() {
    this.filterCashup = this.allCashup.filter((x) => x.cashUpStatus == "DRAFT");
    // console.log(this.filterbyDraft());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
  refreshBankingData() {
    this.cashupFacade.load();
  }

  filterByDateRange(range) {
    this.range = Object.assign({}, range);
    this.cashupFacade.filterByDateRange(range);
  }
  getTotalDrafts() {
    return this.allCashup.reduce((sum, x) => {
      return sum + x.cashtotal;
    }, 0);
  }
  getTotalPendingdeposit() {
    return this.allDeposit.reduce((sum, x) => {
      return sum + this.cashupFacade.getCashupTotals(x).cash;
    }, 0);
  }
  getTotalBanking() {
    return this.allBanking.reduce((sum, x) => {
      return sum + x.bankedTotal;
    }, 0);
  }
  getTotalSummary() {
    let result = {
      yesterdayTotal: 0,
      todayTotal: 0,
      yesterdayPercent: 0,
      todayPercent: 0,
      showAddNew: true,
    };
    let todaySheets = this.allCashup.filter((x) =>
      isSameDay(new Date(x.cashUpDate), new Date())
    );
    let yesterdayDate = subDays(new Date(), 1);
    let yesterdaySheets = this.allCashup.filter((x) =>
      isSameDay(new Date(x.cashUpDate), yesterdayDate)
    );

    result.todayTotal = todaySheets.reduce((sum, x) => {
      return sum + this.cashupFacade.getCashupTotals(x).cash;
    }, 0);

    result.yesterdayTotal = yesterdaySheets.reduce((sum, x) => {
      return sum + this.cashupFacade.getCashupTotals(x).cash;
    }, 0);

    let dbYesterdayDate = subDays(new Date(), 2);
    let dbYesterdaySheets = this.allCashup.filter((x) =>
      isSameDay(new Date(x.cashUpDate), dbYesterdayDate)
    );

    let dbYesterdayTotal = dbYesterdaySheets.reduce((sum, x) => {
      return sum + this.cashupFacade.getCashupTotals(x).cash;
    }, 0);

    result.todayPercent =
      ((result.todayTotal - result.yesterdayTotal) / result.todayTotal) * 100 ||
      0;
    if (result.yesterdayTotal == 0) result.yesterdayPercent = -100;
    else
      result.yesterdayPercent =
        ((result.yesterdayTotal - dbYesterdayTotal) / result.yesterdayTotal) *
          100 || 0;

    result.showAddNew = todaySheets.length != 2;

    return result;
  }
}
