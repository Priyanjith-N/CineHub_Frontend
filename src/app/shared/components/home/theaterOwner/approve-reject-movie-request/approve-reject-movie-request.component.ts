import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { Observable } from 'rxjs';
import { IGetAllMovieRequestsSucessfullResponse } from '../../../../models/distributerAPIResponse.interface';
import { IMovieRequestDetailsForDistributer } from '../../../../models/requestMovie.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-approve-reject-movie-request',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe
  ],
  templateUrl: './approve-reject-movie-request.component.html',
  styleUrl: './approve-reject-movie-request.component.css'
})
export class ApproveRejectMovieRequestComponent {
  private distributerService: DistributerService = inject(DistributerService);

  private data: IMovieRequestDetailsForDistributer[] = [];
  displayData: IMovieRequestDetailsForDistributer[] = [];

  constructor() {
    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.distributerService.getAllMovieRequest();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((req) => req.movieData.name.toLowerCase().startsWith(searchText) || req.theaterOwnerData.name.toLowerCase().startsWith(searchText));
  }
}
