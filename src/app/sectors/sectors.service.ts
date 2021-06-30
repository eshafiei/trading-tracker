import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Sector } from './models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  getSectorsUrl = 'https://eouf4erho8.execute-api.us-east-1.amazonaws.com/prod/sectors';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  sectorsList: any = {};

  constructor(private http: HttpClient) {
  }

  sectors() {
    return this.http.get(this.getSectorsUrl);
  }

  getSector(id: number): Sector {
    return {...this.sectorsList.find(p => p.id === id)};
  }

  saveSector(sector: Sector) {
    console.log('from service: ', sector);
  }
}
