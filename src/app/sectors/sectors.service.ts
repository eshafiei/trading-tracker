import { Injectable } from '@angular/core';
import { AssetType } from './models/asset-type.enum';
import { Sector } from './models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  private sectorsList: Sector[] = [
    { id: 1, name: 'Technology', type: AssetType.stock, active: true },
    { id: 2, name: 'Automaker', type: AssetType.stock, active: true },
    { id: 3, name: 'Crypto', type: AssetType.cryptocurrency, active: true },
    { id: 4, name: 'Retail', type: AssetType.stock, active: false }
  ];

  constructor() {
  }

  sectors(): Sector[] {
    return [...this.sectorsList];
  }

  getSector(id: number): Sector {
    return {...this.sectorsList.find(p => p.id === id)};
  }
}
