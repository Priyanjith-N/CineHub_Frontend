import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { IDistributerList } from '../../../../models/distributer.entity';
import { Observable } from 'rxjs';
import { IGetDistributerListAPISucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-distributer-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './distributer-listing.component.html',
  styleUrl: './distributer-listing.component.css'
})
export class DistributerListingComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);

  private data: IDistributerList[] = [];
  displayData: IDistributerList[] = [];

  constructor() {
    const getAllDistributedMoviesAPIResponse$: Observable<IGetDistributerListAPISucessfullResponse> = this.theaterOwnerService.getDistributersList();

    getAllDistributedMoviesAPIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((distributer) => distributer.name.toLowerCase().startsWith(searchText));
  }
}
