import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VesselSelected {

  private selectedVessel = new BehaviorSubject(Number());
  currentVessels = this.selectedVessel.asObservable();

  constructor() {
  }

  changeSelectedVessel(selectedTime: number): void {
    this.selectedVessel.next(selectedTime);
  }
}
