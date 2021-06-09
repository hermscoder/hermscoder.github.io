import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../commons/modal/modal.component";
import {ModalService} from "../commons";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'hc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public modalService: ModalService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }


  loginSuccessfull() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
