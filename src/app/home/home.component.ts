import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs/operators";
import {PageScrollOptions, PageScrollService} from "ngx-page-scroll-core";
import {ROUTES} from "../routes";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  profile: ProfileDetailsDto | any = {};
  error: any = null;
  contactForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private pageScrollService: PageScrollService) {
    this.contactForm = new FormGroup({
      title: new FormControl(),
      email: new FormControl(),
      message: new FormControl()
    })
  }

  ngOnInit(): void {
    this.router.navigate([ROUTES.HOME.url]);
    this.route.data.subscribe(data => {
      let resolvedData = data['profile'];
      if(resolvedData.data != null) {
        this.profile = resolvedData.data;
      } else {
        this.error = resolvedData.error;
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.route.fragment){
      this.route.fragment.pipe(
        first()
      ).subscribe((fragment) => {
        this.pageScrollService.scroll({
          document: document,
          scrollTarget: '#' + fragment,
        });
      });
    }
  }

  onSubmit(): void {
    console.log('Enviar: ' + this.contactForm.value.toString());
  }
}
