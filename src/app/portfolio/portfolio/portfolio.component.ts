import {Component, Input, OnInit} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";

@Component({
  selector: 'hc-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  @Input() profile: ProfileDetailsDto | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  navigateTo(urlToProject: string) {
    window.open(urlToProject);
  }
}
