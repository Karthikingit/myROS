import { DatePipe } from "@angular/common";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FilterManager, GridSizeChangedEvent } from "ag-grid-community";
import { setFlagsFromString } from "node:v8";
import { AgGridCustomService } from "../../../../../shared/services/ag-grid-custom.service";
import { RestaurantConfigService } from "../../service/restaurant-config.service";
import { RestaurantServiceService } from "../../service/restaurant-service.service";
import { ConfigurationActionCellRenderComponent } from "../configuration-action-cell-render/configuration-action-cell-render.component";
import { DepartmentActionCellRenderComponent } from "../department-action-cell-render/department-action-cell-render.component";

@Component({
  selector: "ngx-restaurant-config",
  templateUrl: "./restaurant-config.component.html",
  styleUrls: ["./restaurant-config.component.scss"],
})
export class RestaurantConfigComponent implements OnInit {
  @ViewChild("secondDialog") secondDialog: TemplateRef<any>;
  @ViewChild("successDialog") successDialog: TemplateRef<any>;
  @ViewChild("backDialog") backDialog: TemplateRef<any>;
  restaurantConfigurationForm: FormGroup;

  thirdPartyList: any = [];
  pettyCashList: any = [];
  currencyTypeList: any = [];
  selectedPDQS: any = [];
  pdqsList: any = [];
  flg: number = 1;
  dateValid: boolean = false;
  dateValidPM: boolean = false;
  pdqvalid: boolean = false;
  restaurantHeader: String = "";
  inputValue: any = "";
  inputValue2: any = "";
  inputValue3: any = "";
  inputValue4: any = "";
  tab_name: string = "Accounting";
  defaultColDef;
  gridApi: any;
  gridColumnApi: any;
  allSafesummary = [];
  public varboolean: boolean = false;
  allDepartments = [];

  loadData: any;
  pdqsCardHeaders: any = [" ", "Name", "Visa", "Amex", "xyz"];

  PDQMaster = [];

  selectedPettyCash: any = [];
  selectedThirdParty: any = [];
  selectedTill: any = [];
  selectedCurrency: any = [];
  pdqs_array: FormArray;
  pdqs_card_array: FormArray;
  abc = [];
  selected = "AM";
  putObj;
  data;
  editRes: boolean = false;
  dialogMessage: string = "";

  pettyCashWrong: boolean = false;
  tillsWrong: boolean = false;
  thridPartWrong: boolean = false;
  pdqWrong: boolean = false;
  booking: boolean = false;
  payroll: boolean = false;
  Schedule: boolean = false;
  superInfo = null;
  restaurantId;
  checker;
  checkerNew;

  constructor(
    private restaurantConfigService: RestaurantConfigService,
    public dialog: MatDialog,
    private router: Router, private datepipe: DatePipe,
    private restaurantServiceService: RestaurantServiceService,
    private agGridService: AgGridCustomService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dialogService: NbDialogService,




  ) {
    console.log("ROute", this.router.getCurrentNavigation());
    if (this.router.getCurrentNavigation().extras.state) {
      this.superInfo = this.router.getCurrentNavigation().extras.state;
      console.log("from superAdminsss", this.superInfo);
    }
  }

  ngOnInit(): void {
    const id = localStorage.getItem("resturantId");
    this.restaurantId = id;
    this.restaurantConfigurationForm = new FormGroup({
      thirdParty: new FormControl(null),
      cashupInterval: new FormControl(null, Validators.required),
      pettyCash: new FormControl(null),
      currencyType: new FormControl(null, Validators.required),
      till: new FormControl(null),
      startTimeAM: new FormControl(null),
      endTimeAM: new FormControl(null),
      startTimePM: new FormControl(null),
      endTimePM: new FormControl(null),
      pdqs: new FormControl(null),
      pdqs_array: new FormArray([]),
      pdqs_card_array: new FormArray([]),
    });

    this.pdqs_array = this.restaurantConfigurationForm.get(
      "pdqs_array"
    ) as FormArray;
    this.pdqs_card_array = this.restaurantConfigurationForm.get(
      "pdqs_card_array"
    ) as FormArray;

    // this.data = this.restaurantConfigService.getRestaurantConfigData();
    if (id != null) {
      this.restaurantServiceService.getRestaurant(id).subscribe((res) => {
        if (res) {
          this.data = res;
          console.log("Result Data: ", this.data);

          this.getRestConfigRecord(this.data);
          this.restaurantHeader = this.data?.name;
          this.getAllThirdParty();
          this.getAllgetAllPettyCash();
          this.getAllgetAllPdqsList();
          this.getAllCurrencyTypes();
          this.getAllgetAllPdqCardsList();
        }
      })


    }
    console.log("Result Data: ", this.data);
    //let loadData = this.restaurantConfigService.getRestaurantConfigDataById(data);
    this.restaurantConfigService.getShiftType(this.restaurantId).subscribe((res) => {
      let shiftType = res.restaurantShifts
      console.log("sh", shiftType)
      this.allSafesummary = shiftType;
    });
    this.restaurantConfigService.getDepartmentType(this.restaurantId).subscribe((res) => {
      let depType = res.customDepartment
      console.log("sh", depType)
      this.allDepartments = depType;
    })
    this.restaurantConfigurationForm.valueChanges.subscribe((val) => {
      this.formData()
    });

  }
  chkFlag() {
    if (this.restaurantConfigurationForm.dirty)
      this.checkerNew = true;
    else
      this.checkerNew = false;
  }
  formData() {
    this.chkFlag();
    if (this.restaurantConfigurationForm.value.cashupInterval == "AM") {
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value ||
        this.restaurantConfigurationForm.controls.endTimeAM.value ||
        this.restaurantConfigurationForm.controls.currencyType.value ||
        this.selectedTill.length > 0 ||
        this.selectedThirdParty.length > 0 ||
        this.selectedPettyCash.length > 0 ||
        this.PDQMaster.length > 0
      ) {
        this.checker = true
      }
      else {
        this.checker = false
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == "PM") {
      if (
        this.restaurantConfigurationForm.controls.startTimePM.value ||
        this.restaurantConfigurationForm.controls.endTimePM.value ||
        this.restaurantConfigurationForm.controls.currencyType.value ||
        this.selectedTill.length > 0 ||
        this.selectedThirdParty.length > 0 ||
        this.selectedPettyCash.length > 0 ||
        this.PDQMaster.length > 0
      ) {
        this.checker = true
      }
      else {
        this.checker = false
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == "AMPM") {
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value ||
        this.restaurantConfigurationForm.controls.endTimeAM.value ||
        this.restaurantConfigurationForm.controls.startTimePM.value ||
        this.restaurantConfigurationForm.controls.endTimePM.value ||
        this.restaurantConfigurationForm.controls.currencyType.value ||
        this.selectedTill.length > 0 ||
        this.selectedThirdParty.length > 0 ||
        this.selectedPettyCash.length > 0 ||
        this.PDQMaster.length > 0
      ) {
        this.checker = true
      }
      else {
        this.checker = false
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == null) {
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value ||
        this.restaurantConfigurationForm.controls.endTimeAM.value ||
        this.restaurantConfigurationForm.controls.currencyType.value ||
        this.selectedTill.length > 0 ||
        this.selectedThirdParty.length > 0 ||
        this.selectedPettyCash.length > 0 ||
        this.PDQMaster.length > 0
      ) {
        this.checker = true
      }
      else {
        this.checker = false
      }
    }


  }

  getAllCurrencyTypes() {
    this.restaurantConfigService.getAllCurrencyTypes().subscribe(
      (res) => {
        this.currencyTypeList = res;
      },
      (err) =>
        this.currencyTypeList.push({
          id: "",
          currencyType: "GBP",
          symbol: "£",
        })
    );
  }

  onSelect(value: any) {
    if (value == "AM") {
      this.flg = 1;
    } else if (value == "PM") {
      this.flg = 2;
    } else if (value == "AMPM") {
      this.flg = 3;
    } else {
      this.flg = 1;
    }
  }

  getAllThirdParty() {
    this.restaurantConfigService.getAllThirdParty().subscribe((res) => {
      this.thirdPartyList = res;
      console.log("Third party: ", this.thirdPartyList);
    });
  }

  getAllgetAllPettyCash() {
    this.restaurantConfigService.getAllgetAllPettyCash().subscribe((res) => {
      this.pettyCashList = res;
    });
  }

  getAllgetAllPdqsList() {
    this.restaurantConfigService.getAllgetAllPDQS().subscribe(
      (machines) => {
        this.pdqsList = machines;
        console.log("Getting PDQ Machines", this.pdqsList);
        this.restaurantConfigService.getAllPdqCards().subscribe((cards) => {
          this.pdqCardsList = cards;

          if (this.loadData) {
            let pdq = [];
            this.selectedPDQS = this.loadData.cashnPdqConfig.pdqTypes.map(
              (x) => x.title
            );
            this.loadData.cashnPdqConfig.pdqTypes.map((x) => {
              let machine = {
                title: x.title,
                pdqMachine: { name: x.title },
                pdqCard: [],
              };
              if (x.title != "Vouchers") {
                this.pdqCardsList.map((x) => {
                  machine.pdqCard.push({
                    name: x,
                    value: false,
                  });
                });

                for (let i = 0; i < machine.pdqCard.length; i++) {
                  for (let j = 0; j < x.pdqCard.length; j++) {
                    if (machine.pdqCard[i].name == x.pdqCard[j].name) {
                      machine.pdqCard[i].value = true;
                      break;
                    }
                  }
                }
              }
              pdq.push(machine);
            });
            Object.assign(this.PDQMaster, pdq);
            console.log(this.selectedPDQS, this.PDQMaster);
          }
        });
      },
      (err) => console.log(err)
    );
  }

  getAllgetAllPdqCardsList() {
    this.restaurantConfigService.getAllPdqCards().subscribe((res) => {
      this.pdqCardsList = res;
    });
  }

  pdqCardsList;

  // PDQS FORMARRAY

  getcards(cards) {
    let a = [];
    cards.forEach((x) => {
      a.push(
        new FormGroup({
          name: new FormControl(x),
          value: new FormControl(false),
        })
      );
    });

    return a;
  }
  getEditcards(cards, name) {
    console.log("name", name);
    let a = [];
    cards.forEach((x) => {
      // a.push(
      //   new FormGroup({
      //     type: x.name,
      //     pdq_amount: [
      //       this.isNew
      //         ? 0
      //         : this.edit_obj.cashnPdq.pdqSystems.find(
      //             (y) => y.cardName == x.name && y.name == name
      //           )?.amount,
      //       [Validators.min(0), Validators.pattern(/^\d+(\.\d{0,2})?$/)],
      //     ],
      //   })
      // );
    });
    return a;
  }
  getpdqCardArray(i) {
    //console.log("getpdqCardArray", this.pdqs_array.at(i).get("pdqCard") as FormArray )
    console.log(this.pdqs_array.at(i).get("pdqCard"));
    return this.pdqs_array.at(i).get("pdqCard") as FormArray;
  }

  //

  getEnumCurrency() {
    // this.restaurantConfigService.getEnumCurrencies().subscribe(
    //   (res) => {
    //     this.currencyList = res;
    //   }
    // );
  }

  // - currency start

  addSelectedCurrency(d) {
    {
      this.selectedCurrency.push(d);
      console.log("d", this.selectedCurrency);
      d = [];
    }
  }

  removeSelectedCurrency(d) {
    console.log("D: ", d);
    this.selectedCurrency.splice(
      this.selectedCurrency.findIndex((x) => x == d),
      1
    );
    console.log("currency remove", this.selectedCurrency);
  }
  // -currency end

  // - Petty Cash Start
  addSelectedPettyCash(d) {
    d = d.trim()
    if (d) {
      this.selectedPettyCash.push(d);
      this.pettyCashWrong = false;
      d = [];
    }
    this.inputValue = null;
  }

  removePettyCash(d) {
    for (let i = 0; i < this.selectedPettyCash.length; i++) {
      if (this.selectedPettyCash[i] == d) {
        this.selectedPettyCash.splice(i, 1)
        this.formData()
      }
    }
  }

  // Petty Cash End

  // - Third Party Start
  addSelectedThirParty(d) {
    d = d.trim()
    if (d) {
      this.selectedThirdParty.push(d);
      this.thridPartWrong = false;
      console.log("d", this.selectedThirdParty);
      d = [];
    }
    this.inputValue3 = null;

    // {
    //   this.selectedThirdParty.push(d);
    //   console.log("d", this.selectedThirdParty);
    //   d = [];
    // }
  }

  removeThirdParty(d) {
    for (let i = 0; i < this.selectedThirdParty.length; i++) {
      if (this.selectedThirdParty[i] == d) {
        this.selectedThirdParty.splice(i, 1)
        this.formData()
      }
    }
    // console.log("D: ", d);
    // this.selectedThirdParty.splice(
    //   this.selectedThirdParty.findIndex((x) => x == d),
    //   1
    // );
    // console.log("date remove", this.selectedThirdParty);
  }

  // Third Party End

  // - Till Start
  addSelectedTill(d) {
    d = d.trim()
    if (d) {
      this.selectedTill.push(d);
      this.tillsWrong = false;
      console.log("d", this.selectedTill);
      d = [];
    }
    this.inputValue2 = null;
  }

  removeTill(d) {
    for (let i = 0; i < this.selectedTill.length; i++) {
      if (this.selectedTill[i] == d) {
        this.selectedTill.splice(i, 1)
        this.formData();
      }
    }
  }

  // Till End

  // - PDQS Start
  pdqCards;
  addPDQS(machine) {
    machine = machine.trim()
    if (machine) {
      this.selectedPDQS.push(machine);
      this.pdqWrong = false
      if (machine == "Vouchers") {
        this.PDQMaster.push({
          title: machine,
          pdqCard: {},
        })
      }
      else {
        this.PDQMaster.push({
          title: machine,
          pdqCard: this.pdqCardsList.map((c) => {
            return { name: c, value: false };
          }),
        });
      }

      console.log(this.PDQMaster);
      this.pdqvalid = false;

      // this.pdqs_array.push(
      //   new FormGroup({
      //     title: new FormControl(d),
      //     pdqCard: new FormArray(this.getcards(this.pdqCardsList)),
      //   })
      // );

      //console.log("t ", this.pdqs_array.controls[0]);
      //console.log("d", this.selectedPDQS, this.pdqs_array);
      machine = [];
      this.inputValue4 = null;
    }
    else {
      this.inputValue4 = null;
    }
  }

  removePDQS(d) {
    console.log("D: ", d);
    this.selectedPDQS.splice(
      this.selectedPDQS.findIndex((x) => x == d),
      1
    );

    this.PDQMaster.splice(
      this.PDQMaster.findIndex((x) => x.title == d),
      1
    );
    this.formData()
    // this.pdqs_array.removeAt(this.selectedPDQS.findIndex((x) => x == d));
    console.log("date remove", this.selectedPDQS);
  }

  // End PDQS

  ISOToTime(date) {
    let d = new Date(date);
    return d.toTimeString().slice(0, 5);
  }

  getRestConfigRecord(data: any) {
    console.log("data", data);

    this.restaurantConfigService
      .getRestaurantConfigDataById(data.id)
      .subscribe((res) => {
        if (res) {
          this.loadData = res;
          this.editRes = true;
          console.log("Load Data: ", this.loadData);
          this.restaurantConfigurationForm.patchValue({
            currencyType: this.loadData.currency?.currencyType,
          });
        }
        if (this.loadData) {
          console.log("load data", this.loadData);


          this.loadData.cashUpIntervals.forEach((x) => {
            this.restaurantConfigurationForm.patchValue({
              cashupInterval: x.einterval,
            });
            if (x.einterval == "AM") {
              this.flg = 1;
            } else if (x.einterval == "PM") {
              this.flg = 2;
            } else if (x.einterval == "AMPM") {
              this.flg = 3;
            } else {
              this.flg = 1;
            }
            if (x.einterval == "AM") {
              this.restaurantConfigurationForm.patchValue({
                startTimeAM: this.ISOToTime(x.startTime),
                endTimeAM: this.ISOToTime(x.endTime),
              });
            }
            if (x.einterval == "PM") {
              this.restaurantConfigurationForm.patchValue({
                startTimePM: this.ISOToTime(x.startTime),
                endTimePM: this.ISOToTime(x.endTime),
              });
            }
          });

          // startTimeAM: this.loadData.cashUpIntervals.st

          this.loadData.cashnPdqConfig.tillTypes.map((x) =>
            this.addSelectedTill(x.title)
          );
          //this.addSelectedTill(this.loadData.cashnPdqConfig.tillTypes[0].title);

          this.loadData.thirdPartyConfig.thirdPartySource.map((x) =>
            this.addSelectedThirParty(x.title)
          );
          // this.addSelectedThirParty(
          //   this.loadData.thirdPartyConfig.thirdPartySource[0].title
          // );

          this.loadData.cashnPdqConfig.pettyCashTypes.map((x) =>
            this.addSelectedPettyCash(x.title)
          );

          // this.addSelectedPettyCash(
          //   this.loadData.cashnPdqConfig.pettyCashTypes[0].title
          // );
        }
      });
  }

  timeToIsoDateFormater(time) {
    if (time) {
      let t = time.split(":");
      let d = new Date();
      d.setHours(t[0]);
      d.setMinutes(t[1]);
      return d.toISOString();
    }
  }

  saveAndUpdateRestConfig() {
    if (true) {
      // let a = new Date(this.restaurantConfigurationForm.controls.startTimeAM

      console.log("selectedPDQS", this.selectedPDQS);
      let c = this.currencyTypeList.find(
        (x) =>
          x.currencyType == this.restaurantConfigurationForm.value.currencyType
      );
      this.putObj = {
        id: "",
        cashUpIntervals: [],
        // currencyType: this.restaurantConfigurationForm.controls.currencyType.value,
        currency: c,
        cashnPdqConfig: {
          tillTypes: [],
          pettyCashTypes: [],
          pdqTypes: [],
        },
        thirdPartyConfig: {
          thirdPartySource: [],
        },
      };
      if (this.editRes) {
        this.putObj.id = this.loadData.id;
      }
      let time = [];
      if (this.flg == 1) {
        time = [
          {
            startTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.startTimeAM
            ),
            endTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.endTimeAM
            ),
            einterval: "AM",
          },
        ];
      }
      if (this.flg == 2) {
        time = [
          {
            startTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.startTimePM
            ),
            endTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.endTimePM
            ),
            einterval: "PM",
          },
        ];
      }
      if (this.flg == 3) {
        time = [
          {
            startTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.startTimeAM
            ),
            endTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.endTimeAM
            ),
            einterval: "AM",
          },
          {
            startTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.startTimePM
            ),
            endTime: this.timeToIsoDateFormater(
              this.restaurantConfigurationForm?.value?.endTimePM
            ),
            einterval: "PM",
          },
        ];
      }
      this.putObj.cashUpIntervals = time;
      // this.putObj.cashnPdqConfig.pdqTypes = this.selectedPDQS;

      let pdqs = [];
      this.PDQMaster.map((x) => {
        let machine = {
          title: x.title,
          pdqMachine: {
            name: x.title,
          },
          pdqCard: [],
        };
        if (x.title != "Vouchers") {
          x.pdqCard
            .filter((x) => x.value)
            .map((card) =>
              machine.pdqCard.push({
                name: card.name,
              })
            );
        }

        pdqs.push(machine);
      });

      this.putObj.cashnPdqConfig.pdqTypes = pdqs;

      // this.selectedPDQS.forEach((x) => {
      //   this.putObj.cashnPdqConfig.pdqTypes.push({
      //     title: x,
      //   });
      // });

      this.selectedTill.forEach((x) => {
        this.putObj.cashnPdqConfig.tillTypes.push({
          title: x,
        });
      });
      this.selectedPettyCash.forEach((x) => {
        this.putObj.cashnPdqConfig.pettyCashTypes.push({
          title: x,
        });
      });

      this.selectedThirdParty.forEach((x) => {
        console.log(x);
        this.putObj.thirdPartyConfig.thirdPartySource.push({
          title: x,
          thirdPartyCategory: {
            title: x,
          },
        });
      });
    }
    // console.log(putObj)
    // putObj.cashUpIntervals.push()
    console.log(
      "restaurantConfigurationForm",
      this.restaurantConfigurationForm
    );
    console.log("putObj", this.putObj);
    if (this.selectedPettyCash.length == 0) {
      this.pettyCashWrong = true;
    }
    else {
      this.pettyCashWrong = false;
    }
    if (this.selectedTill.length == 0) {
      this.tillsWrong = true;
    }
    else {
      this.tillsWrong = false;
    }
    this.submit()
  }
  submit() {
    if (this.restaurantConfigurationForm.value.cashupInterval == "AM") {
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value &&
        this.restaurantConfigurationForm.controls.endTimeAM.value &&
        this.restaurantConfigurationForm.controls.currencyType.value &&
        this.selectedTill.length > 0 &&
        this.selectedThirdParty.length > 0 &&
        this.selectedPettyCash.length > 0 &&
        this.PDQMaster.length > 0
      ) {
        if (!this.tillsWrong && !this.pettyCashWrong) {
          this.restaurantConfigService
            .updateDataInRestConfig(this.putObj, this.data.id)
            .subscribe(
              (res) => {
                //this.clientForm.reset();
                this.dialogMessage =
                  "Restaurant Configuration Successfully Updated ..!!";
                this.dialog.open(this.successDialog, { disableClose: true });
              },
              (err) => {
                this.dialogMessage =
                  "Unable to Save Configuration ! Please try again ...";
                this.dialog.open(this.secondDialog, { disableClose: true });
              }
            );
        }
      }
      else {
        this.dialogMessage =
          "Please Enter all the Mandatory Fields To Save.";
        this.dialog.open(this.secondDialog, { disableClose: true });
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == "PM") {
      if (
        this.restaurantConfigurationForm.controls.startTimePM.value &&
        this.restaurantConfigurationForm.controls.endTimePM.value &&
        this.restaurantConfigurationForm.controls.currencyType.value &&
        this.selectedTill.length > 0 &&
        this.selectedThirdParty.length > 0 &&
        this.selectedPettyCash.length > 0 &&
        this.PDQMaster.length > 0
      ) {
        if (!this.tillsWrong && !this.pettyCashWrong) {
          this.restaurantConfigService
            .updateDataInRestConfig(this.putObj, this.data.id)
            .subscribe(
              (res) => {
                //this.clientForm.reset();
                this.dialogMessage =
                  "Restaurant Configuration Successfully Updated ..!!";
                this.dialog.open(this.successDialog, { disableClose: true });
              },
              (err) => {
                this.dialogMessage =
                  "Unable to Save Configuration ! Please try again ...";
                this.dialog.open(this.secondDialog, { disableClose: true });
              }
            );
        }
      }
      else {
        this.dialogMessage =
          "Please Enter all the Mandatory Fields To Save.";
        this.dialog.open(this.secondDialog, { disableClose: true });
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == "AMPM") {
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value &&
        this.restaurantConfigurationForm.controls.endTimeAM.value &&
        this.restaurantConfigurationForm.controls.startTimePM.value &&
        this.restaurantConfigurationForm.controls.endTimePM.value &&
        this.restaurantConfigurationForm.controls.currencyType.value &&
        this.selectedTill.length > 0 &&
        this.selectedThirdParty.length > 0 &&
        this.selectedPettyCash.length > 0 &&
        this.PDQMaster.length > 0
      ) {
        if (!this.tillsWrong && !this.pettyCashWrong) {
          this.restaurantConfigService
            .updateDataInRestConfig(this.putObj, this.data.id)
            .subscribe(
              (res) => {
                //this.clientForm.reset();
                this.dialogMessage =
                  "Restaurant Configuration Successfully Updated ..!!";
                this.dialog.open(this.successDialog, { disableClose: true });
              },
              (err) => {
                this.dialogMessage =
                  "Unable to Save Configuration ! Please try again ...";
                this.dialog.open(this.secondDialog, { disableClose: true });
              }
            );
        }
      }
      else {
        this.dialogMessage =
          "Please Enter all the Mandatory Fields To Save.";
        this.dialog.open(this.secondDialog, { disableClose: true });
      }
    }
    else if (this.restaurantConfigurationForm.value.cashupInterval == null) {
      console.log("enter null")
      if (
        this.restaurantConfigurationForm.controls.startTimeAM.value &&
        this.restaurantConfigurationForm.controls.endTimeAM.value &&
        this.restaurantConfigurationForm.controls.currencyType.value &&
        this.selectedTill.length > 0 &&
        this.selectedThirdParty.length > 0 &&
        this.selectedPettyCash.length > 0 &&
        this.PDQMaster.length > 0
      ) {
        if (!this.tillsWrong && !this.pettyCashWrong) {
          this.restaurantConfigService
            .updateDataInRestConfig(this.putObj, this.data.id)
            .subscribe(
              (res) => {
                //this.clientForm.reset();
                this.dialogMessage =
                  "Restaurant Configuration Successfully Updated ..!!";
                this.dialog.open(this.successDialog, { disableClose: true });
              },
              (err) => {
                this.dialogMessage =
                  "Unable to Save Configuration ! Please try again ...";
                this.dialog.open(this.secondDialog, { disableClose: true });
              }
            );
        }
      }
      else {
        this.dialogMessage =
          "Please Enter all the Mandatory Fields To Save.";
        this.dialog.open(this.secondDialog, { disableClose: true });
      }
    }

  }
  postShiftTypes() {
    console.log("create shifttypes", this.safeFG.value);
    let safeObj = {
      id: this.restaurantId,
      restaurantShifts: [
        {
          shiftId: "",
          shiftName: this.safeFG.value.name,
          shiftDescription: this.safeFG.value.description,
          breakDuration: this.safeFG.value.break,
          booking: this.safeFG.value.booking ? "YES" : "NO",
          payrollHours: this.safeFG.value.payroll ? "YES" : "NO",
          schedule: this.safeFG.value.Schedule ? "YES" : "NO"
        }
      ]

    }


    console.log("shiftobj", safeObj);
    this.restaurantConfigService
      .postShiftType(safeObj)
      .subscribe(
        (res) => {
          //this.clientForm.reset();
          this.dialogService.open(this.success, {
            closeOnBackdropClick: false,
          });
          this.restaurantConfigService.getShiftType(this.restaurantId).subscribe((res) => {
            let shiftType = res.restaurantShifts
            console.log("sh", shiftType)
            this.allSafesummary = shiftType;
          });
        },
        (err) => {
          console.log("error", err)
        }
      );

  }
  postDepartmentTypes() {
    console.log("create departmenttype", this.adddepartment.value);
    let safeObj = {
      id: this.restaurantId,
      customDepartment: [
        {
          customId: "",
          departmentName: this.adddepartment.value.name,
          departmentDescription: this.adddepartment.value.description,
        }
      ]

    }


    console.log("shiftobj", safeObj);
    this.restaurantConfigService
      .postDepartmentType(safeObj)
      .subscribe(
        (res) => {
          //this.clientForm.reset();
          this.dialogService.open(this.successdep, {
            closeOnBackdropClick: false,
          });
          this.restaurantConfigService.getDepartmentType(this.restaurantId).subscribe((res) => {
            let depType = res.customDepartment
            console.log("sh", depType)
            this.allDepartments = depType;
          })
        },
        (err) => {
          console.log("error", err)
        }
      );

  }
  navigateToRestaurants() {
    localStorage.setItem("activeCard", "Restaurants")
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }
  openBackDialog() {
    this.dialog.open(this.backDialog, { disableClose: true });
  }

  navigateToDashBoard() {
    this.dialog.closeAll();
    localStorage.setItem("activeCard", "Restaurants")
    if (this.superInfo) this.router.navigateByUrl("/account");
    else this.router.navigateByUrl("/clientLogin");
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  resForm() {
    console.log("PDQ MAster", this.PDQMaster);
    console.log(this.restaurantConfigurationForm.value);
  }


  onStartTimeChange() {
    let c = new Date();
    console.log("date1", this.restaurantConfigurationForm.value.startTimeAM);
    if ((this.restaurantConfigurationForm.value.startTimeAM) > (this.restaurantConfigurationForm.value.endTimeAM)) {
      console.log("dates", this.restaurantConfigurationForm.value.startTimeAM);
      this.dateValid = true;

    } else {
      this.dateValid = false;
    }

  }
  onStartTimeChangePM() {
    let c = new Date();
    console.log("date1", this.restaurantConfigurationForm.value.startTimeAM);
    if ((this.restaurantConfigurationForm.value.startTimePM) > (this.restaurantConfigurationForm.value.endTimePM)) {
      console.log("dates", this.restaurantConfigurationForm.value.startTimeAM);
      this.dateValidPM = true;

    } else {
      this.dateValidPM = false;
    }
  }

  back() {
    this.openBackDialog();
    localStorage.setItem("activeCard", "Restaurants")
    //this.router.navigateByUrl("/clientLogin");
    //this.dialog.open(this.backDialog, { disableClose: true });
  }
  setFormTab(s: any) {
    this.tab_name = s;
    this.gridApi?.sizeColumnsToFit();
  }
  safeFG: FormGroup;
  safeEditFG: FormGroup;
  adddepartment: FormGroup
  @ViewChild('request') request: TemplateRef<any>;
  addnew() {
    this.modalService.open(this.request, { centered: true, backdrop: true, windowClass: 'sidebar-modal', size: 'lg' });
    this.safeFG = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      booking: new FormControl(),
      Schedule: new FormControl(),
      payroll: new FormControl(),
      break: new FormControl()

    });
  }
  @ViewChild('newdepartment') newdepartment: TemplateRef<any>;
  addnewDepartment() {
    this.modalService.open(this.newdepartment, { centered: true, backdrop: true, windowClass: 'sidebar-modal', size: 'lg' });
    this.adddepartment = this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
    });
  }
  redrawAllRows() {
    this.gridApi.redrawRows();
  }

  gridOptions = {
    context: {
      componentParent: this,
    },
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // To resize all columns
    // var allColumnIds = [];
    // this.gridColumnApi.getAllColumns().forEach(function (column) {
    //   allColumnIds.push(column.colId);
    // });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    // this.gridApi.sizeColumnsToFit();
    this.gridApi.resetRowHeights();

  }
  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;   
  //   this.gridApi.sizeColumnsToFit(); 
  //   }
  columnDefs = [
    {
      field: "shiftName",
      headerName: "SHIFT NAME",
      sortable: true,
      filter: "agDateColumnFilter",
      valueFormatter: (params) =>
        params.shiftName,
    },
    {
      field: "shiftDescription",
      headerName: "DESCRIPTION",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.data.shiftDescription
    },
    {
      field: "booking",
      headerName: "ALLOW BOOKING",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.data.booking,

    },
    {
      field: "payrollHours",
      headerName: "COUNT HOURS IN PAYROLL",
      sortable: true,
      filter: "agNumberColumnFilter",

      valueFormatter: (params) =>

        params.data.payrollHours,

    },
    {
      field: "schedule",
      headerName: "INCLUDE IN SCHEDULE",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.data.schedule,
    },
    {
      field: "breakDuration",
      headerName: "BREAK HOURS in Minutes",
      sortable: true,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.data.breakDuration,
    },
    {
      field: "ACTIONS",
      width: 150,
      cellRendererFramework: ConfigurationActionCellRenderComponent,
    },
  ];
  editSafesummaryObj;
  @ViewChild('editSafe') editSafe: TemplateRef<any>;
  editSafeSum(row) {
    this.editSafesummaryObj = row;
    console.log("editSafesummaryObj", this.editSafesummaryObj);
    this.modalService.open(this.editSafe, { centered: true, backdrop: true, windowClass: 'sidebar-modal', size: 'lg' });
    this.safeEditFG = this.fb.group({
      name: [this.editSafesummaryObj?.shiftName, [Validators.required]],
      description: [this.editSafesummaryObj?.shiftDescription, [Validators.required]],
      booking: [this.editSafesummaryObj?.booking == "YES" ? true : false,],
      Schedule: [this.editSafesummaryObj?.schedule == "YES" ? true : false,],
      payroll: [this.editSafesummaryObj?.payrollHours == "YES" ? true : false,],
      break: [this.editSafesummaryObj?.breakDuration, [Validators.required]],
    });
    console.log("mamma", this.safeEditFG.value)
  }
  postEditShiftType() {
    let editObj = {
      id: this.restaurantId,
      restaurantShifts: [
        {
          shiftId: this.editSafesummaryObj?.shiftId,
          shiftName: this.safeEditFG?.value.name,
          shiftDescription: this.safeEditFG?.value.description,
          breakDuration: this.safeEditFG?.value.break,
          booking: this.safeEditFG?.value.booking ? "YES" : "NO",
          payrollHours: this.safeEditFG?.value.payroll ? "YES" : "NO",
          schedule: this.safeEditFG?.value.Schedule ? "YES" : "NO"
        }
      ]

    }
    console.log(editObj);
    this.restaurantConfigService
      .putShiftType(editObj)
      .subscribe(
        (res) => {
          this.restaurantConfigService.getShiftType(this.restaurantId).subscribe((res) => {
            let shiftType = res.restaurantShifts
            console.log("sh", shiftType)
            this.allSafesummary = shiftType;
          });
        },
        (err) => {
          console.log("error", err)
        }
      );
  }
  postEditDepartmentType() {
    let editObj = {
      id: this.restaurantId,
      customDepartment: [
        {
          customId: this.editDepartmentObj?.customId,
          departmentName: this.editdepartment?.value.name,
          departmentDescription: this.editdepartment?.value.description,
        }
      ]

    }
    console.log(editObj);
    this.restaurantConfigService
      .putDepartmentType(editObj)
      .subscribe(
        (res) => {
          this.restaurantConfigService.getDepartmentType(this.restaurantId).subscribe((res) => {
            let depType = res.customDepartment
            console.log("sh", depType)
            this.allDepartments = depType;
          })
        },
        (err) => {
          console.log("error", err)
        }
      );
  }
  deleteSafesummaryObj
  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  @ViewChild("success") success: TemplateRef<any>;
  @ViewChild("successdep") successdep: TemplateRef<any>;

  deleteSafesummary(row) {
    this.deleteSafesummaryObj = row;
    this.dialogService.open(this.deleteContent, {
      closeOnBackdropClick: false,
    });
    console.log(this.deleteSafesummaryObj)
  }
  deleteShitfType() {
    this.restaurantConfigService
      .deleteShiftType(this.deleteSafesummaryObj.shiftId, this.restaurantId)
      .subscribe(
        (res) => {
        },
        (err) => {
          console.log("sucess")
          this.restaurantConfigService.getShiftType(this.restaurantId).subscribe((res) => {
            let shiftType = res.restaurantShifts
            console.log("sh", shiftType)
            this.allSafesummary = shiftType;
          });
        }
      );
  }
  deleteDepartmentType() {
    this.restaurantConfigService
      .deleteDepartmentType(this.restaurantId, this.deleteDepartmentObj.customId)
      .subscribe(
        (res) => {
        },
        (err) => {
          console.log("sucess")
          this.restaurantConfigService.getDepartmentType(this.restaurantId).subscribe((res) => {
            let depType = res.customDepartment
            console.log("sh", depType)
            this.allDepartments = depType;
          })
        }
      );
  }

  editDepartmentObj;
  editdepartment: FormGroup
  @ViewChild('editdepartmentS') editdepartmentS: TemplateRef<any>;
  editDepartment(row) {
    this.editDepartmentObj = row;
    console.log("editSafesummaryObj", this.editDepartmentObj);
    this.modalService.open(this.editdepartmentS, { centered: true, backdrop: true, windowClass: 'sidebar-modal', size: 'lg' });
    this.editdepartment = this.fb.group({
      name: new FormControl(this.editDepartmentObj?.departmentName),
      description: new FormControl(this.editDepartmentObj?.departmentDescription),
    });

  }
  deleteDepartmentObj
  @ViewChild("deletedepartment") deletedepartment: TemplateRef<any>;
  deleteDepartment(row) {
    this.deleteDepartmentObj = row;
    this.dialogService.open(this.deletedepartment, {
      closeOnBackdropClick: false,
    });
  }
  depcolumnDefs = [
    {
      field: "departmentName",
      headerName: "DEPARTMENT NAME",
      sortable: true,
      filter: "agDateColumnFilter",
      width: 300,
      valueFormatter: (params) =>
        params.departmentName,
    },
    {
      field: "departmentDescription",
      headerName: "DESCRIPTION",
      sortable: true,
      width: 500,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.data.departmentDescription
    },
    {
      field: "ACTIONS",
      cellRendererFramework: DepartmentActionCellRenderComponent,
    },
  ];
  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }




}
