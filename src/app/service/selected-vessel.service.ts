import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessel} from '../model/vessel';
import {Message} from '../model/message';
import {ClientService} from './client-service.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedVesselService {
  // tslint:disable-next-line:variable-name
  private _mmsi;
  get mmsi(): number {
    return this._mmsi;
  }

  private selectedVesselAllMessages = new BehaviorSubject(new Vessel(Message.messageEmpty()));
  currentVesselAllMessages = this.selectedVesselAllMessages.asObservable();
  private selectedVessel = new BehaviorSubject(new Vessel(Message.messageEmpty()));
  currentVessel = this.selectedVessel.asObservable();

  constructor(private clientService: ClientService) {
  }

  changeVesselSet(newVessel: Vessel): void {
    this._mmsi = newVessel.getMMSI();
    const newSelectedVessel = new Vessel(Message.messageEmpty());
    this.clientService.getVessel(newVessel.getMMSI()).subscribe((data: string) => {
      newSelectedVessel.addMessageJson(data);
      this.selectedVessel.next(newSelectedVessel);
      this.selectedVesselAllMessages.next(newSelectedVessel);
    });
  }


  changeVesselSetSlider(newVessels: Vessel): void {
    this.selectedVessel.next(newVessels);
  }
}
