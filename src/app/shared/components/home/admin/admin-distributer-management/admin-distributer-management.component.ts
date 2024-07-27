import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { IDistributerData, IRetriveDataSucessfullAPIResponse } from '../../../../models/adminAPIResponse.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';

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
  private data: IDistributerData[] = [];
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
      return (distributer.name.toLowerCase().includes(searchText.toLowerCase()) || distributer.email.toLowerCase().includes(searchText.toLowerCase()) || distributer.phoneNumber.toLowerCase().includes(searchText.toLowerCase()));
    });
   }
}
