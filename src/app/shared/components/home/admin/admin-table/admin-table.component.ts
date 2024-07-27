import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDistributerData, ITheaterOwnerData, IUserData } from '../../../../models/adminAPIResponse.interface';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent  {
  @Input() tableData: IUserData[] | ITheaterOwnerData[] | IDistributerData[] = [];
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>;

  search(event: Event) {
    try {
      const inputElement: HTMLInputElement = event.target as HTMLInputElement;

      const searchText: string = inputElement.value;

      this.searchEvent.emit(searchText);
    } catch (err: any) {
      console.error(err);
    }
  }
}
