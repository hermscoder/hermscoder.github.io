import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../_services/auth.service";
import {ROUTES} from "../routes";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private location: Location) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    //TODO add popup message
    alert('Unauthorized Access!');
    this.router.navigate([ROUTES.HOME.url]);
    return false;
  }
}
