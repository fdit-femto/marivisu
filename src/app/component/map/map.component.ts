import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  vessels: Vessels;

  constructor(private vesselsService: VesselsService) { }

  ngOnInit(): void {
    this.connectVesselObservable();
    this.initMap();
  }

  connectVesselObservable(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      this.vessels = vessels;
    });
  }

  initMap(): void {
    const myMap = L.map('map').setView([0, 0], 1);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'map'
    }).addTo(myMap);
  }

}
