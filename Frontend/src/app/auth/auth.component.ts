import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { SignInData } from '../model/signInData';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';

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
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
  constructor(public authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);

  }

  private checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(signInForm.value.login, signInForm.value.password);
    if (!this.authenticationService.authenticate(signInData)) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }

}