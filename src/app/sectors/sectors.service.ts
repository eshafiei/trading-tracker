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
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  body: any;

  constructor(private http: HttpClient) {
  }

  sectors() {
    return this.http.get(this.sectorsUrl);
  }

  getSector(sectorId: string): Observable<any> {
    const params = new HttpParams().set('sectorId', sectorId);
    return this.http.get(this.sectorUrl, {params});
  }

  saveSector(sector: Sector) {
    console.log('from service: ', sector);
  }

  deleteSector(sectorId: string) {
    this.body = {body: {sectorId}};
    return this.http.delete(this.sectorUrl, this.body);
  }
}
