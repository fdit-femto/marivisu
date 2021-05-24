import {Component, OnInit} from '@angular/core';
import {Vessels} from '../../model/vessels';
import {VesselsService} from '../../service/vessels.service';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import {PlotlyModule} from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  vessels: Vessels;
  selectedVessel: Vessel;
  highlightedMarkerOldCharacteristic = {
    id: '',
    color: ''
  };

  public allData: any[];
  public layout: object;
  public config: object;

  public graph = {
    data: [],
    layout: {
      dragmode: 'zoom',
      margin: {r: 0, t: 0, b: 0, l: 0},
      autosize: true,
      hovermode: 'closest',
      showlegend: false,
      mapbox: {
        // accesstoken: 'pk.eyJ1IjoicGllcmJlcm5hYmUiLCJhIjoiY2sydzF1YnBmMGFlejNtbHE5bXkxZmxpdCJ9.nxKYukVtBIHavc_hjim0kw',
        // style: 'mapbox://styles/pierbernabe/ck7d65vm1140a1imo0r7vah77',
        style: 'open-street-map',
        bearing: 0,
        center: {lat: 0, lon: 0},
        pitch: 0,
        zoom: 1
      },
    },
  };

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
      const mmsi = this.selectedVessel.getMMSI();
      if (mmsi !== undefined) {
        this.highlightMarker(this.selectedVessel.getMMSI());
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
      responsive: true,
    };

  }

  highlightMarker(mmsi: string): void {
    if (this.highlightedMarkerOldCharacteristic.id !== '') {
      const previousHighlighted = this.graph.data.find(element => element.text === this.highlightedMarkerOldCharacteristic.id);
      if (previousHighlighted !== undefined) {
        previousHighlighted.marker.color = this.highlightedMarkerOldCharacteristic.color;
        previousHighlighted.marker.size = 4;
      }
    }
    const newHighlighted = this.graph.data.find(element => element.text === mmsi);
    this.highlightedMarkerOldCharacteristic.id = mmsi;
    this.highlightedMarkerOldCharacteristic.color = newHighlighted.marker.color;
    newHighlighted.marker.size = 10;
    newHighlighted.marker.color = 'red';

  }

  updateMap(): void {
    this.graph.data = [];
    this.graph.data = [{
      name: '',
      type: 'scattermapbox',
      text: '',
      lat: [],
      lon: [],
      marker: {color: 'fuchsia', size: 14}
    }];
    let messagesToDisplay = {
      name: null,
      type: null,
      text: null,
      lat: [],
      lon: [],
      mode: null,
      marker: {color: null, size: null, width: null}
    };


    // type = 'scattermapbox';
    messagesToDisplay = {
      name: '',
      type: 'scattermapbox',
      lat: [],
      lon: [],
      mode: 'points',
      // @ts-ignore
      marker: {size: 1}
    };

    messagesToDisplay.lat = this.vessels.messages.latitude;
    messagesToDisplay.lon = this.vessels.messages.longitude;
    messagesToDisplay.text = this.vessels.messages.tooltip;
    this.graph.data.push(messagesToDisplay);
  }


  secondsToString(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.getUTCDay() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours() + ':' +
      date.getUTCMinutes() + ':' + date.getUTCSeconds();
  }
}
