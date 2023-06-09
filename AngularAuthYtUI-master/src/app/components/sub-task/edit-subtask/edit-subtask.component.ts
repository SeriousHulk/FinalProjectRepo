import { Component, OnInit } from '@angular/core';
import { Subtask } from '../../../models/subtask.model';
import { SubtasksService } from '../../../services/subtasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-subtask',
  templateUrl: './edit-subtask.component.html',
  styleUrls: ['./edit-subtask.component.scss']
})
export class EditSubtaskComponent implements OnInit {
  subTask: Subtask = {
    id: 0,
    name: '',
    description: '',
    taskId: 0,
    isCompleted: false
  };
  subTaskName: string = '';
  subTaskDescription: string = '';
  subTaskId: number = 0;

  constructor(private subTaskService: SubtasksService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const subTaskId = params['id'];
      const userId: Guid = Guid.parse(this.authService.getUserId());
      const taskId: number = params['taskId'];
      console.log(taskId);
      //let subTask: Observable<any> = this.subTaskService.getSubTaskById(userId, taskId, subTaskId)
      // Fetch the subtask by ID
      this.subTaskService.getSubTaskById(userId, taskId, subTaskId).subscribe(
        (subTask: Subtask) => {
          this.subTask = subTask;
          this.subTaskName = subTask.name;
          this.subTaskDescription = subTask.description;
          this.subTaskId = subTaskId;
        },
        (error: any) => {
          console.error('Error retrieving subtask:', error);
          // Handle the error, such as displaying an error message or performing any necessary actions
        }
      );
    });
  }
  
  updateSubTask(subTaskId:number): void {
    if (this.subTaskName && this.subTaskDescription) {
      const userId: Guid = Guid.parse(this.authService.getUserId());
  
      this.route.params.subscribe(params => {
        const taskId: number = params['taskId'];
        if (this.subTaskId) {
          this.subTaskService.updateSubTask(userId, taskId, subTaskId, this.subTask).subscribe(
            (updatedSubTask: Subtask) => {
              console.log('Subtask updated:', updatedSubTask);
              // Handle the success response, such as displaying a success message or navigating back to the subtask list page
              this.router.navigateByUrl('/dashboard'); // Navigate back to the subtask list page with the task ID
            },
            (error: any) => {
              console.error('Error updating subtask:', error);
              // Handle the error, such as displaying an error message or performing any necessary actions
            }
          );
        }
      });
    }
  }
}
