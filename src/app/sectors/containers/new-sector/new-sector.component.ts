import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Sector } from '../../models/sector.model';
import { SectorsService } from '../../sectors.service';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.component.html',
  styleUrls: ['./new-sector.component.scss'],
})
export class NewSectorComponent implements OnInit {
  sectorData: Sector;
  isEdit: boolean;
  constructor(private ionLoader: LoaderService,
    private toastService: ToastService,
    private sectorService: SectorsService) {}

  ngOnInit() {
    this.isEdit = false;
  }

  addSector(sectorItem: Sector) {
    this.ionLoader.showLoader();
    this.sectorService.saveSector(sectorItem).subscribe(
      () => this.toastService.presentToastWithOptions('SAVE CONFIRMATION',
              `${sectorItem?.sectorName} created successfully!`, 3000, true),
      err => console.log(err),
      () => this.ionLoader.hideLoader()
    );
  }

}
