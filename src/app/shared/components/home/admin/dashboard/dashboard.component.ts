import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IGetDashboardDataSuccessfullResponse } from '../../../../models/adminAPIResponse.interface';
import { IDashboardDatas } from '../../../../models/admin.entity';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LocationAddressPipePipe } from '../../../../pipes/location-address-pipe.pipe';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

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
export class DashboardComponent implements AfterViewInit {
  private adminService: AdminService = inject(AdminService);

  @ViewChild('myChart')
  private myCanvas!: ElementRef<HTMLCanvasElement>;

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
      })
    );
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    let delayed: boolean = false;

    const config: ChartConfiguration<'line', number[], string> = {
      type: 'line',
      data: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023" ,"2024"],
        datasets: [
          { 
            data: [65, 59, 80, 81, 56, 55, 40], 
            label: 'Distributor',
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)'
          },
          { 
            data: [28, 48, 40, 19, 86, 27, 90], 
            label: 'Film',
            borderColor: 'rgba(153,102,255,1)',
            backgroundColor: 'rgba(153,102,255,0.2)'
          },
          { 
            data: [18, 48, 77, 9, 100, 27, 40], 
            label: 'Theater Owner',
            borderColor: 'rgba(255,159,64,1)',
            backgroundColor: 'rgba(255,159,64,0.2)'
          }
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay: number = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chart = new Chart(this.myCanvas.nativeElement, config);
  }
}
