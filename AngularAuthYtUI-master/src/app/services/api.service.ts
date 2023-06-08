import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7133/';
  constructor(private http: HttpClient) {}
  updateUser(userId: Guid, user: any): Observable<any> {
    const url = `${this.baseUrl}UpdateUser/${userId}`; // Replace with your API endpoint for updating a user

    return this.http.put(url, user);
  }
  getUsers() {
    return this.http.get<any[]>(this.baseUrl+'GetAllUsers');
  }
}
