import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employees',
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
