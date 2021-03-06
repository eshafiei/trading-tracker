import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AssetsPageRoutingModule } from './assets-routing.module';

import { AssetsPage } from './assets.page';
import { SharedModule } from '../shared/shared.module';
import { AssetFormModule } from '../components/asset-form/asset-form/asset-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AssetsPage],
  providers: []
})
export class AssetsPageModule {}
