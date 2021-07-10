import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsSummaryService {

  assetsUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/assets';
  assetUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/asset';
  payload: any;
  constructor(private http: HttpClient) { }

  getAssets(userId: string, startDate: Date, endDate: Date) {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('startDate', startDate.toISOString());
    params = params.append('endDate', endDate.toISOString());
    return this.http.get(this.assetsUrl, {params});
  }
}
