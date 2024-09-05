import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodeAuthenticationService {
  constructor() {}

  authenticate(username: string, password: string) {
    console.log(this.isUserLoggedIn());
    if (username === 'tranv' && password === '123456') {
      sessionStorage.setItem('authenticaterUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  loggout() {
    sessionStorage.removeItem('authenticaterUser');
  }
}
