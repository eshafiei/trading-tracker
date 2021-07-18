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
    private ref: ChangeDetectorRef,
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
}
