import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
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

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId: Guid = Guid.parse(this.authService.getUserId()); // Obtain the user ID
  
    // Load tasks for the user
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
    const userId: Guid = Guid.parse(this.authService.getUserId()); // Obtain the user ID
    
    if (this.task.taskCategory === 'other' && this.customCategory) {
      this.task.taskCategory = this.customCategory;
    }
  
    this.taskService.addTask(userId, this.task).subscribe(
      (newTask: Task) => {
        console.log('Task added successfully:', newTask);
        this.loadTasks(userId); // Reload tasks after adding a new task
        this.router.navigate(['/dashboard']); // Redirect to UserTasksComponent
      },
      (error: any) => {
        console.error('Error adding task:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP Error Status:', error.status);
          console.error('HTTP Error Message:', error.message);
        }
      }
    );
  
    // Reset the task object after form submission
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

  deleteTask(task: Task): void {
    const userId: Guid = Guid.parse(this.authService.getUserId());
    this.taskService.deleteTask(userId, task.id).subscribe(
      () => {
        console.log('Task deleted successfully.');
        this.loadTasks(userId);
      },
      (error: any) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
