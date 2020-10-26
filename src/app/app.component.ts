import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-bootstrap-starter';
  constructor(
    private authService: AuthService
  ) {

  }
  login() {
    this.authService.openLoginModal()
  }
}
