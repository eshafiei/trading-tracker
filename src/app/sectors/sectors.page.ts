import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { Sector, Sectors } from './models/sector.model';
import { SectorsService } from './sectors.service';

@Component({
  selector: 'app-sectors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit {
  sectors: Sector[];
  constructor(private sectorService: SectorsService,
    private alertController: AlertController,
    private ionLoader: LoaderService,
    private ref: ChangeDetectorRef) { }

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

  async deleteSector(sectorId: string) {
    this.alertController.create({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this sector?',
      buttons: [
        { text: 'Cancel', role: 'cancel'},
        { text: 'Delete',
          handler: () => {
            this.sectorService.deleteSector(sectorId).subscribe(
              res => {
                this.sectors = this.sectors.filter(s => s.sectorId !== sectorId);
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
