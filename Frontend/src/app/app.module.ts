import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { VideoImportComponent } from './video-import/video-import.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { DemoComponent } from './demo/demo.component';
import { RegisterComponent } from './register/register.component';
// import { LottieInteractive } from 'lottie-interactive';
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    RegisterComponent, AppComponent, HeaderComponent, VideoImportComponent, SpinnerComponent, AuthComponent, HomeComponent, HeaderLoginComponent, AboutComponent, FooterComponent, DemoComponent
  ],
  
  imports: [
    CommonModule,
    [FormsModule],
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxSpinnerModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieAnimationViewModule   
  ],
  providers: [  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
