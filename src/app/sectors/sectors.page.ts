import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Sector, Sectors } from './models/sector.model';
import { SectorsService } from './sectors.service';

@Component({
  selector: 'app-sectors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit, ViewDidEnter {
  sectors: Sector[];
  constructor(private sectorService: SectorsService,
    private alertController: AlertController,
    private ionLoader: LoaderService,
    private ref: ChangeDetectorRef,
    private toastService: ToastService) { }

  ngOnInit() {
    this.ionLoader.showLoader();
    this.sectorService.sectors().subscribe(
        (res: Sectors) => {
          this.sectors = res.sectors;
          this.ref.detectChanges();
        },
        err => console.log('Error occurred: ' + err.message),
        () => this.ionLoader.hideLoader()
      );
  }

  ionViewDidEnter(): void {
    this.ref.detectChanges();
  }

  async deleteSector(sector: Sector) {
    this.alertController.create({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this sector?',
      buttons: [
        { text: 'Cancel', role: 'cancel'},
        { text: 'Delete',
          handler: () => {
            this.sectorService.deleteSector(sector.sectorId).subscribe(
              () => {
                this.sectors = this.sectors.filter(s => s.sectorId !== sector.sectorId);
                this.toastService.presentToastWithOptions('REMOVAL NOTIFICATION', `${sector.sectorName} has been deleted!`,
                  3000, true);
                this.ref.detectChanges();
              },
              err => console.log(err)
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
