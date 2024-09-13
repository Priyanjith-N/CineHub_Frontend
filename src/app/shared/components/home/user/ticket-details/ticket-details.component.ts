import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { IGetTicketDetailsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { Observable } from 'rxjs';
import { ITicketDetails } from '../../../../models/ticket.entity';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AsyncPipe,
    DateFormaterToLocalStringPipe,
    FormatTimePipe,
    LocationAddressPipePipe,
    
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ticketData!: ITicketDetails;

  constructor() {
    const ticketId: string = this.activatedRoute.snapshot.params['ticketId'];

    const APIResponse$: Observable<IGetTicketDetailsSucessfullResponse> = this.userService.getTicketDetails(ticketId);

    APIResponse$.subscribe(
      (res => {
        this.ticketData = res.data;
      }),
      (err => {
        console.error(err);
      })
    );
  }

  getSeatName(): string {
    const seatName: string[] = [];

    for(const seatDeatils of this.ticketData.seatDetails) {
      seatName.push(seatDeatils.name);  
    }

    return seatName.join(', ');
  }

  getSeatTotalPrice(): number {
    return this.ticketData.seatDetails.reduce((total, seatDetails) => total += seatDetails.price, 0);
  }
}