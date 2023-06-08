import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TaskComponent } from '../app/task/task.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddSubTaskComponent } from './components/sub-task/add-subtask/add-subtask.component';
import { UpdateSubTaskComponent } from './components/sub-task/edit-subtask/edit-subtask.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  { path: 'tasks/add', component:TaskComponent },
  { path: 'tasks/edit/:id', component:EditTaskComponent},
  { path: 'tasks', component: UserTasksComponent },
  { path: 'dashboard/add-subtask/:id', component:AddSubTaskComponent},
  { path: 'dashboard/edit-subtask/:id', component:UpdateSubTaskComponent},
  { path: 'dashboard/delete-subtask/:id', component:UpdateSubTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
