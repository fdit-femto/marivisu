import {Vessel} from './vessel';
import {Message} from './message';
import {CsvStructure} from './csv-structure';

export class Vessels {
  allVessels: Map<number, Vessel>;
  vessels: Map<number, Vessel>;
  newVessels: Map<number, Vessel>;


  messages: Message;

  vesselsLabeled: string[];
  firstAppearance: number;
  lastAppearance: number;
  private numberOfMessages: number;

  constructor() {
    this.vessels = new Map<number, Vessel>();
    this.newVessels = new Map<number, Vessel>();
    this.messages = new Message(undefined, undefined);
    this.numberOfMessages = 0;
    this.vesselsLabeled = [];
  }

  get size(): number {
    return this.numberOfMessages;
  }

  clear(): void {
    this.vessels = new Map<number, Vessel>();
    this.newVessels = new Map<number, Vessel>();
    this.numberOfMessages = 0;
    this.vesselsLabeled = [];
  }

  addMessage(splitLine, csvStructure: CsvStructure): void {
    if (!this.vessels.get(Number(splitLine[csvStructure.mmsiIndex]))) {
      this.vessels.set(Number(splitLine[csvStructure.mmsiIndex]), new Vessel(new Message(splitLine, csvStructure)));
      this.determineFirstAppearance(splitLine[csvStructure.mmsiIndex]);
    } else {
      this.vessels.get(Number(splitLine[csvStructure.mmsiIndex])).addMessageRaw(splitLine, csvStructure);
    }
    this.messages.addMessageRawRealTime(splitLine, csvStructure);
    this.determineFirstAppearance(splitLine[csvStructure.timeIndex]);
    this.determineLastAppearance(splitLine[csvStructure.timeIndex]);
    this.numberOfMessages++;
  }

  addLabel(mmsi: string): void {
    this.vesselsLabeled.push(mmsi);
  }

  addVessel(vessel: Vessel): void {
    this.vessels.set(Number(vessel.getMMSI()), vessel);
  }

  // sortAllTraceInVesselByDate(): void {
  //   this.vessels.forEach(value => value.populateTrace());
  // }

  determineFirstAppearance(time: string): void {
    const timeInS = Date.parse(time) / 1000;
    if (this.firstAppearance === undefined || this.firstAppearance > timeInS) {
      this.firstAppearance = timeInS;
    }
  }

  determineLastAppearance(time: string): void {
    const timeInS = Date.parse(time) / 1000;
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
    const vessel: Vessel = this.vessels.get(Number(mmsi));

    if (vessel === undefined) {
      return undefined;
    }

    return vessel;
  }

}
