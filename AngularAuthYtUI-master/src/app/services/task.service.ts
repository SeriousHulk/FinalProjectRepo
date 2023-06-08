import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Task } from '../models/task.model';
import { Subtask } from '../models/subtask.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7133/api/v1'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all tasks for a user
  getTasks(userId: Guid): Observable<Task[]> {
    const url = `${this.apiUrl}/user/${userId}/tasks`;
    return this.http.get<Task[]>(url).pipe(
      switchMap((tasks: Task[]) => {
        const requests: Observable<Subtask[]>[] = tasks.map(task =>
          this.getSubTasks(userId, task.id)
        );
        return forkJoin([...requests]).pipe(
          map(subtasksArray => {
            tasks.forEach((task, index) => {
              task.subtasks = subtasksArray[index];
            });
            return tasks;
          })
        );
      })
    );
  }
  
  getTaskById(userId: Guid, taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}`; // Modify the URL to match your API endpoint for retrieving a task by ID
    return this.http.get<Task>(url);
  }

  // Create a new task for a user
  createTask(userId: Guid, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/user/${userId}/tasks`;
    return this.http.post<Task>(url, task);
  }
  // Create a new task for a user
  addTask(userId: Guid, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/user/${userId}/tasks`;
    return this.http.post<Task>(url, task);
  }
  
  // Update an existing task for a user
  updateTask(userId: Guid,taskId:number, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  // Delete a task for a user
  deleteTask(userId: Guid, taskId: number): Observable<void> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}`;
    return this.http.delete<void>(url);
  }

  // Fetch all subtasks for a task of a user
  getSubTasks(userId: Guid, taskId: number): Observable<Subtask[]> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks`;
    return this.http.get<Subtask[]>(url);
  }

  // Create a new subtask for a task of a user
  createSubTask(userId: Guid, taskId: number, subTask: Subtask): Observable<Subtask> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks`;
    return this.http.post<Subtask>(url, subTask);
  }

  // Update an existing subtask for a task of a user
  updateSubTask(userId: Guid, taskId: number, subTaskId: number, subTask: Subtask): Observable<Subtask> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks/${subTaskId}`;
    return this.http.put<Subtask>(url, subTask);
  }

  // Delete a subtask for a task of a user
  deleteSubTask(userId: Guid, taskId: number, subTaskId: number): Observable<void> {
    const url = `${this.apiUrl}/user/${userId}/tasks/${taskId}/subtasks/${subTaskId}`;
    return this.http.delete<void>(url);
  }
}
