import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthorizationService } from './services/authorization.service';
import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [AuthMenuComponent],
  providers: [AuthorizationService],
  exports: [AuthMenuComponent]
})
export class AuthModule {}
