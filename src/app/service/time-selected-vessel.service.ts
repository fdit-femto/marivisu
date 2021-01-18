import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessels} from '../model/vessels';

@Injectable({
  providedIn: 'root'
})
export class TimeSelectedVessel {

  private selectedVessels = new BehaviorSubject(new Vessels());
  currentVessels = this.selectedVessels.asObservable();

  constructor() {
  }

  changeSelectedVessel(selectedVessels: Vessels): void {
    this.selectedVessels.next(selectedVessels);
  }
}
