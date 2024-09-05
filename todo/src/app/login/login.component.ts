import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../service/hardcode-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private hardcodeAuthenticationComponent: HardcodeAuthenticationService
  ) {}
  username = 'tranv';
  password = '';

  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  onLogin() {
    if (
      this.hardcodeAuthenticationComponent.authenticate(
        this.username,
        this.password
      )
    ) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }
}
