import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "./_services/auth.service";
import {UserSummarised} from "./_models/user-summarised";

@Component({
  selector: 'hc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Herms Coder';


  constructor(private localStorageService: LocalStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    // setting the current user now because this will be executed
    // everytime the user reloads the application.
    const token = this.localStorageService.retrieve(AuthService.AUTHENTICATION_TOKEN_KEY);
    const user: UserSummarised = JSON.parse(this.localStorageService.retrieve(AuthService.USER_KEY));
    if (token && user) {
      this.authService.currentUser = user;
    }
  }
}
