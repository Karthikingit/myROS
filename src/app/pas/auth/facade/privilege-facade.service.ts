import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PrivilegeFacadeService {
  constructor(private privilegeService) {
    this.getPrivilegesForUser();
  }

  getPrivilegesForUser() {
    let permissions = this.privilegeService.getUserPermisssions();
    console.log("permissions loaded are:", permissions);
    // this.permissionsService.loadPermissions(permissions);
  }
}
