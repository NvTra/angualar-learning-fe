import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from './../basic-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercepterBasicService implements HttpInterceptor {
  constructor(private basicAuthenticationService: BasicAuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // let username = 'tranv';
    // let password = '123456';
    // let basicAuthHeaderString =
    //   'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString =
      this.basicAuthenticationService.getAuthenticatedToken();

    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString,
        },
      });
    }

    return next.handle(req);
  }
}
