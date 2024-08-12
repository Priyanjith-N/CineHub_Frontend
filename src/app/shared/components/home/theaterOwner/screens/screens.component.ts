import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import IScreen from '../../../../models/screen.entity';
import { Observable } from 'rxjs';
import { IGetAllScreensSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.css'
})
export class ScreensComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private activatedRouter: ActivatedRoute = inject(ActivatedRoute);

  screens: IScreen[] = [];
  selectedIdx: number = 0;
  seatCategory: string[] = [];

  viewSeatArrangement: boolean = false;
  viewSeatNumberPattern: boolean = false;

  constructor() {
    const theaterId: string = this.activatedRouter.snapshot.params['theaterId'];
    

    const getScreensAPIResponse$: Observable<IGetAllScreensSucessfullResponse> = this.theaterOwnerService.getAllScreens(theaterId);

    getScreensAPIResponse$.subscribe(
      (res => {
        this.screens = res.data;
        if(this.screens.length) {
          this.seatCategory = this.screens[this.selectedIdx].seatCategory.map((val) => {
            return val.category;
          });
        }
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  changeScreen(idx: number) {
    this.selectedIdx = idx;
    this.seatCategory = this.screens[this.selectedIdx].seatCategory.map((val) => {
      return val.category;
    });

  }

  openModal(modal: "seatArrangement" | "seatNumberPattern") {
    if(modal === 'seatArrangement') {
      this.viewSeatArrangement = true;
    }else if(modal === 'seatNumberPattern') {
      this.viewSeatNumberPattern = true;
    }
  }

  closeModal() {
    this.viewSeatArrangement = false;
    this.viewSeatNumberPattern = false;
  }
}
