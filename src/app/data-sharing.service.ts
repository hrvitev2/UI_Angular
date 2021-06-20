import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataSharingService {
    public userDetails: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public languageAllList: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public categoryAllList: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public roles: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public userType: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public activeStatus: BehaviorSubject<any> = new BehaviorSubject<any>('');
}
