import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DistributerAuthService } from '../../../../../core/services/distributer-auth.service';
import { filter } from 'rxjs';
import { ILogoutSuccessfullResponse } from '../../../../models/ILogoutResponse.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  heading: string = '';
  constructor(private router: Router, private distributerAuthService: DistributerAuthService) {
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
    
    if(url === '/distributer') {
      this.heading = 'Dashboard';
    }else if(url === '/distributemovies'){
      this.heading = 'Distribute Movies'
    }else if(url === '/managestreaming'){
      this.heading = 'Manage Streaming';
    }else if(url === '/mymovies') {
      this.heading = 'My Movies'
    }
    
  }

  async logout() {
    
    const logoutAPIResponse$ = this.distributerAuthService.handelLogoutRequest();
    
    logoutAPIResponse$.subscribe(
      (res: ILogoutSuccessfullResponse) => {
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
