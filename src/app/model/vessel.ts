import {Message} from './message';

export class Vessel {
  messages: Array<Message>;
  firstAppearance: number;

  constructor(messages: Array<Message>) {
    this.messages = messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.determineFirstAppearance(message);
  }

  getMMSI(): string {
    if (this.messages.length === 0) {
      return '';
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
