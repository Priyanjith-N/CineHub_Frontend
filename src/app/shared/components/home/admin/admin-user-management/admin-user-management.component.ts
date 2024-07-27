import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IRetriveDataSucessfullAPIResponse, IUserData } from '../../../../models/adminAPIResponse.interface';

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
  private data: IUserData[] = [];
  userData: IUserData[] = [];

  constructor(private adminService: AdminService) {
    const getUserAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<IUserData>> = this.adminService.getAllUsers();

    getUserAPIResponse$.subscribe(
      ((res: IRetriveDataSucessfullAPIResponse<IUserData>) => {
        console.log(res.message);
        this.data = res.data;
        this.userData = this.data;
      }),
      ((err: any) => {
        console.log(err);
        
      })
    );
   }

   search(searchText: string) {
    this.userData = this.data.filter((user) => {
      return (user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase()) || user.phoneNumber.toLowerCase().includes(searchText.toLowerCase()));
    });
   }
}
