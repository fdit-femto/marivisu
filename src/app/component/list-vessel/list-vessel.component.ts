import {Component, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {VesselsService} from '../../service/vessels.service';

@Component({
  selector: 'app-list-vessel',
  templateUrl: './list-vessel.component.html',
  styleUrls: ['./list-vessel.component.scss']
})
export class ListVesselComponent implements OnInit {
  vessels: Map<number, Message>;


  constructor(private vesselsService: VesselsService) {
  }

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      this.vessels = vessels;
      console.log(this.vessels);
    });
  }
}
