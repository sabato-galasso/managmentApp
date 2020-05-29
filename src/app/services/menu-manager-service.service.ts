import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProcessHttpmsgService} from "./process-httpmsg.service";
import {Observable} from "rxjs";
import {WareHouse} from "../models/WareHouse";
import {baseURL} from "../shared/baseUrl";
import {catchError} from "rxjs/operators";
import {MenuCategoryResponse} from "../models/Menu/MenuCategoryResponse";
import {MenuResponse} from "../models/Menu/MenuResponse";

@Injectable({
  providedIn: 'root'
})
export class MenuManagerServiceService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getMenu(): Observable<MenuResponse[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<MenuResponse[]>(baseURL + 'api/menu', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  getMenuCategoryItems(category : string): Observable<MenuResponse[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<MenuResponse[]>(baseURL + 'api/menu/category/'+category, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getMenuFirstLevelCategoryItems(subcategory : string): Observable<MenuResponse[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<MenuResponse[]>(baseURL + 'api/menu/subcategory/'+subcategory, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  updateMenu(data): Observable<MenuResponse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.put<MenuResponse>(baseURL + 'api/menu', data , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  addMenu(data): Observable<MenuResponse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.post<MenuResponse>(baseURL + 'api/menu', data , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteMenuRow(data): Observable<MenuResponse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    return this.http.delete<MenuResponse>(baseURL + 'api/menu/?_id=' + data._id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  /*** Category Manager ***/


  getCategories(): Observable<MenuCategoryResponse[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.get<MenuCategoryResponse[]>(baseURL + 'api/category', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  addCategory(data): Observable<MenuCategoryResponse> {

    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.post<MenuCategoryResponse>(baseURL + 'api/category', data , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  updateCategory(data): Observable<MenuCategoryResponse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };
    return this.http.put<MenuCategoryResponse>(baseURL + 'api/category', data , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  deleteCategory(data): Observable<MenuCategoryResponse> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    return this.http.delete<MenuCategoryResponse>(baseURL + 'api/category/?_id=' + data._id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
