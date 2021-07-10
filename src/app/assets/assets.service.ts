import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getAssets(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.assetsUrl, {params});
  }

  getAsset(assetId: string): Observable<any> {
    const params = new HttpParams().set('sectorId', assetId);
    return this.http.get(this.assetUrl, {params});
  }

  saveAsset(asset: Asset) {
    this.payload = {
      assetId: asset.assetId,
      assetType: asset.assetType,
      assetName: asset.assetName,
      quantity: asset.quantity,
      cost: asset.cost,
      purchaseDate: asset.purchaseDate,
      sectorId: asset.sectorId,
      userId: asset.userId
    };
    return this.http.post(this.assetUrl, this.payload);
  }

  updateAsset(asset: Asset) {
    this.payload = {
      assetId: asset.assetId,
      assetName: asset.assetName,
      assetType: asset.assetType,
      quantity: asset.quantity,
      cost: asset.cost,
      purchaseDate: asset.purchaseDate,
      sectorId: asset.sectorId,
      userId: asset.userId
    };
    return this.http.put(this.assetUrl, this.payload);
  }

  deleteAsset(assetId: string) {
    this.payload = {body: {assetId}};
    return this.http.delete(this.assetUrl, this.payload);
  }
}
