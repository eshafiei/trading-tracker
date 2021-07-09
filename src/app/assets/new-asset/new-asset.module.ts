import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAssetPageRoutingModule } from './new-asset-routing.module';

import { NewAssetPage } from './new-asset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAssetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewAssetPage]
})
export class NewAssetPageModule {}
