import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  myDate = new Date();
  activeCard = "Client";
  activeCards ="Accounting"
  constructor( private router: Router, private modalService:NgbModal) { }
  setActiveCard(c: string) {
    this.activeCard = c;
    console.log(this.activeCard);
   
  }
  setActive(c: string) {
    this.activeCards = c;
    console.log(this.activeCards);
   
  }
  ngOnInit(): void {
    
  }
  addNew() {
      this.router.navigate(["/newclient"]);

}
@ViewChild("addField") addField: TemplateRef<any>;
  requestdate() {
    this.modalService.open(this.addField, {
      centered: true,
      backdrop: true,
      windowClass: "sidebar-modal",
      size: "lg",
    });
  }
}
