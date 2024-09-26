import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IGetTheaterOwnerDashboardDataSuccessfullResponse, IGetTheaterOwnerGraphDataSuccessfullResponse } from '../../../../models/theaterOwnerAPIResponse.interface';
import { ITheaterOwnerDashboardData } from '../../../../models/theaterOwner.entity';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-theater-owner-dashboard',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './theater-owner-dashboard.component.html',
  styleUrl: './theater-owner-dashboard.component.css',
})
export class TheaterOwnerDashboardComponent implements AfterViewInit {
  private theaterOwnerService: TheaterOwnerService =
    inject(TheaterOwnerService);

  cardCountData: ITheaterOwnerDashboardData | undefined;
  @ViewChild('myChart')
  private myCanvas!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart<"bar", number[], string>;

  selectedTheaterIdx = 0;
  selectedScreenIdx = 0;
  filter: "Daily" | "Monthly" | "Yearly" = "Daily";

  constructor() {
    
  }

  getData() {
    const APIResponse$: Observable<IGetTheaterOwnerDashboardDataSuccessfullResponse> = this.theaterOwnerService.getDashboardData();

    APIResponse$.subscribe(
      (res) => {
        this.cardCountData = res.data;

        this.getDataForGraph(this.cardCountData.allTheatersWithScreens[0].theaterData._id, this.cardCountData.allTheatersWithScreens[0].screens[0]._id, this.filter);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  selectTheater(event: Event) {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedTheaterIdx = Number(selectElement.value);
    this.selectedScreenIdx = 0;

    if(!this.cardCountData) return;

    this.getDataForGraph(this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].theaterData._id, this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].screens[this.selectedScreenIdx]._id, this.filter);
  }

  changFilter(event: Event) {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.filter = selectElement.value as ("Daily" | "Monthly" | "Yearly");
    
    if(!this.cardCountData) return;
    
    this.getDataForGraph(this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].theaterData._id, this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].screens[this.selectedScreenIdx]._id, this.filter);
  }

  selectScreen(event: Event) {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedScreenIdx = Number(selectElement.value);
    
    if(!this.cardCountData) return;
    
    this.getDataForGraph(this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].theaterData._id, this.cardCountData.allTheatersWithScreens[this.selectedTheaterIdx].screens[this.selectedScreenIdx]._id, this.filter);
  }

  private getDataForGraph(theaterId: string, screenId: string, filter: "Daily" | "Monthly" | "Yearly") {
    const APIResponse$: Observable<IGetTheaterOwnerGraphDataSuccessfullResponse> = this.theaterOwnerService.getGraphData(filter, theaterId, screenId);
    
    APIResponse$.subscribe(
      (res => {
        console.log(res);
        
        const labels: string[] = [];
        const revenue: number[] = [];

        for(const data of res.data){
          let name: string = '';
          if(filter === "Daily") {
            name = `${data.day} ${data.month} ${data.year}`;
          }else if(filter === "Monthly") {
            name = data.month!;
          }else if(filter === "Yearly") {
            name = `${data.year}`;
          }

          labels.push(name);
          revenue.push(data.revenue);
        }
        
        this.initChart(labels, revenue);
      }),
      ((err: any) => console.error(err) )
    );
  }

  private initChart(labels: string[], data: number[]) {
    console.log(this.chart);
    
    if(this.chart) {
      console.log('sfdd');
      
      this.chart.clear();
      this.chart.destroy();
    }

    let delayed: boolean = false;

    const config: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data,
            borderWidth: 1,
            backgroundColor: '#a6b9ed',
            borderColor: 'rgba(75, 192, 192, 1)'
          },
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

    this.chart = new Chart(this.myCanvas.nativeElement, config);
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);

    this.getData();
  }
}
