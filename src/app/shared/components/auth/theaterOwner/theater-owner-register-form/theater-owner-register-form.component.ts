import { Component } from '@angular/core';
import IToastOption from '../../../../models/IToastOption.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { ITheaterOwnerRegisterCredentials } from '../../../../models/IRegisterCredentials.interface';
import { TheaterOwnerAuthService } from '../../../../../core/services/theater-owner-auth.service';
import { Observable } from 'rxjs';
import { IRegisterErrorResponse, IRegisterSuccessfullResponse } from '../../../../models/IRegisterResponse.interface';

@Component({
  selector: 'app-theater-owner-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './theater-owner-register-form.component.html',
  styleUrl: './theater-owner-register-form.component.css'
})
export class TheaterOwnerRegisterFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;
  registerFrom: FormGroup;
  idProofImages: File[] = [];
  previewImages: string[] = [];

  constructor(private toastMessageService: ToastMessageService, private router: Router, private theaterOwnerAuthService: TheaterOwnerAuthService) {
    this.registerFrom = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      IDProof: new FormControl('PAN Card', [Validators.required]),
      IDProofImage: new FormControl('')
    });
  }

  toggleShowHide(password: boolean = true): void {
    if(password) {
      this.toggleShowHidePassword = !this.toggleShowHidePassword;
    }else{
      this.toggleShowHideConfirmPassword = !this.toggleShowHideConfirmPassword;
    }
  }

  private trimAllWhiteSpaces(): void {
    Object.keys(this.registerFrom.value).forEach((control) => {
      if(control && control !== 'IDProofImage') {
        const trimedValue: string = this.registerFrom.get(control)?.value?.trim();
        this.registerFrom.controls[control].setValue(trimedValue);
      }
    });
  }

  private bothConfirmPasswordAndPasswordCheck() {
    const { password, confirmPassword } = this.registerFrom.value;

    if(password && (password as string).length < 8) {
      this.registerFrom.get('password')?.setErrors({ message: `Password should be 8 characters long.` });

    }else if(password && confirmPassword && (password !== confirmPassword)) {
      this.registerFrom.get('confirmPassword')?.setErrors({ message: `Both Password doesn't match.` });
    }
  }

  imageUpload(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;
    
    
    if(!fileList) return;

    const validExtentions: Set<string> = new Set(['.png', '.svg', '.jpg', '.avif']);
    

    const totalNumberOfFiles: number = this.idProofImages.length + fileList.length;

    if(totalNumberOfFiles > 2) {
      this.registerFrom.get('IDProofImage')?.setErrors({ message: `Please select up to 2 images.` });
      return;
    }
    
    for(let i = 0 ; i < fileList.length ; i++) {
      const file: File = fileList[i];
      const fileExtention: string = file.name.substring(file.name.lastIndexOf('.'));
      if(!validExtentions.has(fileExtention)) {
        this.registerFrom.get('IDProofImage')?.setErrors({ message: `Wrong file format. Try .png, .svg or .jpg.` });
        return;
      }
    }

    for(let i = 0 ; i < fileList.length ; i++) {
      const file: File = fileList[i];
      this.idProofImages.push(file);
    }

    inputElement.value = '';
    this.showPreview();
  }

  async onSubmit(): Promise<void> {
    this.trimAllWhiteSpaces(); // remove leading and traling zero
    this.bothConfirmPasswordAndPasswordCheck(); // validate both password and confirmpassword

    if(this.registerFrom.invalid || this.isFormSubmited) {
      this.registerFrom.markAllAsTouched();
      return;
    }else if(this.idProofImages.length !== 2) {
      this.registerFrom.get('IDProofImage')?.setErrors({ message: `This Field is required.` });
      this.registerFrom.markAllAsTouched();
      return;
    }

    this.isFormSubmited = true;

    const IDProofImage: string[] = await this.ConvertToBase64();

    const theaterOwnerRegisterCredentials: ITheaterOwnerRegisterCredentials = {
      name: this.registerFrom.value.name,
      email: this.registerFrom.value.email,
      phoneNumber: this.registerFrom.value.phoneNumber,
      password: this.registerFrom.value.password,
      confirmPassword: this.registerFrom.value.confirmPassword,
      IDProof: this.registerFrom.value.IDProof,
      IDProofImage
    }

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.theaterOwnerAuthService.handelRegisterationRequest(theaterOwnerRegisterCredentials);

    registerAPIResponse$.subscribe(
      (res: IRegisterSuccessfullResponse) => {
        this.isFormSubmited = false;
        console.log(res);
        this.router.navigate(['/theaterOwner/auth/verifyEmail']); // navigate to otp verification page.
      },
      (err: any) => {
        this.isFormSubmited = false;
        this.registerFrom.markAllAsTouched();

        if(err?.errorField){
          const errObj: IRegisterErrorResponse = err as IRegisterErrorResponse; // err is the backend err modified in pipe

          this.registerFrom.get(errObj.errorField!)?.setErrors({ message: errObj.message});
        }else {
          const errMessage: string = err?.requiredErrMessage || 'Something Went Wrong.';

          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: errMessage
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }
      }
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }

  private async ConvertToBase64(): Promise<string[] | never> {
    try {
      const base64Images: string[] = [];

      for(const file of this.idProofImages) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
        const base64String: string = await promise;
        base64Images.push(base64String);
      }

      return base64Images;
    } catch (err: any) {
      console.error(err, 'err in converting to base64');
      throw err;
    }
  }

  private showPreview() {
    this.previewImages = [];

    for(const file of this.idProofImages) {
      const objectURL: string = URL.createObjectURL(file);
      this.previewImages.push(objectURL);
    }
  }

  IDProofChangeOption() {
    this.idProofImages = [];
    this.showPreview();
  }

  deleteImage(index: number) {
    this.idProofImages.splice(index, 1);
    this.showPreview();
  }
}
