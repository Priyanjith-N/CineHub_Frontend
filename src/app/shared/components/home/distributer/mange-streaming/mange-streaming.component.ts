import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { IGetAllMoviesFromCollectionSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { Observable } from 'rxjs';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { IMyDistributedMoviesSuccessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMovieStreamingCredentials, IMovieStreamingCredentialsForEdit, IMovieStreamingDetails } from '../../../../models/movieStreaming.entity';
import { IAddStreamingErrorResponse, IAddStreamingSucessfullResponse, IEditStreamingErrorResponse, IEditStreamingSucessfullResponse, IGetAllStreamingMovieDetailsSucessfullResponse } from '../../../../models/distributerAPIResponse.interface';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-mange-streaming',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './mange-streaming.component.html',
  styleUrl: './mange-streaming.component.css'
})
export class MangeStreamingComponent {
  private distributerService: DistributerService = inject(DistributerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  @ViewChild('movieSearch')
  private movieSearchInput!: ElementRef<HTMLInputElement>;

  private data: IMovie[] = [];
  private streamingMovieData: IMovieStreamingDetails[] = [];
  private selectedStreaming: IMovieStreamingDetails | null = null; 
  displayData: IMovieStreamingDetails[] = [];
  selectedMovieToStream: IMovie | null = null;
  displaySuggestions: IMovie[] | null = null;
  isFormSubmited: boolean = false;
  openModal: boolean = false;

  modalHeading = "Streaming Movie";
  submitBtnText: "Add" | "Edit" = "Add"

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      movieToStream: new FormControl(''),
      rentAmount: new FormControl('', [Validators.required]),
      rentalPeriod: new FormControl('', [Validators.required]),
      buyAmount: new FormControl('', [Validators.required])
    });
    const APIResponse$: Observable<IMyDistributedMoviesSuccessfullResponse> = this.distributerService.getAllDistributedMovies();

    APIResponse$.subscribe((res) => {
      this.data = res.data.filter((movie) => new Date(Date.now()) > new Date(movie.releaseDate!));
    });

    this.getAllStreamingMovieData();
  }

  getAllStreamingMovieData() {
    const APIResponse$: Observable<IGetAllStreamingMovieDetailsSucessfullResponse> = this.distributerService.getAllStreamingMovieDetails();

    APIResponse$.subscribe(
      (res => {
        this.streamingMovieData = res.data;
        this.displayData = this.streamingMovieData;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.streamingMovieData.filter((streamingMovie) => streamingMovie.movieData.name.toLowerCase().startsWith(searchText));
  }

  getData(pageNumber: number) {
    
  }

  openOrCloseModal(open: boolean = true) {
    this.selectedMovieToStream = null;
    this.displaySuggestions = null;
    this.selectedStreaming = null;

    this.form.reset();

    this.openModal = open;

    this.modalHeading = "Streaming Movie";
    this.submitBtnText = "Add"
  }

  openEditModal(movieStreamingIdx: number) {
    this.selectedStreaming = this.displayData[movieStreamingIdx];
    this.selectedMovieToStream = this.selectedStreaming.movieData;

    if(!this.selectedMovieToStream) return;

    this.modalHeading = `Edit Streaming Details for ${this.selectedMovieToStream.name} Movie`;
    this.submitBtnText = "Edit"

    this.form = new FormGroup({
      movieToStream: new FormControl(''),
      rentAmount: new FormControl(this.displayData[movieStreamingIdx].rentAmount, [Validators.required]),
      rentalPeriod: new FormControl(this.displayData[movieStreamingIdx].rentalPeriod, [Validators.required]),
      buyAmount: new FormControl(this.displayData[movieStreamingIdx].buyAmount, [Validators.required])
    });

    this.openModal = true;
  }

  showMovieSuggestionsToPlay() {
    if(!this.selectedMovieToStream) {
      this.displaySuggestions = this.data;
    }
  }

  hideSuggestions() {
    this.displaySuggestions = null;
  }

  selectMovieToPlay(idx: number) {
    this.form.get('movieToStream')?.setErrors(null);
    this.selectedMovieToStream = this.displaySuggestions![idx];
    this.movieSearchInput.nativeElement.value = this.selectedMovieToStream!.name;
    this.displaySuggestions = null;
  }

  showFiltedMovie(event: Event) {
    this.form.get('movieToStream')?.setErrors(null);
    this.selectedMovieToStream = null;

    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displaySuggestions = this.data.filter((movie) => movie.name.toLowerCase().startsWith(searchText));
  }

  steamMovieSubmit() {
    this.validateForm();

    if(this.form.invalid || this.isFormSubmited) return this.form.markAllAsTouched();
    
    this.isFormSubmited = true;

    if(this.submitBtnText === "Add") {
      this.addStreaming();
    }else if(this.submitBtnText === "Edit") {
      this.editStreaming();
    }
  }

  deleteStreaming(streamingId: string) {
    const APIResponse$: Observable<{ message: string; }> = this.distributerService.deleteStreaming(streamingId);

    APIResponse$.subscribe(
      (res => {
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.

        this.getAllStreamingMovieData();
      }),
      ((err: any) => console.error(err))
    );
  }

  private editStreaming() {
    const data: IMovieStreamingCredentialsForEdit = {
      streamingId: this.selectedStreaming!._id,
      buyAmount: this.form.value.buyAmount,
      rentalPeriod: this.form.value.rentalPeriod,
      rentAmount: this.form.value.rentAmount,
      movieId: this.selectedMovieToStream!._id
    }

    const APIResponse$: Observable<IEditStreamingSucessfullResponse> = this.distributerService.editStreaming(data);
    
    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        this.openOrCloseModal(false);

        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.

        this.getAllStreamingMovieData();
      }),
      ((err: any) => {
        this.isFormSubmited = false;

        if(!err.errorField) return console.error(err);
        
        const errObj: IEditStreamingErrorResponse = err;

        this.form.get(errObj.errorField)?.setErrors({ message: errObj.message });
      })
    );
  }

  private addStreaming() {
    const data: IMovieStreamingCredentials = {
      buyAmount: this.form.value.buyAmount,
      rentalPeriod: this.form.value.rentalPeriod,
      rentAmount: this.form.value.rentAmount,
      movieId: this.selectedMovieToStream!._id,
    }

    const APIResponse$: Observable<IAddStreamingSucessfullResponse> = this.distributerService.addStreaming(data);
    
    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        this.openOrCloseModal(false);

        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.getAllStreamingMovieData();
      }),
      ((err: any) => {
        this.isFormSubmited = false;

        if(!err.errorField) return console.error(err);
        
        const errObj: IAddStreamingErrorResponse = err;

        this.form.get(errObj.errorField)?.setErrors({ message: errObj.message });
      })
    );
  }

  private validateForm() {
    if(this.submitBtnText === "Add" && !this.selectedMovieToStream) this.form.get('movieToStream')?.setErrors({ message: "This Field is required." });

    if(this.form.get('rentalPeriod')?.value === 0) this.form.get('rentalPeriod')?.setErrors({ message: "Minimum period is least 1 day." });
    
    const rentAmount: number | undefined = this.form.get('rentAmount')?.value;

    const buyAmount: number | undefined = this.form.get('buyAmount')?.value;

    if(rentAmount !== undefined && rentAmount === 0) this.form.get('rentAmount')?.setErrors({ message: "Amount cannot be 0." });

    if(buyAmount !== undefined && buyAmount === 0) this.form.get('buyAmount')?.setErrors({ message: "Amount cannot be 0." });

    if(buyAmount && rentAmount && buyAmount <= rentAmount) this.form.get('buyAmount')?.setErrors({ message: "Amount cannot be equal or less than rent amount." });
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
