import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChildren('sourceLi') sourceLiRef!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('highlightDiv') highlightDivRef!: ElementRef<HTMLDivElement>;

  selectOption(idx: number) {
    const sourceRect = this.sourceLiRef.toArray()[idx].nativeElement.getBoundingClientRect();
    console.log(sourceRect.top);
    
    this.highlightDivRef.nativeElement.style.top = sourceRect.top + 'px';
    this.highlightDivRef.nativeElement.style.height = sourceRect.height + 'px';
  }
}
