import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CircleMarker} from 'leaflet';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';
import {Message} from '../../model/message';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  vessels: Vessels;
  selectedVessel: Vessel;
  public map: L.Map;
  renderer = L.canvas({padding: 0.5});
  circleMarkers: Map<number, CircleMarker> = new Map<number, CircleMarker>();

  constructor(private vesselsService: VesselsService, private selectedVesselService: SelectedVesselService) {
  }

  ngOnInit(): void {
    this.initMap();
    this.connectVesselObservable();
    this.connectSelectVesselObservable();
  }

  connectVesselObservable(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      this.vessels = vessels;
      this.updateMap();
    });
  }

  connectSelectVesselObservable(): void {
    this.selectedVesselService.currentVessel.subscribe(vessels => {
      this.selectedVessel = vessels;
      this.updateMap();
    });
  }

  initMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'map',
    }).addTo(this.map);
  }

  addCircleMarker(message: Message, color: string): void {
    let circleMarker;
    if (message.mmsi === this.selectedVessel.getMMSI()) {
      circleMarker = L.circleMarker([+message.latitude, +message.longitude],
        {
          renderer: this.renderer,
          radius: 4,
          color: '#ff0000',
        }).addTo(this.map).bringToFront();
    }else {
      circleMarker = L.circleMarker([+message.latitude, +message.longitude],
        {
          renderer: this.renderer,
          radius: 0.01,
          color
        }).addTo(this.map);
    }
    this.circleMarkers.set(Number(message.mmsi), circleMarker);
  }

  updateMap(): void {
    this.circleMarkers.clear();
    this.vessels.vessels.forEach(((vessel, key) => {
      const color = vessel.getColor();
      vessel.messages.forEach((message) => {
        this.addCircleMarker(message, color);
      });
    }));
  }

}
