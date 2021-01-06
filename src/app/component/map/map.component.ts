import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CircleMarker} from 'leaflet';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import {PlotlyModule} from 'angular-plotly.js';
import {Message} from '../../model/message';

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
  markers: Map<number, Array<CircleMarker>> = new Map<number, Array<CircleMarker>>();
  highlightedMarkerId: number;

  public allData: any[];
  public layout: object;
  public config: object;

  public graph = {
    data: [{
      name: '',
      type: 'scattermapbox',
      text: 'mmsi',
      lat: [45],
      lon: [-73],
      marker: {color: 'fuchsia', size: 14}
    }, {
      name: '',
      legend : 'hide',
      type: 'scattermapbox',
      lat: [44],
      lon: [-72],
      marker: {color: '#0000FF', size: 3}
    }],
    layout: {
      dragmode: 'zoom',
      margin: {r: 0, t: 0, b: 0, l: 0},
      autosize: true,
      hovermode: 'closest',
      showlegend: false,
      mapbox: {
        style: 'open-street-map',
        bearing: 0,
        center: {lat: 43, lon: -73},
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


    this.initMap();
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
    this.allData = [];
    this.allData.push({
      type: 'scattermapbox',
      x: [],
      y: []
    });
    this.layout = {
      dragmode: 'zoom',
      mapbox: {style: 'open-street-map', center: {lat: 38, lon: -90}, zoom: 3},
      margin: {r: 0, t: 0, b: 0, l: 0},
      autosize: true
    };
    this.config = {
      responsive: true
    };

  }

  addCircleMarker(message: Message, color: string): void {
    // let marker;
    if (message.mmsi === this.selectedVessel.getMMSI()) {
      // circleMarker = L.circleMarker([+message.latitude, +message.longitude],
      //   {
      //     renderer: this.renderer,
      //     radius: 4,
      //     color: '#ff0000',
      //   }).addTo(this.map).bringToFront();>
    } else {
      // circleMarker = L.circleMarker([+message.latitude, +message.longitude],
      //   {
      //     renderer: this.renderer,
      //     radius: 1,
      //     color
      //   }).addTo(this.map);
    }
    if (!this.markers.has(Number(message.mmsi))) {
      this.markers.set(Number(message.mmsi), new Array<CircleMarker>());
    }
    // this.markers.get(Number(message.mmsi)).push(circleMarker);
  }


  highlightMarker(mmsi: number): void {
    if (this.highlightedMarkerId !== undefined) {
      const color = this.vessels.vessels.get(this.highlightedMarkerId).getColor();
    }
    this.highlightedMarkerId = mmsi;
  }

  updateMap(): void {
    this.renderer.remove();
    this.renderer = L.canvas({padding: 0.5});
    // this.renderer.addTo(this.map);
    this.markers.forEach(value => value.splice(0, value.length));
    this.vessels.vessels.forEach(((vessel) => {
      const color = vessel.getColor();
    }));
  }

}
