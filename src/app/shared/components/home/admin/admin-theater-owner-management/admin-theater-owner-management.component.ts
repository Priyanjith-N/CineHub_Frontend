import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { AdminService } from '../../../../../core/services/admin.service';
import { IBlockOrUnblockAPISucessfullResponse, IRetriveDataSucessfullAPIResponse, ITheaterOwnerData } from '../../../../models/adminAPIResponse.interface';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../../modal/modal/modal.component';

@Component({
  selector: 'app-admin-theater-owner-management',
  standalone: true,
  imports: [
    AdminTableComponent,
    ModalComponent
  ],
  templateUrl: './admin-theater-owner-management.component.html',
  styleUrl: './admin-theater-owner-management.component.css'
})
export class AdminTheaterOwnerManagementComponent {
  private data: ITheaterOwnerData[] = [];
  blockTheaterOwnerData: {_id: string, isBlocked: boolean, name: string} | null = null;
  theaterOwnerData: ITheaterOwnerData[] = [];

  constructor(private adminService: AdminService) {
    const getTheaterOwnerAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>> = this.adminService.getAllTheatherOwners();

    getTheaterOwnerAPIResponse$.subscribe(
      ((res: IRetriveDataSucessfullAPIResponse<ITheaterOwnerData>) => {
        console.log(res.message);
        this.data = res.data;
        this.theaterOwnerData = this.data;
      }),
      ((err: any) => {
        console.log(err);
      })
    );
   }

   search(searchText: string) {
    this.theaterOwnerData = this.data.filter((theaterOwner) => {
      return (theaterOwner.name.toLowerCase().includes(searchText.toLowerCase()) || theaterOwner.email.toLowerCase().includes(searchText.toLowerCase()) || theaterOwner.phoneNumber.toLowerCase().includes(searchText.toLowerCase()));
    });
   }

   confirm(confirm: boolean) {
    if(confirm && this.blockTheaterOwnerData) {
      this.blockOrUnblockTheaterOwner(this.blockTheaterOwnerData);
    }

    this.blockTheaterOwnerData = null;
   }

   popConfimationModal(data: {_id: string, isBlocked: boolean, name: string}) {
    console.log(data);
    
    this.blockTheaterOwnerData = data;
   }

   private blockOrUnblockTheaterOwner(data: {_id: string, isBlocked: boolean, name: string}) {
    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.adminService.blockOrUnblockTheaterOwner(data);

    blockOrUnblockAPIResponse$.subscribe(
      ((res: IBlockOrUnblockAPISucessfullResponse) => {
        console.log(res.message);
        this.theaterOwnerData = this.theaterOwnerData.map((theaterOwner) => {
          if(theaterOwner._id === data._id) {
            theaterOwner.isBlocked = !theaterOwner.isBlocked;
          }
          return theaterOwner;
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
