import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SettingsTable} from '../models/SettingsTable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseUrl';
import {catchError} from 'rxjs/operators';
import {ProcessHttpmsgService} from './process-httpmsg.service';
import {WareHouse} from '../models/WareHouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getWareHouse(): Observable<WareHouse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<WareHouse>(baseURL + 'api/warehouse', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateWareHouse(data): Observable<WareHouse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.put<WareHouse>(baseURL + 'api/warehouse', data , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
