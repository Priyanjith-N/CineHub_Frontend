import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMovieData, {
  IMovieWorkerDetails,
} from '../../../../models/IMovieCredentials.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IAddMovieErrorResponse } from '../../../../models/IMovieAPIResponse.interface';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css',
})
export class AddMovieFormComponent {
  private adminService: AdminService = inject(AdminService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private router: Router = inject(Router);

  isFormSubmited: boolean = false;
  addForm: FormGroup;
  addMemberForm: FormGroup;
  member: string | null = null;
  private memberFile: File | null = null;
  previewMember: string | null = null;
  private cast: IMovieWorkerDetails<File>[] = [];
  previewCast: IMovieWorkerDetails<string>[] = [];
  private crew: IMovieWorkerDetails<File>[] = [];
  previewCrew: IMovieWorkerDetails<string>[] = [];
  private coverPhoto: File | null = null;
  private bannerPhoto: File | null = null;
  private trailler: File | null = null;
  coverPhotoPreview: string | null = null;
  bannerPhotoPreview: string | null = null;

  constructor() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      bannerPhoto: new FormControl(''),
      coverPhoto: new FormControl(''),
      trailer: new FormControl(''),
      cast: new FormControl(''),
      category: new FormControl('', Validators.required),
      crew: new FormControl(''),
      language: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      hours: new FormControl('', Validators.required),
      minutes: new FormControl('', Validators.required),
    });

    this.addMemberForm = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  }

  lauchAddModal(member: string) {
    this.member = member;
  }

  closeModal() {
    this.addMemberForm.get('name')?.setValue('');
    this.addMemberForm.get('role')?.setValue('');
    this.addMemberForm.get('image')?.setValue('');

    this.addMemberForm.get('name')?.setErrors(null);
    this.addMemberForm.get('role')?.setErrors(null);
    this.addMemberForm.get('image')?.setErrors(null);

    this.addMemberForm.reset();

    this.member = null;
  }

  addMember() {
    if(!this.memberFile) this.addMemberForm.get('image')?.setErrors({ message: 'This Field is required.' });

    if(this.addMemberForm.invalid) {
      return this.addMemberForm.markAllAsTouched();
    }

    const { name, role } = this.addMemberForm.value;
    const memberFile: IMovieWorkerDetails<File> = {
      name,
      role,
      image: this.memberFile!,
    };

    this.previewMember = null;
    this.memberFile = null;

    if (this.member === 'Cast') {
      this.cast.push(memberFile);
    } else if (this.member === 'Crew') {
      this.crew.push(memberFile);
    }

    this.showPreviewMember();
    this.closeModal();
  }

  deleteMovieWorkerImage(member: string, idx: number) {
    this.member = member;
    if (this.member === 'Cast') {
      this.addForm.get('cast')?.setErrors(null);
      this.cast.splice(idx, 1);
    } else if (this.member === 'Crew') {
      this.addForm.get('crew')?.setErrors(null);
      this.crew.splice(idx, 1);
    }

    this.showPreviewMember();
    this.member = null;
  }

  deleteImageMember() {
    this.addMemberForm.get('image')?.setErrors(null);
    this.memberFile = null;
    this.previewMember = null;
  }

  showPreviewMember() {
    if (this.member === 'Cast') {
      this.addForm.get('cast')?.setErrors(null);
      this.previewCast = [];

      for (const each of this.cast) {
        const objectURL: string = URL.createObjectURL(each.image);
        const memberFile: IMovieWorkerDetails<string> = {
          name: each.name,
          role: each.role,
          image: objectURL,
        };
        this.previewCast.push(memberFile);
      }
    } else if (this.member === 'Crew') {
      this.addForm.get('crew')?.setErrors(null);
      this.previewCrew = [];

      for (const each of this.crew) {
        const objectURL: string = URL.createObjectURL(each.image);
        const memberFile: IMovieWorkerDetails<string> = {
          name: each.name,
          role: each.role,
          image: objectURL,
        };
        this.previewCrew.push(memberFile);
      }
    }
  }

  uploadMemberImage(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const fileList: FileList | null = inputElement.files;

    const validExtentions: Set<string> = new Set([
      '.png',
      '.svg',
      '.jpg',
      '.avif',
    ]);

    if (!fileList) return;

    this.memberFile = fileList[0];
    this.previewMember = URL.createObjectURL(this.memberFile);
    this.addForm.get('image')?.setErrors(null);

    inputElement.value = '';
  }

  uploadImage(event: Event, typeOfPhoto: string) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const fileList: FileList | null = inputElement.files;

    const validExtentions: Set<string> = new Set([
      '.png',
      '.svg',
      '.jpg',
      '.avif',
    ]);

    if (!fileList){
      inputElement.value = '';
      return;
    }
      

    if (typeOfPhoto === 'coverPhoto') {
      this.addForm.get('coverPhoto')?.setErrors(null);
      this.coverPhoto = fileList[0];
      this.coverPhotoPreview = URL.createObjectURL(this.coverPhoto);
    } else if (typeOfPhoto === 'bannerPhoto') {
      this.addForm.get('bannerPhoto')?.setErrors(null);
      this.bannerPhoto = fileList[0];
      this.bannerPhotoPreview = URL.createObjectURL(this.bannerPhoto);
    }

    inputElement.value = '';
  }

  deleteImage(typeOfPhoto: string) {
    if (typeOfPhoto === 'coverPhoto') {
      this.coverPhoto = null;
      this.coverPhotoPreview = null;
    } else if (typeOfPhoto === 'bannerPhoto') {
      this.bannerPhoto = null;
      this.bannerPhotoPreview = null;
    }
  }

  private isFormInvalid() {
    this.addForm.get('cast')?.setErrors(null);
    this.addForm.get('crew')?.setErrors(null);
    this.addForm.get('coverPhoto')?.setErrors(null);
    this.addForm.get('bannerPhoto')?.setErrors(null);

    if(!this.cast.length) {
      this.addForm.get('cast')?.setErrors({ message: "This Field is required." });
    }
    if(!this.crew.length) {
      this.addForm.get('crew')?.setErrors({ message: "This Field is required." });
    }
    if(!this.coverPhoto) {
      this.addForm.get('coverPhoto')?.setErrors({ message: "This Field is required." });
    }
    if(!this.bannerPhoto) {
      this.addForm.get('bannerPhoto')?.setErrors({ message: "This Field is required." });
    }
  }

  async onSubmit() {
    this.isFormInvalid();
    console.log(this.addForm.errors);
    
    if (this.addForm.invalid || this.isFormSubmited) {
      return this.addForm.markAllAsTouched();
    }

    this.isFormSubmited = true;

    const cast: IMovieWorkerDetails<string>[] = await this.ConvertToBase64(
      'Cast'
    );

    const crew: IMovieWorkerDetails<string>[] = await this.ConvertToBase64(
      'Crew'
    );

    const bannerPhoto: string = await this.ConvertToBase64Helper(this.bannerPhoto!);
    const coverPhoto: string = await this.ConvertToBase64Helper(this.coverPhoto!);

    const language: string[] = this.addForm.value.language.split(',').map((language: string) => {
      return language.trim();
    });

    const category: string[] = this.addForm.value.category.split(',').map((category: string) => {
      return category.trim();
    });

    const movieData: IMovieData = {
      name: this.addForm.value.name.trim(),
      about: this.addForm.value.about.trim(),
      bannerPhoto,
      coverPhoto,
      trailer: "demo just",
      cast,
      crew,
      language,
      type: this.addForm.value.type.trim(),
      duration: {
        hours: this.addForm.value.hours,
        minutes: this.addForm.value.minutes,
      },
      category
    };

    console.log(movieData);

    const addMovieAPIResponse$: Observable<{ message: string }> = this.adminService.addMovie(movieData);

    addMovieAPIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        console.log(res);
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/admin/moviemanagement']); // navigate.
      }),
      (err => {
        this.isFormSubmited = false;
        
        if(err.errorField) {
          const errObj: IAddMovieErrorResponse = err as IAddMovieErrorResponse;
          this.addForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          this.addForm.markAllAsTouched();
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

  private async ConvertToBase64(
    member: string
  ): Promise<IMovieWorkerDetails<string>[] | never> {
    try {
      const base64Images: IMovieWorkerDetails<string>[] = [];

      if (member === 'Cast') {
        for (const each of this.cast) {
          const base64String: string = await this.ConvertToBase64Helper(
            each.image
          );

          const memberFile: IMovieWorkerDetails<string> = {
            name: each.name,
            role: each.role,
            image: base64String,
          };

          base64Images.push(memberFile);
        }
      } else if (member === 'Crew') {
        for (const each of this.crew) {
          const base64String: string = await this.ConvertToBase64Helper(
            each.image
          );

          const memberFile: IMovieWorkerDetails<string> = {
            name: each.name,
            role: each.role,
            image: base64String,
          };

          base64Images.push(memberFile);
        }
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
