import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostForListDto} from "../_models/post-for-list-dto";
import {PostDetailsDto} from "../_models/post-details-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.apiUrl + 'post';

  constructor(private httpClient: HttpClient){ }

  listPosts(): Observable<PostForListDto[]>{
    return this.httpClient.get<PostForListDto[]>(this.baseUrl);
  }

  getPost(id: any): Observable<PostDetailsDto> {
    return this.httpClient.get<PostDetailsDto>(this.baseUrl + '/' + id);
  }
}
