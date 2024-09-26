import { Component, inject } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { IDistributerDashboardData, IGetDistributerDashboardDataSuccessfullResponse } from '../../../../models/distributer.entity';
import { Observable } from 'rxjs';
import { DistributerService } from '../../../../../core/services/distributer.service';

@Component({
  selector: 'app-distributer-dashboard',
  standalone: true,
  imports: [
    CountUpModule
  ],
  templateUrl: './distributer-dashboard.component.html',
  styleUrl: './distributer-dashboard.component.css'
})
export class DistributerDashboardComponent {
  private distributerService: DistributerService = inject(DistributerService);

  data: IDistributerDashboardData | undefined;

  constructor() {
    this.getData();
  }

  private getData() {
    const APIResponse$: Observable<IGetDistributerDashboardDataSuccessfullResponse> = this.distributerService.getDashboardData();

    APIResponse$.subscribe(
      (res => {
        this.data = res.data;
      }),
      ((err: any) => {
        console.error(err);
      })
    )
  }

}
