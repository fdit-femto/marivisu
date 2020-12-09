import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-import-vessel-form',
  templateUrl: './import-vessel-form.component.html',
  styleUrls: ['./import-vessel-form.component.scss']
})
export class ImportVesselFormComponent implements OnInit {

  client = new Client('localhost', 9002);
  submitted = false;

  constructor(private snotifyService: SnotifyService) {
  }

  onSubmit(): void {
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
