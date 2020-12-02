import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';

@Component({
  selector: 'app-import-vessel-form',
  templateUrl: './import-vessel-form.component.html',
  styleUrls: ['./import-vessel-form.component.scss']
})
export class ImportVesselFormComponent implements OnInit {

  client = new Client('localhost', 9002);
  submitted = false;

  constructor() {
  }

  onSubmit(): void {
    this.submitted = true;
  }

  ngOnInit(): void {
  }

}
