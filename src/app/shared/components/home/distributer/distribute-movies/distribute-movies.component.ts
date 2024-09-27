import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IDistributeMovieData, IMovie } from '../../../../models/IMovieCredentials.interface';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { Observable } from 'rxjs';
import { IDistributeMovieErrorResponse, IDistributeMovieSuccessfullResponse, IGetAllAvaliableMovieDataSuccessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-distribute-movies',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './distribute-movies.component.html',
  styleUrl: './distribute-movies.component.css'
})
export class DistributeMoviesComponent {
  private distributerService: DistributerService = inject(DistributerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);

  private data: IMovie[] = [];
  displayData: IMovie[] = [];

  movieName: null | string = null;
  movieId: null | string = null;
  distributeForm: FormGroup;
  isFormSubmited: boolean = false;

  constructor() {
    this.distributeForm = new FormGroup({
      profitSharingPerTicket: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required)
    });

    this.getData();
  }

  private getData() {
    const getMovieDataAPIResponse$: Observable<IGetAllAvaliableMovieDataSuccessfullResponse> = this.distributerService.getAllAvailableMovies();

    getMovieDataAPIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {})
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((movie) => {
      return movie.name.toLowerCase().startsWith(searchText);
    });
  }

  openModal(id: string, movieName: string) {
    this.movieId = id;
    this.movieName = movieName;
  }

  closeModal() {
    this.distributeForm.reset();
    this.movieId = null;
    this.movieName = null;
  }

  distributeMovie() {
    if(this.distributeForm.get('profitSharingPerTicket')?.hasError('message') || this.distributeForm.get('releaseDate')?.hasError('message')) {
      this.distributeForm.get('profitSharingPerTicket')?.setErrors(null);
      this.distributeForm.get('releaseDate')?.setErrors(null);
    }

    if(this.distributeForm.value.profitSharingPerTicket < 0 || this.distributeForm.value.profitSharingPerTicket > 95 ){
      this.distributeForm.get('profitSharingPerTicket')?.setErrors({ message: "Value should be in range 0 - 95." });
    }else if(new Date(this.distributeForm.value.releaseDate) < new Date()) {
      this.distributeForm.get('releaseDate')?.setErrors({ message: "Cannot select past date." });
    }

    if(this.distributeForm.invalid || !this.movieId || this.isFormSubmited) {
      return this.distributeForm.markAllAsTouched();
    }

    this.isFormSubmited = true;

    const distributeMovieData: IDistributeMovieData = {
      profitSharingPerTicket: this.distributeForm.value.profitSharingPerTicket,
      releaseDate: this.distributeForm.value.releaseDate,
      movieId: this.movieId
    }

    const distributeMovieAPIResponse$: Observable<IDistributeMovieSuccessfullResponse> = this.distributerService.distributeMovie(distributeMovieData);

    distributeMovieAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        this.getData();
        this.closeModal();
      }),
      ((err: any) => {
        this.isFormSubmited = false;
      })
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
