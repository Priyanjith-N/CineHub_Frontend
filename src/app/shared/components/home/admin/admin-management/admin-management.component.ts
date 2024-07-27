import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css',
})
export class AdminManagementComponent {
  title: string = '';
  subDescription: string = '';

  constructor(private router: Router) {
    this.changeContent();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.changeContent();
      });
  }

  private changeContent() {
    const url: string = this.router.url.substring(
      this.router.url.lastIndexOf('/')
    );

    if(url === '/administration' || url === '/userManagement') {
      this.title = 'Manage User';
      this.subDescription = 'Administer and oversee user accounts and privileges within the platform.';
      this.router.navigate(['/admin/administration/userManagement']);
    }else if (url === '/theaterOwnerManagement') {
      this.title = 'Manage Theater Owner';
      this.subDescription =
        'Administer and oversee Theater Owner accounts and privileges within the platform.';
    } else if (url === '/distributerManagement') {
      this.title = 'Manage Distributer';
      this.subDescription =
        'Administer and oversee Distributer accounts and privileges within the platform.';
    }
  }
}
