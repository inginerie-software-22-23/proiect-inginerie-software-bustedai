import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  {path:"", redirectTo:"auth", pathMatch:"full"},
  { path: 'auth', component: AuthComponent },
  {path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, data:{animationState: 'Home'}  },
  { path: 'about', component: AboutComponent, data:{animationState: 'About'}  },
  { path: 'demo', component: DemoComponent ,data:{animationState: 'Demo'}  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
