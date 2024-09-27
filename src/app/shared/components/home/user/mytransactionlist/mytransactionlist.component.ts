import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';
import { DateFormaterToLocalStringPipe } from '../../../../pipes/date-formater-to-local-string.pipe';
import { FormatTimePipe } from '../../../../pipes/format-time.pipe';
import { UserService } from '../../../../../core/services/user.service';
import { IGetAllTransactionListSucessfullResponse } from '../../../../models/userAPIResponse.interface';
import { Observable } from 'rxjs';
import { ITicketDetails } from '../../../../models/ticket.entity';

@Component({
  selector: 'app-mytransactionlist',
  standalone: true,
  imports: [
    FormatTimePipe,
    DateFormaterToLocalStringPipe,
    LocationAddressPipePipe,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './mytransactionlist.component.html',
  styleUrl: './mytransactionlist.component.css'
})
export class MytransactionlistComponent {
  private userService: UserService = inject(UserService);

  transactionList: ITicketDetails[] = [];

  constructor() {
    this.getData();
  }

  private getData() {
    const APIResponse$: Observable<IGetAllTransactionListSucessfullResponse> = this.userService.getAllTransactionList();

    APIResponse$.subscribe(
      (res => {
        this.transactionList = res.data
      }),
      ((err: any) => {
      })
    );
  }
}
