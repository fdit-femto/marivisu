import {Vessel} from './vessel';
import {Message} from './message';

export class Vessels {
  vessels: Map<number, Vessel>;
  firstAppearance: number;

  constructor() {
    this.vessels = new Map<number, Vessel>();
  }

  addMessage(message: Message): void {
    if (!this.vessels.get(Number(message.mmsi))) {
      this.vessels.set(Number(message.mmsi), new Vessel(new Array<Message>()));
    }
    this.determineFirstAppearance(message);
    this.vessels.get(Number(message.mmsi)).addMessage(message);
  }

  determineFirstAppearance(message: Message): void {
    const timeInS = Date.parse(message.time) / 1000;
    if (this.firstAppearance > timeInS) {
      this.firstAppearance = timeInS;
    }
  }
}
