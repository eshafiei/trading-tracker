import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Sector } from '../../models/sector.model';
import { SectorsService } from '../../sectors.service';
import { MessageService } from '../../../shared/services/message.service';
import { AppState } from '../../../store/models/app.state';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from '../../../store/models/authenticated-user.model';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.component.html',
  styleUrls: ['./new-sector.component.scss'],
})
export class NewSectorComponent implements OnInit {
  sectorData: Sector;
  isEdit: boolean;
  authenticatedUser: Observable<AuthenticatedUser[]>;
  private sectorId: string;

  constructor(private ionLoader: LoaderService,
    private toastService: ToastService,
    private sectorService: SectorsService,
    private messageService: MessageService,
    private route: Router,
    private store: Store<AppState>,
    private auth: AuthorizationService) {
      this.authenticatedUser = this.store.select('authenticatedUser');
      console.log(this.authenticatedUser);
    }

  ngOnInit() {
    this.isEdit = false;
  }

  addSector(sectorItem: Sector) {
    this.ionLoader.showLoader();
    sectorItem.sectorId = this.generateGUID();
    this.auth.getIdToken().subscribe(res => {
      sectorItem.userId = res.payload.sub;
    });

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
