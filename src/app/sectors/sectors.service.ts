import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sector } from './models/sector.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  sectorsUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/sectors';
  sectorUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/sector';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  payload: any;

  constructor(private http: HttpClient) {
  }

  sectors(userId: string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(this.sectorsUrl, {params});
  }

  getSector(sectorId: string): Observable<any> {
    const params = new HttpParams().set('sectorId', sectorId);
    return this.http.get(this.sectorUrl, {params});
  }

  saveSector(sector: Sector) {
    this.payload = {
      sectorId: sector.sectorId,
      sectorName: sector.sectorName,
      active: sector.active,
      userId: sector.userId
    };
    return this.http.post(this.sectorUrl, this.payload);
  }

  updateSector(sector: Sector) {
    this.payload = {
      sectorId: sector.sectorId,
      sectorName: sector.sectorName,
      active: sector.active,
      userId: sector.userId
    };
    return this.http.put(this.sectorUrl, this.payload);
  }

  deleteSector(sectorId: string) {
    this.payload = {body: {sectorId}};
    return this.http.delete(this.sectorUrl, this.payload);
  }

  getSectorsDropDown(userId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('action', 'getSectorChoices');
    return this.http.get(this.sectorsUrl, {params});
  }
}
