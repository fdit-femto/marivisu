import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessels} from '../model/vessels';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  private vessels = new BehaviorSubject(new Vessels());
  currentVessels = this.vessels.asObservable();

  constructor() {
  }

  changeVesselsSet(newVessels: Vessels): void {
    this.vessels.next(newVessels);
  }
}
