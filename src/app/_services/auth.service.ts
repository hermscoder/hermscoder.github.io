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

  public static AUTHENTICATION_TOKEN_KEY: string = 'authenticationToken';
  public static USER_KEY: string = 'user';

  private baseUrl = environment.apiUrl + 'api/auth/';
  private _currentUser!: UserSummarised | undefined;

  constructor(private httpClient: HttpClient, private localStorageSerive: LocalStorageService) { }

  login(authenticationRequest: AuthenticationRequest): Observable<boolean> {
    return this.httpClient.post<AuthenticationResponse>(this.baseUrl + 'login', authenticationRequest)
      .pipe(map(data => {
        this.setAuthInformation(data);
        return true;
      }));
  }

  isAuthenticated(): boolean {
    return this.localStorageSerive.retrieve(AuthService.AUTHENTICATION_TOKEN_KEY) != null;
  }

  logout() {
    this.localStorageSerive.clear(AuthService.AUTHENTICATION_TOKEN_KEY);
    this.localStorageSerive.clear(AuthService.USER_KEY);
    this.currentUser = undefined;
  }

  refreshToken(): Observable<boolean> {
    return this.httpClient.get<AuthenticationResponse>(this.baseUrl + 'token_refresh')
      .pipe(map(data => {
        this.setAuthInformation(data);
        return true;
      }));
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private setAuthInformation(data: AuthenticationResponse){
    this.localStorageSerive.store(AuthService.AUTHENTICATION_TOKEN_KEY, data.authenticationToken);
    this.localStorageSerive.store(AuthService.USER_KEY,  JSON.stringify(data.user));
    this.currentUser = data.user;
  }

  get currentUser(): UserSummarised | undefined {
    return this._currentUser;
  }

  set currentUser(value: UserSummarised | undefined) {
    this._currentUser = value;
  }
}
