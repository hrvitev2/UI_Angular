import { Component } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn: boolean;
  title = 'Epic';
  greenClass: any;
  orageClass: boolean;
  blushClass: boolean;
  cyanClass: boolean = true;
  timberClass: boolean;
  blueClass: boolean;
  amethystClass: boolean;

  ngOnInit(): void {
    sessionStorage.setItem("MinSideClass", "");
    sessionStorage.setItem("HeaderClass", "top_dark");
    sessionStorage.setItem("Font1", "font-montserrat");
    sessionStorage.setItem("MenuIcon", "list-a");
    sessionStorage.setItem("Toggle", "");
    sessionStorage.setItem("Toggle2", "");
    sessionStorage.setItem("Toggle3", "true");
    sessionStorage.setItem("Toggle4", "");
    sessionStorage.setItem("Toggle5", "");
    sessionStorage.setItem("Toggle6", "");
    sessionStorage.setItem("Toggle7", "");
    sessionStorage.setItem("Toggle8", "");
    sessionStorage.setItem("Toggle9", "");
    sessionStorage.setItem("Toggle10", "");



    setTimeout(() => {

      document.getElementsByClassName('page-loader-wrapper')[0].classList.add("HideDiv");

    }, 1000);
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }
  toggleThemeSetting() {
    const className = document.getElementsByClassName('themesetting')[0];
    className.classList.toggle('open');
  }


  closeMenu() {
    document.getElementsByClassName('right_sidebar')[0].classList.remove("open");
    document.getElementsByClassName('user_div')[0].classList.remove("open");
    document.getElementsByClassName('overlay')[0].classList.remove("open");
  }

  constructor(public ds: DataSharingService, private auth: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
    this.ds.userDetails.subscribe(value => {
      if (value) {
        this.ds.isUserLoggedIn.next(true);
      } else if (this.auth.CheckLoginStatus) {
        this.ds.isUserLoggedIn.next(true);
      }
    });
    setTimeout(() => {

      document.getElementsByClassName('page-loader-wrapper')[0].classList.add("HideDiv");

    }, 1000);

    this.ds.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
  }


  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
