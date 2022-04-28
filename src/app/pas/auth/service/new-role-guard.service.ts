import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { truncate } from 'fs';
import { Observable, Subscription } from 'rxjs';
import { ClientServiceService } from '../../administration/account/service/client-service.service';
import { UserServiceService } from '../../administration/account/service/user-service.service';
import { AuthFacadeService } from '../facade/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class NewRoleGuardService implements CanActivate{
  user;
  constructor(
    private router: Router, 
    private authFacadeService: AuthFacadeService, 
    private userInfoService: UserServiceService,
    private clientService: ClientServiceService,
    ) { }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   throw new Error('Method not implemented.');
  // }

  async accessUserInfo(){
    await this.userInfoService.getDetailedUserInfoByuserName(localStorage.getItem('given_name')).toPromise().then((res) => {
      if (res) {
         this.authFacadeService.setUser(res);
         console.log("user",res);
        //  console.log("userrole",res.role.name);
      } 
      else {
        console.log("Couldn't access Userinfo form api")
      }
    });
  }
 async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    console.log("given_name",localStorage.getItem('given_name'));
    this.user = this.authFacadeService.getUser();
    console.log("U1",this.user)
    if(!this.user){
      await this.accessUserInfo();
      this.user = this.authFacadeService.getUser();
      console.log("U2",this.user)
    }
    if(this.user){
          console.log("route",route.data.roles, route.data.status)
          if(route.data.roles && route.data.roles.indexOf(this.user.role.name) == -1 || route.data.status && route.data.status.indexOf(this.user.userStatus) == -1){   
            console.error("This user does not have permission to access this route. ")
            console.log("A")
            this.router.navigate(["/redirecting"]);
            return false;
          }
          else {
              // if(this.user.role.name == "ROLE_SUPERADMIN"){
              //   console.log("User is Admin")
              //   return true;
              // }
              // else if(this.user.role.name == "ROLE_CLIENTADMIN"){
              //   console.log("User is Client")
              //  // get client id

              //   console.log("client id",this.user.id)

              //   this.clientService.setClientDetail(this.user);
              //   this.clientService.setClientId(this.user.id)
                
              //   //set client id
              //   // this.accountTs.navigateToClientLogin(this.user);
              //   // this.router.navigate(["/clientLogin"]);
              //   return true;
              // }
              return true;
          }   
    }
    else{
      console.log("D  User not found")
      this.router.navigate(["/redirecting"]);
      return false;
    }
  }
}
