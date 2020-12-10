import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  net = require('net');
  client = new this.net.Socket();

  constructor() {
    this.client.connect(1337, '127.0.0.1', () => {
      console.log('Connected');
      this.client.write('Hello, server! Love, Client.');
    });

    this.client.on('data', (data) => {
      console.log('Received: ' + data);
      this.client.destroy(); // kill client after server's response
    });

    this.client.on('close', () => {
      console.log('Connection closed');
    });
  }
}
