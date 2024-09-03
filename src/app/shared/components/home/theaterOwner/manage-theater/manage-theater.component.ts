import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import ITheater from '../../../../models/theater.entity';
import { Observable } from 'rxjs';
import { IGetAllTheatersSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-manage-theater',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent
  ],
  templateUrl: './manage-theater.component.html',
  styleUrl: './manage-theater.component.css'
})
export class ManageTheaterComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);

  private data: ITheater[] = [];
  displayData: ITheater[] = [];
  isListed: boolean = true;

  constructor() {
    const getTheatersAPIResponse$: Observable<IGetAllTheatersSucessfullResponse> = this.theaterOwnerService.getAllTheaters();

    getTheatersAPIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data.filter((theater) => this.isListed === theater.isListed);
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  changeItems() {
    this.isListed = !this.isListed;
    this.displayData = this.data.filter((theater) => this.isListed === theater.isListed);
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
    this.displayData = this.data.filter((theater) => theater.name.toLowerCase().startsWith(searchText));
  }

  getData(pageNumber: number = 1) {
    console.log(pageNumber);
  }
}
