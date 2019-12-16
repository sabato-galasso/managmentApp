import { Injectable } from '@angular/core';
import {ProcessHttpmsgService} from './process-httpmsg.service';
import {Login} from '../models/Login';
import {catchError, map, tap} from 'rxjs/operators';
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
    return this.http.post<Login>(baseURL + 'api/users/login', login, httpOptions)
      .pipe(tap(res => {
        console.log(res.user)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user.name);
      },
        () => catchError(this.processHTTPMsgService.handleError)
        ));

  }
}
