import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDistributerData, ISingleDataRetrivalAPIResponse, ITheaterOwnerData } from '../../../../models/adminAPIResponse.interface';
import { AdminService } from '../../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-account-verification-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-account-verification-detail-page.component.html',
  styleUrl: './admin-account-verification-detail-page.component.css'
})
export class AdminAccountVerificationDetailPageComponent {
  @ViewChild('reasonInput') reasonInput!: ElementRef<HTMLTextAreaElement>;
  myData:  IDistributerData | ITheaterOwnerData | undefined;
  isSubmited: boolean = false;

  showModal: boolean = false;
  private id: string = '';
  private role: string = '';

  constructor(private activeRoute: ActivatedRoute, private adminService: AdminService, private router: Router) {
    this.id = this.activeRoute.snapshot.params['id'] as string;
    this.role = this.activeRoute.snapshot.params['role'] as string;

    if(this.role === "Theater Owner") {
      this.adminService.getTheaterOwner(this.id).subscribe(
        ((res: ISingleDataRetrivalAPIResponse<ITheaterOwnerData>) => {
          this.myData = res.data as ITheaterOwnerData;
        }),
        ((err: any) => {
          console.log(err);
        })
      );
    }else if(this.role === "Distributer"){
      this.adminService.getDistributer(this.id).subscribe(
        ((res: ISingleDataRetrivalAPIResponse<IDistributerData>) => {
          this.myData = res.data as IDistributerData;
          console.log('licence' in this.myData);
          
        }),
        ((err: any) => {
          console.log(err);
        })
      );
    }
  }

  showOrCloseModal() {
    this.showModal = !this.showModal;
    this.reasonInput.nativeElement.value = '';
  }


  reject() {
    const message: string = this.reasonInput.nativeElement.value;
    if(message) {
      this.rejectOrApproveDocuments("Rejected", message)
      this.showOrCloseModal();
    }
  }

  approve() {
    this.rejectOrApproveDocuments("Approved");
  }

  private rejectOrApproveDocuments(status: string, message: string = '') {
    this.isSubmited = true;

    if(this.role === 'Theater Owner') {
      this.adminService.theaterOwnerVerifyDocument(this.id, status, message).subscribe(
        ((res) => {
          this.isSubmited = false;
          if(res.message) {
            this.router.navigate(['/admin/verifyRequest']);
          }
        }),
        ((err: any) => {
          this.isSubmited = false;
          console.error(err);
        })
      );
    }else if(this.role === "Distributer"){
      this.adminService.distributerVerifyDocument(this.id, status, message).subscribe(
        ((res) => {
          this.isSubmited = false;
          if(res.message) {
            this.router.navigate(['/admin/verifyRequest']);
          }
        }),
        ((err: any) => {
          this.isSubmited = false;
          console.error(err);
        })
      );
    }
  }
}
