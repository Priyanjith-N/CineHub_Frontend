import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistributerAuthService } from '../../../../core/services/distributer-auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';

@Component({
  selector: 'app-distributer-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distributer-home-page.component.html',
  styleUrl: './distributer-home-page.component.css'
})
export class DistributerHomePageComponent {
  constructor(private router: Router, private distributerAuthService: DistributerAuthService, private authService: SocialAuthService) { }

  async logout() {
    
    const logoutAPIResponse$ = this.distributerAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        this.authService.signOut();
        // toast message if needed
        this.router.navigate(['/distributer/auth/login']);
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