import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from 'src/app/services/subtasks.service';
import ValidateForm from '../../../Validators/validateForm';
import { Guid } from 'guid-typescript';
import { AuthService } from '../../../services/auth.service';
import { Subtask } from 'src/app/models/subtask.model';

@Component({
  selector: 'app-update-sub-task',
  templateUrl: './edit-subtask.component.html',
  styleUrls: ['./edit-subtask.component.scss']
})
export class UpdateSubTaskComponent {
  sideNavStatus:boolean=true;
  updateSubTask:FormGroup;
  public subTaskDetail!:Subtask;
  public taskId: null | number = null;
public subTaskId: number | null = null;


  constructor(private route:ActivatedRoute,private subTaskapi:SubtasksService,private auth: AuthService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){
      this.updateSubTask = this.fb.group({
        Name: ["", Validators.required],
        Description: ["", Validators.required]
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const userId: Guid = Guid.parse(this.auth.getUserId());
          const subTaskId= params.get('id');
          this.taskId = Number.parseInt(params.get('id')?? '',10);
          //this.subTaskId =Number.parseInt(params.get('id')?? '',10);
          //this.subTaskId = Number.parseInt(params.get('subTaskId')?? '',10);
          //console.log(Id);
          //const taskId = Number.parseInt(params.get('id')?? '', 10); 
          const subTask = this.updateSubTask.value;
          //const subTaskId = Number.parseInt(params.get('id')?? '', 10);
          console.log(userId );
          console.log(this.taskId,subTaskId);
          if (this.subTaskId){
            this.subTaskapi.getSubTaskById(userId , this.taskId, this.subTaskId, subTask)
            .subscribe({
              next:(response)=>{
                console.log(response)
                this.subTaskDetail = response;

                //this.subTaskDetail.id=this.subTaskDetail.id;
                this.updateSubTask.patchValue({
                  Name: this.subTaskDetail.name,
                  Description: this.subTaskDetail.description,
               });
              }
            }); 
          }
        }
      }
    )

    this.updateSubTask=this.fb.group({
      Name:["",Validators.required],
      Description:["",Validators.required]
    })
  }

  onUpdate(){
    if(this.updateSubTask.valid){
          const userId: Guid = Guid.parse(this.auth.getUserId());
          //const id = params.get('id');
          const taskId = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? '', 10); 
          const subTask = this.updateSubTask.value;
          const subTaskId = this.subTaskDetail.id;
          
     this.subTaskapi.updateSubTask(userId, taskId, subTaskId, subTask)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"Task Updated Succesfully!!",duration:5000})
            this.router.navigate(['dashboard']);
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
          })
        })
    }
    else{
      // logic for throwing Error if Form is Not Valid
      ValidateForm.validateAllFormFields(this.updateSubTask);
    }
  }
}
