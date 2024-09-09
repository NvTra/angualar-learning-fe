import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}

  // authenticate(username: string, password: string) {
  //   console.log(this.isUserLoggedIn());
  //   if (username === 'tranv' && password === '123456') {
  //     sessionStorage.setItem('authenticaterUser', username);
  //     return true;
  //   }
  //   return false;
  // }

  executeBasicAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });
    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicauth`, { headers })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        })
      );
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'tranv';
    let password = '123456';
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem(TOKEN);
    return null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  loggout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
