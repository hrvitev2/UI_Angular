import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDeatils: any;
  categoryLists: any = [];
  listactive: any;
  showFiller = false;
  isFullScreen: boolean;
  contactTab: boolean;
  groupTab: boolean;
  chatTab: boolean = true;
  title: any



  constructor(private dataSharingService: DataSharingService, private http: HttpService, private router: Router) {
    this.dataSharingService.userDetails.subscribe(value => {
      if (value) {
        this.userDeatils = null;
        this.userDeatils = value;
      } else {
        this.getDetails();
      }
    });

    this.userDeatils = this.parseJwt(localStorage.getItem("userToken"));
    this.dataSharingService.userType.next(this.userDeatils.data.userType);
    this.dataSharingService.activeStatus.subscribe(value => {
      this.listactive = value;
    });
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


  getDetails() {

    // this.http.getMyProfile().subscribe(
    //   (data: any) => {
    //     this.dataSharingService.userDetails.next(data.data);
    //   },
    //   (error: any) => {
    //     //    this.toastr.error(error.msg);
    //   });
  }


  ngOnInit(): void {
  }

  mToggoleMenu() {
    document.getElementsByTagName('body')[0].classList.toggle("offcanvas-active");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");

  }
  noteToggle() {
    document.getElementsByClassName('sticky-note')[0].classList.toggle("open");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");
  }
  openRightMenu() {
    document.getElementById('rightbar').classList.toggle("open");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");

  }
  openfullScreen() {

    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem.requestFullscreen || elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem)
    }
    this.isFullScreen = true;
  }

  closeFullScreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  logout() {

    localStorage.clear();
    window.location.reload();

  }

  onTab(number) {
    this.chatTab = false;
    this.groupTab = false;
    this.contactTab = false;
    if (number == '1') {
      this.chatTab = true;
    }
    else if (number == '2') {
      this.groupTab = true;
    }
    else if (number == '3') {
      this.contactTab = true;
    }
  }
}
