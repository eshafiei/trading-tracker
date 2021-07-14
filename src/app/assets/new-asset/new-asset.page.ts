import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { AuthorizationService } from '../../auth/services/authorization.service';
import { ToastService } from '../../shared/services/toast.service';
import { AssetsService } from '../assets.service';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { AssetType } from '../enums/asset-type.enum';
import { SectorsService } from '../../sectors/sectors.service';
import { Sector } from 'src/app/sectors/models/sector.model';
import { SectorChoices } from 'src/app/sectors/models/sector-choices.model';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.page.html',
  styleUrls: ['./new-asset.page.scss'],
})
export class NewAssetPage implements OnInit {
  public assetForm: FormGroup;
  isEdit: false;
  assetTypes: typeof AssetType = AssetType;
  assetTypeItems: string[] = [];
  //sectorItems: Sector[] = [];
  sectorChoices: SectorChoices[] = [];
  private assetId: string;
  private userId: string;

  constructor(private fb: FormBuilder,
    private assetService: AssetsService,
    private sectorService: SectorsService,
    private auth: AuthorizationService,
    private toastService: ToastService,
    private messageService: MessageService,
    private route: Router) {
    this.assetForm = this.fb.group({
      assetId: [''],
      assetType: [0, Validators.required],
      assetName: ['', Validators.required],
      quantity: [1, Validators.required],
      cost: [0, Validators.required],
      purchaseDate: [new Date().toISOString(), Validators.required],
      sectorId: ['', Validators.required],
      userId: ['']
    });
   }

  ngOnInit() {
    this.auth.getIdToken().subscribe(res => {
      this.userId = res.payload.sub;
    });
    this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
    this.sectorService.getSectorsDropDown(this.userId).subscribe(
      (res: any) => this.sectorChoices= res.sectorChoices,
      (err) => console.log(err)
    );
  }

  get f() {
    return this.assetForm.controls;
  }

  assetTypeChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.assetTypes[event.detail.value];
  }

  sectorChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.sectorChoices[event.detail.value].sectorName;
  }

  save() {
    const assetItem: Asset = this.assetForm.value;

    assetItem.assetId = this.generateGUID();
    assetItem.userId = this.userId;

    this.assetService.saveAsset(assetItem).subscribe(
      () => {
        this.toastService.presentToastWithOptions('SAVE CONFIRMATION',
              `${assetItem?.assetName} created successfully!`, 3000, true);
        this.messageService.sendMessage('reload');
        this.route.navigate(['./assets']);
      },
      err => console.log(err)
    );
    this.assetService.saveAsset(assetItem);
  }

  generateGUID(){
    this.assetId= UUID.UUID();
    return this.assetId;
  }

}
