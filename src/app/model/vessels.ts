import {Vessel} from './vessel';
import {Message} from './message';

export class Vessels {
  vessels: Map<number, Vessel>;
  firstAppearance: number;
  lastAppearance: number;

  constructor() {
    this.vessels = new Map<number, Vessel>();
  }

  addMessage(message: Message): void {
    this.determineFirstAppearance(message);
    this.determineLastAppearance(message);
    if (!this.vessels.get(Number(message.mmsi))) {
      this.vessels.set(Number(message.mmsi), new Vessel(new Array<Message>()));
      this.determineFirstAppearance(message);
    }
    this.vessels.get(Number(message.mmsi)).addMessage(message);
  }

  addVessel(vessel: Vessel): void {
    this.vessels.set(Number(vessel.getMMSI()), vessel);
  }

  sortAllMessageInVesselByDate(): void {
    this.vessels.forEach(value => value.sortMessageByDate());
  }

  sortAllTraceInVesselByDate(): void {
    this.vessels.forEach(value => value.populateTrace());
  }
}
