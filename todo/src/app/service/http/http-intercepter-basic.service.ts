import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { BasicAuthenticationService } from './../basic-authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercepterBasicService implements HttpInterceptor {
  constructor(
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 401) {
    //       console.log(error);
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}
