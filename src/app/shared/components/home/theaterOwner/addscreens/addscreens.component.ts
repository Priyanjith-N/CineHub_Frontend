import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  seatCategory: string[] = [];
  selectedSeatCategory: (string | undefined)[] = [];
  private seatLayout: boolean[][] = [];
  showSeatArrangementModal: boolean = false;
  showSeatPatternModal: boolean = false;
  showSeatCategoryModal: boolean = false;
  selectSeatLayout: boolean[][] = [];
  screenForm: FormGroup;
  seatPatternForm: FormGroup;
  
  constructor() {
    this.screenForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      seatCategory: new FormControl('', [Validators.required]),
      rows: new FormControl('', [Validators.required]),
      cols: new FormControl('', [Validators.required]),
      setSeatLayout: new FormControl(''),
      setSeatNumberPattern: new FormControl(''),
      setSeatCategory: new FormControl(''),
    });

    this.seatPatternForm = new FormGroup({
      patten: new FormControl('Alphanumerical', [Validators.required]),
      startFrom: new FormControl('left', [Validators.required]),
    })
  }

  setSeatLayout() {
    const rows: number = this.screenForm.value.rows;
    const cols: number = this.screenForm.value.cols;

    if(!rows || !cols) {
      return;
    }

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
    if(!this.screenForm.value.seatCategory || !this.screenForm.value.rows) {
      return this.screenForm.markAllAsTouched();
    }

    this.seatCategory = this.screenForm.value.seatCategory.split(',').map((category: string) => {
      return category.trim();
    });

    const rows: number = this.screenForm.value.rows;

    if(!this.selectedSeatCategory.length) {
      for(let i = 0;i<rows;i++) {
        this.selectedSeatCategory.push(undefined);
      }
    }

    this.showSeatCategoryModal = true;
  }

  clearSeatCategory() {
    this.selectedSeatCategory = [];
    const rows: number = this.screenForm.value.rows;

    if(!this.selectedSeatCategory.length) {
      for(let i = 0;i<rows;i++) {
        this.selectedSeatCategory.push(undefined);
      }
    }

    this.closeModal();
  }

  setSeatCategorySubmit() {
    for(const category of this.selectedSeatCategory) {
      if(!category) {
        return;
      }
    }

    this.closeModal();
  }

  selectOption(idx: number, category: string){
    this.selectedSeatCategory[idx] = category;
  }

  openShowSeatPatternModal() {
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
    this.seatLayout = [];
    for(let i = 0;i<this.selectSeatLayout.length;i++) {
      this.seatLayout.push([]);
      for(let j = 0;j<this.selectSeatLayout[i].length;j++) {
        this.seatLayout[i].push(this.selectSeatLayout[i][j]);
      }
    }
    this.closeModal();
  }

  seatPatternFormSubmit() {
    if(this.seatPatternForm.invalid) {
      return this.seatPatternForm.markAllAsTouched();
    }

    this.closeModal();
  }
}
