import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../commons/modal/modal.component";
import {ModalService} from "../commons";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {ROUTES} from "../routes";
import {PageScrollService} from "ngx-page-scroll-core";

@Component({
  selector: 'hc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ROUTES = ROUTES;
  constructor(public modalService: ModalService, public router: Router, public authService: AuthService, private pageScrollService: PageScrollService) { }

  ngOnInit(): void {
  }


  loginSuccessfull() {
    this.router.navigate([ROUTES.HOME.url]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ROUTES.HOME.url]);
  }

  navigateOrScrollTo(url: string, anchor: string) {
    if(ROUTES.isItHomeRoute(this.router.url)){
       this.pageScrollService.scroll({
         document: document,
         scrollTarget: '#' + anchor,
       });
    } else {
      this.router.navigate([url], {fragment: anchor});
    }
  }
}
