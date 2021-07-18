import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAssetPageRoutingModule } from './new-asset-routing.module';

import { NewAssetPage } from './new-asset.page';
import { AssetFormModule } from 'src/app/components/asset-form/asset-form/asset-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAssetPageRoutingModule,
    ReactiveFormsModule,
    AssetFormModule
  ],
  declarations: [NewAssetPage]
})
export class NewAssetPageModule {}
