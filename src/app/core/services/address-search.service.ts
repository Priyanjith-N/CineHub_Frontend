import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressSearchService {
  private httpClient: HttpClient = inject(HttpClient);

  private getPlacesAPI: string = `https://api.geoapify.com/v1/geocode/autocomplete?apiKey=${environment.GEOAPIFY_API_KEY}`;

  private getCitysAPI: string = `https://api.geoapify.com/v1/geocode/autocomplete?type=city&format=json&apiKey=${environment.GEOAPIFY_API_KEY}`;

  private getPlaceDetailsAPI: string = `https://api.geoapify.com/v1/geocode/reverse?format=json&apiKey=${environment.GEOAPIFY_API_KEY}`;

  constructor() { }

  getPlaces(text: string): Observable<GeoJSON.FeatureCollection> {
    const url: string = `${this.getPlacesAPI}&text=${text}`;

    return this.httpClient.get<GeoJSON.FeatureCollection>(url);
  }

  reverseGeoCoding(lat: number, lng: number) {
    const url: string = `${this.getPlaceDetailsAPI}&lat=${lat}&lon=${lng}`;
    return this.httpClient.get<any>(url);
  }

  getCity(text: string): Observable<GeoJSON.FeatureCollection> {
    const url: string = `${this.getCitysAPI}&text=${text}`;

    return this.httpClient.get<GeoJSON.FeatureCollection>(url);
  }
}
