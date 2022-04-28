import { Component, OnInit } from "@angular/core";
import { AuthFacadeService } from "../facade/auth-facade.service";

@Component({
  selector: "ngx-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
  constructor(private auth: AuthFacadeService) {}

  ngOnInit(): void {}
}
