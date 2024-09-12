import { inject, Pipe, PipeTransform } from '@angular/core';
import { AddressSearchService } from '../../core/services/address-search.service';
import { ILocation } from '../models/theater.entity';
import { catchError, map, Observable } from 'rxjs';

import { GeoJsonProperties } from 'geojson';

@Pipe({
  name: 'locationAddressPipe',
  standalone: true
})
export class LocationAddressPipePipe implements PipeTransform {
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  transform(location: ILocation): Observable<string> {
    return this.addressSearchService.reverseGeoCoding(location.lat, location.lng).pipe(
      map(res => {
        if(res?.results) {
          const properites: GeoJsonProperties = res.results[0] as GeoJsonProperties;

          if(properites) {
            return properites['formatted'] || 'Unknown Address'
          }

          return 'Unknown Address'
        }
      }),
      catchError((err: any) => {
        console.log(err);
        return 'Address Error'
      })
    );;
  }

}
