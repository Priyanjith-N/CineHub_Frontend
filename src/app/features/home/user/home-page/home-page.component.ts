import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserAuthService } from '../../../../core/services/user-auth.service';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';
import { UserHeaderComponent } from '../../../../core/components/user-header/user-header.component';
import { UserSubHeaderComponent } from '../../../../core/components/user-sub-header/user-sub-header.component';
import { UserFooterComponent } from '../../../../core/components/user-footer/user-footer.component';
import { LocationService } from '../../../../core/services/location.service';
import { AddressSearchService } from '../../../../core/services/address-search.service';

import { GeoJsonProperties } from 'geojson'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserSubHeaderComponent,
    UserFooterComponent,
    RouterOutlet
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  private locationService: LocationService = inject(LocationService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  constructor(private router: Router, private userAuthService: UserAuthService) {
    if(this.locationService.isLocationNull() && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position => {
        this.addressSearchService.reverseGeoCoding(position.coords.latitude, position.coords.longitude).subscribe(
          (res => {
            if(res?.results) {
              const properites: GeoJsonProperties = res.results[0] as GeoJsonProperties;
    
              if(properites) {
                this.locationService.setValue({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  city: properites['city']
                })
              }
            }
          }),
          ((err: any) => {
            console.log(err);
          })
        );
      }))
    }
   }

  async logout() {
    const logoutAPIResponse$ = this.userAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        // toast message if needed
        localStorage.removeItem('token') // remove token
        this.router.navigate(['/auth/login']);
      },
      (err: any) => {
        if(err.error) {
          // toast message if needed
        }else{
          // toast message if needed
        }
      }
    );
  }
}
