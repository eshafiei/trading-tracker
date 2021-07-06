import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectorsPageRoutingModule } from './sectors-routing.module';

import { SectorsPage } from './sectors.page';
import { SectorFormComponent } from './components/sector-form/sector-form.component';
import { EditSectorComponent } from './containers/edit-sector/edit-sector.component';
import { NewSectorComponent } from './containers/new-sector/new-sector.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SectorsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SectorsPage, NewSectorComponent, EditSectorComponent, SectorFormComponent],
  exports: [SectorFormComponent]
})
export class SectorsPageModule {}
