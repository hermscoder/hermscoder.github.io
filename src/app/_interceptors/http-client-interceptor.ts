import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor{


  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.retrieve(AuthService.AUTHENTICATION_TOKEN_KEY);

    if (token) {
      if (this.authService.isTokenExpired(token)) {
        this.authService.logout();
        return next.handle(req);
      } else {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(cloned);
      }
    } else {
      return next.handle(req);
    }
  }

}
