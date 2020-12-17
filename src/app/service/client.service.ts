import {Injectable} from '@angular/core';
import {Client} from '../model/client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  private str: string;

  setClient(client: Client): void {
    this.client = client;
    this.connectToServer();
  }

  checkStatus(): string {
    this.http.get(this.baseUrl + '/').subscribe((data: string) => this.str = data);
    return this.str;
  }


  private connectToServer(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.baseUrl + '/client/startClient',
      this.client
      , {headers}).subscribe(
      val => {
        console.log('POST call successful value returned in body', val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }

  getVessels(): Observable<any> {
    return this.http.get(this.baseUrl + '/client/getMessages');
  }


  // private socketOnData(): void {
  //   this.socket.on('data', (data) => {
  //     console.log('Received: ' + data);
  //   });
  // }

}
