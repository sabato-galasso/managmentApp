import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ProcessHttpmsgService } from './process-httpmsg.service'
import { Observable } from 'rxjs'
import { baseURL } from '../shared/baseUrl'
import { catchError, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  addNewCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .post<any>(baseURL + 'api/customer', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  serialize(obj) {
    let str =
      '?' +
      Object.keys(obj)
        .reduce(function (a, k) {
          a.push(k + '=' + encodeURIComponent(obj[k]))
          return a
        }, [])
        .join('&')
    return str
  }
  getCustomerItmeById(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }

    let s = this.serialize(data)
    debugger
    return this.http
      .get<any>(baseURL + 'api/get-customer/' + s, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  updateCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .put<any>(baseURL + 'api/customer', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  removeItemCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .put<any>(baseURL + 'api/customer-remove', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getIndexItemCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .put<any>(baseURL + 'api/customer-remove/index', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getCustomerDataByTable(nTable: string): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .get<any>(baseURL + 'api/customer?n=' + nTable, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  closeCustomerData(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .put<any>(baseURL + 'api/customer/close', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  openCustomerData(): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .get<any>(baseURL + 'api/customer-open', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  createCustomer(data: any): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .post<any>(baseURL + 'api/customer-list', data, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getCustomer(): Observable<any> {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    }
    return this.http
      .get<any>(baseURL + 'api/customer-list', httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
