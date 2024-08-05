import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from '../../../../core/services/toast-message.service';
import IToastOption from '../../../../shared/models/IToastOption.interface';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../../../../shared/components/home/admin/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../../../shared/components/home/admin/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    AdminHeaderComponent
  ],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {
  constructor() {}
}
