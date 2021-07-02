import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Sector } from '../../models/sector.model';
import { SectorsService } from '../../sectors.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.scss'],
})
export class EditSectorComponent implements OnInit {
  sectorData: Sector;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private sectorService: SectorsService
  ){}

  ngOnInit() {
    this.isEdit = true;
    this.loadData();
  }

  loadData() {
    this.ionLoader.showLoader();
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('sectorId')) {
        this.navCtrl.navigateBack('/sectors');
        return;
      }
      this.sectorService.getSector(paramMap.get('sectorId')).subscribe(
        (res: Sector) => {
          this.sectorData = {
            sectorId: res.sectorId,
            sectorName: res.sectorName,
            sectorType: res.sectorType,
            active: res.active
          };
        },
        err => console.log('Error occurred: ' + err.message),
        () => this.ionLoader.hideLoader()
      );
    });
  }

  updateSector(sectorItem: Sector) {
    this.ionLoader.showLoader();
    this.sectorService.updateSector(sectorItem).subscribe(
      () => this.toastService.presentToastWithOptions('UPDATE CONFIRMATION',
              `${sectorItem?.sectorName} updated successfully!`, 3000, true),
      err => console.log(err),
      () => this.ionLoader.hideLoader()
    );
  }
}
