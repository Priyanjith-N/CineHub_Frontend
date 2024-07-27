import { Component } from '@angular/core';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { AdminService } from '../../../../../core/services/admin.service';
import { IRetriveDataSucessfullAPIResponse, ITheaterOwnerData } from '../../../../models/adminAPIResponse.interface';
import { Observable } from 'rxjs';

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
  private data: ITheaterOwnerData[] = [];
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
}
