import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MapComponent } from './map/map.component';
import { GraphComponent } from './graph/graph.component';
import { ProgressComponent } from './import-vessels/progress/progress.component';
import { ImportVesselsComponent } from './import-vessels/import-vessels.component';
import { ImportVesselsDirective } from './import-vessels/import-vessels.directive';
import { ListVesselComponent } from './list-vessel/list-vessel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MapComponent,
    GraphComponent,
    ProgressComponent,
    ImportVesselsComponent,
    ImportVesselsDirective,
    ListVesselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }