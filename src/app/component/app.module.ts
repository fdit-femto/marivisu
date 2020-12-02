import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {allIcons, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MapComponent} from './map/map.component';
import {GraphComponent} from './graph/graph.component';
import {ProgressComponent} from './import-vessels/progress/progress.component';
import {ImportVesselsComponent} from './import-vessels/import-vessels.component';
import {ImportVesselsDirective} from './import-vessels/import-vessels.directive';
import {ListVesselComponent} from './list-vessel/list-vessel.component';
import {AngularSplitModule} from 'angular-split';
import {PlotlyModule} from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { ImportVesselFormComponent } from './import-vessel-form/import-vessel-form.component';
import {FormsModule} from '@angular/forms';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MapComponent,
    GraphComponent,
    ProgressComponent,
    ImportVesselsComponent,
    ImportVesselsDirective,
    ListVesselComponent,
    ImportVesselFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    AngularSplitModule,
    PlotlyModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
