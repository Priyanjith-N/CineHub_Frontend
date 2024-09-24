import { Component, inject } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IGetDashboardDataSuccessfullResponse } from '../../../../models/adminAPIResponse.interface';
import { IDashboardDatas } from '../../../../models/admin.entity';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CountUpModule,
    AsyncPipe,
    LocationAddressPipePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private adminService: AdminService = inject(AdminService);

  data: IDashboardDatas | undefined;

  constructor() {
    this.getData();
  }

  private getData() {
    const APIResponse$: Observable<IGetDashboardDataSuccessfullResponse> = this.adminService.getDashboardData();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    );
  }
}
