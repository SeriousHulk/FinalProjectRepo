import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';
import { Subtask } from '../../models/subtask.model';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { HttpErrorResponse } from '@angular/common/http';
 // Import the component or form for adding a task


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:any = [];
  public role!:string;
  userName: string = '';
  task: Task = {
    id: 0,
    name: '',
    description: '',
    isCompleted: false,
    bookmark: false,
    taskCategory: '',
    subtasks:[]
  };
  showSubtasksForTask: number | null = null;
  tasks: Task[] = [];
  categoryOptions: string[] = ['Assignment', 'Grocery', 'Chores', 'Daily', 'Work', 'Personal'];

  customCategory: string = '';
  public name : string = "";
  constructor(private router: Router,private api : ApiService, private auth: AuthService, private userStore: UserStoreService,private taskService: TaskService) { }
  getSubtasksForTask(taskId: number): Subtask[] {
    const task = this.tasks.find(task => task.id === taskId);
    return task && task.subtasks ? task.subtasks : [];
  }
  ngOnInit() {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    this.userName = this.auth.getUserFullName();
    this.loadTasks(userId);
    this.name = this.auth.getUserFullName();
    console.log(this.userName);
    this.api.getUsers()
    .subscribe(res=>{
      
    this.users = res;
    },
    (error) => {
      console.error('Error fetching users:', error);
    });
    
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.name = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  goToAddTask(): void {
    this.router.navigateByUrl('/tasks/add');
  }
  logout(){
    this.auth.signOut();
  }
  loadSubtasks(taskId: number): void {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    this.taskService.getSubTasks(userId, taskId).subscribe(
      (subtasks: Subtask[]) => {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
          task.subtasks = subtasks;
        }
      },
      (error: any) => {
        console.error('Error retrieving subtasks:', error);
      }
    );
  }
  toggleShowSubtasks(taskId: number): void {
    if (this.showSubtasksForTask === taskId) {
      this.showSubtasksForTask = null;
    } else {
      this.showSubtasksForTask = taskId;
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        this.loadSubtasks(task.id);
      }
    }
  }
  isTaskSelected(taskId: number): boolean {
    return this.tasks.some(t => t.id === taskId);
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
  editTask(task: Task): void {
    const taskId = task.id;
    this.router.navigate(['/tasks/edit', taskId]);
  }
  toggleBookmark(task: Task) {
    task.bookmark = !task.bookmark;
  }
  
deleteTask(task: Task): void {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    this.taskService.deleteTask(userId, task.id).subscribe(
      () => {
        console.log('Task deleted successfully.');
        this.loadTasks(userId);
        this.router.navigate(['dashboard']);
      },
      (error: any) => {
        console.log(error);
        console.error('Error deleting task:', error);
      }
    );
  }
}

deleteSubTask(subTask: Subtask, taskId: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this subtask?');
  if (confirmDelete) {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    const subTaskId = subTask.id;
    this.taskService.deleteSubTask(userId, taskId, subTaskId).subscribe(
      () => {
        console.log('Subtask deleted successfully!');
        this.loadSubtasks(taskId);
        this.router.navigate(['dashboard']);
      },
      (error: any) => {
        console.log(error);
        console.error('Error deleting subTask:', error);
      }
    );
  }
}
  editSubTask(subTask: Subtask, taskId: number): void {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    const subTaskId = subTask.id;
  
    //const taskId = task.id;
    this.router.navigate(['dashboard/edit-subtask/', subTaskId,taskId]);
  }
  
  onSubmit(): void {
    const userId: Guid = Guid.parse(this.auth.getUserId());
    
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
      taskCategory: '',
      subtasks:[]
    };
    this.customCategory = '';
  }
}
