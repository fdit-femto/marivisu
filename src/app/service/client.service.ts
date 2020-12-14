import {Injectable} from '@angular/core';
import {Client} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  net = require('net');
  socket = new this.net.Socket();
  client: Client;

  constructor() {
  }

  setClient(client: Client): void {
    this.client = client;
    this.connectToServer();
    this.socketOnData();
  }

  private connectToServer(): void {
    this.socket.connect(Number(this.client.port), this.client.ip, () => {
      console.log('Connected');
    });
  }

  private socketOnData(): void{
    this.socket.on('data', (data) => {
      console.log('Received: ' + data);
    });
  }

}
