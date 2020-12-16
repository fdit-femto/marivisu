import {Injectable} from '@angular/core';
import {Client} from '../model/client';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  net = require('net');
  client: Client;
  private baseUrl = 'http://127.0.0.1:3800';

  constructor(private http: HttpClient) {
  }

  // getUsers(): Observable<any> {
  //   return this.http.get(this.rootURL + '/users');
  // }
  //
  // addUser(user: any): Observable<any> {
  //   return this.http.post(this.rootURL + '/user', {user});
  // }

  setClient(client: Client): void {
    this.client = client;
    this.connectToServer();
  }

  private connectToServer(): void {
    this.http.post(this.baseUrl + '/client/startClient', this.client);
  }

  getVessels(): Observable<any> {
    return this.http.get(this.baseUrl + '/client/getmessages');
  }


  // private socketOnData(): void {
  //   this.socket.on('data', (data) => {
  //     console.log('Received: ' + data);
  //   });
  // }

}
