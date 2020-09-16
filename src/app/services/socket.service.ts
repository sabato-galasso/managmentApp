import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable()
export class WebsocketService {
  private socket: any

  constructor() {
    // this.socket = io('localhost:1234', { transports: ['websocket'] })
  }

  /*  sendMessage(msg: string) {
    this.socket.emit('sendMessage', { message: msg })
  }

  closeSocket(id: string) {
    this.socket.emit('end' + id)
  }

  joinSocket() {
    this.socket.emit('join', 'someId')
  }

  // HANDLER
  onNewMessage(id: string) {
    let tableStorage = localStorage.getItem('ws' + id)
      ? localStorage.getItem('ws' + id.toString())
      : null

    this.socket.emit('counter' + id, tableStorage)

    return Observable.create((observer) => {
      this.socket.on('result' + id, (msg) => {
        //   console.log('result',msg)
        observer.next(msg)
      })
    })
  }

  getSocket(id: string) {
    return Observable.create((observer) => {
      this.socket.on('result' + id, (msg) => {
        console.log('ws', msg)
        observer.next(msg)
      })
    })
  }

  emitPauseTable(id: string) {
    return Observable.create((observer) => {
      this.socket.emit('pause' + id, (msg) => {
        console.log(msg)
        observer.next(msg)
      })
    })
  }*/
}
