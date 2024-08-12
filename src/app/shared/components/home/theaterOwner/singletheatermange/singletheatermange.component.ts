import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetTheaterSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import ITheater from '../../../../models/theater.entity';

@Component({
  selector: 'app-singletheatermange',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './singletheatermange.component.html',
  styleUrl: './singletheatermange.component.css'
})
export class SingletheatermangeComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);

  data?: ITheater;

  constructor() {
    const theaterId: string = this.activeRouter.snapshot.params['theaterId'];

    const getTheaterAPIResponse$: Observable<IGetTheaterSucessfullResponse> = this.theaterOwnerService.getTheater(theaterId);

    getTheaterAPIResponse$.subscribe(
      (res => {
        this.data = res.data;
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }
}
