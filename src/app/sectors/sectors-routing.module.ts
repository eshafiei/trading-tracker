import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectorsPage } from './sectors.page';

const routes: Routes = [
  {
    path: '',
    component: SectorsPage
  },
  {
    path: 'new-sector',
    loadChildren: () => import('./new-sector/new-sector.module').then( m => m.NewSectorPageModule)
  },
  {
    path: 'edit-sector/:id',
    loadChildren: () => import('./edit-sector/edit-sector.module').then( m => m.EditSectorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsPageRoutingModule {}
