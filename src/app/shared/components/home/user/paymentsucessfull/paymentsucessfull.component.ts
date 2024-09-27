import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { IBookSeatSucessfullResponse } from '../../../../models/userAPIResponse.interface';

@Component({
  selector: 'app-paymentsucessfull',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './paymentsucessfull.component.html',
  styleUrl: './paymentsucessfull.component.css'
})
export class PaymentsucessfullComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  bookingProcessing: boolean = true;
  ticketId: string = '';

  constructor(private http: HttpClient) {
    const checkoutSessionId: string = this.activatedRoute.snapshot.queryParams['session_id'];

    if(!checkoutSessionId) {
      this.router.navigate(['/']);
      return;
    }

    const APIResponse$: Observable<IBookSeatSucessfullResponse> = this.userService.bookSeat(checkoutSessionId);

    APIResponse$.subscribe(
      (res) => {
        this.bookingProcessing = false;
        this.ticketId = res.ticketId;
      },
      ((err: any) => {
        this.router.navigate(['/']);
      })
    )
  }
}
