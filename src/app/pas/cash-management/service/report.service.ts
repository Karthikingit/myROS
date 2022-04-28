import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import FacadeReport from '../model/facadeReport.model';
import Report from '../model/report.model';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllReports() {
    const reportsUrl = `${environment.mockapiBaseurl}` + 'reports';
    /*
    const params = new HttpParams().set('param', 'value');
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Cashup[]>(url, {params, headers});
    */

    // return this.http.get<Report[]>(reportsUrl);
    return this.http.get<FacadeReport[]>(reportsUrl);
  }

  // getAllReports(){
  //   return this.reports;
  // }


  getReportById(id: number) {
    const reportsUrl = `${environment.mockapiBaseurl}reports/${id}`;
    // console.log(reportsUrl)
    // return this.http.get<Report>(reportsUrl);
    return this.http.get<FacadeReport>(reportsUrl);
    // return this.reports.find(x => x.id == id);
  }

  createReport(report: Report) {
    const createReportUrl = `${environment.backendUrl}` + "";
    //add report url properly
    return this.http.post<Report>(createReportUrl, report);
  }

  deleteReportById(id: number) {
    this.reports = this.reports.filter(x => x.id != id);
  }

  getShowdiv() {
    return this.showDiv;
  }

  createReportJson = {
    id: 1,
    reportName: "PDQ Report June",
    reportDate: new Date(),
    fromDate: new Date(),
    toDate: new Date(),
    userName: "John Doe",
    //to be continued
    segment: [
      {
        segmentName: 'epos',
        isChecked: 'true',
        section: [
          {
            sectionName: 'sales',
            field: [
              {
                fieldName: 'food'
              },
              {
                fieldName: 'drinks'
              },
              {
                fieldName: 'takeaway'
              },
              {
                fieldName: 'others'
              },
            ]
          },
          {
            sectionName: 'tax',
            field: [
              {
                fieldName: 'VAT'
              }
            ]
          },
          {
            sectionName: 'tips',
            field: [
              {

              }
            ]
          },
        ]

      }
    ]
  }

  getDummyReportById(id: number) {
    const reportsUrl = `${environment.mockapiBaseurl}reports/${id}`;
    // console.log(reportsUrl)
    // return this.http.get<Report>(reportsUrl);
    // return this.http.get<FacadeReport>(reportsUrl);
    // return this.reportContent.find(x => x.id == id);
    return this.reportContent.find(x => x.id == id).sheets;
  }

  reportContent = [
    {
      id: 0,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          // sheet_id: 10,
          // sheet_date: new Date(2021, 2, 1),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 11,
          // sheet_date: new Date(2021, 2, 2),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 12,
          // sheet_date: new Date(2021, 2, 3),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 13,
          // sheet_date: new Date(2021, 2, 4),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 14,
          // sheet_date: new Date(2021, 2, 5),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 15,
          // sheet_date: new Date(2021, 2, 5),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },
    {
      id: 1,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          // sheet_id: 10,
          // sheet_date: new Date(2021, 2, 1),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 11,
          // sheet_date: new Date(2021, 2, 2),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 12,
          // sheet_date: new Date(2021, 2, 3),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 13,
          // sheet_date: new Date(2021, 2, 4),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 14,
          // sheet_date: new Date(2021, 2, 5),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 15,
          // sheet_date: new Date(2021, 2, 5),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },
    {
      id: 2,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          // sheet_id: 10,
          // sheet_date: new Date(2021, 2, 1),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 11,
          // sheet_date: new Date(2021, 2, 2),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 12,
          // sheet_date: new Date(2021, 2, 3),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 13,
          // sheet_date: new Date(2021, 2, 4),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 14,
          // sheet_date: new Date(2021, 2, 5),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 15,
          // sheet_date: new Date(2021, 2, 5),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },
    {
      id: 3,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          // sheet_id: 10,
          // sheet_date: new Date(2021, 2, 1),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 11,
          // sheet_date: new Date(2021, 2, 2),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 12,
          // sheet_date: new Date(2021, 2, 3),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 13,
          // sheet_date: new Date(2021, 2, 4),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 14,
          // sheet_date: new Date(2021, 2, 5),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 15,
          // sheet_date: new Date(2021, 2, 5),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },
    {
      id: 4,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          // sheet_id: 10,
          // sheet_date: new Date(2021, 2, 1),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 11,
          // sheet_date: new Date(2021, 2, 2),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 12,
          // sheet_date: new Date(2021, 2, 3),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 13,
          // sheet_date: new Date(2021, 2, 4),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 14,
          // sheet_date: new Date(2021, 2, 5),
          // time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          // sheet_id: 15,
          // sheet_date: new Date(2021, 2, 5),
          // time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },
  ];

  reports = [
    {
      id: 1,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",

      sheets: [
        {
          sheet_id: 10,
          sheet_date: new Date(2021, 2, 1),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 11,
          sheet_date: new Date(2021, 2, 2),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 12,
          sheet_date: new Date(2021, 2, 3),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 13,
          sheet_date: new Date(2021, 2, 4),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 14,
          sheet_date: new Date(2021, 2, 5),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 15,
          sheet_date: new Date(2021, 2, 5),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },
      ],
    },

    {
      id: 2,
      report_date: new Date(2021, 2, 12),
      report_name: "EPOS & Petty Csh",
      user_name: "Pratian'",
      tablesort: {
        Epo: false,
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

        Pdq: true,
        debit: true,
        visa: true,
        amex: true,

        Tpt: true,
        zomato: false,
        delivaro: false,

        Pdd: true,
        cash: false,
        dif: true,

        Brf: true,
        giro: true,
        banking: true,
        banked: true,
        cashup: false,
        sealed: false,


      },
      sheets: [
        {
          sheet_id: 10,
          sheet_date: new Date(2021, 2, 1),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 11,
          sheet_date: new Date(2021, 2, 2),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 12,
          sheet_date: new Date(2021, 2, 3),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 13,
          sheet_date: new Date(2021, 2, 4),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 14,
          sheet_date: new Date(2021, 2, 5),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 15,
          sheet_date: new Date(2021, 2, 5),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },


      ],

    },
    {
      id: 3,
      report_date: new Date(2021, 2, 3),
      report_name: "Revenu Report Jan",
      user_name: "Skill Assure",
      tablesort: {
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

        Tpt: true,
        zomato: false,
        delivaro: false,

        Pdd: true,
        cash: false,
        dif: true,

        Brf: true,
        giro: true,
        banking: true,
        banked: true,
        cashup: false,
        sealed: false,


      },
      sheets: [
        {
          sheet_id: 10,
          sheet_date: new Date(2021, 2, 1),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 11,
          sheet_date: new Date(2021, 2, 2),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 12,
          sheet_date: new Date(2021, 2, 3),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 13,
          sheet_date: new Date(2021, 2, 4),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 14,
          sheet_date: new Date(2021, 2, 5),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 15,
          sheet_date: new Date(2021, 2, 5),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },


      ],

    },
    {
      id: 4,
      report_date: new Date(2021, 2, 29),
      report_name: "PDQ Report Febuary",
      user_name: "Krishna Kumar",
      sheets: [
        {
          sheet_id: 10,
          sheet_date: new Date(2021, 2, 1),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 1),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 11,
          sheet_date: new Date(2021, 2, 2),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 2),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 12,
          sheet_date: new Date(2021, 2, 3),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10987",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 3),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 13,
          sheet_date: new Date(2021, 2, 4),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10756",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 4),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 14,
          sheet_date: new Date(2021, 2, 5),
          time: "AM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10345",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },

        {
          sheet_id: 15,
          sheet_date: new Date(2021, 2, 5),
          time: "PM",
          epos: {
            food: "10",
            drinks: "10",
            take_away: "10",
            others: "10",
            vat: "10",
            service_charge: "10",
            debit_card_charge: "10"
          },
          petty_cash: {
            food_drinks: "10",
            repairs: "10",
            maintenance: "10",
            sundires: "10"

          },
          pdq_takings: {
            debit_card: "10",
            visa: "10",
            amex: "10"

          },
          third_party_takings: {
            zomato: "10",
            delivaro: "10"

          },
          pending_deposits_deposits: {
            cash: "10",
            difference: "10"

          },
          banking_details: {
            giro_slip_number: "10567",
            banking_total: "10",
            banked_total: "10",
            cashup_sheet_date: new Date(2021, 2, 5),
            sealed_by: "John Doe"

          }
        },


      ],
    },

  ];

  showDiv = {
    Epos: true,
    food: true,
    drinks: true,
    takeAway: true,
    others: true,
    vat: true,
    seviceCharges: true,
    creditCardTips: true,


    PettyCash: true,
    foodDrink: true,
    repair: true,
    maintenance: true,
    sundries: true,


    Pdq: true,
    debit: true,
    visa: true,
    amex: true,


    ThirdPartyTakings: true,
    zomato: true,
    delivaro: true,


    PendingDeposit: true,


    BankingDetails: true,
    giroSlipNumber: true,
    bankingTotal: true,
    bankedTotal: true,
    cashupSheetDate: true,
    sealedBy: true,

  }

}