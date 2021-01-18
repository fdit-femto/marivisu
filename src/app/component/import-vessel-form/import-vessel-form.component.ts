import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client.service';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {interval, Observable} from 'rxjs';
import {Message} from '../../model/message';

@Component({
  selector: 'app-import-vessel-form',
  templateUrl: './import-vessel-form.component.html',
  styleUrls: ['./import-vessel-form.component.scss']
})
export class ImportVesselFormComponent implements OnInit {

  client = new Client('127.0.0.1', 1024);
  vessels: Vessels;
  submitted = false;
  private requestSender;
  private interval: Observable<number>;

  constructor(private snotifyService: SnotifyService, private clientService: ClientService, private vesselsService: VesselsService) {
    this.vessels = new Vessels();
  }

  private addVessels(vesselsString: string): void {
    this.vessels = new Vessels();
    const lines: string[] = vesselsString.split('\n');
    for (let line of lines) {
      line = line.replace(/[^\x20-\x7F]/g, '');
      const splitLine = line.split(',');
      if (isNaN(Number(splitLine[0])) || line === '') {
        continue;
      }
      const newMessage = new Message(splitLine);
      this.vessels.addMessage(newMessage);
    }
    this.vessels.sortAllMessageInVesselByDate();
    this.vessels.sortAllTraceInVesselByDate();
    this.vesselsService.changeAllVesselsSet(this.vessels);
  }

  onSubmit(): void {
    let vesselsString = '';
    this.clientService.setClient(this.client);
    this.vessels = new Vessels();
    this.vesselsService.changeAllVesselsSet(this.vessels);
    this.interval = interval(1000);
    this.requestSender = interval(1000).subscribe(() => {
      this.clientService.getVessels().subscribe((data: string) => vesselsString = data);
      if (vesselsString !== '') {
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
