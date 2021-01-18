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


  constructor(splitLine: string[]) {
    this.mmsi = splitLine[0];
    this.time = splitLine[1];
    this.latitude = splitLine[2];
    this.longitude = splitLine[3];
    this.speedOverGround = splitLine[4];
    this.courseOverGround = splitLine[5];
    this.heading = splitLine[6];
    this.vesselName = splitLine[7];
    this.imo = splitLine[8];
    this.callSign = splitLine[9];
    this.vesselType = splitLine[10];
    this.status = splitLine[11];
    this.length = splitLine[12];
    this.width = splitLine[13];
    this.draft = splitLine[14];
    this.cargo = splitLine[15];
  }

  getTimeInS(): number {
    return Date.parse(this.time) / 1000;
  }

}
