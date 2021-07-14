import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../auth/services/authorization.service';
import { MessageService } from '../shared/services/message.service';
import { ToastService } from '../shared/services/toast.service';
import { Sector } from './models/sector.model';
import { SectorsService } from './sectors.service';

@Component({
  selector: 'app-sectors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit, ViewDidEnter {
  sectors: Sector[];
  public sectorList: Observable<Sector[]>;

  constructor(private sectorService: SectorsService,
    private alertController: AlertController,
    private ref: ChangeDetectorRef,
    private toastService: ToastService,
    private messageService: MessageService,
    private auth: AuthorizationService) { }

  ionViewDidEnter(): void {
    this.messageService.receiveMessage().subscribe((m) => {
      if(m === 'reload') {
        this.loadData();
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let userId = '';
    this.auth.getIdToken().subscribe(res => {
      userId = res.payload.sub;
    });
    this.sectorService.sectors(userId).subscribe(
      (res: any) => {
        this.sectors = res.sectors;
        this.ref.detectChanges();
      },
      err => console.log('Error occurred: ' + err.message)
    );
  }

  deleteSector(sector: Sector) {
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
