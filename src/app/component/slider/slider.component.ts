import {Component, OnInit} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  vessels: Vessels;

  constructor(private vesselsService: VesselsService) {
    this.vesselsService.currentVessels.subscribe(vessels => {
      setTimeout(() =>
        this.vessels = vessels
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

}
