import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { routeTransitionAnimations } from 'src/route-transition-animations';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeTransitionAnimations]
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
