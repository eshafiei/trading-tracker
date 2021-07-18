import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AuthorizationService } from '../../auth/services/authorization.service';
import { SectorChoices } from '../../sectors/models/sector-choices.model';
import { SectorsService } from '../../sectors/sectors.service';
import { MessageService } from '../../shared/services/message.service';
import { ToastService } from '../../shared/services/toast.service';
import { AssetsService } from '../assets.service';
import { AssetType } from '../enums/asset-type.enum';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.page.html',
  styleUrls: ['./edit-asset.page.scss'],
})
export class EditAssetPage implements OnInit {
  assetData: Asset;
  isEdit: boolean;
  userId: string;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];
  sectorChoices: SectorChoices[] = [];

  constructor(private assetsService: AssetsService,
    private sectorService: SectorsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private toastService: ToastService,
    private route: Router,
    private messageService: MessageService,
    private alertController: AlertController,
    private auth: AuthorizationService) { }

    ngOnInit() {
      this.isEdit = true;
      this.auth.getIdToken().subscribe(res => {
        this.userId = res.payload.sub;
      });
      this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
      this.sectorService.getSectorsDropDown(this.userId).subscribe(
        (res: any) => this.sectorChoices= res.sectorChoices,
        (err) => console.log(err)
      );
      this.loadData();
    }

    loadData() {
      let assetId: string;
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if(!paramMap.has('assetId')) {
          this.navCtrl.navigateBack('/assets');
          return;
        }
        assetId = paramMap.get('assetId');
      });
      if (assetId) {
        this.assetsService.getAsset(assetId).subscribe(
          (res: Asset) =>
          {
            if(res !== null) {
              this.assetData = {
                assetId: res.assetId,
                sectorId: res.sectorId,
                assetName: res.assetName,
                assetType: res.assetType,
                quantity: res.quantity,
                cost: res.cost,
                purchaseDate: res.purchaseDate,
                userId: res.userId
              };
            }
            else {
              this.navCtrl.navigateBack('/assets');
              return;
            }
          } ,
          err => console.log('Error occurred: ' + err.message)
        );
      }
    }

  updateAsset(assetItem: Asset) {
    this.assetsService.updateAsset(assetItem).subscribe(
      () => {
        this.toastService.presentToastWithOptions('UPDATE CONFIRMATION',
              `${assetItem?.assetName} updated successfully!`, 2000, true);
        this.messageService.sendMessage('reload');
        this.route.navigate(['./assets']);
      },
      err => console.log(err)
    );
  }

  deleteAsset(asset: Asset) {
    this.alertController.create({
      header: 'Delete Confirmation',
      message: 'Are you sure you want to delete this asset?',
      buttons: [
        { text: 'Cancel', role: 'cancel'},
        { text: 'Delete',
          handler: () => {
            this.assetsService.deleteAsset(asset.assetId).subscribe(
              () => {
                this.toastService.presentToastWithOptions('REMOVAL NOTIFICATION', `${asset.assetName} has been deleted!`,
                  3000, true);
                  this.messageService.sendMessage('reload');
                  this.route.navigate(['./assets']);
              },
              err => console.log(err)
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

}
