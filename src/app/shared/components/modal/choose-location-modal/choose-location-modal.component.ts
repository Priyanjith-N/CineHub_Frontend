import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
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
export class ChooseLocationModalComponent  implements OnInit, OnDestroy {
  private locationService: LocationService = inject(LocationService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);
  private searchInput = new Subject<string>();
  
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>;
  
  placeResults: IAddressDetails[] = []
  
  ngOnInit(): void {
    this.searchInput.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text) => this.addressSearchService.getPlaces(text)) // all previous request canncel for that i use switch Map
    ).subscribe(res => {
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
    })
  }

  ngOnDestroy(): void {
    this.searchInput.complete();
  }

  getMyLocaiton() {
    navigator.geolocation.getCurrentPosition((position => {
      this.addressSearchService.reverseGeoCoding(position.coords.latitude, position.coords.longitude).subscribe(
        (res => {
          this.closeModal.emit();
          
          if(res?.results) {
            const properites = res.results[0];
  
            if(properites) {
              this.locationService.setValue({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                city: properites['city']
              })
            }
          }
        }),
        ((err: any) => {})
      );
    }))
  }

  searchPlace(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const text: string = inputElement.value;

    if(!text) return;

    this.placeResults = [];

    this.searchInput.next(text);
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
