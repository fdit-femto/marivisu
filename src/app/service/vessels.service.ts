import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Vessel} from '../model/vessel';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  private vessels = new BehaviorSubject(new Map());
  currentVessels = this.vessels.asObservable();

  constructor() {
  }

  changeVesselsSet(newVessels: Map<number, Vessel>): void {
    this.vessels.next(newVessels);
  }
}
