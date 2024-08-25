import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetTheaterSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import ITheater from '../../../../models/theater.entity';

import { GeoJsonProperties } from 'geojson';
import { AddressSearchService } from '../../../../../core/services/address-search.service';

@Component({
  selector: 'app-singletheatermange',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './singletheatermange.component.html',
  styleUrl: './singletheatermange.component.css'
})
export class SingletheatermangeComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);

  data?: ITheater;
  addressLocation: string = '';

  constructor() {
    const theaterId: string = this.activeRouter.snapshot.params['theaterId'];

    const getTheaterAPIResponse$: Observable<IGetTheaterSucessfullResponse> = this.theaterOwnerService.getTheater(theaterId);

    getTheaterAPIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.getAddressLocation();
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  private getAddressLocation() {
      this.addressSearchService.reverseGeoCoding(this.data!.location.lat, this.data!.location.lng).subscribe(
        (res => {
          if(res?.results) {
            const properites: GeoJsonProperties = res.results[0] as GeoJsonProperties;
  
            if(properites) {
              this.addressLocation = properites['formatted'];
            }
          }
        }),
        ((err: any) => {
          console.log(err);
        })
      );
  }
}
