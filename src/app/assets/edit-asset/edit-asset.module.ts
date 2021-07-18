import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAssetPageRoutingModule } from './edit-asset-routing.module';

import { EditAssetPage } from './edit-asset.page';
import { AssetFormModule } from 'src/app/components/asset-form/asset-form/asset-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAssetPageRoutingModule,
    AssetFormModule
  ],
  declarations: [EditAssetPage]
})
export class EditAssetPageModule {}
