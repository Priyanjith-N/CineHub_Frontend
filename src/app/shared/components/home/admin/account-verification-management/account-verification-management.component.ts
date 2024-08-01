import { Component, ElementRef, ViewChild } from '@angular/core';
import { INotVerifiedDistributers, INotVerifiedTheaterOwners, IRetriveDataSucessfullAPIResponse } from '../../../../models/adminAPIResponse.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-verification-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './account-verification-management.component.html',
  styleUrl: './account-verification-management.component.css'
})
export class AccountVerificationManagementComponent {
  @ViewChild('searchBox') searchInput!: ElementRef<HTMLInputElement>;
  private data: (INotVerifiedDistributers | INotVerifiedTheaterOwners)[] = [];
  displayData: (INotVerifiedDistributers | INotVerifiedTheaterOwners)[] = [];
  requestType: string = 'All';

  constructor(private adminService: AdminService) {
    const getAllVerificationDocumentAPIResponse$: Observable<IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>> = this.adminService.getAllVerificationDocument();

    getAllVerificationDocumentAPIResponse$.subscribe(
      ((res: IRetriveDataSucessfullAPIResponse<(INotVerifiedDistributers | INotVerifiedTheaterOwners)>) => {
        this.data = res.data;
        this.displayData = this.data;
        
      })
    );
  }

  changeRequestType(type: string) {
    this.requestType = type;
    const searchText = this.searchInput.nativeElement.value.toLowerCase();
    
    this.displayData = this.data.filter((data) => {
      return (this.requestType === 'All' || data.role === this.requestType) && (data.name.toLowerCase().includes(searchText) || data.email.toLowerCase().includes(searchText) || data.phoneNumber.toLowerCase().includes(searchText) || data.role.toLowerCase().includes(searchText));
    });
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.displayData = this.data.filter((data) => {
      return (data.name.toLowerCase().startsWith(searchText) && (this.requestType === 'All' || this.requestType === data.role));
    });
  }
}
