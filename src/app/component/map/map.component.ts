import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CircleMarker} from 'leaflet';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';
import {Message} from '../../model/message';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  vessels: Vessels;
  public map: L.Map;
  circleMarkers: Map<number, CircleMarker> = new Map<number, CircleMarker>();

  constructor(private vesselsService: VesselsService) {
  }

  ngOnInit(): void {
    this.initMap();
    this.connectVesselObservable();
  }

  connectVesselObservable(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      this.vessels = vessels;
      this.updateMap();
    });
  }

  initMap(): void {
    this.map = L.map('map', {
      preferCanvas: true
    }).setView([0, 0], 1);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'map',
    }).addTo(this.map);
  }

  addCircleMarker(message: Message, color: string): void {
    const circleMarker = L.circleMarker([+message.latitude, +message.longitude],
      {
        radius: 0.1,
        color
      }).addTo(this.map);
    this.circleMarkers.set(Number(message.mmsi), circleMarker);
  }

  updateMap(): void {
    let nbMessage = 0;
    this.vessels.vessels.forEach(((vessel, key) => {
      const color = vessel.getColor();
      vessel.messages.forEach((message) => {
        nbMessage++;
        this.addCircleMarker(message, color);
      });
    }));
  }

}
