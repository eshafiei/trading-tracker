import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAssetPageRoutingModule } from './edit-asset-routing.module';

import { EditAssetPage } from './edit-asset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAssetPageRoutingModule
  ],
  declarations: [EditAssetPage]
})
export class EditAssetPageModule {}
