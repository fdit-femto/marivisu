import {Vessel} from './vessel';
import {Message} from './message';

export class Vessels {
  vessels: Map<number, Vessel>;

  constructor() {
    this.vessels = new Map<number, Vessel>();
  }

  addMessage(message: Message): void {
    if (!this.vessels.get(Number(message.mmsi))) {
      this.vessels.set(Number(message.mmsi), new Vessel(new Array<Message>()));
    }
    this.vessels.get(Number(message.mmsi)).addMessage(message);
  }

  sortAllMessageInVesselByDate(): void {
    this.vessels.forEach(value => value.sortMessageByDate());
  }

  sortAllTraceInVesselByDate(): void {
    this.vessels.forEach(value => value.populateTrace());
  }
}
