import {Vessel} from './vessel';
import {Message} from './message';

export class Vessels {
  allVessels: Map<number, Vessel>;
  vessels: Map<number, Vessel>;
  newVessels: Map<number, Vessel>;
  vesselsLabeled: string[];
  firstAppearance: number;
  lastAppearance: number;
  // tslint:disable-next-line:variable-name
  private numberOfMessages: number;

  constructor() {
    this.vessels = new Map<number, Vessel>();
    this.newVessels = new Map<number, Vessel>();
    this.numberOfMessages = 0;
    this.vesselsLabeled = [];
  }

  get size(): number {
    return this.numberOfMessages;
  }

  addMessage(message: Message): void {
    this.determineFirstAppearance(message);
    this.determineLastAppearance(message);
    if (!this.vessels.get(Number(message.mmsi))) {
      this.vessels.set(Number(message.mmsi), new Vessel(new Array<Message>()));
      this.determineFirstAppearance(message);
    }
    this.vessels.get(Number(message.mmsi)).addMessage(message);
    this.numberOfMessages++;
  }

  addLabel(mmsi: string): void {
    this.vesselsLabeled.push(mmsi);
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
    const realTime = time + this.firstAppearance;
    this.vessels.forEach(value => {
      const newVessel = value.getVesselSetRegardingTime(realTime);
      if (newVessel !== undefined) {
        vesselsSet.addVessel(newVessel);
      }
    });

    return vesselsSet;
  }

  getVessel(mmsi: number): Vessel {
    let vessel: Vessel = this.vessels.get(Number(mmsi));

    if (vessel === undefined) {
      vessel = new Vessel(new Array<Message>());
    }

    return vessel;
  }

}
