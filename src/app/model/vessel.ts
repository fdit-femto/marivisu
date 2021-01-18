import {Message} from './message';
import {LatLng} from 'leaflet';

export class Vessel {
  messages: Array<Message>;
  trace: Array<LatLng> = new Array<LatLng>();
  firstAppearance: number;
  currentSelectedMessageIndex = 0;
  private indexIncrease = true;
  private previousIndexIncreaseValue = true;

  constructor(messages: Array<Message>) {
    this.messages = messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.determineFirstAppearance(message);
  }

  sortMessageByDate(): void {
    this.messages.sort((a, b) => {
      return Date.parse(a.time) - Date.parse(b.time);
    });
  }

  populateTrace(): void {
    this.messages.forEach(value => this.addPointToTrace(new LatLng(Number(value.latitude), Number(value.longitude))));
  }

  addPointToTrace(latLng: LatLng): void {
    this.trace.push(latLng);
  }

  getMMSI(): string {
    if (this.messages.length === 0) {
      return undefined;
    }
    return this.messages[0].mmsi;
  }

  getName(): string {
    return this.messages[0].vesselName;
  }

  getColor(): string {
    return '#' + (+this.getMMSI()).toString(16).substr(0, 6);
  }

  private determineFirstAppearance(message: Message): void {
    const timeInS = message.getTimeInS();
    if (this.firstAppearance === undefined || this.firstAppearance > timeInS) {
      this.firstAppearance = timeInS;
    }
  }

  getVesselSetRegardingTime(time: number): Vessel {
    let resultVessel: Vessel = null;
    while (resultVessel == null) {
      resultVessel = this.getMessageInRange(time);
      this.nextIndex(time);
      if (this.previousIndexIncreaseValue !== this.indexIncrease ||
        this.currentSelectedMessageIndex === 0 || this.currentSelectedMessageIndex >= this.messages.length - 1) {
        break;
      }
    }
    this.previousIndexIncreaseValue = this.indexIncrease;
    return resultVessel;
  }


  private nextIndex(time: number): void {
    if (this.isMessageBefore(time)) {
      this.indexIncrease = false;
      this.currentSelectedMessageIndex--;
      if (this.currentSelectedMessageIndex < 0) {
        this.currentSelectedMessageIndex = 0;
      }
    } else {
      this.indexIncrease = true;
      this.currentSelectedMessageIndex++;
      if (this.currentSelectedMessageIndex >= this.messages.length) {
        this.currentSelectedMessageIndex = this.messages.length - 1;
      }
    }
  }

  private getMessageInRange(time: number): Vessel {
    if (this.isMessageInRange(time)) {
      return new Vessel(new Array<Message>(this.messages[this.currentSelectedMessageIndex]));
    }
  }

  private isMessageInRange(time: number): boolean {
    return this.messages[this.currentSelectedMessageIndex].getTimeInS() < time + 100 &&
      this.messages[this.currentSelectedMessageIndex].getTimeInS() > time - 100;
  }

  private isMessageBefore(time: number): boolean {
    return this.messages[this.currentSelectedMessageIndex].getTimeInS() > time;
  }

}
