import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {MediaDto} from "../_models/media-dto";
import {MailMessageDto} from "../_models/mail-message-dto";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private baseUrl = environment.apiUrl + 'api/mail';

  constructor(private httpClient: HttpClient){ }

  sendEmailMessage(mailMessageDto: MailMessageDto): Observable<HttpEvent<any>> {
    return this.httpClient.post<HttpEvent<any>>(this.baseUrl, mailMessageDto);
  }
}
