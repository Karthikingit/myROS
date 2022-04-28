import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
export interface Witness {
  value: string;
  viewValue: string;
  img: string;
}
interface Option {
  value: string;
  // description: string;
}

@Component({
  selector: 'ngx-edit-cashup',
  templateUrl: './edit-cashup.component.html',
  styleUrls: ['./edit-cashup.component.scss']
})
export class EditCashupComponent implements OnInit {
  myDate = Date.now();
  tab_name: string = "epos";
  panelOpenState = false;
  submit!: FormGroup;
  submitted = false;
  closeResult = '';
  deleteBankingObj;
  title: Option[] = [
    {value: 'EPOs Takings'},
    {value: 'Cash Takings'},
    {value: 'PDQ Takings'},
    {value: 'Third Party Takings'},
];
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.submit = this.formBuilder.group({
      epos: this.formBuilder.group({
        food: ['12',],
        drinks: ['11', [Validators.required, Validators.minLength(1)]],
        away: ['7', [Validators.required, Validators.minLength(1)]],
        others: ['5', [Validators.required, Validators.minLength(1)]],
        vat: ['8', [Validators.required, Validators.minLength(1)]],
        charge: ['2', [Validators.required, Validators.minLength(1)]],
        card: ['0', [Validators.required, Validators.minLength(1)]]

      }),
      third_party: this.formBuilder.group({
        zomato: ['23', [Validators.required, Validators.minLength(1)]],
        just_eat: ['14', [Validators.required, Validators.minLength(1)]],
        deliveroo: ['78', [Validators.required, Validators.minLength(1)]],
        uber_eats: ['2', [Validators.required, Validators.minLength(1)]],

      }), summary: this.formBuilder.group({
        safe_count: ['1', [Validators.required, Validators.minLength(1)]],
        till_amount: ['4', [Validators.required, Validators.minLength(1)]],
        banked_amount: ['3', [Validators.required, Validators.minLength(1)]],

      }), pdq: this.formBuilder.group({
        food_drinks: ['2', [Validators.required, Validators.minLength(1)]],
        repairs: ['23', [Validators.required, Validators.minLength(1)]],
        maintenance: ['11', [Validators.required, Validators.minLength(1)]],
        sundries: ['14', [Validators.required, Validators.minLength(1)]],
        till_1: ['32', [Validators.required, Validators.minLength(1)]],
        till_2: ['12', [Validators.required, Validators.minLength(1)]],
        amex: ['13', [Validators.required, Validators.minLength(1)]],
        visa: ['56', [Validators.required, Validators.minLength(1)]],
        advance_provided: ['', [Validators.required, Validators.minLength(1)]],
        amex1: ['12', [Validators.required, Validators.minLength(1)]],
        visa1: ['13', [Validators.required, Validators.minLength(1)]],
        advance_provided1: ['12', [Validators.required, Validators.minLength(1)]],

      }),
      kpi: this.formBuilder.group({
        table_covers: ['', [Validators.required, Validators.minLength(1)]],
        covers: ['', [Validators.required, Validators.minLength(1)]],
        away: ['', [Validators.required, Validators.minLength(1)]],
        void: ['', [Validators.required, Validators.minLength(1)]],
        bill: ['', [Validators.required, Validators.minLength(1)]],
        bill1: ['', [Validators.required, Validators.minLength(1)]],
        amount: ['', [Validators.required, Validators.minLength(1)]],
        amount1: ['', [Validators.required, Validators.minLength(1)]],
        des: ['', [Validators.required, Validators.minLength(10)]],
      })
    });

  }

  get f() { return this.submit.controls; }
  eposs = [
    { 'item': 'Food', 'cash': '29', },
    { 'item': 'Drinks', 'cash': '12' },
    { 'item': 'Take away', 'cash': '03', },
    { 'item': 'Others', 'cash': '23' },
    { 'item': 'VAT', 'cash': '123' },
    { 'item': 'Service charges', 'cash': '234' },
    { 'item': 'Credict card Tips', 'cash': '523' }
  ];
  cash = [
    { 'item': 'food', 'cash': '29', },
    { 'item': 'drinks', 'cash': '12' },
    { 'item': 'take', 'cash': '03', }
  ];
  third_partys = [
    { 'item': 'food', 'cash': '29', },
    { 'item': 'drinks', 'cash': '12' },
    { 'item': 'take', 'cash': '03', }
  ];
  pdq_takings = [
    { 'item': 'Visa', 'cash': '29', },
    { 'item': 'Master card', 'cash': '12' },
    { 'item': 'Amex', 'cash': '03', }
  ];
  Witness: Witness[] = [
    { value: 'nick', viewValue: 'Nick', img: 'assets/images/nick.png' },
    { value: 'alen', viewValue: 'Alen', img: 'assets/images/nick.png' },
    { value: 'nick', viewValue: 'Nick', img: 'assets/images/nick.png' }
  ];



  onSubmit() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.submit.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.submit.value, null, 4));



  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
