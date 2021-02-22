export class CsvStructure {
  get mmsiIndex(): number {
    return this._mmsiIndex;
  }

  get timeIndex(): number {
    return this._timeIndex;
  }

  get latitudeIndex(): number {
    return this._latitudeIndex;
  }

  get longitudeIndex(): number {
    return this._longitudeIndex;
  }

  get speedOverGroundIndex(): number {
    return this._speedOverGroundIndex;
  }

  get courseOverGroundIndex(): number {
    return this._courseOverGroundIndex;
  }

  get headingIndex(): number {
    return this._headingIndex;
  }

  get vesselNameIndex(): number {
    return this._vesselNameIndex;
  }

  get imoIndex(): number {
    return this._imoIndex;
  }

  get callSignIndex(): number {
    return this._callSignIndex;
  }

  get vesselTypeIndex(): number {
    return this._vesselTypeIndex;
  }

  get statusIndex(): number {
    return this._statusIndex;
  }

  get lengthIndex(): number {
    return this._lengthIndex;
  }

  get widthIndex(): number {
    return this._widthIndex;
  }

  get draftIndex(): number {
    return this._draftIndex;
  }

  get cargoIndex(): number {
    return this._cargoIndex;
  }
  // tslint:disable-next-line:variable-name
  private _mmsiIndex: number;
  // tslint:disable-next-line:variable-name
  private _timeIndex: number;
  // tslint:disable-next-line:variable-name
  private _latitudeIndex: number;
  // tslint:disable-next-line:variable-name
  private _longitudeIndex: number;
  // tslint:disable-next-line:variable-name
  private _speedOverGroundIndex: number;
  // tslint:disable-next-line:variable-name
  private _courseOverGroundIndex: number;
  // tslint:disable-next-line:variable-name
  private _headingIndex: number;
  // tslint:disable-next-line:variable-name
  private _vesselNameIndex: number;
  // tslint:disable-next-line:variable-name
  private _imoIndex: number;
  // tslint:disable-next-line:variable-name
  private _callSignIndex: number;
  // tslint:disable-next-line:variable-name
  private _vesselTypeIndex: number;
  // tslint:disable-next-line:variable-name
  private _statusIndex: number;
  // tslint:disable-next-line:variable-name
  private _lengthIndex: number;
  // tslint:disable-next-line:variable-name
  private _widthIndex: number;
  // tslint:disable-next-line:variable-name
  private _draftIndex: number;
  // tslint:disable-next-line:variable-name
  private _cargoIndex: number;

  constructor(private splitLine: string[]) {
    for (let i = 0; i < splitLine.length - 1; i++) {
      this.affectElement(splitLine[i], i);
    }
  }


  affectElement(element: string, index: number): void {
    switch (element) {
      case 'MMSI':
        this._mmsiIndex = index;
        break;
      case  'BaseDateTime':
        this._timeIndex = index;
        break;
      case 'LAT':
        this._latitudeIndex = index;
        break;
      case 'LON':
        this._longitudeIndex = index;
        break;
      case 'SOG':
        this._speedOverGroundIndex = index;
        break;
      case 'COG':
        this._courseOverGroundIndex = index;
        break;
      case 'Heading':
        this._headingIndex = index;
        break;
      case 'VesselName':
        this._vesselNameIndex = index;
        break;
      case  'IMO':
        this._imoIndex = index;
        break;
      case  'CallSign':
        this._callSignIndex = index;
        break;
      case  'VesselType':
        this._vesselTypeIndex = index;
        break;
      case  'Status':
        this._statusIndex = index;
        break;
      case  'Length':
        this._lengthIndex = index;
        break;
      case  'Width':
        this._widthIndex = index;
        break;
      case  'Draft':
        this._draftIndex = index;
        break;
      case  'Cargo':
        this._cargoIndex = index;
        break;
    }
  }
}
