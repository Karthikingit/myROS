import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
} from "@angular/router";
import { AuthFacadeService } from "./facade/auth-facade.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authFacade: AuthFacadeService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authFacade.getUserDetails();
    // console.log(currentUser);
    if (currentUser) {
      // logged in so return true
      return true;
    }

    //  not logged in so redirect to login page with the return url
    // this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    this.router.navigateByUrl("ROS/login");
    return false;
  }

  canLoad() {
    const currentUser = this.authFacade.getUserDetails();
    // console.log(currentUser);
    if (currentUser) {
      // logged in so return true
      return true;
    }

    //  not logged in so redirect to login page with the return url
    this.router.navigateByUrl("ROS/login");
    return false;
  }
}
