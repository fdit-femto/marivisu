import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessels} from '../model/vessels';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  private allVessels: Vessels;
  private vessels = new BehaviorSubject(new Vessels());
  currentVessels = this.vessels.asObservable();

  constructor() {
  }

  changeAllVesselsSet(newVessels: Vessels): void {
    this.allVessels = newVessels;
    this.vessels.next(newVessels);
  }

  displayAllVessels(): void {
    this.vessels.next(this.allVessels);
  }

  changeTimeSelectedVessel(newVessels: Vessels): void {
    this.vessels.next(newVessels);
  }
}
