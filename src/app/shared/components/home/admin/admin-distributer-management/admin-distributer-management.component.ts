import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';

@Component({
  selector: 'app-admin-distributer-management',
  standalone: true,
  imports: [
    AdminTableComponent
  ],
  templateUrl: './admin-distributer-management.component.html',
  styleUrl: './admin-distributer-management.component.css'
})
export class AdminDistributerManagementComponent {

}
