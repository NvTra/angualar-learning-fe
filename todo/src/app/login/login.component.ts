import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../service/hardcode-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private hardcodeAuthenticationComponent: HardcodeAuthenticationService,
    private basicAuthenticationComponent: BasicAuthenticationService
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

  onBasicLogin() {
    if (
      this.basicAuthenticationComponent
        .executeBasicAuthenticationService(this.username, this.password)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.invalidLogin = true;
          }
        )
    ) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }
}
