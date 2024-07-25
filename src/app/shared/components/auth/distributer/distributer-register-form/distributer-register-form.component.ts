import { Component } from '@angular/core';
import IToastOption from '../../../../models/IToastOption.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { Router, RouterLink } from '@angular/router';
import { IDistributerRegisterCredentials } from '../../../../models/IRegisterCredentials.interface';
import { Observable } from 'rxjs';
import { IRegisterErrorResponse, IRegisterSuccessfullResponse } from '../../../../models/IRegisterResponse.interface';
import { DistributerAuthService } from '../../../../../core/services/distributer-auth.service';

@Component({
  selector: 'app-distributer-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './distributer-register-form.component.html',
  styleUrl: './distributer-register-form.component.css'
})
export class DistributerRegisterFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;
  registerFrom: FormGroup;
  idProofImages: File[] = [];
  idProofImagesPreviewImages: string[] = [];
  licenceImages: File | null = null;
  licencePreviewImages: string = '';

  constructor(private toastMessageService: ToastMessageService, private router: Router, private distributerAuthService: DistributerAuthService) {
    this.registerFrom = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      IDProof: new FormControl('PAN Card', [Validators.required]),
      IDProofImage: new FormControl(''),
      licence: new FormControl(''),
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
      if(control && control !== "licence" && control !== "IDProofImage") {
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

  async onSubmit(): Promise<void> {
    this.trimAllWhiteSpaces(); // remove leading and traling zero
    this.bothConfirmPasswordAndPasswordCheck(); // validate both password and confirmpassword

    if(this.registerFrom.invalid || this.isFormSubmited) {
      return this.registerFrom.markAllAsTouched();
    }else if(this.idProofImages.length !== 2) {
      this.registerFrom.get('IDProofImage')?.setErrors({ message: `This Field is required.` });
      this.registerFrom.markAllAsTouched();
      return;
    }else if(!this.licenceImages) {
      this.registerFrom.get('licence')?.setErrors({ message: `This Field is required.` });
      this.registerFrom.markAllAsTouched();
      return;
    }

    this.isFormSubmited = true;

    const IDProofImage: string[] = await this.ConvertToBase64();
    const [ licenceImage ]: string[] = await this.ConvertToBase64(false);

    const registerData: IDistributerRegisterCredentials = {
      name: this.registerFrom.value.name,
      email: this.registerFrom.value.email,
      phoneNumber: this.registerFrom.value.phoneNumber,
      password: this.registerFrom.value.password,
      confirmPassword: this.registerFrom.value.confirmPassword,
      IDProof: this.registerFrom.value.IDProof,
      IDProofImage,
      licence: licenceImage
    }

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.distributerAuthService.handelRegisterationRequest(registerData);

    registerAPIResponse$.subscribe(
      ((res: IRegisterSuccessfullResponse) => {
        this.isFormSubmited = false;
        console.log(res);
        this.router.navigate(['/distributer/auth/verifyEmail']); // navigate to otp verification page.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        
        if(err?.errorField){
          const errObj: IRegisterErrorResponse = err as IRegisterErrorResponse; // err is the backend err modified in pipe
          
          this.registerFrom.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          this.registerFrom.markAllAsTouched();
        }else {
          const errMessage: string = err?.requiredErrMessage || 'Something Went Wrong.';

          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: errMessage
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }
      })
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }

  IDProofChangeOption(): void {
    this.idProofImages = [];
    this.showPreview(true);
  }

  private async ConvertToBase64(idProofImages: boolean = true): Promise<string[] | never> {
    try {
      const base64Images: string[] = [];

      if(idProofImages) {
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
      }else{
        const reader = new FileReader();
          reader.readAsDataURL(this.licenceImages as File);
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

  imageUpload(event: Event, idProofImages: boolean = true) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;
    
    
    if(!fileList) return;

    const validExtentions: Set<string> = new Set(['.png', '.svg', '.jpg', '.avif']);
    

    const totalNumberOfFiles: number = this.idProofImages.length + fileList.length;

    if(idProofImages && totalNumberOfFiles > 2) {
      this.registerFrom.get('IDProofImage')?.setErrors({ message: `Please select up to 2 images.` });
      return;
    }else if(!idProofImages && (this.licenceImages && fileList.length > 0) || (!this.licenceImages && fileList.length > 1)) {
      this.registerFrom.get('licence')?.setErrors({ message: `Please select up to 1 images.` });
    }
    
    for(let i = 0 ; i < fileList.length ; i++) {
      const file: File = fileList[i];
      const fileExtention: string = file.name.substring(file.name.lastIndexOf('.'));
      if(!validExtentions.has(fileExtention)) {
        if(idProofImages){
          this.registerFrom.get('IDProofImage')?.setErrors({ message: `Wrong file format. Try .png, .svg or .jpg.` });
        }else{
          this.registerFrom.get('licence')?.setErrors({ message: `Wrong file format. Try .png, .svg or .jpg.` });
        }
        return;
      }
    }

    if(idProofImages){
      for(let i = 0 ; i < fileList.length ; i++) {
        const file: File = fileList[i];
        this.idProofImages.push(file);
      }
    }else{
      this.licenceImages = fileList[0];
    }


    inputElement.value = '';
    this.showPreview(idProofImages);
  }

  private showPreview(idProofImages: boolean = true) {
    if(!idProofImages) {
      this.licencePreviewImages = '';
      if(!this.licenceImages) return;
      const objectURL: string = URL.createObjectURL(this.licenceImages);
      this.licencePreviewImages = objectURL;
      return;
    }

    this.idProofImagesPreviewImages = [];

    for(const file of this.idProofImages) {
      const objectURL: string = URL.createObjectURL(file);
      this.idProofImagesPreviewImages.push(objectURL);
    }
  }

  deleteImage(index: number, isIdProofImage: boolean = true) {
    if(isIdProofImage) {
      this.idProofImages.splice(index, 1);
    }else {
      this.licenceImages = null;
    }
    this.showPreview(isIdProofImage);
  }
}
