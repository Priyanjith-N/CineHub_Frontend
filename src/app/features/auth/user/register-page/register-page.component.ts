import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../../../shared/components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
