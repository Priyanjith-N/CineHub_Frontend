import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMovieData, {
  IMovie,
  IMovieWorkerDetails,
} from '../../../../models/IMovieCredentials.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IAddEditMovieErrorResponse, IGetMovieSuccessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-movie-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-movie-form.component.html',
  styleUrl: './add-edit-movie-form.component.css'
})
export class AddEditMovieFormComponent implements AfterViewInit {
  @Input({ required: true }) formType: "Add Movie" | "Edit Movie" = "Add Movie";

  private adminService: AdminService = inject(AdminService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  isFormSubmited: boolean = false;
  form: FormGroup;
  addMemberForm: FormGroup;
  member: string | null = null;
  private memberFile: File | null = null;
  previewMember: string | null = null;
  private cast: IMovieWorkerDetails<File | Blob>[] = [];
  previewCast: IMovieWorkerDetails<string>[] = [];
  private crew: IMovieWorkerDetails<File | Blob>[] = [];
  previewCrew: IMovieWorkerDetails<string>[] = [];
  private coverPhoto: File | Blob | null = null;
  private bannerPhoto: File | Blob | null = null;
  private trailler: File | Blob | null = null;
  coverPhotoPreview: string | null = null;
  bannerPhotoPreview: string | null = null;

  constructor() {
    this.form = new FormGroup({
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
  ngAfterViewInit(): void {
    if(this.formType === "Edit Movie") {
      const movieId: string = this.activatedRoute.snapshot.params['movieId'];

      this.getMovieData(movieId);
    }
  }

  private getMovieData(movieId: string) {
    const getMovieAPIResponse$: Observable<IGetMovieSuccessfullResponse> = this.adminService.getMovie(movieId);

    getMovieAPIResponse$.subscribe(
      (res => {
        const movieData: IMovie = res.data;
        this.initEditForm(movieData);
      }),
      ((err: any) => {
        console.log(err);
      })
    );
  }

  private async initEditForm(movieData: IMovie) {
    const category: string = movieData.category.join(', ');
    const language: string = movieData.language.join(', ');

    this.form.get('name')?.setValue(movieData.name);
    this.form.get('about')?.setValue(movieData.about);
    this.form.get('category')?.setValue(category);
    this.form.get('type')?.setValue(movieData.type);
    this.form.get('language')?.setValue(language);
    this.form.get('hours')?.setValue(movieData.duration.hours);
    this.form.get('minutes')?.setValue(movieData.duration.minutes);
    
    this.cast = [];

    for(const cast of movieData.cast) {
      const blob: Blob = await this.convertImageToBlob(cast.image.imageURL);
      const castData: IMovieWorkerDetails<Blob> = {
        image: blob,
        name: cast.name,
        role: cast.role
      }

      this.cast.push(castData);
    }

    this.crew = [];
    
    for(const crew of movieData.crew) {
      const blob: Blob = await this.convertImageToBlob(crew.image.imageURL);
      const crewData: IMovieWorkerDetails<Blob> = {
        image: blob,
        name: crew.name,
        role: crew.role
      }

      this.crew.push(crewData);
    }

    this.showPreviewMember("Cast");
    this.showPreviewMember("Crew");

    this.coverPhoto = await this.convertImageToBlob(movieData.coverPhoto.imageURL);
    this.coverPhotoPreview = URL.createObjectURL(this.coverPhoto);
    
    this.bannerPhoto = await this.convertImageToBlob(movieData.bannerPhoto.imageURL);
    this.bannerPhotoPreview = URL.createObjectURL(this.bannerPhoto);
  }

  private async convertImageToBlob(imgURL: string): Promise<Blob> {
    try {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      
      return blob;
    } catch (error) {
      throw new Error(`Error converting image to blob: ${error}`);
    }
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
      this.form.get('cast')?.setErrors(null);
      this.cast.splice(idx, 1);
    } else if (this.member === 'Crew') {
      this.form.get('crew')?.setErrors(null);
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

  private showPreviewMember(member?: "Cast" | "Crew") {
    if (this.member === 'Cast' || (member && member === "Cast")) {
      this.form.get('cast')?.setErrors(null);
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
    } else if (this.member === 'Crew' || (member && member === "Crew")) {
      this.form.get('crew')?.setErrors(null);
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
    this.form.get('image')?.setErrors(null);

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
      this.form.get('coverPhoto')?.setErrors(null);
      this.coverPhoto = fileList[0];
      this.coverPhotoPreview = URL.createObjectURL(this.coverPhoto);
    } else if (typeOfPhoto === 'bannerPhoto') {
      this.form.get('bannerPhoto')?.setErrors(null);
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
    this.form.get('cast')?.setErrors(null);
    this.form.get('crew')?.setErrors(null);
    this.form.get('coverPhoto')?.setErrors(null);
    this.form.get('bannerPhoto')?.setErrors(null);

    if(!this.cast.length) {
      this.form.get('cast')?.setErrors({ message: "This Field is required." });
    }
    if(!this.crew.length) {
      this.form.get('crew')?.setErrors({ message: "This Field is required." });
    }
    if(!this.coverPhoto) {
      this.form.get('coverPhoto')?.setErrors({ message: "This Field is required." });
    }
    if(!this.bannerPhoto) {
      this.form.get('bannerPhoto')?.setErrors({ message: "This Field is required." });
    }
  }

  async onSubmit() {
    this.isFormInvalid();
    console.log(this.form.errors);
    
    if (this.form.invalid || this.isFormSubmited) {
      return this.form.markAllAsTouched();
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

    const language: string[] = this.form.value.language.split(',').map((language: string) => {
      return language.trim();
    });

    const category: string[] = this.form.value.category.split(',').map((category: string) => {
      return category.trim();
    });

    const movieData: IMovieData = {
      name: this.form.value.name.trim(),
      about: this.form.value.about.trim(),
      bannerPhoto,
      coverPhoto,
      trailer: "demo just",
      cast,
      crew,
      language,
      type: this.form.value.type.trim(),
      duration: {
        hours: this.form.value.hours,
        minutes: this.form.value.minutes,
      },
      category
    };

    if(this.formType === "Add Movie") {
      const addMovieAPIResponse$: Observable<{ message: string }> = this.adminService.addMovie(movieData);
  
      addMovieAPIResponse$.subscribe(
        (res => {
          this.handelSucessfullResponse(res.message);
        }),
        ((err: any) => {
          this.handelErrorResponse(err);
        })
      );
    }else{
      const movieId: string = this.activatedRoute.snapshot.params['movieId'];

      const editMovieAPIResponse$: Observable<{ message: string }> = this.adminService.editMovie(movieData, movieId);
  
      editMovieAPIResponse$.subscribe(
        (res => {
          this.handelSucessfullResponse(res.message);
        }),
        ((err: any) => {
          this.handelErrorResponse(err);
        })
      );
    }
  }

  private handelSucessfullResponse(message: string) {
    this.isFormSubmited = false;
    const toastOption: IToastOption = {
      severity: 'success',
      summary: 'Success',
      detail: message
    }

    this.showToast(toastOption); // emit the toast option to show toast.
    
    this.router.navigate(['/admin/moviemanagement']); // navigate.
  }

  private handelErrorResponse(err: any) {
    this.isFormSubmited = false;
          
    if(err.errorField) {
      const errObj: IAddEditMovieErrorResponse = err as IAddEditMovieErrorResponse;
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

  private async ConvertToBase64Helper(file: File | Blob): Promise<string> {
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
