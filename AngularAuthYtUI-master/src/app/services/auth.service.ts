import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiDTO  } from '../models/token-api.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7133/api/v1/Login/';
  private userPayload:any;
  private jwtHelper: JwtHelperService;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
    this.jwtHelper = new JwtHelperService();
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }


  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getUserFullName(): string {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken?.unique_name || '';
  }
  getUserId(): string {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken?.userId || '';
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiDTO ){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
