import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from '../../../services/subtasks.service';
import { AuthService } from '../../../services/auth.service'; // Import your authentication service
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss']
})
export class AddSubTaskComponent implements OnInit{
  sideNavStatus:boolean=true;
  addSubTask:FormGroup;

  constructor(private authService: AuthService,private route:ActivatedRoute,private subTaskService:SubtasksService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){
      this.addSubTask = this.fb.group({
        Name: ["", Validators.required],
        Description: ["", Validators.required]
      });
    }

  ngOnInit(): void {
    this.addSubTask=this.fb.group({
      Name:["",Validators.required],
      Description:["",Validators.required]
    })
  }

  onAdd() {
    console.log("onAdd() called");
    console.log("Form valid?", this.addSubTask.valid);
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        console.log("id:", id); 
        if (id) {
          const userId: Guid = Guid.parse(this.authService.getUserId()); // Provide the appropriate userId value
          const taskId = Number.parseInt(params.get('id')?? '', 10); // Provide the appropriate taskId value
          const subTask = this.addSubTask.value; // Get the subTask from the form
          console.log(subTask);
          this.subTaskService.addSubTask(userId, taskId, subTask)
            .subscribe({
              next: (res) => {
                this.toast.success({
                  detail: "SUCCESS",
                  summary: "SubTask Added Successfully!!",
                  duration: 3000
                });
                this.router.navigate(['dashboard']);
              },
              error: (err) => {
                this.toast.error({
                  detail: "ERROR",
                  summary: err?.error.message,
                  duration: 3000
                });
              }
            });
        }
      }
    });
  }
  
}
