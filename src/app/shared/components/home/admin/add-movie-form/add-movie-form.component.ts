import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import IMovieData, { IMovieWorkerDetails } from '../../../../models/IMovieCredentials.interface';

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrl: './add-movie-form.component.css'
})
export class AddMovieFormComponent {
  addForm: FormGroup;
  addMemberForm: FormGroup;
  member: string | null = null;
  private memberFile: File | null = null;
  previewMember: string | null = null;
  private cast: IMovieWorkerDetails<File>[] = [];
  previewCast: IMovieWorkerDetails<string>[] = [];
  private crew: IMovieWorkerDetails<File>[] = [];
  previewCrew: IMovieWorkerDetails<string>[] = [];

  constructor() {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      about: new FormControl(''),
      bannerPhoto: new FormControl(''),
      coverPhoto: new FormControl(''),
      trailer: new FormControl(''),
      cast: new FormControl(''),
      category: new FormControl(''),
      crew: new FormControl(''),
      language: new FormControl(''),
      type: new FormControl(''),
      hours: new FormControl(''),
      minutes: new FormControl(''),
    });

    this.addMemberForm = new FormGroup({
      name: new FormControl(''),
      role: new FormControl(''),
      image: new FormControl('')
    });
  }
  
  lauchAddModal(member: string) {
    this.member = member;
  }

  closeModal() {
    this.member = null;
  }

  addMember() {
    const { name, role } = this.addMemberForm.value;
    const memberFile: IMovieWorkerDetails<File> = {
      name,
      role,
      image: this.memberFile!
    }

    this.previewMember = null;
    this.memberFile = null;

    this.addMemberForm.get('name')?.setValue('');
    this.addMemberForm.get('role')?.setValue('');
    this.addMemberForm.get('image')?.setValue('');
    
    if(this.member === "Cast") {
      this.cast.push(memberFile);
    }else if(this.member === "Crew"){
      this.crew.push(memberFile);
    }
    
    this.showPreviewMember();
    this.closeModal();
  }

  deleteImage(member: string, idx: number) {
    this.member = member;
    if(this.member === "Cast") {
      this.cast.splice(idx, 1);
    }else if(this.member === "Crew") {
      this.crew.splice(idx, 1);
    }

    this.showPreviewMember();
    this.member = null;
  }

  deleteImageMember() {
    this.memberFile = null;
    this.previewMember = null;
  }

  showPreviewMember() {

    if(this.member === "Cast") {
      this.previewCast = [];

      for(const each of this.cast) {
        const objectURL: string = URL.createObjectURL(each.image);
        const memberFile: IMovieWorkerDetails<string> = {
          name: each.name,
          role: each.role,
          image: objectURL
        }
        this.previewCast.push(memberFile);
      }
    }else if(this.member === "Crew"){
      this.previewCrew = [];

      for(const each of this.crew) {
        const objectURL: string = URL.createObjectURL(each.image);
        const memberFile: IMovieWorkerDetails<string> = {
          name: each.name,
          role: each.role,
          image: objectURL
        }
        this.previewCrew.push(memberFile);
      }
    }  
  }

  uploadMemberImage(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;

    const fileList: FileList | null = inputElement.files;

    const validExtentions: Set<string> = new Set(['.png', '.svg', '.jpg', '.avif']);

    if(!fileList) return;

    this.memberFile = fileList[0];
    this.previewMember = URL.createObjectURL(this.memberFile);
  }

  onSubmit() {
    console.log(this.addForm.value);
    
  }
}
