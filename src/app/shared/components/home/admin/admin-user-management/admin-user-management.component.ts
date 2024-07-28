import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IBlockOrUnblockAPISucessfullResponse, IRetriveDataSucessfullAPIResponse, IUserData } from '../../../../models/adminAPIResponse.interface';
import { ModalComponent } from '../../../modal/modal/modal.component';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    AdminTableComponent,
    ModalComponent
  ],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.css'
})
export class AdminUserManagementComponent {
  private data: IUserData[] = [];
  blockUserData: {_id: string, isBlocked: boolean, name: string} | null = null;
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

   confirm(confirm: boolean) {
    if(confirm && this.blockUserData) {
      this.blockOrUnblockUser(this.blockUserData);
    }

    this.blockUserData = null;
   }

   popConfimationModal(data: {_id: string, isBlocked: boolean, name: string}) {
    this.blockUserData = data;
   }

   private blockOrUnblockUser(data: {_id: string, isBlocked: boolean, name: string}) {
    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.adminService.blockOrUnblockUser(data);

    blockOrUnblockAPIResponse$.subscribe(
      ((res: IBlockOrUnblockAPISucessfullResponse) => {
        console.log(res.message);
        this.userData = this.userData.map((user) => {
          if(user._id === data._id) {
            user.isBlocked = !user.isBlocked;
          }
          return user;
        })
      }),
      ((err: any) => {
        if(err.requiredCredentialsError) {
          console.error(err);
        }else{
          console.error(err);
        }
      })
    );
   }
}
