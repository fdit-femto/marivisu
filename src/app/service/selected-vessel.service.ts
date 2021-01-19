import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessel} from '../model/vessel';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class SelectedVesselService {
  // tslint:disable-next-line:variable-name
  private _mmsi;
  get mmsi(): number {
    return this._mmsi;
  }

  private selectedVessel = new BehaviorSubject(new Vessel(new Array<Message>()));
  currentVessel = this.selectedVessel.asObservable();

  constructor() {
  }

  changeVesselSet(newVessel: Vessel): void {
    this._mmsi = newVessel.getMMSI();
    this.selectedVessel.next(newVessel);
  }

  changeVesselSetSlider(newVessels: Vessel): void {
    this.selectedVessel.next(newVessels);
  }
}
