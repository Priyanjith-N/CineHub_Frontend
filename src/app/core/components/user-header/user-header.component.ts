import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IUserProfile } from '../../../shared/models/user.entity';
import { UserprofileService } from '../../services/userprofile.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  private userProfileService: UserprofileService = inject(UserprofileService);

  userProfile: IUserProfile | null = null;

  constructor() {
    this.userProfileService.userProfile$.subscribe((userProfileData) => {
      this.userProfile = userProfileData;
    });
  }
}
