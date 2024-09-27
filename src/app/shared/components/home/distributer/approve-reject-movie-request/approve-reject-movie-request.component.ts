import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DistributerService } from '../../../../../core/services/distributer.service';
import { Observable } from 'rxjs';
import { IApproveMovieRequestSucessfullResponse, IGetAllMovieRequestsSucessfullResponse, IRejectMovieRequestSucessfullResponse } from '../../../../models/distributerAPIResponse.interface';
import { IMovieRequestDetailsForDistributer } from '../../../../models/requestMovie.entity';
import { DateFormatterPipe } from '../../../../pipes/date-formatter.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRequestMovieSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-approve-reject-movie-request',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatterPipe,
    ReactiveFormsModule
  ],
  templateUrl: './approve-reject-movie-request.component.html',
  styleUrl: './approve-reject-movie-request.component.css'
})
export class ApproveRejectMovieRequestComponent {
  private distributerService: DistributerService = inject(DistributerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);

  private data: IMovieRequestDetailsForDistributer[] = [];
  displayData: IMovieRequestDetailsForDistributer[] = [];
  requestApproveModalViewData: IMovieRequestDetailsForDistributer | null = null;
  requestRejectModalViewData: IMovieRequestDetailsForDistributer | null = null;
  rejectForm: FormGroup;
  isFormSubmited: boolean = false;

  constructor() {
    this.rejectForm = new FormGroup({
      reason: new FormControl('', [Validators.required])
    });

    this.getData();
  }

  private getData() {
    const APIResponse$: Observable<IGetAllMovieRequestsSucessfullResponse> = this.distributerService.getAllMovieRequest();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
        this.displayData = this.data;
      }),
      ((err: any) => {
      })
    );
  }

  openApproveModal(idx: number) {
    this.requestApproveModalViewData = this.displayData[idx];
  }

  openRejectModal(idx: number) {
    this.requestRejectModalViewData = this.displayData[idx];
  }

  closeModal() {
    this.rejectForm.reset();
    this.requestApproveModalViewData = null;
    this.requestRejectModalViewData = null;
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((req) => req.movieData.name.toLowerCase().startsWith(searchText) || req.theaterOwnerData.name.toLowerCase().startsWith(searchText));
  }

  rejectOnSubmit() {
    if(this.rejectForm.invalid || !this.requestRejectModalViewData || this.isFormSubmited) return this.rejectForm.markAllAsTouched();

    this.isFormSubmited = true;  
    
    const APIResponse$: Observable<IRejectMovieRequestSucessfullResponse> = this.distributerService.rejectMovieRequest(this.requestRejectModalViewData._id, this.requestRejectModalViewData.theaterOwnerData.email, this.requestRejectModalViewData.movieData.name, this.rejectForm.value.reason);

    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        this.getData();
        this.closeModal();
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        this.closeModal();
      })
    );
  }

  approveSubmit() {
    if(this.isFormSubmited || !this.requestApproveModalViewData) return;

    this.isFormSubmited = true;

    const APIResponse$: Observable<IApproveMovieRequestSucessfullResponse> = this.distributerService.approveMovieRequest(this.requestApproveModalViewData._id, this.requestApproveModalViewData.theaterOwnerData.email, this.requestApproveModalViewData.movieData.name);

    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        this.getData();
        this.closeModal();
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        this.closeModal();
      })
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
