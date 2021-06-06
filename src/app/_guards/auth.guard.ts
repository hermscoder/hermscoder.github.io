import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // if (this.authService.loggedIn()) {
      return true;
    // }
    //
    // alert('You shall not pass!!!');
    // this.router.navigate(['']);
    // return false;
  }
}
