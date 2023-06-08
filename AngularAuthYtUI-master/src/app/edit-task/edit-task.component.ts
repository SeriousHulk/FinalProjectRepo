import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task = {
    id: 0,
    name: '',
    description: '',
    isCompleted: false,
    bookmark: false,
    taskCategory: ''
  };
  taskName: string = '';
  taskDescription: string = '';
  taskCategory: string = '';
  tasks: Task[] = [];
  categoryOptions: string[] = ['Assignment', 'Grocery', 'Chores', 'Daily', 'Work', 'Personal'];

  customCategory: string = '';
  constructor(private taskService: TaskService,private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      // Rest of the code...
   
    //const taskId = this.route.snapshot.paramMap.get('id');// Get the task ID from the route parameter
    const userId: Guid = Guid.parse(this.authService.getUserId());

    // Fetch the task by ID
    this.taskService.getTaskById(userId, taskId).subscribe(
      (task: Task) => {
        this.task = task;
        this.taskName = task.name;
        this.taskCategory = task.taskCategory;
        this.taskDescription = task.description; // Assign the fetched task to the component's task variable
      },
      (error: any) => {
        console.error('Error retrieving task:', error);
        // Handle the error, such as displaying an error message or performing any necessary actions
      }
    );
  });
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
  updateTask(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
    const userId: Guid = Guid.parse(this.authService.getUserId());
    if (this.task.taskCategory === 'other' && this.customCategory) {
      this.task.taskCategory = this.customCategory;
    }
  
    // Make an API call to update the task
    this.taskService.updateTask(userId,taskId,this.task).subscribe(
      (updatedTask: Task) => {
        console.log('Task updated:', updatedTask);
        // Handle the success response, such as displaying a success message or navigating back to the task list page
        this.router.navigateByUrl('/dashboard'); // Navigate back to the task list page (dashboard)
      },
      (error: any) => {
        console.error('Error updating task:', error);
        // Handle the error, such as displaying an error message or performing any necessary actions
      }
    );
    })
  }
  editTask(task: Task): void {
    this.task = { ...task }; // Make a copy of the task object
  
    // Populate the form fields with the existing task data
    this.taskName = this.task.name;
    this.taskDescription = this.task.description;
    this.taskCategory = this.task.taskCategory;
  }
}
