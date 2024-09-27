import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { IDistributeMovieData, IMovie } from '../../../../models/IMovieCredentials.interface';
import { IEditProfitSharingErrorResponse, IEditProfitSharingSuccessfullResponse, IMyDistributedMoviesSuccessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import { map, Observable } from 'rxjs';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-movies',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    ReactiveFormsModule
  ],
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css'
})
export class MyMoviesComponent {
  private distributerService: DistributerService = inject(DistributerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);

  private data: IMovie[] = [];
  displayData: IMovie[] = [];

  movieName: null | string = null;
  movieId: null | string = null;
  distributeForm: FormGroup;
  isFormSubmited: boolean = false;
  canChangeReleaseDate: boolean = false;

  constructor() {
    this.distributeForm = new FormGroup({
      profitSharingPerTicket: new FormControl('', Validators.required),
      releaseDate: new FormControl('', Validators.required)
    });

    this.getData();
  }

  private getData() {
    const getAllDistributedMoviesAPIResponse$: Observable<IMyDistributedMoviesSuccessfullResponse> = this.distributerService.getAllDistributedMovies();

    getAllDistributedMoviesAPIResponse$.subscribe(
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

    this.displayData = this.data.filter((movie) => movie.name.toLowerCase().startsWith(searchText));
  }

  openModal(id: string, movieName: string, idx: number) {
    if(new Date(this.displayData[idx].releaseDate!) > new Date()) {
      this.canChangeReleaseDate = true;
    }

    if(this.canChangeReleaseDate) {
      const date: string = new Date(this.displayData[idx].releaseDate!).toISOString().split('T')[0];
      this.distributeForm = new FormGroup({
        profitSharingPerTicket: new FormControl(this.displayData[idx].profitSharingPerTicket, Validators.required),
        releaseDate: new FormControl(date, Validators.required)
      });
    }else{
      this.distributeForm = new FormGroup({
        profitSharingPerTicket: new FormControl(this.displayData[idx].profitSharingPerTicket, Validators.required)
      });
    }

    this.movieId = id;
    this.movieName = movieName;
  }

  closeModal() {
    this.canChangeReleaseDate = false;
    this.distributeForm.reset();
    this.movieId = null;
    this.movieName = null;
  }

  editSharProfitPercentage() {
    if(this.distributeForm.get('profitSharingPerTicket')?.hasError('message') || this.distributeForm.get('releaseDate')?.hasError('message')) {
      this.distributeForm.get('profitSharingPerTicket')?.setErrors(null);
      this.distributeForm.get('releaseDate')?.setErrors(null);
    }

    if(this.distributeForm.value.profitSharingPerTicket < 0 || this.distributeForm.value.profitSharingPerTicket > 95 ){
      this.distributeForm.get('profitSharingPerTicket')?.setErrors({ message: "Value should be in range 0 - 95." });
    }else if(this.canChangeReleaseDate && (new Date(this.distributeForm.value.releaseDate) < new Date())) {
      this.distributeForm.get('releaseDate')?.setErrors({ message: "Cannot select past date." });
    }

    if(this.distributeForm.invalid || !this.movieId || this.isFormSubmited) {
      return this.distributeForm.markAllAsTouched();
    }

    this.isFormSubmited = true;

    let releaseDate: Date;
    if(!this.canChangeReleaseDate) {
      const movie: IMovie = this.displayData.find((movie) => movie._id === this.movieId)!;
      releaseDate = movie.releaseDate!;
    }else {
      releaseDate = this.distributeForm.value.releaseDate;
    }

    const distributeMovieData: IDistributeMovieData = {
      profitSharingPerTicket: this.distributeForm.value.profitSharingPerTicket,
      releaseDate,
      movieId: this.movieId
    }

    const editProfitSharingAPIResponse$: Observable<IEditProfitSharingSuccessfullResponse> = this.distributerService.editProfitSharing(distributeMovieData);

    editProfitSharingAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        this.closeModal();
        this.getData();
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
