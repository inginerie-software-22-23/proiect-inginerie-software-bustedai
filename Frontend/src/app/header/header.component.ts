import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true)
  }

  logout() {
    this.authenticationService.logout();
  }
  scroll = (): void => {

    let scrollHeigth;

    if (window.innerWidth < 350) {
      scrollHeigth = 150;
    } else if (window.innerWidth < 500 && window.innerWidth > 350) {
      scrollHeigth = 250;
    } else if (window.innerWidth < 700 && window.innerWidth > 500) {
      scrollHeigth = 150;
    } else if (window.innerWidth < 1000 && window.innerWidth > 700) {
      scrollHeigth = 100;
    } else {
      scrollHeigth = 100;
    }
    if (window.scrollY >= scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', "white");
      document.body.style.setProperty('--navbar-scroll-text', "pink");
      document.body.style.setProperty('--navbar-scroll-shadow', "0px 6px 12px -5px #000000");
    } else if (window.scrollY < scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', "transparent");
      document.body.style.setProperty('--navbar-scroll-text', "white");
      document.body.style.setProperty('--navbar-scroll-shadow', "none");
    }
  }

}


