import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = 'tranv';
  password = '';

  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  onLogin() {
    if (this.username === 'tranv' && this.password === '123456') {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
