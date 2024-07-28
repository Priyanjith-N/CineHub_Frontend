import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-account-verification-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-account-verification-detail-page.component.html',
  styleUrl: './admin-account-verification-detail-page.component.css'
})
export class AdminAccountVerificationDetailPageComponent {
  @ViewChild('reasonInput') reasonInput!: ElementRef<HTMLTextAreaElement>;
  showModal: boolean = false;
  private id: string = '';

  constructor(private activeRoute: ActivatedRoute) {
    this.id = this.activeRoute.snapshot.params['id'] as string;
    
  }

  showOrCloseModal() {
    this.showModal = !this.showModal;
    this.reasonInput.nativeElement.value = '';
  }

  reject() {
    this.showOrCloseModal();
    this.rejectOrApproveDocuments("Approved")
  }

  approve() {
    this.rejectOrApproveDocuments("Approved");
  }

  private rejectOrApproveDocuments(status: string) {

  }
}
