import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {

}
