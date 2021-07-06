import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PostForListDto} from "../_models/post-for-list-dto";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileDetailsDto} from "../_models/profile-details-dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.apiUrl + 'profile';

  constructor(private httpClient: HttpClient){ }

  getMainProfile(): Observable<ProfileDetailsDto>{
    return this.httpClient.get<ProfileDetailsDto>(this.baseUrl + '/0');
  }

}
