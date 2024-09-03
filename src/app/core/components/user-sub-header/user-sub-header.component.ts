import { Component, inject } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { ChooseLocationModalComponent } from '../../../shared/components/modal/choose-location-modal/choose-location-modal.component';

@Component({
  selector: 'app-user-sub-header',
  standalone: true,
  imports: [
    ChooseLocationModalComponent
  ],
  templateUrl: './user-sub-header.component.html',
  styleUrl: './user-sub-header.component.css'
})
export class UserSubHeaderComponent {
  private locationService: LocationService = inject(LocationService);

  choosenLocation: { latitude: number; longitude: number; city: string; } | null = null;

  openChooseLocationModal: boolean = false;

  constructor() {
    this.locationService.location$.subscribe(
      (choosenLocation => {
        this.choosenLocation = choosenLocation;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  showOrCloseChooseLocationModal(status: boolean) {
    this.openChooseLocationModal = status;
  }
}
