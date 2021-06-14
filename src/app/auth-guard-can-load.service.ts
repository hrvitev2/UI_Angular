

import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCanLoadService implements CanLoad {
  userType: any;
  constructor(private router: Router, private dataSharingService: DataSharingService) {
   
  }

  canLoad(route: Route): boolean {
    
    if (this.userType != 1) {
      return false;
    } else {
      return true;
    }
  }


}