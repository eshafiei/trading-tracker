import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewSectorPageRoutingModule } from './new-sector-routing.module';
import { NewSectorPage } from './new-sector.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSectorPageRoutingModule,
    SharedModule
  ],
  declarations: [NewSectorPage]
})
export class NewSectorPageModule {}
