import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MessageSharingService {
  private consumazioni = new Subject<any>()
  private tavoloAttivo = new Subject<boolean>()
  private loading = new Subject<boolean>()
  private _id = new Subject<any>()

  getConsumazioni(): Observable<any> {
    return this.consumazioni.asObservable()
  }

  updateConsumazioni(message: any) {
    this.consumazioni.next(message)
  }

  getLoading(): Observable<any> {
    return this.loading.asObservable()
  }

  updateLoading(message: any) {
    this.loading.next(message)
  }

  getTavoloAttivo(): Observable<any> {
    return this.tavoloAttivo.asObservable()
  }

  updateTavoloAttivo(isActive: boolean) {
    this.tavoloAttivo.next(isActive)
  }

  getId(): Observable<any> {
    return this._id.asObservable()
  }

  updateId(id: string) {
    this._id.next(id)
  }
}
