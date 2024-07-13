import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from '../../../../core/services/toast-message.service';
import IToastOption from '../../../../shared/models/IToastOption.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {

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
