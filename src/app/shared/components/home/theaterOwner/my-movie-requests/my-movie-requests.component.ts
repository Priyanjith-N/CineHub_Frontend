import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetAllMovieRequestsSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { IMovieRequestDetails, IMovieReRequestCredentials } from '../../../../models/requestMovie.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { IReRequestMovieSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-my-movie-requests',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    ReactiveFormsModule,
    PaginationComponent
  ],
  templateUrl: './my-movie-requests.component.html',
  styleUrl: './my-movie-requests.component.css'
})
export class MyMovieRequestsComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  
  private data: IMovieRequestDetails[] = [];
  displayData: IMovieRequestDetails[] = [];
  reRequestMovieForm!: FormGroup;
  reRequestData: IMovieRequestDetails | null = null;
  isFormSubmited: boolean = false;

  constructor() {
    this.getAllMovieRequests();
  }

  private getAllMovieRequests() {
    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.theaterOwnerService.getAllMovieRequests();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  closeModal() {
    this.reRequestData = null;
  }

  reRequest(requestData: IMovieRequestDetails) {
    this.reRequestData = requestData;
    this.reRequestMovieForm = new FormGroup({
      profitSharingPerTicket: new FormControl(requestData.profitSharingPerTicket, [Validators.required]),
      timePeriod: new FormControl(requestData.timePeriod, [Validators.required]),
    });
  }

  reRequestForMovieSubmit() {
    if(this.reRequestMovieForm.get('profitSharingPerTicket')?.hasError('message') || this.reRequestMovieForm.get('timePeriod')?.hasError('message')) {
      this.reRequestMovieForm.get('profitSharingPerTicket')?.setErrors(null);
      this.reRequestMovieForm.get('timePeriod')?.setErrors(null);
    }

    if(this.reRequestMovieForm.value.profitSharingPerTicket < 0 || this.reRequestMovieForm.value.profitSharingPerTicket > this.reRequestData!.movieData.profitSharingPerTicket ){
      this.reRequestMovieForm.get('profitSharingPerTicket')?.setErrors({ message: `Value should be in range 0 - ${this.reRequestData!.movieData.profitSharingPerTicket}.` });
    }else if(this.reRequestMovieForm!.value.timePeriod <= 0) {
      this.reRequestMovieForm.get('timePeriod')?.setErrors({ message: "Select days more than 1." });
    }

    if(this.reRequestMovieForm.invalid || this.isFormSubmited || !this.reRequestData) {
      return this.reRequestMovieForm.markAllAsTouched();
    }

    this.isFormSubmited = true;

    const data: IMovieReRequestCredentials = {
      profitSharingPerTicket: this.reRequestMovieForm.value.profitSharingPerTicket,
      timePeriod: this.reRequestMovieForm.value.timePeriod
    }

    const reRequestMovieAPIResponse$: Observable<IReRequestMovieSucessfullResponse> = this.theaterOwnerService.reRequestForMovie(data, this.reRequestData._id);

    reRequestMovieAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;

        this.getAllMovieRequests();

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
        this.closeModal();

        console.error(err);
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((req) => req.movieData.name.toLowerCase().startsWith(searchText) || req.distributerData.name.toLowerCase().startsWith(searchText));
  }

  getData(pageNumber: number = 1) {
    console.log(pageNumber);
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
