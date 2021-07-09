import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {WritePostDto} from "../_models/write-post-dto";
import {Observable} from "rxjs";
import {PostDetailsDto} from "../_models/post-details-dto";
import {UploadResponse} from "@kolkov/angular-editor/lib/angular-editor.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiUrl + 'media/upload';

  constructor(private httpClient: HttpClient){ }

  uploadFile(file: File): Observable<HttpEvent<UploadResponse>> {
    let formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<HttpEvent<UploadResponse>>(this.baseUrl, formData);
  }
}
