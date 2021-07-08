import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MessageService } from '../../shared/services/message.service';
import { ToastService } from '../../shared/services/toast.service';
import { Sector } from '../models/sector.model';
import { SectorsService } from '../sectors.service';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.page.html',
  styleUrls: ['./edit-sector.page.scss'],
})
export class EditSectorPage implements OnInit {
  sectorData: Sector;
  isEdit: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
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
      this.sectorService.getSector(sectorId).subscribe(
        (res: Sector) =>
        {
          if(res !== null) {
            this.sectorData = {
              sectorId: res.sectorId,
              sectorName: res.sectorName,
              sectorType: res.sectorType,
              active: res.active,
              userId: res.userId
            };
          }
          else {
            this.navCtrl.navigateBack('/sectors');
            return;
          }
        } ,
        err => console.log('Error occurred: ' + err.message)
      );
    }
  }

  updateSector(sectorItem: Sector) {
    this.sectorService.updateSector(sectorItem).subscribe(
      () => {
        this.toastService.presentToastWithOptions('UPDATE CONFIRMATION',
              `${sectorItem?.sectorName} updated successfully!`, 2000, true);
        this.messageService.sendMessage('reload');
        this.route.navigate(['./sectors']);
      },
      err => console.log(err)
    );
  }
}
