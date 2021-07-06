import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoaderService } from '../../../shared/services/loader.service';
import { MessageService } from '../../../shared/services/message.service';
import { ToastService } from '../../../shared/services/toast.service';
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
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private sectorService: SectorsService,
    private route: Router,
    private messageService: MessageService
  ){}

  ngOnInit() {
    this.isEdit = true;
    this.loadData();
  }

  loadData() {
    let sectorId: string;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('sectorId')) {
        this.navCtrl.navigateBack('/sectors');
        return;
      }
      sectorId = paramMap.get('sectorId');
    });
    if (sectorId) {
      this.ionLoader.showLoader();
      this.sectorService.getSector(sectorId).subscribe(
        (res: Sector) =>
          this.sectorData = {
            sectorId: res.sectorId,
            sectorName: res.sectorName,
            sectorType: res.sectorType,
            active: res.active
          },
        err => console.log('Error occurred: ' + err.message),
        () => this.ionLoader.hideLoader()
      );
    }
  }

  updateSector(sectorItem: Sector) {
    this.ionLoader.showLoader();
    this.sectorService.updateSector(sectorItem).subscribe(
      () => {
        this.toastService.presentToastWithOptions('UPDATE CONFIRMATION',
              `${sectorItem?.sectorName} updated successfully!`, 2000, true);
        this.messageService.sendMessage('reload');
        this.ionLoader.hideLoader();
        this.route.navigate(['./sectors']);
      },
      err => console.log(err),
      () => this.ionLoader.hideLoader()
    );
  }
}
