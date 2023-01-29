import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#AuthModule'
  // }
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]  },
  { path: 'demo', component: DemoComponent, canActivate: [AuthGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
