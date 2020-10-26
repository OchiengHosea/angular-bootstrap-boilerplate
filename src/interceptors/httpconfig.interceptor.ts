import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user'));
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    if (user) {
      if(req.headers.get("excempt_login")) {
        // just delete the header since we dont need it server side
        req = req.clone({headers: req.headers.delete('excempt_login')});
      } else {
        req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + user.token)});
      }
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event --------->>>>', event);
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 403) {
        }
        return throwError(err);
      })
    );
  }
}
