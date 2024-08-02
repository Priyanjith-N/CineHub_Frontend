import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TheaterOwnerAuthService } from '../../../../core/services/theater-owner-auth.service';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';

@Component({
  selector: 'app-theater-owner-home-page',
  standalone: true,
  imports: [],
  templateUrl: './theater-owner-home-page.component.html',
  styleUrl: './theater-owner-home-page.component.css'
})
export class TheaterOwnerHomePageComponent {

  constructor(private router: Router, private theaterOwnerAuthService: TheaterOwnerAuthService) { }

  async logout() {
    
    const logoutAPIResponse$ = this.theaterOwnerAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        // toast message if needed
        this.router.navigate(['/theaterOwner/auth/login']);
      },
      (err: any) => {
        if(err.error) {
          // toast message if needed
        }else{
          // toast message if needed
        }
      }
    );
  }
}
