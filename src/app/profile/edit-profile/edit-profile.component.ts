import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {ExperienceDto} from "../../_models/experience-dto";
import {ProjectDto} from "../../_models/project-dto";
import {DatePipe} from "@angular/common";
import {DateFormatPipe} from "../../_pipes/date-format-pipe";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile: ProfileDetailsDto | undefined;
  constructor(private activatedRoute:ActivatedRoute, private dateFormatPipe : DateFormatPipe) {
    this.profileForm = new FormGroup({
      id: new FormControl(),
      givenName: new FormControl(),
      familyName: new FormControl(),
      birthDate: new FormControl(),
      jobTitle: new FormControl(),
      description: new FormControl(),
      experienceList: new FormControl(),
      projectsList: new FormControl()
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if(data['profile']) {
        this.profile = data['profile'].data;
        this.profileForm.patchValue(data['profile'].data);
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  toControl(absCtrl: AbstractControl): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl ;
  }
}
