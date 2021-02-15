import  {Component,  OnInit}  from  '@angular/core';
import  {Vessels}  from  '../../model/vessels';
import  {VesselsService}  from  '../../service/vessels.service';
import  {SelectedVesselService}  from  '../../service/selected-vessel.service';
import  {Vessel}  from  '../../model/vessel';
import  *  as  PlotlyJS  from  'plotly.js/dist/plotly.js';
import  {PlotlyModule}  from  'angular-plotly.js';

PlotlyModule.plotlyjs  =  PlotlyJS;

@Component({
    selector:  'app-map',
    templateUrl:  './map.component.html',
    styleUrls:  ['./map.component.scss']
})
export  class  MapComponent  implements  OnInit  {
    vessels:  Vessels;
    selectedVessel:  Vessel;
    highlightedMarkerOldCharacteristic  =  {
        id:  '',
        color:  ''
    };

    public  allData:  any[];
    public  layout:  object;
    public  config:  object;

    public  graph  =  {
        data:  [],
        layout:  {
            dragmode:  'zoom',
            margin:  {r:  0,  t:  0,  b:  0,  l:  0},
            autosize:  true,
            hovermode:  'closest',
            showlegend:  false,
            mapbox:  {
                style:  'open-street-map',
                bearing:  0,
                center:  {lat:  0,  lon:  0},
                pitch:  0,
                zoom:  1
            },
        },
    };

    constructor(private  vesselsService:  VesselsService,  private  selectedVesselService:  SelectedVesselService)  {
    }

    ngOnInit():  void  {


        this.initMap();
        this.connectVesselObservable();
        this.connectSelectVesselObservable();
    }

    connectVesselObservable():  void  {
        this.vesselsService.currentVessels.subscribe(vessels  =>  {
            this.vessels  =  vessels;
            this.updateMap();
        });
    }

    connectSelectVesselObservable():  void  {
        this.selectedVesselService.currentVessel.subscribe(vessels  =>  {
            this.selectedVessel  =  vessels;
            const  mmsi  =  this.selectedVessel.getMMSI();
            if  (mmsi  !==  undefined)  {
                this.highlightMarker(this.selectedVessel.getMMSI());
            }
        });
    }

    initMap():  void  {
        this.allData  =  [];
        this.allData.push({
            type:  'scattermapbox',
            x:  [],
            y:  []
        });
        this.layout  =  {
            dragmode:  'zoom',
            mapbox:  {style:  'open-street-map',  center:  {lat:  38,  lon:  -90},  zoom:  3},
            margin:  {r:  0,  t:  0,  b:  0,  l:  0},
            autosize:  true
        };
        this.config  =  {
            responsive:  true
        };

    }

    highlightMarker(mmsi:  string):  void  {
        if  (this.highlightedMarkerOldCharacteristic.id  !==  '')  {
            const  previousHighlighted  =  this.graph.data.find(element  =>  element.text  ===  this.highlightedMarkerOldCharacteristic.id);
            if  (previousHighlighted  !==  undefined)  {
                previousHighlighted.marker.color  =  this.highlightedMarkerOldCharacteristic.color;
                previousHighlighted.marker.size  =  4;
                  }
        }
        const  newHighlighted  =  this.graph.data.find(element  =>  element.text  ===  mmsi);
        this.highlightedMarkerOldCharacteristic.id  =  mmsi;
        this.highlightedMarkerOldCharacteristic.color  =  newHighlighted.marker.color;
        newHighlighted.marker.size  =  10;
        newHighlighted.marker.color  =  'red';

    }

    updateMap():  void  {
        this.graph.data  =  [{
            name:  '',
            type:  'scattermapbox',
            text:  '',
            lat:  [],
            lon:  [],
            marker:  {color:  'fuchsia',  size:  14}
        }];

        this.vessels.vessels.forEach(((vessel)  =>  {
            let  color:  string;
            let  size:  number;
            if  (this.selectedVessel.getMMSI()  ===  vessel.getMMSI())  {
                color  =  'red';
                size  =  10;
            }else  {
                color  =  vessel.getColor();
                size  =  4;
            }
            const  messagesToDisplay  =  {
                name:  '',
                type:  'scattermapbox',
                text:  vessel.getMMSI(),
                lat:  [],
                lon:  [],
                marker:  {color,  size}
            };
            vessel.messages.forEach((message)  =>  {
                messagesToDisplay.lat.push(message.latitude);
                messagesToDisplay.lon.push(message.longitude);
            });
            this.graph.data.push(messagesToDisplay);
        }));
    }

}
