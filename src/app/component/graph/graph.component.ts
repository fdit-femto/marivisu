import {Component, OnInit} from '@angular/core';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  selectedVessel: Vessel;

  constructor(private selectedVesselService: SelectedVesselService) {
  }

  // var trace1 = {
  //   x: [1, 2, 3, 4, 5],
  //   y: [1, 6, 3, 6, 1],
  //   mode: 'markers+text',
  //   type: 'scatter',
  //   name: 'Team A',
  //   text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  //   textposition: 'top center',
  //   textfont: {
  //     family:  'Raleway, sans-serif'
  //   },
  //   marker: { size: 12 }
  // };

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
      this.updateGraph();
    });
  }

  cleanGraph(): void {
    this.graph.data = [];
    this.graph.layout.xaxis.title = '';
    this.graph.layout.yaxis.title = '';
  }

  updateGraph(): void {

    const trace1 = {
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter',
      name: '',
    };
    this.selectedVessel.messages.forEach(value => {
      trace1.x.push(value.longitude);
      trace1.y.push(value.time);
    });
    this.graph.data.push(trace1);
    this.graph.layout.xaxis.title = 'longitude';
    this.graph.layout.yaxis.title = 'time';
  }

}
