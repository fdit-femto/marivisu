export class CsvStructure {
  constructor(private splitLine: string[],
              private mmsiIndex: number, private timeIndex: number, private relaiveTimeInSIndex: number, private latitudeIndex: number,
              private longitudeIndex: number, private speedOverGroundIndex: number, private courseOverGroundIndex: number,
              private headingIndex: number, private vesselNameIndex: number, private imoIndex: number, private callSignIndex: number,
              private vesselTypeIndex: number, private statusIndex: number, private lengthIndex: number, private widthIndex: number,
              private draftIndex: number, private cargoIndex: number) {
    for (let i = 0; i < splitLine.length - 1; i++) {
      this.affectElement(splitLine[i], i);
    }
  }

  affectElement(element: string, index: number): void {
    switch (element) {
      case 'MMSI':
        this.mmsiIndex = index;
        break;
      case  'BaseDateTime':
        this.timeIndex = index;
        break;
      case 'LAT':
        this.relaiveTimeInSIndex = index;
        break;
      case 'LON':
        this.latitudeIndex = index;
        break;
      case 'SOG':
        this.longitudeIndex = index;
        break;
      case 'COG':
        this.speedOverGroundIndex = index;
        break;
      case 'Heading':
        this.courseOverGroundIndex = index;
        break;
      case 'VesselName':
        this.headingIndex = index;
        break;
      case  'IMO':
        this.vesselNameIndex = index;
        break;
      case  'CallSign':
        this.imoIndex = index;
        break;
      case  'VesselType':
        this.callSignIndex = index;
        break;
      case  'Status':
        this.vesselTypeIndex = index;
        break;
      case  'Length':
        this.statusIndex = index;
        break;
      case  'Width':
        this.lengthIndex = index;
        break;
      case  'Draft':
        this.draftIndex = index;
        break;
      case  'Cargo':
        this.cargoIndex = index;
        break;

    }
  }
}
