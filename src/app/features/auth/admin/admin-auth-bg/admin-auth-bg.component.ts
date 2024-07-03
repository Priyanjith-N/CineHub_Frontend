import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from '../../../../core/services/toast-message.service';
import { Subscription } from 'rxjs';
import IToastOption from '../../../../shared/models/IToastOption.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-auth-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './admin-auth-bg.component.html',
  styleUrl: './admin-auth-bg.component.css'
})
export class AdminAuthBGComponent {
  private toastOptionSubscription: Subscription | undefined; // for later unsubcribing variable is needed
  
  constructor(private toastMessageService: ToastMessageService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.toastOptionSubscription = this.toastMessageService.toastOption$.subscribe(
      (toastOption: IToastOption) => {
        this.messageService.add(toastOption);
      },
      (err: any) => {
        console.error(err, 'From auth bg component toast');
      }
    );
  }

  ngOnDestroy(): void {
    this.toastOptionSubscription?.unsubscribe(); // unsubscribe to avoid memory leaks
  }
}
