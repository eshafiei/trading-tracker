import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Sector, Sectors } from './models/sector.model';
import { SectorsService } from './sectors.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit {
  sectors: Sector[];
  constructor(private sectorService: SectorsService, private alertController: AlertController) { }

  ngOnInit() {
    this.sectorService.sectors().subscribe(
        (res: Sectors) => this.sectors = res.sectors,
        err => console.log('Error occurred: ' + err.message)
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
            console.log('Deleted: ', sectorId);
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
