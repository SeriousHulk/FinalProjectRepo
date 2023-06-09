import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskComponent } from '../app/task/task.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddSubTaskComponent } from './components/sub-task/add-subtask/add-subtask.component';
import { ShowTasksComponent } from './components/task/show-tasks/show-tasks.component';
import { EditSubtaskComponent } from './components/sub-task/edit-subtask/edit-subtask.component';
//import { UpdateSubTaskComponent } from './components/sub-task/edit-subtask/edit-subtask.component';
import { DeleteSubtaskComponent } from './components/sub-task/delete-subtask/delete-subtask.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    TaskComponent,
    UserTasksComponent,
    EditTaskComponent,
    AddSubTaskComponent,
    ShowTasksComponent,
    EditSubtaskComponent,
    //UpdateSubTaskComponent,
    DeleteSubtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
