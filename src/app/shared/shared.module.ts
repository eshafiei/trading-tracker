import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedRoutingModule } from './shared-routing.module';
import { SectorFormComponent } from './components/sector/sector-form/sector-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SectorFormComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SectorFormComponent]
})
export class SharedModule { }
