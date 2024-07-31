import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../../core/services/user-auth.service';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';
import { UserHeaderComponent } from '../../../../core/components/user-header/user-header.component';
import { UserSubHeaderComponent } from '../../../../core/components/user-sub-header/user-sub-header.component';
import { LandingPageComponent } from '../../../../shared/components/home/user/landing-page/landing-page.component';
import { UserFooterComponent } from '../../../../core/components/user-footer/user-footer.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserSubHeaderComponent,
    LandingPageComponent,
    UserFooterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router, private userAuthService: UserAuthService, private authService: SocialAuthService) { }

  async logout() {
    
    const logoutAPIResponse$ = this.userAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        this.authService.authState.subscribe(async (user) => {
          if(user) {
            await this.authService.signOut();
          }
        });
        // toast message if needed
        this.router.navigate(['/auth/login']);
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
