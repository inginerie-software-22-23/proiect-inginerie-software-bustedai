import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../services/auth.service';

import { VideoImportComponent } from '../video-import/video-import.component';

// import { DataStorageService } from '../shared/data-storage.service';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
}) 

export class HeaderComponent implements OnInit {


  constructor(
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
  }
}
