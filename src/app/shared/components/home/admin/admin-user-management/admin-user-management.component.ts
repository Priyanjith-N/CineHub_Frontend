import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    AdminTableComponent
  ],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.css'
})
export class AdminUserManagementComponent {

}
