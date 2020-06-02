import { ApiServerService } from './api-server.service';
import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralFacade {

  constructor(
    private api: ApiServerService,
    private router: Router
  ) { }


  getUsers() {
    return this.api.getUsers()
      .pipe(
        catchError(err => {

          alert('Could not load users');
          throwError(err);
          return [];
        }),
      );
    ;
  }

  getUserById(id: number) {
    return this.api.getUserById(id)
      .pipe(

        map(res => {
          if (res.success) {

            return res.user;

          } else {

            alert('Could not get user details');
            throw new Error();
          }
        }),
        catchError(err => throwError(err)),
      );
  }

  addNewUser(user: User) {
    const birthdate = user.birthdate as Date;
    const updatedUser = { ...user, birthdate: birthdate.getTime() };
    return this.api.addNewUser(updatedUser)
      .pipe(

        map(res => {
          if (res.success) {
            alert('Successful')
            this.router.navigate(['user-list']);
          } else {
            alert('Could not save');
          }
        }),
        catchError(err => throwError(err)),
      );
  }


}
