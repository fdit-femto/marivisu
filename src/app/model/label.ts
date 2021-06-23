import {LabelType} from './label-type.enum';

export class Label {
  mmsi: string;
  timestamp: Array<string>;
  latitude: Array<string>;
  longitude: Array<string>;
  type: LabelType;


  constructor() {
    this.mmsi = null;
    this.timestamp = null;
    this.latitude = null;
    this.longitude = null;
    this.type = LabelType.NONE;
  }
}
