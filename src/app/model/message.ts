import {CsvStructure} from './csv-structure';

export class Message {

  constructor(splitLine: string[], csvStructure: CsvStructure) {
    if (csvStructure === undefined) {
      return;
    }
    this.setMmsi(csvStructure.mmsiIndex, splitLine);
    this.addMessageRaw(splitLine, csvStructure);
  }

  mmsi = '';
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

  private static secondsToReadableString(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.getUTCDay() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours() + ':' +
      date.getUTCMinutes() + ':' + date.getUTCSeconds();
  }

  static messageEmpty(): Message {
    return new Message(new Array<string>(), undefined);
  }

  addMessageRaw(splitLine: string[], csvStructure): void {
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
    this.setTooltip(csvStructure, splitLine);
  }

  size(): number {
    return this.latitude.length;
  }

  private setMmsi(index, splitLine: string[]): void {
    if (index !== undefined) {
      this.mmsi = splitLine[index];
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

  private setTooltip(csvStructure: CsvStructure, splitLine: string[]): void {
    const tooltipText = splitLine[csvStructure.mmsiIndex] + '<br>time: ' +
      Message.secondsToReadableString(Number(splitLine[csvStructure.timeIndex]));
    this.tooltip.push(tooltipText);
  }
}
