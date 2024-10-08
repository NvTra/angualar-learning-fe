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

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        // if (error.status === 0) {
        //   this.router.navigate(['login']);
        //   console.log(error);
        // }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
