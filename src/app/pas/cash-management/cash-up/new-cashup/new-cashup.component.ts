import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NbDialogService } from "@nebular/theme";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthFacadeService } from "../../../auth/facade/auth-facade.service";
import { NGXLogger } from "ngx-logger";
import { Router } from "@angular/router";
import { CashupFacadeService } from "../../facade/cashup-facade.service";
import { BreakDownDetails, CashUp } from "../../model/cashup.model";

@Component({
  selector: "ngx-new-cashup",
  templateUrl: "./new-cashup.component.html",
  styleUrls: ["./new-cashup.component.scss"],
})
export class NewCashupComponent implements OnInit {
 constructor(private router: Router){

 }
 ngOnInit(): void{}
 back(){
   this.router.navigateByUrl("/integration")
 }
}
