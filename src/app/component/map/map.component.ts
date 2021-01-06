import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CircleMarker, Polyline} from 'leaflet';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  vessels: Vessels;
  selectedVessel: Vessel;
  // public map: L.Map;
  renderer = L.canvas({padding: 0.5});
  circleMarkers: Map<number, Array<CircleMarker>> = new Map<number, Array<CircleMarker>>();
  polylines: Map<number, Polyline> = new Map<number, Polyline>();
  highlightedMarkerId: number;

  public allData: any[];
  public layout: object;
  public config: object;

  public graph = {
    data: [{
      type: 'scattermapbox',
      lat: ['45.5017'],
      lon: ['-73.5673'],
      marker: { color: 'fuchsia', size: 4 }
    }],
    layout: {
      style: 'open-street-map',
      autosize: true,
      hovermode: 'closest',
      mapbox: {
        bearing: 0,
        center: {
          lat: 45,
          lon: -73
        },
        pitch: 0,
        zoom: 5
      },
    },
  };

  // map: mapboxgl.Map;
  // style = {
  //   version: 8,
  //   sources: {
  //     osm: {
  //       type: 'raster',
  //       tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
  //     }
  //   },
  //   layers: [{
  //     id: 'osm',
  //     type: 'raster',
  //     source: 'osm',
  //   }],
  // };
  // lat = 37.75;
  // lng = -122.41;

  constructor(private vesselsService: VesselsService, private selectedVesselService: SelectedVesselService) {
  }

  ngOnInit(): void {
    this.allData = [];
    this.allData.push({
      type: 'scattermapbox',
      x: [],
      y: []
    });
    this.layout = {
      dragmode: 'zoom',
      mapbox: { style: 'open-street-map', center: { lat: 38, lon: -90 }, zoom: 3 },
      margin: { r: 0, t: 0, b: 0, l: 0 },
      autosize: true
    };
    this.config = {
      responsive: true
    };

    // this.initMap();
    // this.connectVesselObservable();
    // this.connectSelectVesselObservable();
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
      const mmsi = this.selectedVessel.getMMSI();
      if (mmsi !== undefined) {
        this.highlightMarker(Number(this.selectedVessel.getMMSI()));
      }
    });
  }

  initMap(): void {
    // this.map = L.map('map').setView([0, 0], 1);
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: 'map',
    // }).addTo(this.map);
  }

  // addCircleMarker(message: Message, color: string): void {
  //   let circleMarker;
  //   if (message.mmsi === this.selectedVessel.getMMSI()) {
  //     circleMarker = L.circleMarker([+message.latitude, +message.longitude],
  //       {
  //         renderer: this.renderer,
  //         radius: 4,
  //         color: '#ff0000',
  //       }).addTo(this.map).bringToFront();
  //   } else {
  //     circleMarker = L.circleMarker([+message.latitude, +message.longitude],
  //       {
  //         renderer: this.renderer,
  //         radius: 1,
  //         color
  //       }).addTo(this.map);
  //   }
  //   if (!this.circleMarkers.has(Number(message.mmsi))) {
  //     this.circleMarkers.set(Number(message.mmsi), new Array<CircleMarker>());
  //   }
  //   this.circleMarkers.get(Number(message.mmsi)).push(circleMarker);
  // }

  addPolyline(vessel: Vessel, color: string): void {
    // let polyline;
    if (vessel.getMMSI() === this.selectedVessel.getMMSI()) {
      // polyline = L.polyline(vessel.trace,
      //   {
      //     renderer: this.renderer,
      //     weight: 2,
      //     color: '#ff0000',
      //   }).addTo(this.map).bringToFront();
    } else {
      // polyline = L.polyline(vessel.trace,
      //   {
      //     renderer: this.renderer,
      //     weight: 1,
      //     color
      //   }).addTo(this.map);
    }
    // this.polylines.set(Number(vessel.getMMSI()), polyline);
  }

  highlightMarker(mmsi: number): void {
    if (this.highlightedMarkerId !== undefined) {
      const color = this.vessels.vessels.get(this.highlightedMarkerId).getColor();
      this.polylines.get(this.highlightedMarkerId).setStyle({color, weight: 1});
    }
    this.highlightedMarkerId = mmsi;
    this.polylines.get(mmsi).setStyle({color: '#ff0000', weight: 1});
  }

  updateMap(): void {
    this.renderer.remove();
    this.renderer = L.canvas({padding: 0.5});
    // this.renderer.addTo(this.map);
    // this.circleMarkers.forEach(value => value.splice(0, value.length));
    this.vessels.vessels.forEach(((vessel) => {
      const color = vessel.getColor();
      this.addPolyline(vessel, color);
    }));
  }

}
