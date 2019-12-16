import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../shared/baseUrl';
import {catchError} from 'rxjs/operators';
import {ProcessHttpmsgService} from './process-httpmsg.service';
import {SettingsTable} from '../models/SettingsTable';

@Injectable({
  providedIn: 'root'
})
export class SettingsTableService {


  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) {}


  submitSettingsTable(settings: SettingsTable): Observable<SettingsTable> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.put<SettingsTable>(baseURL + 'api/settings-table', settings, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getSettingsTable(): Observable<SettingsTable> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<SettingsTable>(baseURL + 'api/settings-table', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
