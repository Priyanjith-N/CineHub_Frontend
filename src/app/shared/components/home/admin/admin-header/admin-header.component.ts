import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  heading: string = '';
  constructor(private router: Router) {
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
    }else if(['/userManagement', '/theaterOwnerManagement', '/distributerManagement'].includes(url)){
      this.heading = 'Administration';
    }
    
  }

}
