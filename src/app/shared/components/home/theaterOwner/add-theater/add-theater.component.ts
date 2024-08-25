import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ITheaterCredentials from '../../../../models/ITheaterCredentials.interface';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { IAddTheaterErrorResponse, IAddTheaterSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import { Observable } from 'rxjs';
import IToastOption from '../../../../models/IToastOption.interface';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { IAddressDetails, ILocation } from '../../../../models/theater.entity';
import * as L from 'leaflet';
import { Browser, Map, map, tileLayer, Marker, marker, Icon, LatLng, LeafletMouseEvent } from 'leaflet';
import { GeoJSON, GeoJsonProperties } from 'geojson';
import { environment } from '../../../../../../environments/environment.development';
import { AddressSearchService } from '../../../../../core/services/address-search.service';

@Component({
  selector: 'app-add-theater',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-theater.component.html',
  styleUrl: './add-theater.component.css'
})
export class AddTheaterComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  private router: Router = inject(Router);

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('searchBox')
  private inputSearch!: ElementRef<HTMLInputElement>;
  private location: ILocation | null = null;
  private confirmedLocation: ILocation | null = null;
  confirmedAddress: string | null = null;
  private lefletMap!: Map;
  private marker!: Marker<any>;
  placeResults: IAddressDetails[] = []
  selectedLocation: string = '';

  isFormSubmited: boolean = false;
  chooseLocationModal: boolean = false;
  private images: File[] = [];
  private licence: File | null = null;
  previewImage: string[] = [];
  previewLicence: string | null = null;

  form: FormGroup;

  constructor() {
    this.location = null;
    this.confirmedLocation = null;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      images: new FormControl(''),
      licence: new FormControl('')
    })
  }

  private getLocation(lat: number, lng: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.addressSearchService.reverseGeoCoding(lat, lng).subscribe(
        (res => {
          if(res?.results) {
            const properites: GeoJsonProperties = res.results[0] as GeoJsonProperties;
  
            if(properites) {
              resolve(properites['formatted']);
            }else{
              reject();
            }
          }else{
            reject();
          }
        }),
        ((err: any) => {
          console.log(err);
          reject();
        })
      );
    });
  }
  
  searchPlace(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const text: string = inputElement.value;

    if(!text) return;

    const APIResponse$: Observable<GeoJSON.FeatureCollection> = this.addressSearchService.getPlaces(text);

    this.placeResults = [];

    APIResponse$.subscribe(
      (res => {
        res.features.forEach((value) => {
          if(this.placeResults.length >= 4) return;
          const properites = value.properties;
          if(!properites) return;
  
          const results: IAddressDetails = {
            address: properites['formatted'],
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

    const latLng = new L.LatLng(selectedPlace.lat, selectedPlace.lng);

    this.lefletMap.removeLayer(this.marker);

    this.marker = marker(latLng, {
      icon: new Icon({
        iconUrl: 'assets/images/marker.png',
        iconSize: [25,34],
        iconAnchor: [15, 40]
      })
    }).addTo(this.lefletMap);
    

    this.lefletMap.setView(latLng, 17);

    this.location = {
      lat: latLng.lat,
      lng: latLng.lng
    }

    this.inputSearch.nativeElement.value = selectedPlace.address;
    this.selectedLocation = selectedPlace.address;
  }

  confirmLocation() {
    if(this.location && this.selectedLocation) {
      this.confirmedLocation = {
        lat: this.location.lat,
        lng: this.location.lng,
      }

      this.confirmedAddress = this.selectedLocation;

      this.location = null;
      this.selectedLocation = '';

      this.chooseLocationModal = false;
    }
  }

  async closeModal() {
    this.chooseLocationModal = false;
    this.location = null;
    this.selectedLocation = '';
  }

  async openModal() {
    try {
      this.form.get('location')?.setErrors(null);

      this.chooseLocationModal = true;

      const coordinates: ILocation = await this.getCurrentLocation();

      if(this.confirmedAddress && this.confirmedLocation) {
        this.location = {
          lat: this.confirmedLocation.lat,
          lng: this.confirmedLocation.lng
        }

        this.selectedLocation = this.confirmedAddress;
      }else{
        this.location = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      }

      this.inputSearch.nativeElement.value = this.selectedLocation;

      this.lefletMap = map(this.mapContainer.nativeElement).setView([this.location.lat, this.location.lng], 17);

      const isRetina = Browser.retina;
      const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${environment.GEOAPIFY_API_KEY}`;
      const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${environment.GEOAPIFY_API_KEY}`;

      tileLayer(isRetina ? retinaUrl : baseUrl, {
        apiKey: environment.GEOAPIFY_API_KEY,
        maxZoom: 20,
        id: 'osm-bright',
      } as any).addTo(this.lefletMap);

      this.lefletMap.addControl(L.control.layers());

      const currentLatLng = new LatLng(this.location.lat, this.location.lng);

      this.marker = marker(currentLatLng, {
        icon: new Icon({
          iconUrl: 'assets/images/marker.png',
          iconSize: [25,34],
          iconAnchor: [15, 40]
        })
      }).addTo(this.lefletMap);


      this.lefletMap.addEventListener('click', async (event: LeafletMouseEvent) => {
        this.lefletMap.removeLayer(this.marker); // remove current marker

        this.marker = marker(event.latlng, {
          icon: new Icon({
            iconUrl: 'assets/images/marker.png',
            iconSize: [25,34],
            iconAnchor: [15, 40]
          })
        }).addTo(this.lefletMap);

        const result: string  = await this.getLocation(event.latlng.lat, event.latlng.lng);
        
        
        this.lefletMap.setView(event.latlng, 17);
        
        
        this.selectedLocation = result;
        
        this.inputSearch.nativeElement.value = result;
        this.selectedLocation = result;

        this.location = {
          lat: event.latlng.lat,
          lng: event.latlng.lng
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  private getCurrentLocation(): Promise<ILocation> {
    return new Promise((resolve, reject) => {
      if(!navigator.geolocation) reject("Geolocation not supported")
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }
      )
    })
  }

  isFormInvalid() {
    this.form.get('images')?.setErrors(null);
    this.form.get('licence')?.setErrors(null);

    if(this.images.length && this.licence) return false;

    if(!this.images.length){
      this.form.get('images')?.setErrors({ message: 'This Field is requied.' })
    }

    if(!this.licence) {
      this.form.get('licence')?.setErrors({ message: 'This Field is required.' })
    }
    
    if(!this.confirmedLocation) {
      this.form.get('location')?.setErrors({ message: 'This Field is required.' })
    }

    return true;
  }

  uploadMemberImage(event: Event, licence: boolean = true) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const fileList: FileList | null = inputElement.files;

    const validExtentions: Set<string> = new Set([
      '.png',
      '.svg',
      '.jpg',
      '.avif',
      '.jpeg',
    ]);

    if (!fileList) return;

    if(licence) {
      this.form.get('licence')?.setErrors(null);
      this.licence = fileList[0];
      this.previewLicence = URL.createObjectURL(this.licence);
    }else{
      if((this.images.length + fileList.length) > 4) {
        this.form.get('images')?.setErrors({ message: `Please select up to 2 images.` });
        inputElement.value = '';
        return;
      }
      this.form.get('images')?.setErrors(null);
      
      for(let i = 0; i<fileList.length; i++) {
        const file: File = fileList[i];
        if(validExtentions.has(file.name.substring(file.name.lastIndexOf('.')))) {
          this.images.push(file);
        }
      }

      this.showPreviewImages();
    }
    inputElement.value = '';
  }

  deleteLicence() {
    this.licence = null;
    this.previewLicence = null;
  }

  deleteImage(idx: number) {
    this.images.splice(idx, 1);
    this.showPreviewImages();
  }

  showPreviewImages() {
    this.previewImage = [];

    for(const file of this.images) {
      const base64Images: string = URL.createObjectURL(file);
      this.previewImage.push(base64Images);
    }
  }

  async onSubmit() {
    if(this.isFormInvalid() || this.form.invalid || this.isFormSubmited) {
      return this.form.markAllAsTouched();
    }

    this.isFormSubmited = true;

    const images: string[] = await this.ConvertToBase64();
    const licence: string = await this.ConvertToBase64Helper(this.licence!);

    const theaterCredential: ITheaterCredentials = {
      name: this.form.value.name,
      images,
      licence,
      location: this.confirmedLocation!
    }

    const addTheaterAPIResponse$: Observable<IAddTheaterSucessfullResponse> = this.theaterOwnerService.addTheater(theaterCredential);
    
    addTheaterAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/theaterOwner/managetheater']); // navigate.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        
        if(err.errorField) {
          const errObj: IAddTheaterErrorResponse = err as IAddTheaterErrorResponse;
          this.form.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          this.form.markAllAsTouched();
        }
      })
    );
  }

  private async ConvertToBase64(): Promise<string[] | never> {
    try {
      const base64Images: string[] = [];

      for(const file of this.images) {
        const base64: string = await this.ConvertToBase64Helper(file);
        base64Images.push(base64)
      }

      return base64Images;
    } catch (err: any) {
      console.error(err, 'err in converting to base64');
      throw err;
    }
  }

  private async ConvertToBase64Helper(file: File): Promise<string> {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      const base64String: string = await promise;
      return base64String;
    } catch (err: any) {
      console.error(err, 'err in converting to base64');
      throw err;
    }
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
