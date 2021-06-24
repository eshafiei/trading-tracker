import { Component, OnInit } from '@angular/core';
import { Sector } from './models/sector.model';
import { SectorsService } from './sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit {
  sectors: Sector[];
  constructor(private sectorService: SectorsService) { }

  ngOnInit() {
    this.sectors = this.sectorService.sectors();
  }

}
