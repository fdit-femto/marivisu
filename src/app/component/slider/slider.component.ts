import {Component, Input, OnInit} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {MatSliderChange} from '@angular/material/slider';
import {ThemePalette} from '@angular/material/core';
import {SelectedVesselService} from '../../service/selected-vessel.service';
import {Vessel} from '../../model/vessel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  vessels: Vessels;
  selectedVessel: Vessel;

  @Input()
  max = 0;
  value = 0;
  disabled = false;
  color: ThemePalette = 'primary';
  toggleDisable: boolean;

  constructor(private vesselsService: VesselsService, private selectedVesselService: SelectedVesselService) {
  }

  private connectSelectVesselObservable(): void {
    this.selectedVesselService.currentVessel.subscribe(vessels => {
      if (vessels.messages.length !== 0) {
        this.selectedVessel = vessels;
      }
    });
  }

  private connectVesselObservable(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      setTimeout(() => {
          this.vessels = vessels;
          this.max = this.vessels.lastAppearance - this.vessels.firstAppearance;
          this.toggleDisable = this.vessels.vessels.size === 0;
        }
      );
    });
  }

  formatLabel(value: number): string | number {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onSlideChange(): void {
    if (this.disabled) {
      const newVessels: Vessels = this.vesselsService.allVessels.getVesselSetRegardingTime(this.value);
      this.vesselsService.changeTimeSelectedVessel(newVessels);
      this.selectedVesselService.changeVesselSetSlider(newVessels.getVessel(Number(this.selectedVessel.getMMSI())));
    } else {
      this.vesselsService.displayAllVessels();
      this.selectedVesselService.changeVesselSetSlider(this.vesselsService.allVessels.getVessel(this.selectedVesselService.mmsi));
    }

  }

  ngOnInit(): void {
    this.connectSelectVesselObservable();
    this.connectVesselObservable();
  }

  onInputChange($event: MatSliderChange): void {
    const newVessels: Vessels = this.vesselsService.allVessels.getVesselSetRegardingTime($event.value);
    this.vesselsService.changeTimeSelectedVessel(newVessels);
    this.selectedVesselService.changeVesselSetSlider(newVessels.getVessel(Number(this.selectedVessel.getMMSI())));
  }
}
