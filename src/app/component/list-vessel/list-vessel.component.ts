import {Component, OnInit} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';
import {Vessel} from '../../model/vessel';
import {SelectedVesselService} from '../../service/selected-vessel.service';

declare var $: any;

@Component({
  selector: 'app-list-vessel',
  templateUrl: './list-vessel.component.html',
  styleUrls: ['./list-vessel.component.scss']
})
export class ListVesselComponent implements OnInit {
  vessels: Vessels;
  selectedVessel: Vessel;

  constructor(private vesselsService: VesselsService, private selectedVesselService: SelectedVesselService) {
  }

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      setTimeout(() =>
        this.vessels = vessels
      );
    });

    this.selectedVesselService.currentVessel.subscribe(selectedVessel => {
      this.selectedVessel = selectedVessel;
    });

    $(document).ready(() => {
      $('#myInput').on('keyup', function(): void {
        const value = $(this).val().toLowerCase();
        $('#list-tab a').filter(function(): void {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }

  onSelectVessel(vessel: Vessel): void {
    this.selectedVesselService.changeVesselSet(vessel);
  }
}
