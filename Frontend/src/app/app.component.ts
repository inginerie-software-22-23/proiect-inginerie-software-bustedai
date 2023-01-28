import { Component } from '@angular/core';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  options: AnimationOptions = {    
    path: '/assets/lottie/camera-main.json'  
  };  
  constructor(public authenticationService : AuthenticationService){}
  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
}
