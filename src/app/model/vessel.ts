import {Message} from './message';
import {Label} from './label';

export class Vessel {
  messages: Message;
  label: Label;
  currentSelectedMessageIndex = 0;
  private indexIncrease = true;
  private previousIndexIncreaseValue = true;

  constructor(messages: Message) {
    this.messages = messages;
    this.label = new Label();
  }

  addMessageRaw(splitLine: string[], csvStructure): void {
    this.messages.addMessageRaw(splitLine, csvStructure, undefined);
  }

  addMessageJson(data: object): void{
    this.messages.addMessageJson(data);
  }

  addLabel(label: Label): void {
    this.label = label;
  }

  getMMSI(): string {
    return this.messages.mmsi[0];
  }

  getName(): string {
    return this.messages.vesselName[0];
  }

  getLabel(): string {
    return this.label.type.toString();
  }

  getColor(): string {
    return '#' + (+this.getMMSI()).toString(16).substr(0, 6);
  }

  private getFirstAppearance(): string {
    return this.messages.time[0];
  }

  getVesselSetRegardingTime(time: number): Vessel {
    let resultVessel: Vessel = null;
    while (resultVessel == null) {
      resultVessel = this.getMessageInRange(time);
      this.nextIndex(time);
      if (this.previousIndexIncreaseValue !== this.indexIncrease ||
        this.currentSelectedMessageIndex === 0 || this.currentSelectedMessageIndex >= this.messages.latitude.length - 1) {
        this.indexIncrease = this.previousIndexIncreaseValue;
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
      if (this.currentSelectedMessageIndex >= this.messages.latitude.length) {
        this.currentSelectedMessageIndex = this.messages.latitude.length - 1;
      }
    }
  }

  private getMessageInRange(time: number): Vessel {
    if (this.isMessageInRange(time)) {
      // return new Vessel(new Array<Message>(this.messages[this.currentSelectedMessageIndex]));
    }
    return undefined;
  }

  private isMessageInRange(time: number): boolean {
    return this.messages[this.currentSelectedMessageIndex].getTimeInS() < time + 100 &&
      this.messages[this.currentSelectedMessageIndex].getTimeInS() > time - 100;
  }

  private isMessageBefore(time: number): boolean {
    return this.messages[this.currentSelectedMessageIndex].getTimeInS() > time;
  }

}
