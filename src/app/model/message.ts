import {CsvStructure} from './csv-structure';

export class Message {
  mmsi: string;
  time: string;
  relaiveTimeInS: number;
  latitude: string;
  longitude: string;
  speedOverGround: string;
  courseOverGround: string;
  heading: string;
  vesselName: string;
  imo: string;
  callSign: string;
  vesselType: string;
  status: string;
  length: string;
  width: string;
  draft: string;
  cargo: string;


  constructor(splitLine: string[], csvStructure: CsvStructure) {
    this.setMmsi(csvStructure.mmsiIndex , splitLine);
    this.setTime(csvStructure.timeIndex , splitLine);
    this.setLatitude(csvStructure.latitudeIndex , splitLine);
    this.setLongitude(csvStructure.longitudeIndex , splitLine);
    this.setSpeedOverGround(csvStructure.speedOverGroundIndex , splitLine);
    this.setCourseOverGround(csvStructure.courseOverGroundIndex , splitLine);
    this.setHeading(csvStructure.headingIndex , splitLine);
    this.setVesselName(csvStructure.vesselNameIndex , splitLine);
    this.setImo(csvStructure.imoIndex , splitLine);
    this.setCallSign(csvStructure.callSignIndex , splitLine);
    this.setVesselType(csvStructure.vesselTypeIndex , splitLine);
    this.setStatus(csvStructure.statusIndex , splitLine);
    this.setLength(csvStructure.lengthIndex , splitLine);
    this.setWidth(csvStructure.widthIndex , splitLine);
    this.setDraft(csvStructure.draftIndex , splitLine);
    this.setCargo(csvStructure.cargoIndex , splitLine);
  }

  private setMmsi(index, splitLine: string[]): void {
    if (index !== undefined){
      this.mmsi = splitLine[index];
    }
  }

  private setTime(index, splitLine: string[]): void {
    if (index !== undefined){
      this.time = splitLine[index];
    }
  }

  private setLatitude(index, splitLine: string[]): void {
    if (index !== undefined){
      this.latitude = splitLine[index];
    }
  }

  private setLongitude(index, splitLine: string[]): void {
    if (index !== undefined){
      this.longitude = splitLine[index];
    }
  }

  private setSpeedOverGround(index, splitLine: string[]): void {
    if (index !== undefined){
      this.speedOverGround = splitLine[index];
    }
  }

  private setCourseOverGround(index, splitLine: string[]): void {
    if (index !== undefined){
      this.courseOverGround = splitLine[index];
    }
  }

  private setHeading(index, splitLine: string[]): void {
    if (index !== undefined){
      this.heading = splitLine[index];
    }
  }

  private setVesselName(index, splitLine: string[]): void {
    if (index !== undefined){
      this.vesselName = splitLine[index];
    }
  }

  private setImo(index, splitLine: string[]): void {
    if (index !== undefined){
      this.imo = splitLine[index];
    }
  }

  private setCallSign(index, splitLine: string[]): void {
    if (index !== undefined){
      this.callSign = splitLine[index];
    }
  }

  private setVesselType(index, splitLine: string[]): void {
    if (index !== undefined){
      this.vesselType = splitLine[index];
    }
  }

  private setStatus(index, splitLine: string[]): void {
    if (index !== undefined){
      this.status = splitLine[index];
    }
  }

  private setLength(index, splitLine: string[]): void {
    if (index !== undefined){
      this.length = splitLine[index];
    }
  }

  private setWidth(index, splitLine: string[]): void {
    if (index !== undefined){
      this.width = splitLine[index];
    }
  }

  private setDraft(index, splitLine: string[]): void {
    if (index !== undefined){
      this.draft = splitLine[index];
    }
  }

  private setCargo(index, splitLine: string[]): void {
    if (index !== undefined){
      this.cargo = splitLine[index];
    }
  }


  getTimeInS(): number {
    return Date.parse(this.time) / 1000;
  }

}
