import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vessels} from '../model/vessels';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  private firstAppearance: number;
  private lastAppearance: number;
  // tslint:disable-next-line:variable-name
  private _allVessels: Vessels;
  get allVessels(): Vessels {
    return this._allVessels;
  }

  private vessels = new BehaviorSubject(new Vessels());
  currentVessels = this.vessels.asObservable();

  constructor() {
  }

  changeAllVesselsSet(newVessels: Vessels): void {
    this.firstAppearance = newVessels.firstAppearance;
    this.lastAppearance = newVessels.lastAppearance;
    this._allVessels = newVessels;
    this.vessels.next(newVessels);
  }

  displayAllVessels(): void {
    this.vessels.next(this._allVessels);
  }

  changeTimeSelectedVessel(newVessels: Vessels): void {
    newVessels.firstAppearance = this.firstAppearance;
    newVessels.lastAppearance = this.lastAppearance;
    this.vessels.next(newVessels);
  }
}
