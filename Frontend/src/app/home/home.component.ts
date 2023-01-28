import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  options: AnimationOptions = {    
    path: '/assets/lottie/camera-main.json'  
  };  
  constructor(public authenticationService : AuthenticationService){}
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
}
