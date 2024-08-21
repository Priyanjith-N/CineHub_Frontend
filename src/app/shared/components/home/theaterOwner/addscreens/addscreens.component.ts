import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { IScreenCredentials } from '../../../../models/ITheaterCredentials.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterOwnerService } from '../../../../../core/services/theater-owner.service';
import { Observable } from 'rxjs';
import { IAddScreenErrorResponse, IAddScreenSucessfullResponse } from '../../../../models/ITheaterOwnerAPIResponse.interface';

@Component({
  selector: 'app-addscreens',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './addscreens.component.html',
  styleUrl: './addscreens.component.css'
})
export class AddscreensComponent {
  private router: Router = inject(Router);
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);
  private theaterOwnerService: TheaterOwnerService = inject(TheaterOwnerService);
  private toastMessageService: ToastMessageService = inject(ToastMessageService);
  private theaterId: string = '';

  isFormSubmited: boolean = false;
  seatCategory: { category: string, price: number }[] = [];
  selectedSeatCategory: ({ category: string, price: number } | undefined | null)[] = [];
  private seatLayout: boolean[][] = [];
  showSeatArrangementModal: boolean = false;
  showSeatPatternModal: boolean = false;
  showSeatCategoryModal: boolean = false;
  selectSeatLayout: boolean[][] = [];
  screenForm: FormGroup;
  seatPatternForm: FormGroup;
  
  constructor() {
    this.theaterId = this.activeRouter.parent?.snapshot.params['theaterId'];
    
    this.screenForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      seatCategory: new FormControl(''),
      rows: new FormControl('', [Validators.required]),
      cols: new FormControl('', [Validators.required]),
      setSeatLayout: new FormControl(''),
      setSeatNumberPattern: new FormControl(''),
      setSeatCategory: new FormControl(''),
      seatPrice: new FormControl(''),
      categoryName: new FormControl('')
    });

    this.seatPatternForm = new FormGroup({
      patten: new FormControl('Alphanumerical', [Validators.required]),
      startFrom: new FormControl('left', [Validators.required]),
    })
  }

  addCategory() {
    const seatPrice: number = this.screenForm.value.seatPrice;
    const categoryName: string = this.screenForm.value.categoryName;

    if(!categoryName) {
      this.screenForm.get('categoryName')?.setErrors({message: "This Field is required."});
      this.screenForm.get('categoryName')?.markAsTouched();
    }
    
    if(!seatPrice){
      this.screenForm.get('seatPrice')?.setErrors({message: "This Field is required."});
      this.screenForm.get('seatPrice')?.markAsTouched();
    }
    
    if(!categoryName || !seatPrice) return;

    this.screenForm.get('categoryName')?.setValue('');
    this.screenForm.get('seatPrice')?.setValue('');
    
    if(this.seatCategory.find((obj) => obj?.category === categoryName)) {
      this.screenForm.get('categoryName')?.setErrors({message: "This category already added."});
      return;
    }
    
    this.seatCategory.push({ category: categoryName, price: seatPrice });
  }

  setSeatLayout() {
    
    const rows: number = this.screenForm.value.rows;
    const cols: number = this.screenForm.value.cols;
    
    if(!rows || !cols) {
      return;
    }
    this.screenForm.get('setSeatLayout')?.setErrors(null);

    if(this.seatLayout.length === rows && this.seatLayout[0].length === cols) {
      this.selectSeatLayout = [];
      for(let i = 0;i<rows;i++) {
        this.selectSeatLayout.push([]);
        for(let j = 0;j<cols;j++) {
          this.selectSeatLayout[i].push(this.seatLayout[i][j]);
        }
      }
    }else{
      this.selectSeatLayout = [];
      for(let i = 0;i<rows;i++) {
        this.selectSeatLayout.push([]);
        for(let j = 0;j<cols;j++) {
          this.selectSeatLayout[i].push(false);
        }
      }
    }

    this.showSeatArrangementModal = true;
  }

  setSeatCategory() {
    
    if(!this.screenForm.value.rows) {
      return this.screenForm.markAllAsTouched();
    }

    const rows: number = this.screenForm.value.rows;

    if(!this.selectedSeatCategory.length || this.selectedSeatCategory.length !== rows) {
      this.selectedSeatCategory = [];
      for(const row of this.seatLayout){
        let rowUsed: boolean = false;
        for(const col of row) {
          if(col) {
            rowUsed = true;
            break;
          }
        }

        if(rowUsed) {
          this.selectedSeatCategory.push(undefined);
        }else{
          this.selectedSeatCategory.push(null);
        }
      }
    }

    this.showSeatCategoryModal = true;
  }

  clearSeatCategory() {
    this.selectedSeatCategory = [];
    const rows: number = this.screenForm.value.rows;

    if(!this.selectedSeatCategory.length) {
      for(const row of this.seatLayout){
        let rowUsed: boolean = false;
        for(const col of row) {
          if(col) {
            rowUsed = true;
            break;
          }
        }

        if(rowUsed) {
          this.selectedSeatCategory.push(undefined);
        }else{
          this.selectedSeatCategory.push(null);
        }
      }
    }

    this.closeModal();
  }

  setSeatCategorySubmit() {
    let seatSelected: number = 0;
    let rowsSelected: number = 0;

    for(const row of this.seatLayout) {
      for(const col of row) {
        if(col) {
          rowsSelected++;
          break;
        }
      }
    }
    const set: Set<string> = new Set();
    for(const obj of this.selectedSeatCategory) {
      if(!obj) {
        continue;
      }

      seatSelected++;

      if(!set.has(obj.category)) {
        set.add(obj.category);
      }
    }

    const capacity: number = this.screenForm.value.capacity;
    console.log(capacity, seatSelected);
    

    if(seatSelected !== rowsSelected){
      const toastOptions: IToastOption = {
        severity: 'warn',
        summary: 'Error',
        detail: 'Select all rows.'
      }

      this.showToast(toastOptions);
      return;
    }

    for(const obj of this.seatCategory) {
      if(!set.has(obj.category)) {
        const toastOptions: IToastOption = {
          severity: 'warn',
          summary: 'Error',
          detail: 'Select Rows for all Seat Category.'
        }

        this.showToast(toastOptions);
        return;
      }
    }

    this.closeModal();
  }

  seatCategoryEffectChange() {
    this.selectedSeatCategory = [];
  }

  selectOption(idx: number, category: { category: string, price: number}){
    this.selectedSeatCategory[idx] = category;
  }

  openShowSeatPatternModal() {
    this.screenForm.get('setSeatNumberPattern')?.setErrors(null);
    this.showSeatPatternModal = true;
  }

  closeModal() {
    this.showSeatArrangementModal = false;
    this.showSeatPatternModal = false;
    this.showSeatCategoryModal = false;
  }

  selectSeat(rowIdx: number, colIdx: number) {
    this.selectSeatLayout[rowIdx][colIdx] = !this.selectSeatLayout[rowIdx][colIdx];
    
  }

  setLayout() {
    const capacity = this.screenForm.value.capacity;
    let selectedSeats: number = 0;

    this.seatLayout = [];
    for(let i = 0;i<this.selectSeatLayout.length;i++) {
      this.seatLayout.push([]);
      for(let j = 0;j<this.selectSeatLayout[i].length;j++) {
        if(this.selectSeatLayout[i][j]) {
          selectedSeats++;
        }
        this.seatLayout[i].push(this.selectSeatLayout[i][j]);
      }
    }

    if(capacity !== selectedSeats) {
      this.seatLayout = []
      const toastOptions: IToastOption = {
        severity: 'warn',
        summary: 'Error',
        detail: `Select ${capacity} seats in total.`
      }

      this.showToast(toastOptions);
      return;
    }
    this.closeModal();
  }

  seatPatternFormSubmit() {
    if(this.seatPatternForm.invalid) {
      return this.seatPatternForm.markAllAsTouched();
    }

    this.closeModal();
  }

  validateForm() {
    this.screenForm.get('setSeatLayout')?.setErrors(null);
    this.screenForm.get('setSeatNumberPattern')?.setErrors(null);
    this.screenForm.get('setSeatCategory')?.setErrors(null);
    const rows: number = this.screenForm.value.rows;
    const cols: number = this.screenForm.value.cols;
    const capacity: number = this.screenForm.value.capacity;
    
    if(rows && cols && ((rows * cols) < capacity)) {
      this.screenForm.get('capacity')?.setErrors({ message: `Capacity should be lower or equal to ${rows * cols}.` });
      return;
    }
    
    if(this.seatLayout.length !== rows || this.seatLayout[0].length !== cols) {
      this.screenForm.get('setSeatLayout')?.setErrors({ message: `This Field is requied.` });
    }else{
      let selectedSeats: number = 0;

      for(const row of this.seatLayout) {
        for(const col of row) {
          if(col) {
            selectedSeats++;
          }
        }
      }

      if(capacity !== selectedSeats) {
        this.screenForm.get('setSeatLayout')?.setErrors({ message: `Please select ${capacity} seats total.` });
      }
    }
    
    if(this.seatPatternForm.invalid) {
      this.screenForm.get('setSeatNumberPattern')?.setErrors({ message: `This Field is requied.` });
    }
    
    if(!this.selectedSeatCategory.length) {
      this.screenForm.get('setSeatCategory')?.setErrors({ message: `This Field is requied.` });
    }
    
  }

  async onSubmit() {
    this.validateForm();
    
    if(this.screenForm.invalid) {
      this.screenForm.markAllAsTouched();
      return;
    }

    this.isFormSubmited = true;

    const data: IScreenCredentials = {
      name: this.screenForm.value.name,
      capacity: this.screenForm.value.capacity,
      seatCategory: this.seatCategory,
      seatLayout: this.seatLayout,
      seatNumberPattern: {
        pattern: this.seatPatternForm.value.patten,
        startFrom: this.seatPatternForm.value.startFrom
      },
      seatCategoryPattern: this.selectedSeatCategory
    }

    const APIResponse$: Observable<IAddScreenSucessfullResponse> = this.theaterOwnerService.addScreen(data, this.theaterId);

    APIResponse$.subscribe(
      (res => {
        this.isFormSubmited = false;
        
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/theaterOwner/managetheater/', this.theaterId]); // navigate to home Page after successfull login.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        if(err.errorField) {
          const errObj: IAddScreenErrorResponse = err as IAddScreenErrorResponse;
          this.screenForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          this.screenForm.markAllAsTouched();
        }
      })
    );
    
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
