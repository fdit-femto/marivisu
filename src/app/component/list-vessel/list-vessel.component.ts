import {AfterViewInit, Component, OnInit} from '@angular/core';
import {VesselsService} from '../../service/vessels.service';
import {Vessels} from '../../model/vessels';

declare var $: any;

@Component({
  selector: 'app-list-vessel',
  templateUrl: './list-vessel.component.html',
  styleUrls: ['./list-vessel.component.scss']
})
export class ListVesselComponent implements OnInit {
  vessels: Vessels;

  constructor(private vesselsService: VesselsService) {
  }

  ngOnInit(): void {
    this.vesselsService.currentVessels.subscribe(vessels => {
      setTimeout(() =>
        this.vessels = vessels
      );
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

}
