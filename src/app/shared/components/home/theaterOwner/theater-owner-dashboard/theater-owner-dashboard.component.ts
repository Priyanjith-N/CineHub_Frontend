import { Component, inject } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetTheaterOwnerDashboardDataSuccessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { ITheaterOwnerDashboardData } from '../../../../models/theaterOwner.entity';

@Component({
  selector: 'app-theater-owner-dashboard',
  standalone: true,
  imports: [
    CountUpModule
  ],
  templateUrl: './theater-owner-dashboard.component.html',
  styleUrl: './theater-owner-dashboard.component.css'
})
export class TheaterOwnerDashboardComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);

  cardCountData: ITheaterOwnerDashboardData | undefined;

  constructor() {
    const APIResponse$: Observable<IGetTheaterOwnerDashboardDataSuccessfullResponse> = this.theaterOwnerService.getDashboardData();

    APIResponse$.subscribe(
      (res => {
        this.cardCountData = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }
}
