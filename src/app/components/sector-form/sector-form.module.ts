import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SectorFormComponent } from './sector-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [SectorFormComponent],
  exports: [SectorFormComponent]
})
export class SectorFormModule {}
