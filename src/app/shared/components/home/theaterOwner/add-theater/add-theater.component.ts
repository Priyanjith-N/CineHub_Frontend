import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ITheaterCredentials from '../../../../models/ITheaterCredentials.interface';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { IAddTheaterErrorResponse, IAddTheaterSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';
import { Observable } from 'rxjs';
import IToastOption from '../../../../models/IToastOption.interface';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';

@Component({
  selector: 'app-add-theater',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-theater.component.html',
  styleUrl: './add-theater.component.css'
})
export class AddTheaterComponent {
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private router: Router = inject(Router);

  isFormSubmited: boolean = false;
  private images: File[] = [];
  private licence: File | null = null;
  previewImage: string[] = [];
  previewLicence: string | null = null;

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      images: new FormControl(''),
      licence: new FormControl('')
    })
  }

  isFormInvalid() {
    this.form.get('images')?.setErrors(null);
    this.form.get('licence')?.setErrors(null);

    if(this.images.length && this.licence) return false;

    if(!this.images.length){
      this.form.get('images')?.setErrors({ message: 'This Field is requied.' })
    }

    if(!this.licence) {
      this.form.get('licence')?.setErrors({ message: 'This Field is required.' })
    }

    return true;
  }

  uploadMemberImage(event: Event, licence: boolean = true) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const fileList: FileList | null = inputElement.files;

    const validExtentions: Set<string> = new Set([
      '.png',
      '.svg',
      '.jpg',
      '.avif',
      '.jpeg',
    ]);

    if (!fileList) return;

    if(licence) {
      this.form.get('licence')?.setErrors(null);
      this.licence = fileList[0];
      this.previewLicence = URL.createObjectURL(this.licence);
    }else{
      if((this.images.length + fileList.length) > 4) {
        this.form.get('images')?.setErrors({ message: `Please select up to 2 images.` });
        inputElement.value = '';
        return;
      }
      this.form.get('images')?.setErrors(null);
      
      for(let i = 0; i<fileList.length; i++) {
        const file: File = fileList[i];
        if(validExtentions.has(file.name.substring(file.name.lastIndexOf('.')))) {
          this.images.push(file);
        }
      }

      this.showPreviewImages();
    }
    inputElement.value = '';
  }

  deleteLicence() {
    this.licence = null;
    this.previewLicence = null;
  }

  deleteImage(idx: number) {
    this.images.splice(idx, 1);
    this.showPreviewImages();
  }

  showPreviewImages() {
    this.previewImage = [];

    for(const file of this.images) {
      const base64Images: string = URL.createObjectURL(file);
      this.previewImage.push(base64Images);
    }
  }

  async onSubmit() {
    if(this.isFormInvalid() || this.form.invalid || this.isFormSubmited) {
      return this.form.markAllAsTouched();
    }

    this.isFormSubmited = true;

    const images: string[] = await this.ConvertToBase64();
    const licence: string = await this.ConvertToBase64Helper(this.licence!);

    const theaterCredential: ITheaterCredentials = {
      name: this.form.value.name,
      images,
      licence
    }

    const addTheaterAPIResponse$: Observable<IAddTheaterSucessfullResponse> = this.theaterOwnerService.addTheater(theaterCredential);
    
    addTheaterAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/theaterOwner/managetheater']); // navigate.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        
        if(err.errorField) {
          const errObj: IAddTheaterErrorResponse = err as IAddTheaterErrorResponse;
          this.form.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          this.form.markAllAsTouched();
        }else{
          const message: string = err.message || 'Internal Server Error.'
          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: message
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }
      })
    );
  }

  private async ConvertToBase64(): Promise<string[] | never> {
    try {
      const base64Images: string[] = [];

      for(const file of this.images) {
        const base64: string = await this.ConvertToBase64Helper(file);
        base64Images.push(base64)
      }

      return base64Images;
    } catch (err: any) {
      console.error(err, 'err in converting to base64');
      throw err;
    }
  }

  private async ConvertToBase64Helper(file: File): Promise<string> {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      const base64String: string = await promise;
      return base64String;
    } catch (err: any) {
      console.error(err, 'err in converting to base64');
      throw err;
    }
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
