import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // ✅ import throwError
import { Router } from '@angular/router';       // ✅ fix import
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log('Error URL:', err.url);
          if (err.status === 401 || err.status === 403) {
            if (this.router.url === '/') {}
            else{
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(() => err); // ✅ new syntax for throwError
      })
    );
  }
}
