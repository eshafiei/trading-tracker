import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    SharedRoutingModule
  ],
  exports: []
})
export class SharedModule { }
