import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { IAvaliableTimeSchedules } from '../../../../models/theater.entity';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { ITheaterOwnerMovieDetails } from '../../../../models/theaterOwnerCollection.entity';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IAddMovieSchedule, IGetAllMoviesFromCollectionSucessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMovieSchedule, { IScheduleCredentials } from '../../../../models/schedule.entity';
import { ActivatedRoute, Router } from '@angular/router';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-add-schedule',
  standalone: true,
  imports: [
    FormatTimePipe,
    ReactiveFormsModule
  ],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.css'
})
export class AddScheduleComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  @ViewChild('movieSearch')
  private movieSearchInput!: ElementRef<HTMLInputElement>;

  form: FormGroup;
  isFormSubmited: boolean = false;

  avaliableTimeSchedule: IAvaliableTimeSchedules[] | null = null;
  selectedTimeSlotIdx: number | undefined;
  selectedTheaterOwnerMovie: ITheaterOwnerMovieDetails | null = null;
  private data: ITheaterOwnerMovieDetails[] = [];
  private allSchedulesOnDate: IMovieSchedule[] = [];
  displaySuggestions: ITheaterOwnerMovieDetails[] | null = null;

  constructor() {
    this.form = new FormGroup({
      date: new FormControl('', [Validators.required]),
      movieToPlay: new FormControl(''),
      timeSlot: new FormControl('')
    });

    const APIResponse$: Observable<IGetAllMoviesFromCollectionSucessfullResponse> = this.theaterOwnerService.getallmoviesfromcollection();

    APIResponse$.subscribe((res) => {
      this.data = res.data;
    });

    
  }

  private cheack() {
    if(!this.selectedTheaterOwnerMovie || !this.form.value.date) {
      this.avaliableTimeSchedule = null;
      this.form.get('movieToPlay')?.setErrors(null);
      this.form.get('timeSlot')?.setErrors(null);
      return;
    };

    const date: Date = new Date(this.form.value.date);

    if(this.form.value.date && (date <= new Date(Date.now()))) {
      this.form.get('date')?.setErrors({ message: "Cannot select past date." });
      return this.form.get('date')?.markAllAsTouched();
    }

    this.form.get('movieToPlay')?.setErrors(null);
    this.form.get('timeSlot')?.setErrors(null);

    this.getShecdulesOnDate(this.form.value.date);
  }

  private getALLAvaliableTime() {
    this.avaliableTimeSchedule = [];

    let hour = 9;
    let minutes = 0;

    const duration = {
      hour: this.selectedTheaterOwnerMovie!.movieData.duration.hours,
      min: this.selectedTheaterOwnerMovie!.movieData.duration.minutes
    }

    while(hour <= 24) {
      if(minutes > 0 && minutes < 15 ) {
        minutes = 15;
      }else if(minutes > 15 && minutes < 30) {
        minutes = 30;
      }else if(minutes > 30 && minutes < 45) {
        minutes = 45
      }else if(minutes > 45 && minutes < 60) {
        hour++;
        minutes = 0;
      }

      const start: string = `${(hour<10)?('0'+ hour) :hour}: ${(minutes<10)?('0'+ minutes) :minutes}`;

      const startTime: Date = new Date();
      startTime.setHours(hour);
      startTime.setMinutes(minutes);

      hour += duration.hour;
      if(hour > 24) break;
      minutes += duration.min;

      if(minutes >= 60) {
        const spareTime = minutes % 60;
        hour++;
        minutes=spareTime;
      }

      const end: string = `${(hour<10)?('0'+ hour) :hour}: ${(minutes<10)?('0'+ minutes) :minutes}`;

      const endTime: Date = new Date();
      endTime.setHours(hour);
      endTime.setMinutes(minutes);

      let isSlotTaken: boolean = false;

      for(const schedule of this.allSchedulesOnDate) {
        const takenStartTime: Date = new Date();
        takenStartTime.setHours(Number(schedule.startTime.split(':')[0]));
        takenStartTime.setMinutes(Number(schedule.startTime.split(':')[1]));

        const takenEndTime: Date = new Date();
        takenEndTime.setHours(Number(schedule.endTime.split(':')[0]));
        takenEndTime.setMinutes(Number(schedule.endTime.split(':')[1]));

        if(takenStartTime >= startTime && takenEndTime >= startTime) {
          isSlotTaken = true;
          hour = takenEndTime.getHours();
          minutes = takenEndTime.getMinutes();
          break;
        }else if(takenStartTime >= endTime && takenEndTime >= endTime){
          isSlotTaken = true;
          hour = takenEndTime.getHours();
          minutes = takenEndTime.getMinutes();
          break;
        }
      }

      if(!isSlotTaken) {
        this.avaliableTimeSchedule.push({
          start,
          end
        });
      }

      minutes += 15; // cleaning time

      if(minutes > 60) {
        const spareTime = minutes % 60;
        hour++;
        minutes+=spareTime;
      }
    }
  }

  selectSlot(idx: number) {
    this.form.get('timeSlot')?.setErrors(null);
    this.selectedTimeSlotIdx = idx;
  }

  showMovieSuggestionsToPlay() {
    if(!this.selectedTheaterOwnerMovie) {
      this.displaySuggestions = this.data;
    }
  }

  date() {
    this.cheack();
  }

  private getShecdulesOnDate(date: Date) {
    const screenId: string = this.activatedRoute.snapshot.params['screenId'];
    const APIResponse$ = this.theaterOwnerService.getAllScheduleOnDate(date, screenId);

    APIResponse$.subscribe(
      (res => {
        this.allSchedulesOnDate = res.data;
        this.getALLAvaliableTime();
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }

  hideSuggestions() {
    this.displaySuggestions = null;
  }

  selectMovieToPlay(idx: number) {
    this.form.get('movieToPlay')?.setErrors(null);
    this.selectedTheaterOwnerMovie = this.displaySuggestions![idx];
    this.movieSearchInput.nativeElement.value = this.selectedTheaterOwnerMovie!.movieData.name;
    this.displaySuggestions = null;
    this.cheack();
  }

  showFiltedMovie(event: Event) {
    this.form.get('movieToPlay')?.setErrors(null);
    this.selectedTheaterOwnerMovie = null;
    this.cheack();

    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const searchText: string = inputElement.value.toLowerCase();

    this.displaySuggestions = this.data.filter((collection) => collection.movieData.name.toLowerCase().startsWith(searchText));
  }

  onSubmit() {
    this.cheack();
    this.validateForm();
    if(this.form.invalid || this.isFormSubmited) return this.form.markAllAsTouched();

    this.isFormSubmited = true;

    const screenId: string = this.activatedRoute.snapshot.params['screenId'];

    const scheduleCredentials: IScheduleCredentials = {
      date: new Date(this.form.value.date),
      screenId,
      movieId: this.selectedTheaterOwnerMovie!.movieData._id,
      startTime: this.avaliableTimeSchedule![this.selectedTimeSlotIdx!].start,
      endTime: this.avaliableTimeSchedule![this.selectedTimeSlotIdx!].end
    }

    const APIResponse$: Observable<IAddMovieSchedule> = this.theaterOwnerService.addMovieSchedule(scheduleCredentials);

    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.toastMessageService.showToast(toastOption);

        const theaterId: string = this.activatedRoute.parent!.snapshot.params['theaterId'];
        const screenId: string = this.activatedRoute.snapshot.params['screenId'];

        const url = `/theaterOwner/managetheater/${theaterId}/manageschedule/${screenId}`;
        this.router.navigate([url]);
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        console.error(err);
      })
    );
    
  }

  private validateForm() {
    const date: Date = new Date(this.form.value.date);
    
    if(!this.selectedTheaterOwnerMovie) this.form.get('movieToPlay')?.setErrors({ message: "This Field is required." });

    if(this.form.value.date && (date <= new Date(Date.now()))) this.form.get('date')?.setErrors({ message: "Cannot select past date." });

    if(this.form.value.date && this.selectedTheaterOwnerMovie && (date > new Date(this.selectedTheaterOwnerMovie.movieValidity))) this.form.get('movieToPlay')?.setErrors({ message: `${this.selectedTheaterOwnerMovie.movieData.name} movie can used till ${ new Date(this.selectedTheaterOwnerMovie.movieValidity).toDateString() }` });

    if(this.selectedTimeSlotIdx === undefined) this.form.get('timeSlot')?.setErrors({ message: 'This Field is required.' });
  }
}
