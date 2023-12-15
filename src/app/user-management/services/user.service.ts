import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IUser, UserDto } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/users`);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/users/${userId}`);
  }

  addNewUser(userDto: UserDto): Observable<IUser> {
    return this.http.post<UserDto>(`${this.url}/users`, userDto);
  }

  editExistingUser(userId: string, userDto: UserDto): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/users/${userId}`, userDto);
  }

  deleteUserById(userId: number): Observable<IUser[]> {
    return this.http.delete<IUser[]>(`${this.url}/users/${userId}`);
  }
}
