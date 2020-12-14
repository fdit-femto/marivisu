import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-import-vessel-form',
  templateUrl: './import-vessel-form.component.html',
  styleUrls: ['./import-vessel-form.component.scss']
})
export class ImportVesselFormComponent implements OnInit {

  client = new Client('localhost', 1024);

  submitted = false;

  constructor(private snotifyService: SnotifyService, private clientService: ClientService) {
  }

  onSubmit(): void {
    // this.clientService = new ClientService(this.client);
    this.snotifyService.success('Client Started', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });
    this.submitted = true;
  }

  ngOnInit(): void {
  }

}
