import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from './globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private APIURL = myGlobals.base_api_url;
  private token = localStorage.getItem('userToken');

  constructor(private httpClient: HttpClient) { }



  getMyProfile() {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", this.token);
    return this.httpClient.get(this.APIURL + 'admin/profile/view', { headers })
  }


  getDepartmentList() {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.get(this.APIURL + 'admin/department/list', { headers })
  }

  addDept(body) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + 'admin/department/add', body, { headers })
  }


  updateDept(body) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + 'admin/department/update', body, { headers })
  }


  getList(type) {
    let endPoint;
    switch (type) {
      case 'comp':
        endPoint = "admin/company/list"; break;
      case 'gst':
        endPoint = "admin/gstCode/list"; break;
      case 'sac':
        endPoint = "admin/sacCode/list"; break;
      case 'university':
        endPoint = "admin/institute/list"; break;
      case 'cust-type':
        endPoint = "admin/customerType/list"; break;
      case 'industry':
        endPoint = "admin/industry/list"; break;
      case 'leave-type':
        endPoint = "admin/leaveType/list"; break;
      case 'tax':
        endPoint = "admin/taxExcemption/list"; break;
      case 'rtsstatus':
        endPoint = "admin/candidateApplicationStatus/list"; break;
      case 'skill':
        endPoint = "admin/skill/list"; break;
      case 'skill-2':
        endPoint = "admin/secondarySkill/list"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.get(this.APIURL + endPoint, { headers })
  }

  add(type, body) {
    let endPoint;
    switch (type) {
      case 'comp':
        endPoint = "admin/company/add"; break;
      case 'gst':
        endPoint = "admin/gstCode/add"; break;
      case 'sac':
        endPoint = "admin/sacCode/add"; break;
      case 'university':
        endPoint = "admin/institute/add"; break;
      case 'cust-type':
        endPoint = "admin/customerType/add"; break;
      case 'industry':
        endPoint = "admin/industry/add"; break;
      case 'leave-type':
        endPoint = "admin/leaveType/add"; break;
      case 'tax':
        endPoint = "admin/taxExcemption/add"; break;
      case 'rtsstatus':
        endPoint = "admin/candidateApplicationStatus/add"; break;
      case 'skill':
        endPoint = "admin/skill/add"; break;
      case 'skill-2':
        endPoint = "admin/secondarySkill/add"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }

  update(type, body) {
    let endPoint;
    switch (type) {
      case 'comp':
        endPoint = "admin/company/update"; break;
      case 'gst':
        endPoint = "admin/gstCode/update"; break;
      case 'sac':
        endPoint = "admin/sacCode/update"; break;
      case 'university':
        endPoint = "admin/institute/update"; break;
      case 'cust-type':
        endPoint = "admin/customerType/update"; break;
      case 'industry':
        endPoint = "admin/industry/update"; break;
      case 'leave-type':
        endPoint = "admin/leaveType/update"; break;
      case 'tax':
        endPoint = "admin/taxExcemption/update"; break;
      case 'rtsstatus':
        endPoint = "admin/candidateApplicationStatus/update"; break;
      case 'skill':
        endPoint = "admin/skill/update"; break;
      case 'skill-2':
        endPoint = "admin/secondarySkill/update"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }

}