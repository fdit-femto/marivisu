import {Message} from './message';
import {LatLng} from 'leaflet';

export class Vessel {
  messages: Array<Message>;
  trace: Array<LatLng> = new Array<LatLng>();
  firstAppearance: number;

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

  public getColor(): string {
    return '#' + (+this.getMMSI()).toString(16).substr(0, 6);
  }

  determineFirstAppearance(message: Message): void {
    const timeInS = Date.parse(message.time) / 1000;
    if (this.firstAppearance === undefined || this.firstAppearance > timeInS) {
      this.firstAppearance = timeInS;
    }
  }

}
