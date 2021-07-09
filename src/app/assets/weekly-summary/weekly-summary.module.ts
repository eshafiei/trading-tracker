import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklySummaryPageRoutingModule } from './weekly-summary-routing.module';

import { WeeklySummaryPage } from './weekly-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklySummaryPageRoutingModule
  ],
  declarations: [WeeklySummaryPage]
})
export class WeeklySummaryPageModule {}
