import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectorsPage } from './sectors.page';

const routes: Routes = [
  {
    path: '',
    component: SectorsPage
  },
  {
    path: 'edit/:sectorId',
    loadChildren: () => import('./edit-sector/edit-sector.module').then(m => m.EditSectorPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new-sector/new-sector.module').then(m => m.NewSectorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsPageRoutingModule {}
