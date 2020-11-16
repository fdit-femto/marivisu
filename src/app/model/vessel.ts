import {Message} from './message';

export class Vessel {
  messages: Array<Message>;

  constructor(messages: Array<Message>) {
    this.messages = messages;
  }

  addMessage(message: Message): void {
  this.messages.push(message);
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

}
