import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../commons/modal/modal.component";
import {ModalService} from "../commons";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {ROUTES} from "../routes";

@Component({
  selector: 'hc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routes = ROUTES;
  constructor(public modalService: ModalService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }


  loginSuccessfull() {
    this.router.navigate([ROUTES.HOME.url]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ROUTES.HOME.url]);
  }
}
