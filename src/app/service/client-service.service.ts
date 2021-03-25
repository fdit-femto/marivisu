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
  private baseUrlFDIT = 'http://127.0.0.1:3800';
  private baseUrlJson = 'http://127.0.0.1:5000';
  private baseUrl;

  constructor(private http: HttpClient) {
  }


  private connectToFDITServer(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.baseUrlFDIT + '/client/startClient',
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


  setClient(client: Client, isFDITMode: string): void {
    if (isFDITMode === 'true') {
      this.baseUrl = this.baseUrlFDIT;
      this.client = client;
      this.connectToFDITServer();
    } else {
      this.baseUrl = this.baseUrlJson;
      this.client = client;
    }
  }

  getVessels(): Observable<any> {
    if (this.baseUrl === this.baseUrlFDIT) {
      return this.http.get(this.baseUrl + '/client/getMessages');
    } else {
      return this.http.get(this.baseUrl + '/data');
    }
  }

  getVesselsJson(): Observable<any> {
    return this.http.get(this.baseUrl + '/data');
  }


}
