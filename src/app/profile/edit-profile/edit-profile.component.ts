import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProfileDetailsDto} from "../../_models/profile-details-dto";
import {ExperienceDto} from "../../_models/experience-dto";
import {ProjectDto} from "../../_models/project-dto";
import {DatePipe} from "@angular/common";
import {DateFormatPipe} from "../../_pipes/date-format-pipe";
import {ProfileService} from "../../_services/profile.service";
import {AuthService} from "../../_services/auth.service";
import {AuthenticationRequest} from "../../_models/authentication-request";
import {ROUTES} from "../../routes";
import {first} from "rxjs/operators";
import {PageScrollService} from "ngx-page-scroll-core";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, AfterViewInit {

  profileForm: FormGroup;
  profile: ProfileDetailsDto | undefined;
  constructor(private activatedRoute:ActivatedRoute,
              private profileService: ProfileService,
              private authService: AuthService,
              private pageScrollService: PageScrollService) {
    this.profileForm = new FormGroup({
      id: new FormControl(),
      user: new FormControl(),
      givenName: new FormControl(),
      familyName: new FormControl(),
      birthDate: new FormControl(),
      jobTitle: new FormControl(),
      description: new FormControl(),
      experienceList: new FormControl(),
      projectsList: new FormControl(),
      linkedIn: new FormControl(),
      instagram: new FormControl(),
      twitter: new FormControl()
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
  ngAfterViewInit(): void {
      this.pageScrollService.scroll({
        document: document,
        scrollTarget: '#profile',
      });
  }


  onSubmit() {
    const _this = this;
    this.profileService.updatePersonalData(this.profileForm.value).subscribe((res) => {
      //checking if we changed user properties, so we have to refresh the token and current user.
      if(_this.profile && _this.profile.user != res.user){
        _this.refreshToken();
      }
      _this.profile = res;
      _this.profileForm.patchValue(res);
    });
  }

  private refreshToken(){
    this.authService.refreshToken().subscribe(success => {
      if(success) {
        console.log('deu baum');
      } else {
        console.log('REFRESH TOKEN FAILED');
      }
    });
  }
}
