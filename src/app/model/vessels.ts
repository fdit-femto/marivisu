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

  determineFirstAppearance(message: Message): void {
    const timeInS = Date.parse(message.time) / 1000;
    if (this.firstAppearance === undefined || this.firstAppearance > timeInS) {
      this.firstAppearance = timeInS;
    }
  }

  determineLastAppearance(message: Message): void {
    const timeInS = Date.parse(message.time) / 1000;
    if (this.lastAppearance === undefined || this.lastAppearance < timeInS) {
      this.lastAppearance = timeInS;
    }
  }

  getVesselSetRegardingTime(time: number): Vessels {
    const vesselsSet: Vessels = new Vessels();
    this.vessels.forEach(value => {
      const newVessel = value.getVesselSetRegardingTime(time);
      vesselsSet.addVessel(newVessel);
    });

    return vesselsSet;
  }

}
