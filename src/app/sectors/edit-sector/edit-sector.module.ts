import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditSectorPageRoutingModule } from './edit-sector-routing.module';
import { EditSectorPage } from './edit-sector.page';
import { SectorFormModule } from '../../components/sector-form/sector-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSectorPageRoutingModule,
    SectorFormModule
  ],
  declarations: [EditSectorPage]
})
export class EditSectorPageModule {}
