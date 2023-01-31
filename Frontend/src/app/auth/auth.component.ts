import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { SignInData } from '../model/signInData';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var checkEmail = false;
var checkPass = false;
@Component({
  selector: 'cf-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isFormValid = false;
  areCredentialsInvalid = false;
  options: AnimationOptions = {    
    path: '/assets/lottie/camera-login.json'
  };  
  options2: AnimationOptions = {
    path: 'assets/lottie/background.json',
    autoplay: true,
    loop: true
  };
  public loginForm!: FormGroup
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
  constructor(private router:Router, public http: HttpClient,  private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsersList")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        if(a.email == this.loginForm.value.email && a.password != this.loginForm.value.password){
          checkEmail = true;
          return false;
        }
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["home"])
      }else if(checkEmail){
        this.loginForm.reset()
        alert("User exists, but password is not correct")
      }else if(!user){
        this.loginForm.reset()
        alert("User does not exist")
      }
    },err=>{
      alert("Something went wrong")
    })}

}