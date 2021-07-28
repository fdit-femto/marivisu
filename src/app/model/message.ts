import {CsvStructure} from './csv-structure';
import {LabelType} from './label-type.enum';

export class Message {

  constructor(splitLine: string[], csvStructure: CsvStructure, vesselsLabeled: string[]) {
    if (csvStructure === undefined) {
      return;
    }
    this.setMmsi(csvStructure.mmsiIndex, splitLine);
    this.addMessageRaw(splitLine, csvStructure, vesselsLabeled);
  }

  index: Map<string, number> = new Map<string, number>();
  mmsi: Array<string> = new Array<string>();
  time: Array<string> = new Array<string>();
  relativeTimeInS: Array<number> = new Array<number>();
  latitude: Array<string> = new Array<string>();
  longitude: Array<string> = new Array<string>();
  speedOverGround: Array<string> = new Array<string>();
  courseOverGround: Array<string> = new Array<string>();
  heading: Array<string> = new Array<string>();
  vesselName: Array<string> = new Array<string>();
  imo: Array<string> = new Array<string>();
  callSign: Array<string> = new Array<string>();
  vesselType: Array<string> = new Array<string>();
  status: Array<string> = new Array<string>();
  length: Array<string> = new Array<string>();
  width: Array<string> = new Array<string>();
  draft: Array<string> = new Array<string>();
  cargo: Array<string> = new Array<string>();
  tooltip: Array<string> = new Array<string>();
  label: Array<LabelType> = new Array<LabelType>();

  private static secondsToReadableString(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.getUTCDay() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours() + ':' +
      date.getUTCMinutes() + ':' + date.getUTCSeconds();
  }

  static messageEmpty(): Message {
    return new Message(new Array<string>(), undefined, undefined);
  }

  addMessageRaw(splitLine: string[], csvStructure, vesselsLabeled: string[]): void {
    this.setMmsi(csvStructure.mmsiIndex, splitLine);
    this.setTime(csvStructure.timeIndex, splitLine);
    this.setLatitude(csvStructure.latitudeIndex, splitLine);
    this.setLongitude(csvStructure.longitudeIndex, splitLine);
    this.setSpeedOverGround(csvStructure.speedOverGroundIndex, splitLine);
    this.setCourseOverGround(csvStructure.courseOverGroundIndex, splitLine);
    this.setHeading(csvStructure.headingIndex, splitLine);
    this.setVesselName(csvStructure.vesselNameIndex, splitLine);
    this.setImo(csvStructure.imoIndex, splitLine);
    this.setCallSign(csvStructure.callSignIndex, splitLine);
    this.setVesselType(csvStructure.vesselTypeIndex, splitLine);
    this.setStatus(csvStructure.statusIndex, splitLine);
    this.setLength(csvStructure.lengthIndex, splitLine);
    this.setWidth(csvStructure.widthIndex, splitLine);
    this.setDraft(csvStructure.draftIndex, splitLine);
    this.setCargo(csvStructure.cargoIndex, splitLine);
    this.setLabel(splitLine, vesselsLabeled, csvStructure);
    this.setTooltip(csvStructure, splitLine, vesselsLabeled);
  }

  addMessageRawRealTime(splitLine: string[], csvStructure, vesselsLabeled: string[]): void {
    const index = this.index.get(splitLine[csvStructure.mmsiIndex]);
    if (index === undefined) {
      this.addMessageRaw(splitLine, csvStructure, vesselsLabeled);
    } else {
      this.replace(splitLine, csvStructure, index);
    }
  }

  replace(splitLine: string[], csvStructure, index): void {
    this.mmsi[index] = splitLine[csvStructure.mmsiIndex];
    this.time[index] = splitLine[csvStructure.timeIndex];
    this.latitude[index] = splitLine[csvStructure.latitudeIndex];
    this.longitude[index] = splitLine[csvStructure.longitudeIndex];
    this.speedOverGround[index] = splitLine[csvStructure.speedOverGroundIndex];
    this.courseOverGround[index] = splitLine[csvStructure.courseOverGroundIndex];
    this.heading[index] = splitLine[csvStructure.headingIndex];
    this.vesselName[index] = splitLine[csvStructure.vesselNameIndex];
    this.imo[index] = splitLine[csvStructure.imoIndex];
    this.callSign[index] = splitLine[csvStructure.callSignIndex];
    this.vesselType[index] = splitLine[csvStructure.vesselTypeIndex];
    this.status[index] = splitLine[csvStructure.statusIndex];
    this.length[index] = splitLine[csvStructure.lengthIndex];
    this.width[index] = splitLine[csvStructure.widthIndex];
    this.draft[index] = splitLine[csvStructure.draftIndex];
    this.cargo[index] = splitLine[csvStructure.cargoIndex];
    this.updateTooltip(csvStructure, splitLine, index);
  }

  size(): number {
    return this.latitude.length;
  }

  private setMmsi(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.mmsi.push(splitLine[index]);
    }
  }

  private setTime(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.time.push(splitLine[index]);
    }
  }

  private setLatitude(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.latitude.push(splitLine[index]);
    }
  }

  private setLongitude(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.longitude.push(splitLine[index]);
    }
  }

  private setSpeedOverGround(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.speedOverGround.push(splitLine[index]);
    }
  }

  private setCourseOverGround(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.courseOverGround.push(splitLine[index]);
    }
  }

  private setHeading(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.heading.push(splitLine[index]);
    }
  }

  private setVesselName(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.vesselName.push(splitLine[index]);
    }
  }

  private setImo(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.imo.push(splitLine[index]);
    }
  }

  private setCallSign(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.callSign.push(splitLine[index]);
    }
  }

  private setVesselType(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.vesselType.push(splitLine[index]);
    }
  }

  private setStatus(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.status.push(splitLine[index]);
    }
  }

  private setLength(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.length.push(splitLine[index]);
    }
  }

  private setWidth(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.width.push(splitLine[index]);
    }
  }

  private setDraft(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.draft.push(splitLine[index]);
    }
  }

  private setCargo(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.cargo.push(splitLine[index]);
    }
  }

  private setLabel(splitLine: string[], vesselsLabeled: string[], csvStructure: CsvStructure): void {
    if (vesselsLabeled === undefined) {
      return;
    }
    if (vesselsLabeled.includes(splitLine[csvStructure.mmsiIndex])) {
      this.label.push(LabelType.DEC);
    } else {
      this.label.push(LabelType.NONE);
    }
  }

  private setTooltip(csvStructure: CsvStructure, splitLine: string[], vesselsLabeled: string[]): void {
    if (vesselsLabeled === undefined) {
      return;
    }
    let tooltipText = splitLine[csvStructure.mmsiIndex] + '<br>time: ' +
      Message.secondsToReadableString(Number(splitLine[csvStructure.timeIndex]));
    if (vesselsLabeled.includes(splitLine[csvStructure.mmsiIndex])) {
      tooltipText += '<br>Label : ASD';
    }
    this.tooltip.push(tooltipText);
  }

  private updateTooltip(csvStructure: CsvStructure, splitLine: string[], index): void {
    this.tooltip[index] = splitLine[csvStructure.mmsiIndex] + '<br>time: ' +
      Message.secondsToReadableString(Number(splitLine[csvStructure.timeIndex]));
  }

  addMessageJson(data: any[]): void {
    data.forEach(message => {
      this.mmsi.push(message.mmsi);
      this.time.push(message.time);
      this.relativeTimeInS.push(message.relativeTimeInS);
      this.latitude.push(message.latitude);
      this.longitude.push(message.longitude);
      this.speedOverGround.push(message.speedOverGround);
    });

  }
}
