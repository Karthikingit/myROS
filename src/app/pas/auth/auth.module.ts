import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RegisterComponent } from "./register/register.component";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoadingComponent],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  providers: [],
})
export class AuthModule {}
