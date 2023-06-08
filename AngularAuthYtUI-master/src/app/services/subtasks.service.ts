import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Subtask } from '../models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

    private apiUrl = 'https://localhost:7133/api/v1'; 
  constructor(private http:HttpClient) { }

  getAllSubTask(userId: Guid, taskId: number):Observable<any>
  {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks`;
    return this.http.get<Subtask[]>(url);
  }
  addSubTask(userId: Guid, taskId: number, subTask: Subtask){
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks`;
    return this.http.post<Subtask>(url, subTask);
  }
  deleteSubTask(userId: Guid, taskId: number, subTaskId: number){
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks/${subTaskId}`;
    return this.http.delete<void>(url);
  }
  updateSubTask(userId: Guid, taskId: number, subTaskId: number, subTask: Subtask) {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks/${subTaskId}`;
    return this.http.put<Subtask>(url, subTask);
  }
  getSubTaskById(userId: Guid, taskId: number, subTaskId: number, subTask: Subtask):Observable<any>{
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks/${subTaskId}`;
    return this.http.get(url);
  }
}
