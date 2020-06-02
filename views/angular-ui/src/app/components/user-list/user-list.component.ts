import { GeneralFacade } from './../../general.facade';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['picture', 'username', 'first_name', 'last_name'];
  dataSource$: Observable<MatTableDataSource<User>>;


  // userList$ = this.facade.getUsers().pipe(tap(users => console.log('Users', users)));

  // step = this.quantityShowenUsers.value;
  // usersPage$ = this.userList$
  //   .pipe(
  //     map(users => {
  //       const pages: number = users.length / this.quantityShowenUsers.value;
  //       return pages;
  //     })
  //   );

  constructor(
    private facade: GeneralFacade,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.getUsers();
  }



  getUsers() {
    this.dataSource$ = this.facade.getUsers()
      .pipe(
        map(users => {
          const dataSource = new MatTableDataSource<User>();
          dataSource.data = users;
          dataSource.paginator = this.paginator;


          return dataSource;
        }))
  }

  // setPageSize() {
  //   this.pageSize = this.paginator.pageSize;
  //   this.startPosition = this.paginator.pageSize;
  // }

  // changePage() {
  //   if (this.currentPageIndex < this.paginator.pageIndex) {

  //     this.startPosition = this.startPosition + this.paginator.pageSize;

  //     this.endPosition = this.endPosition + this.paginator.pageSize;

  //   } else if (this.currentPageIndex > this.paginator.pageIndex) {

  //     this.startPosition = this.startPosition - this.paginator.pageSize;

  //     this.endPosition = this.endPosition - this.paginator.pageSize;
  //   }

  //   this.currentPageIndex = this.paginator.pageIndex;
  // }

  showUserDetails(id: number) {
    this.router.navigate([`user-details/${id}`]);
  }
}
