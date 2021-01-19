import {Component, Input, OnInit} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {MatSliderChange} from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  vessels: Vessels;
  @Input()
  max = 0;
  value = 0;

  constructor(private vesselsService: VesselsService) {
    this.vesselsService.currentVessels.subscribe(vessels => {
      setTimeout(() => {
          this.vessels = vessels;
          this.max = this.vessels.lastAppearance - this.vessels.firstAppearance;
        }
      );
    });

  }

  ngOnInit(): void {
  }

  formatLabel(value: number): string | number {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onInputChange($event: MatSliderChange): void {
    this.vesselsService.changeTimeSelectedVessel(this.vesselsService.allVessels.getVesselSetRegardingTime($event.value));
  }
}
