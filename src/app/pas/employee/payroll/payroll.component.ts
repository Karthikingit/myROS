import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-payroll',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./payroll.component.scss'],
})
export class PayrollComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
