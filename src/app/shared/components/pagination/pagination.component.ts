import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input({ required: true }) totalItems: number = 0;
  @Input({ required: true }) pageSize: number = 0;
  currentPage : number = 1;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>;

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return pageNumbers;
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if((this.currentPage + 1) > totalPages) return;

    this.currentPage++;
    this.changePageAction();
  }

  previousPage() {
    if(this.currentPage - 1 <= 0) return;

    this.currentPage--;
    this.changePageAction();
  }

  changePageByClick(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changePageAction();
  }

  private changePageAction() {
    this.changePage.emit(this.currentPage);
  }
}
