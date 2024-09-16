import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from '../service/hardcode-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private hardcodeAuthenticationComponent: HardcodeAuthenticationService,
    private basicAuthenticationComponent: BasicAuthenticationService,
    private snackBar: MatSnackBar
  ) {}
  username = 'tranv';
  password = '';

  // errorMessage = 'Invalid Credentials';
  // invalidLogin = false;

  onLogin() {
    if (
      this.hardcodeAuthenticationComponent.authenticate(
        this.username,
        this.password
      )
    ) {
      // this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      // this.invalidLogin = true;
    }
  }

  onBasicLogin() {
    this.basicAuthenticationComponent
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.openMessage('Login success!');
          // this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.openMessage('Invalid Username or password');
          // this.invalidLogin = true;
        }
      );
  }

  openMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success-dialog-snackbar'],
    });
  }
}
