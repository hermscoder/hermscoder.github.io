import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "../_models/post-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.apiUrl + 'post';

  constructor(private httpClient: HttpClient){ }

  listPosts(): Observable<PostDto[]>{
    return this.httpClient.get<PostDto[]>(this.baseUrl);
  }

}
