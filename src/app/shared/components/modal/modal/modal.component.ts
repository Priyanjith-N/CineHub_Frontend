import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() name: string = '';
  @Input() text: string = '';
  @Output() confirmStatusEvent: EventEmitter<boolean> = new EventEmitter<boolean>; 

  closeModal(confirm: boolean) {
    this.confirmStatusEvent.emit(confirm);
  }
}
