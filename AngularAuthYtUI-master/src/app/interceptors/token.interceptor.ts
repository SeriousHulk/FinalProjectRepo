import { TokenApiDTO } from './../models/token-api.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    // this.start.load();
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}  // "Bearer "+myToken
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            //this.router.navigate(['login'])
            //handle
            return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=> err)
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    const tokenApiModel: TokenApiDTO = {
      accessToken: this.auth.getToken()!,
      refreshToken: this.auth.getRefreshToken()!,
      userId: Guid.create()
    };
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiDTO)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"You are not Authorized to Login, Contact Admin"});
          this.router.navigate(['login'])
        })
      })
    )
  }
}
