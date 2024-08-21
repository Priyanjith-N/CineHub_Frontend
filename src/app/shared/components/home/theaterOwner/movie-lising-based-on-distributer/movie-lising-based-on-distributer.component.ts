import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetMovieListOfDistributerDataAPISucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { IDistributerList } from '../../../../models/distributer.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMovieRequestCredentials from '../../../../models/requestMovie.entity';
import { IRequestMovieErrorResponse, IRequestMovieSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-movie-lising-based-on-distributer',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    ReactiveFormsModule
  ],
  templateUrl: './movie-lising-based-on-distributer.component.html',
  styleUrl: './movie-lising-based-on-distributer.component.css'
})
export class MovieLisingBasedOnDistributerComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);

  private data: IMovie[] = [];
  displayData: IMovie[] = [];
  distributerData: IDistributerList | null = null;
  requestMovieForm: FormGroup;
  requestMovie: IMovie | null = null;
  isFormSubmited: boolean = false;

  constructor() {
    const distributerId: string = this.activatedRoute.snapshot.params['distributerId'];

    const getMovieListOfDistributerDataAPIResponse$: Observable<IGetMovieListOfDistributerDataAPISucessfullResponse> = this.theaterOwnerService.getMovieListOfDistributerData(distributerId);

    getMovieListOfDistributerDataAPIResponse$.subscribe(
      (res => {
        this.distributerData = res.data.distributer;
        this.data = res.data.movieList;
        this.displayData = this.data;
      })
    );

    this.requestMovieForm = new FormGroup({
      profitSharingPerTicket: new FormControl('', [Validators.required]),
      timePeriod: new FormControl('', [Validators.required]),
    });
  }

  closeModal() {
    this.requestMovieForm.reset();
    this.requestMovie = null;
  }

  openRequestMovieModal(idx: number) {
    this.requestMovie = this.displayData[idx];
    this.requestMovieForm.get('profitSharingPerTicket')?.setValue(this.requestMovie.profitSharingPerTicket);
  } 

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((movie) => movie.name.toLowerCase().startsWith(searchText));
  }

  requestForMovieSubmit() {
    if(this.requestMovieForm.get('profitSharingPerTicket')?.hasError('message') || this.requestMovieForm.get('timePeriod')?.hasError('message')) {
      this.requestMovieForm.get('profitSharingPerTicket')?.setErrors(null);
      this.requestMovieForm.get('timePeriod')?.setErrors(null);
    }

    if(this.requestMovieForm.value.profitSharingPerTicket < 0 || this.requestMovieForm.value.profitSharingPerTicket > this.requestMovie?.profitSharingPerTicket! ){
      this.requestMovieForm.get('profitSharingPerTicket')?.setErrors({ message: `Value should be in range 0 - ${this.requestMovie?.profitSharingPerTicket!}.` });
    }else if(this.requestMovieForm.value.timePeriod <= 0) {
      this.requestMovieForm.get('timePeriod')?.setErrors({ message: "Select days more than 1." });
    }

    if(this.requestMovieForm.invalid || this.isFormSubmited || !this.requestMovie) {
      return this.requestMovieForm.markAllAsTouched();
    }

    this.isFormSubmited = true;
    const distributerId: string = this.activatedRoute.snapshot.params['distributerId'];

    const data: IMovieRequestCredentials = {
      profitSharingPerTicket: this.requestMovieForm.value.profitSharingPerTicket,
      timePeriod: this.requestMovieForm.value.timePeriod,
      requestedMovieId: this.requestMovie._id,
      requestedMovieDistributerId: distributerId
    }

    const requestMovieAPIResponse$: Observable<IRequestMovieSucessfullResponse> = this.theaterOwnerService.requestForMovie(data);

    requestMovieAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;

        this.closeModal();

        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }
        
        this.showToast(toastOption);
      }),
      ((err: any) => {
        this.isFormSubmited = false;

        if((err as IRequestMovieErrorResponse).errorField === "AlreadyRequested") {
          const toastOption: IToastOption = {
            severity: 'warn',
            summary: 'Already Requested',
            detail: `Already requested for ${this.requestMovie?.name} movie.`
          }
  
          this.showToast(toastOption);
        }else if((err as IRequestMovieErrorResponse).errorField === 'AlreadyExists') {
          const toastOption: IToastOption = {
            severity: 'warn',
            summary: 'Already In Collection',
            detail: `${this.requestMovie?.name} movie already exist in collections.`
          }
  
          this.showToast(toastOption);
        }
        
        this.closeModal();
      })
    );
    
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
