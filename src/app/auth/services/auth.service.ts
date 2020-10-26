import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dialog: MatDialog
  ) { }

  async openLoginModal() {
    const { LoginComponent } = await import('../login/login.component');
    return this.dialog.open(LoginComponent, {panelClass: 'blurred-box-dialog', width: '400px', height: '370px'});
  }

  login() {
    
  }
}
