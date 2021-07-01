import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSectorPageRoutingModule } from './edit-sector-routing.module';

import { EditSectorPage } from './edit-sector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSectorPageRoutingModule
  ],
  declarations: [EditSectorPage]
})
export class EditSectorPageModule {}
