import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  private vessels = new BehaviorSubject(new Map());
  currentVessels = this.vessels.asObservable();

  constructor() {
  }

  changeVesselsSet(newVessels: Map<number, Message>): void {
    this.vessels.next(newVessels);
  }
}
