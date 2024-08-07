import { Component, OnInit } from '@angular/core';
import { ILogoutSuccessfullResponse } from '../../../../models/ILogoutResponse.interface';
import { NavigationEnd, Router } from '@angular/router';
import { TheaterOwnerAuthService } from '../../../../../core/services/theater-owner-auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  heading: string = '';
  constructor(private router: Router, private theaterOwnerAuthService: TheaterOwnerAuthService) {
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
    
    if(url === '/theaterOwner') {
      this.heading = 'Dashboard';
    }else if(['/managetheater', '/addtheater'].includes(url)){
      this.heading = 'Manage Theater'
    }else if(url === '/managestreaming'){
      this.heading = 'Manage Streaming';
    }else if(url === '/mymovies') {
      this.heading = 'My Movies'
    }
    
  }

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
