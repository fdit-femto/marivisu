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
import {ImportVesselFormComponent} from './import-vessel-form/import-vessel-form.component';
import {FormsModule} from '@angular/forms';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
    ImportVesselFormComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    AngularSplitModule,
    PlotlyModule,
    FormsModule,
    SnotifyModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
