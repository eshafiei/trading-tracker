import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../auth/services/authorization.service';
import { AssetsService } from './assets.service';
import { Asset } from './models/asset.model';

@Component({
  selector: 'app-assets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
})
export class AssetsPage implements OnInit {
  assets: Asset[];
  constructor(private assetsService: AssetsService,
    private ref: ChangeDetectorRef,
    private auth: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let userId = '';
    this.auth.getIdToken().subscribe(res => {
      userId = res.payload.sub;
    });
    this.assetsService.getAssets(userId).subscribe(
      (res: any) => {
        this.assets = res.assets;
        this.ref.detectChanges();
      },
      err => console.log('Error occurred: ' + err.message)
    );
  }

}
