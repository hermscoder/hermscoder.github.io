import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationRequest} from "../../_models/authentication-request";
import {Router} from "@angular/router";
import {ROUTES} from "../../routes";

@Component({
  selector: 'hc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onCancel = new EventEmitter();
  @Output() onLoginSuccessfull = new EventEmitter();

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.authService.login(new AuthenticationRequest(
                            this.loginForm.get('email')?.value,
                            this.loginForm.get('password')?.value
                          )).subscribe(success => {
      if(success) {
        this.router.navigate([ROUTES.HOME.url]);
        this.onLoginSuccessfull.emit();
      } else {
        alert('LOGIN FAILED');
      }
    });
  }

  cancel(): void{
    this.onCancel.emit();
  }

}
