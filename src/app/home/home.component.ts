import { Component, OnInit } from '@angular/core';
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: ProfileDetailsDto | any = {};
  error: any = null;
  constructor(private route: ActivatedRoute) { }

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

}
