import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationRequest} from "../_models/authentication-request";
import {AuthenticationResponse} from "../_models/authentication-response";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {UserSummarised} from "../_models/user-summarised";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'api/auth/';
  public currentUser!: UserSummarised;
  constructor(private httpClient: HttpClient, private localStorageSerive: LocalStorageService) { }

  login(authenticationRequest: AuthenticationRequest): Observable<boolean> {
    return this.httpClient.post<AuthenticationResponse>(this.baseUrl + 'login', authenticationRequest)
      .pipe(map(data => {
        this.localStorageSerive.store("authenticationToken", data.authenticationToken);
        this.localStorageSerive.store("user",  JSON.stringify(data.user));
        this.currentUser = data.user;
        return true;
      }));
  }

  isAuthenticated(): boolean {
    return this.localStorageSerive.retrieve('authenticationToken') != null;
  }

  logout() {
    this.localStorageSerive.clear("authenticationToken");
    this.localStorageSerive.clear("user");
  }
}
