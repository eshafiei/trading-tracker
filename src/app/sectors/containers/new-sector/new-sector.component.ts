import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Sector } from '../../models/sector.model';
import { SectorsService } from '../../sectors.service';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.component.html',
  styleUrls: ['./new-sector.component.scss'],
})
export class NewSectorComponent implements OnInit {
  sectorData: Sector;
  isEdit: boolean;
  private sectorId: string;

  constructor(private ionLoader: LoaderService,
    private toastService: ToastService,
    private sectorService: SectorsService,
    private messageService: MessageService,
    private route: Router) {}

  ngOnInit() {
    this.isEdit = false;
  }

  addSector(sectorItem: Sector) {
    this.ionLoader.showLoader();
    sectorItem.sectorId = this.generateGUID();
    this.sectorService.saveSector(sectorItem).subscribe(
      () => {
        this.toastService.presentToastWithOptions('SAVE CONFIRMATION',
              `${sectorItem?.sectorName} created successfully!`, 3000, true);
        this.messageService.sendMessage('reload');
        this.route.navigate(['./sectors']);
      },
      err => console.log(err),
      () => this.ionLoader.hideLoader()
    );
  }

  generateGUID(){
    this.sectorId=UUID.UUID();
    return this.sectorId;
  }
}
