import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import IToastOption from '../../../../shared/models/IToastOption.interface';
import { ToastMessageService } from '../../../../core/services/toast-message.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-theater-ower-auth-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './theater-owner-auth-bg.component.html',
  styleUrl: './theater-owner-auth-bg.component.css'
})
export class TheaterOwerAuthBgComponent {
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
