import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  user: any; 
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.user = tokenPayload;
          console.log(this.user.isActive);
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
           // Check if the user is active before navigating to the dashboard
           if (this.user.isActive) {
            this.router.navigate(['dashboard']);
          } else {
            // Show an error or display a message indicating that the user is not active
            this.toast.error({ detail: 'ERROR', summary: 'User is not active!', duration: 5000 });
          }
        },
        error: (err) => {
          if (err.error.message === 'Password is Incorrect') {
            this.toast.error({ detail: "ERROR", summary: "Incorrect password!", duration: 5000 });
            this.loginForm.setErrors({ incorrectPassword: true });
          } else {
            this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 5000 });
            console.log(err);
          }
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
