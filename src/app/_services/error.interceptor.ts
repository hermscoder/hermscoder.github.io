import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {ROUTES} from "../routes";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }



  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let handled: boolean = false;

    return next.handle(req).pipe(
      retry(1),
      catchError((errorResponse) => {
        let errorMessage = null;

        if (errorResponse.error instanceof ErrorEvent) {
          errorMessage = `Error: ${errorResponse.error.message}`;
        } else if (errorResponse instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${errorResponse.status}: ${errorResponse.error.error} - ${errorResponse.error.message}`;
          handled = this.handleServerSideError(errorResponse);
        }

        console.error(errorMessage ? errorMessage : errorResponse);

        if (!handled) {
          if (errorMessage) {
            return throwError(errorMessage);
          } else {
            return throwError("Unexpected problem occurred");
          }
        } else {
          return of(errorResponse);
        }
      })
    );
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled: boolean = false;

    switch (error.status) {
      case 401:
        console.log("Please login again.");
        this.authService.logout();
        this.router.navigate([ROUTES.HOME.url])
        // this.routeMessageService.message = "Please login again.";
        // this.authenticationService.logout();
        handled = true;
        break;
      case 403:
        console.log("You shall not pass!!");
        // this.router.navigate([ROUTES.HOME.url])
        // this.routeMessageService.message = "Please login again.";
        // this.authenticationService.logout();
        handled = true;
        break;
    }

    return handled;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
