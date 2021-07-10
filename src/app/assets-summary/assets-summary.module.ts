import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetsSummaryPageRoutingModule } from './assets-summary-routing.module';

import { AssetsSummaryPage } from './assets-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetsSummaryPageRoutingModule
  ],
  declarations: [AssetsSummaryPage]
})
export class AssetsSummaryPageModule {}
