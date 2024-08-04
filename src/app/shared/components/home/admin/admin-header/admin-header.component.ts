import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ILogoutSuccessfullResponse } from '../../../../models/ILogoutResponse.interface';
import { AdminAuthService } from '../../../../../core/services/admin-auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  heading: string = '';
  constructor(private router: Router, private adminAuthService: AdminAuthService) {
    this.changeHeading();
  }

  ngOnInit() {
    
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
        this.changeHeading();
      });
  }


  private changeHeading() {
    const url: string = this.router.url.substring(
      this.router.url.lastIndexOf('/')
    );
    
    if(url === '/admin') {
      this.heading = 'Dashboard';
    }else if(url === '/verifyRequest' || this.router.url.includes('/verifyRequest')){
      this.heading = 'Verify Requests'
    }else if(['/userManagement', '/theaterOwnerManagement', '/distributerManagement'].includes(url)){
      this.heading = 'Administration';
    }else if(url === '/moviemanagement' || url === '/addmovie') {
      this.heading = 'Movie Management'
    }
    
  }

  async logout() {
    
    const logoutAPIResponse$ = this.adminAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
        // toast message if needed
        this.router.navigate(['/admin/auth/login']);
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
