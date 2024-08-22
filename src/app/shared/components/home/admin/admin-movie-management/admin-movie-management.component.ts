import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMovie } from '../../../../models/IMovieCredentials.interface';
import { AdminService } from '../../../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { IGetMoviesSuccessfullResponse, IListOrUnlistAPISucessfullResponse } from '../../../../models/IMovieAPIResponse.interface';
import { ModalComponent } from '../../../modal/modal/modal.component';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-admin-movie-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ModalComponent,
    PaginationComponent
  ],
  templateUrl: './admin-movie-management.component.html',
  styleUrl: './admin-movie-management.component.css'
})
export class AdminMovieManagementComponent {
  private adminService: AdminService = inject(AdminService);

  makeListedOrUnlisted: {_id: string, isListed: boolean, name: string} | null = null;
  private data: IMovie[] = [];
  displayData: IMovie[] = [];
  isListed: boolean = true;
  totalMovies: number = 0;
  limit: number = 10;
  private searchText: string = '';


  constructor() {
    this.getData(1);
  }

  changeItems() {
    this.isListed = !this.isListed;
    this.getData(1);
  }

  search(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();

    this.searchText = searchText;

    this.displayData = this.data.filter((movie) => {
      return (movie.isListed === this.isListed && movie.name.toLowerCase().startsWith(searchText));
    });
  }

  confirm(confirm: boolean) {
    if(confirm && this.makeListedOrUnlisted) {
      this.listOrUnlistMovie(this.makeListedOrUnlisted);
    }

    this.makeListedOrUnlisted = null;
   }

   popConfimationModal(data: {_id: string, isListed: boolean, name: string}) {
    this.makeListedOrUnlisted = data;
   }

   private listOrUnlistMovie(data: {_id: string, isListed: boolean, name: string}) {
    const listOrUnlistMovieAPIResponse$: Observable<IListOrUnlistAPISucessfullResponse> = this.adminService.listOrUnlistMovie(data);

    listOrUnlistMovieAPIResponse$.subscribe(
      ((res: IListOrUnlistAPISucessfullResponse) => {
        console.log(res.message);
        this.getData(1);
      }),
      ((err: any) => {
        if(err.requiredCredentialsError) {
          console.error(err);
        }else{
          console.error(err);
        }
      })
    );
   }

   getData(pageNumber: number) {
    const getDataAPIResponse$: Observable<IGetMoviesSuccessfullResponse> = this.adminService.getAllMovies(pageNumber, this.isListed, this.limit);

    getDataAPIResponse$.subscribe(
      (res => {
        this.data = res.data.movies;
        this.displayData = this.data;
        this.totalMovies = res.data.totalMovieCount;
      })
    );
  }
}
