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
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.get(this.APIURL + 'admin/customer/view', { headers })
  }

  getDepartmentList(key, page) {
    let ps = page - 1;
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("offset", ps.toString()).set("limit", '5').set("Authorization", 'Bearer ' + this.token);

    if (key) {
      headers = new HttpHeaders()
        .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set("offset", ps.toString()).set("limit", '5').set("filter", key);
    }
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


  getList(type, key, page) {
    let ps = page - 1;
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
      case 'emailTemplate':
        endPoint = "admin/emailTemplate/list"; break;
      case 'customer':
        endPoint = "admin/customer/list"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set("offset", ps.toString()).set("limit", '5');


    if (key) {
      headers = new HttpHeaders()
        .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set("filter", key).set("offset", ps.toString()).set("limit", '5');
    }
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
      case 'emailTemplate':
        endPoint = "admin/emailTemplate/add"; break;
      case 'customer':
        endPoint = "admin/customer/add"; break;
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
      case 'emailTemplate':
        endPoint = "admin/emailTemplate/update"; break;
      case 'customer':
        endPoint = "admin/customer/update"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }


  getPresignedUrl(body) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + 'admin/s3/presignedURLToView', body, { headers })
  }

  getDetails(type, id) {
    let endPoint;
    let types;
    switch (type) {
      case 'customer':
        endPoint = "admin/customer/view"; types = "uid"; break;

    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set(types, id.toString());
    return this.httpClient.get(this.APIURL + endPoint, { headers })
  }

  upload(fd) {
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + 'admin/s3/upload', fd, { headers })
  }

  updateCustomer(type, body) {
    let endPoint;
    let types;
    switch (type) {
      case 'basic':
        endPoint = "profile/customer/updateBusinessInfo"; break;
      case 'location':
        endPoint = "profile/customer/updateLocation"; break;
      case 'contactLocation':
        endPoint = "profile/customer/updateContact"; break;

    }
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }

  addCustLocation(type, body) {
    let endPoint;
    let types;
    switch (type) {
      case 'location':
        endPoint = "profile/customer/addLocation"; break;
      case 'contactLocation':
        endPoint = "profile/customer/addContact"; break;

    }
    let headers = new HttpHeaders()
      .set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }

  getCustomerFilter(key, value) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);

    if (key) {
      headers = new HttpHeaders()
        .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set(key, value);
    }
    return this.httpClient.get(this.APIURL + 'admin/customer/list', { headers })
  }


  customerGet(type) {
    let endPoint;
    switch (type) {
      case 'leave':
        endPoint = "customer/leave/listHolidays"; break;
      case 'department':
        endPoint = "customer/customer/department/list"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);

    return this.httpClient.get(this.APIURL + endPoint, { headers })
  }



  getListCustomer(type, key, page) {
    let ps = page - 1;
    let endPoint;
    switch (type) {
      case 'department':
        endPoint = "customer/department/list"; break;
      case 'salary':
        endPoint = "customer/breakups/list"; break;
      case 'payroll':
        endPoint = "customer/payroll/list"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set("offset", ps.toString()).set("limit", '5');


    if (key) {
      headers = new HttpHeaders()
        .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token).set("filter", key).set("offset", ps.toString()).set("limit", '5');
    }
    return this.httpClient.get(this.APIURL + endPoint, { headers })
  }

  addDataCustomer(type, body) {
    let endPoint;
    switch (type) {
      case 'department':
        endPoint = "customer/department/add"; break;
      case 'salary':
        endPoint = "customer/breakups/config"; break;
      case 'payroll':
        endPoint = "customer/payroll/config"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }

  updateDataCustomer(type, body) {
    let endPoint;
    switch (type) {
      case 'department':
        endPoint = "customer/department/update"; break;
      case 'salary':
        endPoint = "customer/breakups/update"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.APIURL + endPoint, body, { headers })
  }


  getViewCustomer(type) {
    let endPoint;
    switch (type) {
      case 'attendance':
        endPoint = "customer/attendance/view"; break;
    }
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json").set("Authorization", 'Bearer ' + this.token);

    return this.httpClient.get(this.APIURL + endPoint, { headers })
  }
}