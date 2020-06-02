import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiServerService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<User[]>('/api/get-users')
      .pipe(
        shareReplay()
      );
  }

  getUserById(id: number) {
    return this.http.get<{ success: boolean, msg: string, user: User }>(`/api/get-user/${id}`);
  }

  addNewUser(user: User) {
    return this.http.post<{ success: boolean }>('/api/new-user/', { newUser: user });
  }
}
