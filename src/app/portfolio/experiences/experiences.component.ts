import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {ExperienceDto} from "../../_models/experience-dto";
import {Renderer} from "@angular/compiler-cli/ngcc/src/rendering/renderer";

@Component({
  selector: 'hc-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {


  @Input() experienceList: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
