import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddressDetails } from '../../../models/theater.entity';
import { AddressSearchService } from '../../../../core/services/address-search.service';
import { LocationService } from '../../../../core/services/location.service';

@Component({
  selector: 'app-choose-location-modal',
  standalone: true,
  imports: [],
  templateUrl: './choose-location-modal.component.html',
  styleUrl: './choose-location-modal.component.css'
})
export class ChooseLocationModalComponent {
  private locationService: LocationService = inject(LocationService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>;

  placeResults: IAddressDetails[] = []

  searchPlace(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const text: string = inputElement.value;

    if(!text) return;

    const APIResponse$: Observable<GeoJSON.FeatureCollection> = this.addressSearchService.getPlaces(text);

    this.placeResults = [];

    APIResponse$.subscribe(
      (res => {
        res.features.forEach((value) => {
          if(this.placeResults.length >= 5) return;
          const properites = value.properties;
          if(!properites) return;
  
          const results: IAddressDetails = {
            address: properites['city'],
            lng: properites['lon'],
            lat: properites['lat'],
          }
  
          this.placeResults.push(results);
        });
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  selectLocation(idx: number) {
    const selectedPlace: IAddressDetails = this.placeResults[idx];

    this.placeResults = [];

    this.locationService.setValue({
      latitude: selectedPlace.lat,
      longitude: selectedPlace.lng,
      city: selectedPlace.address,
    });
    
    this.closeModal.emit();
  }
}
