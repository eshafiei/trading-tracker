import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSectorPage } from './new-sector.page';

const routes: Routes = [
  {
    path: '',
    component: NewSectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSectorPageRoutingModule {}
