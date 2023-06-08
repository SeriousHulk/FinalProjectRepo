import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TokenApiDTO } from '../models/token-api.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  userName: string = '';
  task: Task = {
    id: 0,
    name: '',
    description: '',
    isCompleted: false,
    bookmark: false,
    taskCategory: ''
  };
  tasks: Task[] = [];
  categoryOptions: string[] = ['Assignment', 'Grocery', 'Chores', 'Daily', 'Work', 'Personal'];

  customCategory: string = '';

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId: Guid = Guid.parse(this.authService.getUserId());
    this.userName = this.authService.getUserFullName();
    this.loadTasks(userId);
  }

  loadTasks(userId: Guid): void {
    this.taskService.getTasks(userId).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error retrieving tasks:', error);
      }
    );
  }

  onSubmit(): void {
    const userId: Guid = Guid.parse(this.authService.getUserId());
    
    if (userId) {
      //const  = token.userId; // Retrieve the userId from the token response
      
      if (this.task.taskCategory === 'other' && this.customCategory) {
        this.task.taskCategory = this.customCategory;
      }
  
      this.taskService.addTask(userId, this.task).subscribe(
        (newTask: Task) => {
          console.log('Task added successfully:', newTask);
          this.loadTasks(userId); // Reload tasks after adding a new task
        },
        (error: any) => {
          console.error('Error adding task:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP Error Status:', error.status);
            console.error('HTTP Error Message:', error.message);
          }
        }
      );
    } else {
      console.error('Token not available.');
    }
  }
  
  

  editTask(task: Task): void {
    this.task = { ...task }; // Make a copy of the task object
  }

  deleteTask(task: Task): void {
    const userId: Guid = Guid.parse(this.authService.getUserId());
    this.taskService.deleteTask(userId,task.id).subscribe(
      () => {
        console.log('Task deleted successfully.');
        this.loadTasks(userId);
      },
      (error: any) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  addTask(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.task = {
      id: 0,
      name: '',
      description: '',
      isCompleted: false,
      bookmark: false,
      taskCategory: ''
    };
    this.customCategory = '';
  }
}
