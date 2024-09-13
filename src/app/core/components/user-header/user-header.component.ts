import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUserProfile } from '../../../shared/models/user.entity';
import { UserprofileService } from '../../services/userprofile.service';
import { CommonModule } from '@angular/common';
import { ILogoutSuccessfullResponse } from '../../../shared/models/ILogoutResponse.interface';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  private userAuthService: UserAuthService = inject(UserAuthService);
  private userProfileService: UserprofileService = inject(UserprofileService);
  private router: Router = inject(Router);

  userProfile: IUserProfile | null = null;

  constructor() {
    this.userProfileService.userProfile$.subscribe((userProfileData) => {
      this.userProfile = userProfileData;
    });
  }

  showDropdown = false;

  onMouseLeave() {
    // Delay hiding to allow time for the mouse to move to the button
    setTimeout(() => {
      if (!this.isMouseOverDropdown) {
        this.showDropdown = false;
      }
    }, 200);
  }

  // Track if the mouse is over the dropdown area
  isMouseOverDropdown = false;

  async logout() {
    const logoutAPIResponse$ = this.userAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        // toast message if needed
        localStorage.removeItem('token') // remove token
        
        this.router.navigate(['/auth/login']);
        
        this.userProfileService.setValue(null);
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
