// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service';
// import { Task } from '../models/task.model';
// import { Subtask } from '../models/subtask.model';

// @Component({
//   selector: 'app-user',
//   templateUrl: 'user.component.html',
//   styleUrls: ['user.component.css']
// })
// export class UserComponent implements OnInit {
//   user: User;
//   tasks: Task[];

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     // Retrieve user details from the service
//     this.user = this.userService.getUser();

//     // Retrieve main tasks and their subtasks from the service
//     this.tasks = this.userService.getTasks();
//   }

//   toggleSubtasks(task: Task) {
//     task.showSubtasks = !task.showSubtasks;
//   }
// }
