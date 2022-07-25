import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://api.github.com/search/users?';
  constructor(private http: HttpClient) {}

  getUser(email: string) {
    const apiUrl = `${this.baseUrl}q=${email}%20in:login`;
    return this.http.get(apiUrl);
  }
}
