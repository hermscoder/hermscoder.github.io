import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PostForListDto} from "../_models/post-for-list-dto";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ExperienceDto} from "../_models/experience-dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly PROFILE_RESOURCE = 'profile';
  readonly EXPERIENCE_RESOURCE = 'experience';
  readonly BASE_URL = environment.apiUrl;


  constructor(private httpClient: HttpClient){ }

  getMainProfile(): Observable<ProfileDetailsDto>{
    return this.httpClient.get<ProfileDetailsDto>(this.BASE_URL + this.PROFILE_RESOURCE + '/0');
  }

  updatePersonalData(profile: ProfileDetailsDto): Observable<ProfileDetailsDto>{
    return this.httpClient.put<ProfileDetailsDto>(this.BASE_URL + this.PROFILE_RESOURCE + '/' + profile.id, profile);
  }

  addExperience(experience: ExperienceDto): Observable<ExperienceDto>{
    return this.httpClient.post<ExperienceDto>(this.BASE_URL + this.PROFILE_RESOURCE + '/' + experience.profileId + '/' + this.EXPERIENCE_RESOURCE
      , experience);
  }

}
