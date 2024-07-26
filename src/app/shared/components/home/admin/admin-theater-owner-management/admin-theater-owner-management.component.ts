import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';

@Component({
  selector: 'app-admin-theater-owner-management',
  standalone: true,
  imports: [
    AdminTableComponent
  ],
  templateUrl: './admin-theater-owner-management.component.html',
  styleUrl: './admin-theater-owner-management.component.css'
})
export class AdminTheaterOwnerManagementComponent {

}
