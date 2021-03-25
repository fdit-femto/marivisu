import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client-service.service';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {interval, Observable} from 'rxjs';
import {Message} from '../../model/message';
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
    this.vessels = new Vessels();
    const lines: string[] = vesselsString.split('\n');
    let csvStructure: CsvStructure;
    csvStructure = new CsvStructure();
    for (let line of lines) {
      line = line.replace(/[^\x20-\x7F]/g, '');
      const splitLine = line.split(',');
      if (isNaN(Number(splitLine[0])) || line === '') {
        csvStructure.init(splitLine);
      } else {
        const newMessage = new Message(splitLine, csvStructure);
        this.vessels.addMessage(newMessage);
      }
    }
    this.vessels.sortAllMessageInVesselByDate();
    this.vessels.sortAllTraceInVesselByDate();
    this.vesselsService.changeAllVesselsSet(this.vessels);
  }

  onSubmit(): void {
    this.clientService.setClient(this.client, this.isFDITMode);
    this.vessels = new Vessels();
    this.vesselsService.changeAllVesselsSet(this.vessels);
    this.submit();
  }

  submit(): void {
    let vesselsString = '';
    this.interval = interval(1000);
    this.requestSender = interval(1000).subscribe(() => {
      this.clientService.getVessels().subscribe((data: string) => vesselsString = data);
      if (vesselsString !== '') {
        if (this.isFDITMode === 'false') {
          vesselsString = this.formatJsonToCsv(vesselsString);
        }
        this.addVessels(vesselsString);
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

  formatJsonToCsv(json: any): string {
    let csv = '';

    json.forEach(element => {
      csv = csv.concat(element.MMSI, ',');
      csv = csv.concat(element.timestamp, ',');
      csv = csv.concat(element.LAT, ',');
      csv = csv.concat(element.LON, ',');
      csv = csv.concat(element.SOG, '\n');
    });


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
