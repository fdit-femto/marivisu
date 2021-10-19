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
    this.selectedVesselService.currentVesselAllMessages.subscribe(vessels => {
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
        this.trace.x = this.selectedVessel.messages.mmsi;
        break;
      case  'time':
        this.trace.x = this.selectedVessel.messages.time;
        break;
      case  'latitude':
        this.trace.x = this.selectedVessel.messages.latitude;
        break;
      case  'longitude':
        this.trace.x = this.selectedVessel.messages.longitude;
        break;
      case  'speedOverGround':
        this.trace.x = this.selectedVessel.messages.speedOverGround;
        break;
      case  'courseOverGround':
        this.trace.x = this.selectedVessel.messages.courseOverGround;
        break;
      case  'heading':
        this.trace.x = this.selectedVessel.messages.heading;
        break;
      case  'vesselName':
        this.trace.x = this.selectedVessel.messages.vesselName;
        break;
      case  'imo':
        this.trace.x = this.selectedVessel.messages.imo;
        break;
      case  'callSign':
        this.trace.x = this.selectedVessel.messages.callSign;
        break;
      case  'vesselType':
        this.trace.x = this.selectedVessel.messages.vesselType;
        break;
      case  'status':
        this.trace.x = this.selectedVessel.messages.status;
        break;
      case  'length':
        this.trace.x = this.selectedVessel.messages.length;
        break;
      case  'width':
        this.trace.x = this.selectedVessel.messages.width;
        break;
      case  'draft':
        this.trace.x = this.selectedVessel.messages.draft;
        break;
      case  'cargo':
        this.trace.x = this.selectedVessel.messages.cargo;
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
        this.trace.y = this.selectedVessel.messages.mmsi;
        break;
      case  'time':
        this.trace.y = this.selectedVessel.messages.time;
        break;
      case  'latitude':
        this.trace.y = this.selectedVessel.messages.latitude;
        break;
      case  'longitude':
        this.trace.y = this.selectedVessel.messages.longitude;
        break;
      case  'speedOverGround':
        this.trace.y = this.selectedVessel.messages.speedOverGround;
        break;
      case  'courseOverGround':
        this.trace.y = this.selectedVessel.messages.courseOverGround;
        break;
      case  'heading':
        this.trace.y = this.selectedVessel.messages.heading;
        break;
      case  'vesselName':
        this.trace.y = this.selectedVessel.messages.vesselName;
        break;
      case  'imo':
        this.trace.y = this.selectedVessel.messages.imo;
        break;
      case  'callSign':
        this.trace.y = this.selectedVessel.messages.callSign;
        break;
      case  'vesselType':
        this.trace.y = this.selectedVessel.messages.vesselType;
        break;
      case  'status':
        this.trace.y = this.selectedVessel.messages.status;
        break;
      case  'length':
        this.trace.y = this.selectedVessel.messages.length;
        break;
      case  'width':
        this.trace.y = this.selectedVessel.messages.width;
        break;
      case  'draft':
        this.trace.y = this.selectedVessel.messages.draft;
        break;
      case  'cargo':
        this.trace.y = this.selectedVessel.messages.cargo;
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
