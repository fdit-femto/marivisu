import {Injectable} from '@angular/core';
import {Client} from '../model/client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  net = require('net');
  socket = new this.net.Socket();
  client: Client;
  private rootURL = '/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.rootURL + '/user', {user});
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
