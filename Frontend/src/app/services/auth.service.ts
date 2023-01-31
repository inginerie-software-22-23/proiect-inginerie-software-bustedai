import { Injectable } from '@angular/core';
import { SignInData } from '../model/signInData';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private readonly mockUser: SignInData = new SignInData('user', 'test');
  public isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) { }
  
  login(email:string, password:string){
    const authData: SignInData = {email: email, password: password}  
    this.http.post("https://localhost:44321/api/Auth/login",authData).subscribe(response =>{  
      console.log(response);  
  });   
  }
  // authenticate(signInData: SignInData): boolean {
  //   if (this.checkCredentials(signInData)) {
  //     this.isAuthenticated = true;
  //     this.router.navigate(['home']);
  //     return true;
  //   }
  //   this.isAuthenticated = false;
  //   return false;
  // }

  // private checkCredentials(signInData: SignInData): boolean {
  //   return this.checkLogin(signInData.getLogin()) && this.checkPassword(signInData.getPassword());
  // }

  // private checkLogin(login: string): boolean {
  //   return login === this.mockUser.getLogin();
  // }

  // private checkPassword(password: string): boolean {
  //   return password === this.mockUser.getPassword();
  // }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}