import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client-service.service';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {interval, Observable} from 'rxjs';
import {CsvStructure} from '../../model/csv-structure';

@Component({
  selector: 'app-import-vessel-form',
  templateUrl: './import-vessel-form.component.html',
  styleUrls: ['./import-vessel-form.component.scss']
})
export class ImportVesselFormComponent implements OnInit {

  client = new Client('127.0.0.1', 5000);
  vessels: Vessels;
  submitted = false;
  isFDITMode: string;
  private requestSender;
  private interval: Observable<number>;
  mode: any;

  constructor(private snotifyService: SnotifyService, private clientService: ClientService, private vesselsService: VesselsService) {
    this.vessels = new Vessels();
  }

  private addVessels(vesselsString: string): void {
    const lines: string[] = vesselsString.split('\n');
    let csvStructure: CsvStructure;
    csvStructure = new CsvStructure();
    for (let line of lines) {
      line = line.replace(/[^\x20-\x7F]/g, '');
      const splitLine = line.split(',');
      if (isNaN(Number(splitLine[0])) || line === '') {
        csvStructure.init(splitLine);
      } else {
        this.vessels.addMessage(splitLine, csvStructure);
      }
    }
    console.log(lines.length, ' messages added');
    this.vesselsService.changeAllVesselsSet(this.vessels);
  }


  private addLabel(label: any): void {
    label.forEach(element => {
      if (this.vessels.vessels.get(element.mmsi) !== undefined) {
        this.vessels.vessels.get(element.mmsi).addLabel(element);
        this.vessels.addLabel(element.mmsi);
      }
    });
  }

  submit(): void {
    let vesselsString = '';
    let vesselslabel = '';
    this.interval = interval(5000);
    this.requestSender = interval(5000).subscribe(() => {
      this.clientService.getVessels().subscribe((data: string) => vesselsString = data);
      this.clientService.getLabel().subscribe((data: string) => vesselslabel = data);
      this.vessels.clear();
      if (vesselsString !== '') {
        if (this.isFDITMode === 'false') {
          vesselsString = this.formatJsonToCsv(vesselsString);
          this.addVessels(vesselsString);
          if (Array.isArray(vesselslabel) && vesselslabel.length !== 0) {
            this.addLabel(vesselslabel);
          }
        } else {
          this.addVessels(vesselsString);
        }
      }
    });
    this.snotifyService.success('Client Started', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });
    this.submitted = true;
  }

  onSubmit(): void {
    this.clientService.setClient(this.client, this.isFDITMode);
    this.vessels = new Vessels();
    this.vesselsService.changeAllVesselsSet(this.vessels);
    this.submit();
  }

  formatJsonToCsv(json: any): string {
    let csv = '';
    console.log(json);
    try {
      if (!Array.isArray(json)) {
        json = JSON.parse(json);
      }
      json.forEach(element => {
        csv = csv.concat(element.MMSI, ',');
        csv = csv.concat(element.timestamp, ',');
        csv = csv.concat(element.LAT, ',');
        csv = csv.concat(element.LON, ',');
        csv = csv.concat(element.SOG, '\n');
      });
    } catch (e) {
      console.log('not a Json');
    }

    return csv;
  }

  stopRequest(): void {
    this.requestSender.unsubscribe();
  }

  private disconect(): void {
    this.vessels = new Vessels();
  }

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => this.vessels = vessels);
  }
}
