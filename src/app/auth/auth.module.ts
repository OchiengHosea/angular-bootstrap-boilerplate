import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppSharedModule, MatDialogModule
  ]
})
export class AuthModule { }
