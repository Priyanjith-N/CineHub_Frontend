import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TheaterOwnerAuthService } from '../../../../core/services/theater-owner-auth.service';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/home/theaterOwner/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/home/theaterOwner/header/header.component';

@Component({
  selector: 'app-theater-owner-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
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
