import { Component, inject } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { ITicketDetails, ITicketDetailsWithLocationDecoded } from '../../../../models/ticket.entity';
import { Observable } from 'rxjs';
import { IGetAllActiveTicketsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';
import { AddressSearchService } from '../../../../../core/services/address-search.service';

import { GeoJsonProperties } from 'geojson';
import { ILocation } from '../../../../models/theater.entity';
import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-myactive-tickets',
  standalone: true,
  imports: [
    FormatTimePipe,
    DateFormaterToLocalStringPipe,
    LocationAddressPipePipe,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './myactive-tickets.component.html',
  styleUrl: './myactive-tickets.component.css'
})
export class MyactiveTicketsComponent {
  private userService: UserService = inject(UserService);
  private addressSearchService: AddressSearchService = inject(AddressSearchService);

  myActiveTickets: ITicketDetails[] = [];

  constructor() {
    this.getData();
  }

  private getData() {
    const APIResponse$: Observable<IGetAllActiveTicketsSucessfullResponse> = this.userService.getAllActiveTickets();

    APIResponse$.subscribe(
      (res => {
        this.myActiveTickets = res.data
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }
}
