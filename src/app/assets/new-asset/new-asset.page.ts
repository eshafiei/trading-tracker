import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { AuthorizationService } from '../../auth/services/authorization.service';
import { ToastService } from '../../shared/services/toast.service';
import { AssetType } from '../../sectors/enums/asset-type.enum';
import { AssetsService } from '../assets.service';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';

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
  private assetId: string;

  constructor(private fb: FormBuilder,
    private assetService: AssetsService,
    private auth: AuthorizationService,
    private toastService: ToastService,
    private messageService: MessageService,
    private route: Router) {
    this.assetForm = this.fb.group({
      assetId: [''],
      assetType: [0, [Validators.required]],
      assetName: ['', Validators.required],
      quantity: [1, Validators.required],
      cost: [null, Validators.required],
      purchaseDate: [Date.now, Validators.required],
      userId: ['']
    });
   }

  ngOnInit() {
    this.assetTypeItems = Object.keys(this.assetTypes).filter(k => !isNaN(Number(k)));
  }

  get f() {
    return this.assetForm.controls;
  }

  sectorTypeChange(event: any, element: IonSelect) {
    element.value = event.detail.value;
    element.selectedText = this.assetTypes[event.detail.value];
  }

  save() {
    const assetItem = this.assetForm.value;

    assetItem.assetId = this.generateGUID();
    this.auth.getIdToken().subscribe(res => {
      assetItem.userId = res.payload.sub;
    });

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
