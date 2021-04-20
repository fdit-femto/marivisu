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
  private interval;
  private tick = 1000;
  speed = 1;
  playIcon = 'play_arrow';

  constructor(private vesselsService: VesselsService, private selectedVesselService: SelectedVesselService) {
  }

  private connectSelectVesselObservable(): void {
    this.selectedVesselService.currentVessel.subscribe(vessels => {
      if (vessels.messages.size() !== 0) {
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
    this.updateVessels($event.value);
  }

  updateVessels(value: number): void{
    const newVessels: Vessels = this.vesselsService.allVessels.getVesselSetRegardingTime(value);
    this.vesselsService.changeTimeSelectedVessel(newVessels);
    if (this.selectedVessel !== undefined){
      this.selectedVesselService.changeVesselSetSlider(newVessels.getVessel(Number(this.selectedVessel.getMMSI())));
    }
  }

  play(): void {
    if (this.playIcon === 'play_arrow') {
      this.interval = setInterval(() => this.playCallback(), this.tick);
      this.playIcon = 'pause';
    } else {
      clearInterval(this.interval);
      this.playIcon = 'play_arrow';
    }
  }

  playCallback(): void {
    this.value += this.speed;
    this.updateVessels(this.value);
  }

  speedUp(): void {
    clearInterval(this.interval);
    this.speed *= 2;
    this.interval = setInterval(() => this.playCallback(), this.tick);
  }

  speedDown(): void {
    clearInterval(this.interval);
    this.speed /= 2;
    this.interval = setInterval(() => this.playCallback(), this.tick);
  }


}



























































































































































































































































































































































































































































































































































































































































