import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { IBlockOrUnblockAPISucessfullResponse, IDistributerData, IRetriveDataSucessfullAPIResponse } from '../../../../models/adminAPIResponse.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../../modal/modal/modal.component';

@Component({
  selector: 'app-admin-distributer-management',
  standalone: true,
  imports: [
    AdminTableComponent,
    ModalComponent
  ],
  templateUrl: './admin-distributer-management.component.html',
  styleUrl: './admin-distributer-management.component.css'
})
export class AdminDistributerManagementComponent {
  private data: IDistributerData[] = [];
  blockDistributerData: {_id: string, isBlocked: boolean, name: string} | null = null;
  distributerData: IDistributerData[] = [];

  constructor(private adminService: AdminService) {
    const getDistributerAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<IDistributerData>> = this.adminService.getAllDistributers();

    getDistributerAPIResponse$.subscribe(
      ((res: IRetriveDataSucessfullAPIResponse<IDistributerData>) => {
        console.log(res.message);
        
        this.data = res.data;
        this.distributerData = this.data;
      }),
      ((err: any) => {
        console.log(err);
        
      })
    );
   }

   search(searchText: string) {
    this.distributerData = this.data.filter((distributer) => {
      return distributer.name.toLowerCase().startsWith(searchText);
    });
   }

   confirm(confirm: boolean) {
    if(confirm && this.blockDistributerData) {
      this.blockOrUnblockDistributer(this.blockDistributerData);
    }

    this.blockDistributerData = null;
   }

   popConfimationModal(data: {_id: string, isBlocked: boolean, name: string}) {
    this.blockDistributerData = data;
   }

   private blockOrUnblockDistributer(data: {_id: string, isBlocked: boolean, name: string}) {
    const blockOrUnblockAPIResponse$: Observable<IBlockOrUnblockAPISucessfullResponse> = this.adminService.blockOrUnblockDistributer(data);

    blockOrUnblockAPIResponse$.subscribe(
      ((res: IBlockOrUnblockAPISucessfullResponse) => {
        console.log(res.message);
        this.distributerData = this.distributerData.map((distributer) => {
          if(distributer._id === data._id) {
            distributer.isBlocked = !distributer.isBlocked;
          }
          return distributer;
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
