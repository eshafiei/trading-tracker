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
    { id: 4, name: 'Retail', type: AssetType.stock, active: true },
    { id: 5, name: 'Travel', type: AssetType.stock, active: true },
    { id: 6, name: 'Streaming', type: AssetType.stock, active: true },
    { id: 7, name: 'Energy', type: AssetType.stock, active: true },
    { id: 8, name: 'Green Energy', type: AssetType.stock, active: true },
    { id: 9, name: 'ETF', type: AssetType.etf, active: true }
  ];

  constructor() {
  }

  sectors(): Sector[] {
    return [...this.sectorsList];
  }

  getSector(id: number): Sector {
    return {...this.sectorsList.find(p => p.id === id)};
  }

  saveSector(sector: Sector) {
    console.log('from service: ', sector);
  }
}
