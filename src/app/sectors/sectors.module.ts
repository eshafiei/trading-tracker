import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectorsPageRoutingModule } from './sectors-routing.module';

import { SectorsPage } from './sectors.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SectorsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SectorsPage]
})
export class SectorsPageModule {}
