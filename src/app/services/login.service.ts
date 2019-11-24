import { Injectable } from '@angular/core';
import {ProcessHttpmsgService} from './process-httpmsg.service';
import {Login} from '../models/Login';
import {catchError, map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) {
  }
  submitLogin(login: Login): Observable<Login> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Login>(baseURL + 'login', login, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
