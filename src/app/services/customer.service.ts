import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProcessHttpmsgService} from "./process-httpmsg.service";
import {SettingsTable} from "../models/SettingsTable";
import {Observable} from "rxjs";
import {baseURL} from "../shared/baseUrl";
import {catchError, delay} from "rxjs/operators";
import {ItemMenu} from "../models/ItemMenu";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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
      .pipe(delay( 100 ), catchError(this.processHTTPMsgService.handleError));

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


  getItemsMenu(): Observable<ItemMenu[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<ItemMenu[]>(baseURL + 'api/items-menu', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateRowData(dataRow: ItemMenu): Observable<ItemMenu> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.put<ItemMenu>(baseURL + 'api/items-menu', dataRow, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteRowData(data): Observable<ItemMenu> {

    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.delete<ItemMenu>(baseURL + 'api/items-menu/?_id=' + data._id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  addNewCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.post<any>(baseURL + 'api/customer', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
