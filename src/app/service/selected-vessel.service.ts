import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessel} from '../model/vessel';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class SelectedVesselService {
  private selectedVessel = new BehaviorSubject(new Vessel(new Array<Message>()));
  currentVessel = this.selectedVessel.asObservable();

  constructor() {
  }

  changeVesselSet(newVessels: Vessel): void {
    this.selectedVessel.next(newVessels);
  }
}
