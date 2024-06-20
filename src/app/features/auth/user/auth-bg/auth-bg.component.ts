import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast'

import { ToastMessageService } from '../../../../core/services/toast-message.service';
import IToastOption from '../../../../shared/models/IToastOption.interface';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-bg',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './auth-bg.component.html',
  styleUrl: './auth-bg.component.css'
})
export class AuthBGComponent implements OnInit, OnDestroy {
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
