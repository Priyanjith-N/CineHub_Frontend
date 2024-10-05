import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUserProfile } from '../../../shared/models/user.entity';
import { CommonModule } from '@angular/common';
import { ILogoutSuccessfullResponse } from '../../../shared/models/ILogoutResponse.interface';
import { UserAuthService } from '../../services/user-auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { IGetUserProfileSucessfullResponse } from '../../../shared/models/userAPIResponse.interface';

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
export class UserHeaderComponent implements OnInit {
  private userAuthService: UserAuthService = inject(UserAuthService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  userProfile: IUserProfile | null = null;

  constructor() {}

  ngOnInit(): void {
    const APIResponse$: Observable<IGetUserProfileSucessfullResponse> = this.userService.getUserProfileData();

    APIResponse$.subscribe(
      (res) => {
        this.userProfile = res.data;
      },
      ((err: any) => {})
    );
  }

  showDropdown = false;

  onMouseLeave() {
    setTimeout(() => {
      if (!this.isMouseOverDropdown) {
        this.showDropdown = false;
      }
    }, 200);
  }

  isMouseOverDropdown = false;

  async logout() {
    const logoutAPIResponse$ = this.userAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        localStorage.removeItem('token') // remove token
        
        this.router.navigate(['/auth/login']);
      },
      (err: any) => {});
  }
}
