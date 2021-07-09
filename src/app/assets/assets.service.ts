import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from './models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  assetsUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/assets';
  assetUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/asset';
  payload: any;

  constructor(private http: HttpClient) {
  }

  // sectors(userId: string) {
  //   const params = new HttpParams().set('userId', userId);
  //   return this.http.get(this.sectorsUrl, {params});
  // }

  // getSector(sectorId: string): Observable<any> {
  //   const params = new HttpParams().set('sectorId', sectorId);
  //   return this.http.get(this.sectorUrl, {params});
  // }

  saveAsset(asset: Asset) {
    //console.log('save...', asset);
    this.payload = {
      assetId: asset.assetId,
      assetType: asset.assetType,
      assetName: asset.assetName,
      quantity: asset.quantity,
      cost: asset.cost,
      purchaseDate: asset.purchaseDate,
      userId: asset.userId
    };
    return this.http.post(this.assetUrl, this.payload);
  }

  // updateSector(sector: Sector) {
  //   this.payload = {
  //     sectorId: sector.sectorId,
  //     sectorName: sector.sectorName,
  //     sectorType: sector.sectorType,
  //     active: sector.active,
  //     userId: sector.userId
  //   };
  //   return this.http.put(this.sectorUrl, this.payload);
  // }

  // deleteSector(sectorId: string) {
  //   this.payload = {body: {sectorId}};
  //   return this.http.delete(this.sectorUrl, this.payload);
  // }
}
