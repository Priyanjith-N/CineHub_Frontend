import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DistributerAuthService } from '../../../../core/services/distributer-auth.service';
import { ILogoutSuccessfullResponse } from '../../../../shared/models/ILogoutResponse.interface';
import { SidebarComponent } from '../../../../shared/components/home/distributer/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/home/distributer/header/header.component';

@Component({
  selector: 'app-distributer-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './distributer-home-page.component.html',
  styleUrl: './distributer-home-page.component.css'
})
export class DistributerHomePageComponent {
  constructor(private router: Router, private distributerAuthService: DistributerAuthService) { }

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