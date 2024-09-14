import { Component, inject } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { ITicketDetails } from '../../../../models/ticket.entity';
import { Observable } from 'rxjs';
import { ICancelTicketSucessfullResponse, IGetAllActiveTicketsSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';

import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import IToastOption from '../../../../models/IToastOption.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-myactive-tickets',
  standalone: true,
  imports: [
    FormatTimePipe,
    DateFormaterToLocalStringPipe,
    LocationAddressPipePipe,
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './myactive-tickets.component.html',
  styleUrl: './myactive-tickets.component.css'
})
export class MyactiveTicketsComponent {
  private userService: UserService = inject(UserService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);

  myActiveTickets: ITicketDetails[] = [];
  isCancelRequestDone: boolean = false;

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

  cancelTicket(event: Event, ticketId: string) {
    event.stopPropagation();
    
    if(this.isCancelRequestDone) return;

    this.isCancelRequestDone = true;

    const APIResponse$: Observable<ICancelTicketSucessfullResponse> = this.userService.cancelTicket(ticketId);

    APIResponse$.subscribe(
      (res => {
        this.isCancelRequestDone = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Ticket Canceled',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        this.getData();
      }),
      ((err: any) => {
        this.isCancelRequestDone = false;
        console.error(err);
      })
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
