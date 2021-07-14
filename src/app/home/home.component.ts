import { Component, OnInit } from '@angular/core';
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: ProfileDetailsDto | any = {};
  error: any = null;
  contactForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.contactForm = new FormGroup({
      title: new FormControl(),
      email: new FormControl(),
      message: new FormControl()
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      let resolvedData = data['profile'];
      if(resolvedData.data != null) {
        this.profile = resolvedData.data;
      } else {
        this.error = resolvedData.error;
      }
    });

  }

  onSubmit(): void {
    console.log('Enviar: ' + this.contactForm.value.toString());
  }

}
