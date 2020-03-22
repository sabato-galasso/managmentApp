import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:1234');
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('sendMessage', { message: msg });
  }

  // HANDLER
  onNewMessage(id: string) {
    this.socket.emit('counter'+id)

    return Observable.create(observer => {
      this.socket.on('result'+id, msg => {
     //   console.log('result',msg)
        observer.next(msg);
      });
    });
  }

  getSocket(id: string){
   return Observable.create(observer => {
    this.socket.on('result'+id, msg => {
     // console.log('ge',msg)
      observer.next(msg);
    });
    });
  }

  emitCloseTable(id: string) {
    return Observable.create(observer => {
      this.socket.emit('else'+id, msg => {
        console.log(msg)
        observer.next(msg);
      });
    });
  }


}
