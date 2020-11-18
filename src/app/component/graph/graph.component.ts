import {Component, OnInit} from '@angular/core';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  private selectedVessel: Vessel;
  private yType = '';
  private xType = '';
  trace = {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: '',
  };

  constructor(private selectedVesselService: SelectedVesselService) {
  }

  public graph = {
    data: [],
    layout: {
      xaxis: {
        title: ''
      },
      yaxis: {
        title: ''
      }
    }
  };

  ngOnInit(): void {
    this.connectSelectVesselObservable();
  }

  connectSelectVesselObservable(): void {
    this.selectedVesselService.currentVessel.subscribe(vessels => {
      this.selectedVessel = vessels;
      this.initGraph();
    });
  }

  cleanGraph(): void {
    this.graph.data = [];
    this.graph.layout.xaxis.title = '';
    this.graph.layout.yaxis.title = '';
  }

  updateXaxis(valueType: string): void {
    this.xType = valueType;
    this.trace.x = [];
    switch (valueType) {
      case 'mmsi':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.mmsi);
        });
        break;
      case  'time':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(Date.parse(value.time) / 1000 - this.selectedVessel.firstAppearance);
        });
        break;
      case  'latitude':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.latitude);
        });
        break;
      case  'longitude':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.longitude);
        });
        break;
      case  'speedOverGround':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.speedOverGround);
        });
        break;
      case  'courseOverGround':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.courseOverGround);
        });
        break;
      case  'heading':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.heading);
        });
        break;
      case  'vesselName':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.vesselName);
        });
        break;
      case  'imo':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.imo);
        });
        break;
      case  'callSign':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.callSign);
        });
        break;
      case  'vesselType':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.vesselType);
        });
        break;
      case  'status':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.status);
        });
        break;
      case  'length':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.length);
        });
        break;
      case  'width':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.width);
        });
        break;
      case  'draft':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.draft);
        });
        break;
      case  'cargo':
        this.selectedVessel.messages.forEach(value => {
          this.trace.x.push(value.cargo);
        });
        break;
    }
    this.graph.data = [];
    this.graph.layout.xaxis.title = valueType;
    this.graph.data.push(this.trace);
  }

  updateYaxis(valueType: string): void {
    this.yType = valueType;
    this.trace.y = [];
    switch (valueType) {
      case 'mmsi':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.mmsi);
        });
        break;
      case  'time':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(Date.parse(value.time) / 1000 - this.selectedVessel.firstAppearance);
        });
        break;
      case  'latitude':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.latitude);
        });
        break;
      case  'longitude':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.longitude);
        });
        break;
      case  'speedOverGround':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.speedOverGround);
        });
        break;
      case  'courseOverGround':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.courseOverGround);
        });
        break;
      case  'heading':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.heading);
        });
        break;
      case  'vesselName':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.vesselName);
        });
        break;
      case  'imo':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.imo);
        });
        break;
      case  'callSign':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.callSign);
        });
        break;
      case  'vesselType':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.vesselType);
        });
        break;
      case  'status':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.status);
        });
        break;
      case  'length':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.length);
        });
        break;
      case  'width':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.width);
        });
        break;
      case  'draft':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.draft);
        });
        break;
      case  'cargo':
        this.selectedVessel.messages.forEach(value => {
          this.trace.y.push(value.cargo);
        });
        break;
    }
    this.graph.data = [];
    this.graph.layout.yaxis.title = valueType;
    this.graph.data.push(this.trace);
  }


  initGraph(): void {
    this.updateXaxis(this.xType);
    this.updateYaxis(this.yType);
  }

}
