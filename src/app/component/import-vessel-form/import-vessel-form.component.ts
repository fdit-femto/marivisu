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

  client = new Client('localhost', 1024);
  vessels: Vessels;
  submitted = false;

  constructor(private snotifyService: SnotifyService, private clientService: ClientService, private vesselsService: VesselsService) {
  }

  // private addVessels(vesselsRaw: Observable<any>): void {
  //   const fileReader = new FileReader();
  //   let nbLine: number;
  //   const vesselsString: string = vesselsRaw;
  //   this.vessels = new Vessels();
  //   const lines: string[] = vesselsString.split('\n');
  //   nbLine = lines.length;
  //   for (let line of lines) {
  //     line = line.replace(/[^\x20-\x7F]/g, '');
  //     const splitLine = line.split(',');
  //     if (isNaN(Number(splitLine[0])) || line === '') {
  //       continue;
  //     }
  //     const newMessage = new Message(splitLine);
  //     this.vessels.addMessage(newMessage);
  //   }
  //   this.vessels.sortAllMessageInVesselByDate();
  //   this.vessels.sortAllTraceInVesselByDate();
  // }

  onSubmit(): void {
    let str = '';
    this.clientService.setClient(this.client);
    this.vessels = new Vessels();
    this.vesselsService.changeVesselsSet(this.vessels);
    this.clientService.getVessels().subscribe((data: string) => {
      console.log(data);
      return str = data;
    });
    // interval(1000).subscribe(() => this.addVessels(this.clientService.getVessels()));

    this.snotifyService.success('Client Started', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });
    this.submitted = true;
  }

  private disconect(): void {
  }

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => this.vessels = vessels);
  }

}
