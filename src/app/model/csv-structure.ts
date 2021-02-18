export class CsvStructure {
  private mmsiIndex: number;
  private timeIndex: number;
  private latitudeIndex: number;
  private longitudeIndex: number;
  private speedOverGroundIndex: number;
  private courseOverGroundIndex: number;
  private headingIndex: number;
  private vesselNameIndex: number;
  private imoIndex: number;
  private callSignIndex: number;
  private vesselTypeIndex: number;
  private statusIndex: number;
  private lengthIndex: number;
  private widthIndex: number;
  private draftIndex: number;
  private cargoIndex: number;

  constructor(private splitLine: string[],
  ) {
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
        this.latitudeIndex = index;
        break;
      case 'LON':
        this.longitudeIndex = index;
        break;
      case 'SOG':
        this.speedOverGroundIndex = index;
        break;
      case 'COG':
        this.courseOverGroundIndex = index;
        break;
      case 'Heading':
        this.headingIndex = index;
        break;
      case 'VesselName':
        this.vesselNameIndex = index;
        break;
      case  'IMO':
        this.imoIndex = index;
        break;
      case  'CallSign':
        this.callSignIndex = index;
        break;
      case  'VesselType':
        this.vesselTypeIndex = index;
        break;
      case  'Status':
        this.statusIndex = index;
        break;
      case  'Length':
        this.lengthIndex = index;
        break;
      case  'Width':
        this.widthIndex = index;
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
