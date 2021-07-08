import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../http.service';
import { Router, ActivatedRoute } from "@angular/router";
import { DataSharingService } from '../../../data-sharing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  custForm: FormGroup;
  location: any = [{
    "id": "",
    "name": "",
    "area": "",
    "city": "",
    "state": "",
    "zip": "",
    "lat": "123.123123",
    "lon": "123.123123",
    "landmark": "",
    contactInfos: [{
      "id": "",
      "fname": "",
      "lname": "",
      "mobile": "",
      "email": ""
    }]
  }]
  socialProfile: any = [
    {
      "type": "",
      "link": ""
    }
  ];
  file: any;
  userDetails: any;
  constructor(private http: HttpService, private dataSharingService: DataSharingService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.custForm = new FormGroup({
      'propEmail': new FormControl("", [Validators.required, Validators.email]),
      'portfoliodoc': new FormControl("", Validators.required),
      'orgName': new FormControl("", Validators.required),
      'orgShortName': new FormControl("", Validators.required),
      'propMobile': new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'fName': new FormControl("", Validators.required),
      'lName': new FormControl("", Validators.required),
      'designation': new FormControl("", Validators.required),
      'location': new FormControl("", Validators.required),
      'socialProfile': new FormControl("", Validators.required),
      'empCount': new FormControl("", Validators.required),
      'usersCount': new FormControl("", Validators.required),
    });


    this.dataSharingService.userDetails.subscribe(value => {
      if (value) {
        this.userDetails = value;
        this.asignValue(value);
      }
    });

  }
  asignValue(value) {
    this.custForm.controls.orgName.setValue(value.userBusinessInfo.orgName);
    this.custForm.controls.orgShortName.setValue(value.userBusinessInfo.orgShortName);
    this.custForm.controls.empCount.setValue(value.userBusinessInfo.empCount);
    this.custForm.controls.usersCount.setValue(value.userBusinessInfo.userCount);
    this.custForm.controls.portfoliodoc.setValue(value.userBusinessInfo.orgPortfolioDoc);
    this.custForm.controls.fName.setValue(value.contactInfos[0].fname);
    this.custForm.controls.lName.setValue(value.contactInfos[0].lname);
    this.custForm.controls.propEmail.setValue(value.contactInfos[0].email);
    this.custForm.controls.propMobile.setValue(value.contactInfos[0].mobile);
    this.custForm.controls.designation.setValue(value.contactInfos[0].designation);
    this.location = value.locations;
    this.socialProfile = value.socialProfiles;
  }
  ngOnInit(): void {

  }

  addLocation() {
    this.location.push({
      "name": "",
      "area": "",
      "city": "",
      "state": "",
      "zip": "",
      "lat": "123",
      "lon": "123",
      "landmark": "",
      contactInfos: [{
        "fname": "",
        "lname": "",
        "mobile": "",
        "email": ""
      }]
    });
  }

  addContact(id) {
    this.location.splice(id, 0, {
      "fName": "",
      "lName": "",
      "designation": "",
      "number": "",
      "email": ""
    });

  }

  addSocial() {
    this.socialProfile.push(
      {
        "type": "",
        "link": ""
      });
  }

  updateProfile() {
    this.custForm.controls.location.setValue(this.location);
    this.custForm.controls.socialProfile.setValue(this.socialProfile);
    //  this.upload();
    // console.log(this.custForm.value)
    if (this.custForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }


    for (let j = 0; j < this.location.length; j++) {
      for (let i = 0; i < this.location[j].contactInfos.length; i++) {
        if (!this.validateEmail(this.location[j].contactInfos[i].email)) {
          this.toastr.error("Contact Email is Not Valid!");
          return false;
        }
        if (this.location[j].contactInfos[i].mobile.length != 10) {
          this.toastr.error("Contact Mobile Number is Not Valid!");
          return false;
        }
      }
    }
    if (this.custForm.value.portfoliodoc) {
      this.file = this.custForm.value.portfoliodoc;
      console.log(this.file)
      this.custForm.controls.portfoliodoc.setValue(this.file.name)
      this.upload();
    } else {
      this.update(null);
    }
  }

  getDetails() {
    this.http.getMyProfile().subscribe(
      (data: any) => {
        this.dataSharingService.userDetails.next(data.data);
      },
      (error: any) => {
        //    this.toastr.error(error.msg);
      });
  }

  upload() {
    const formData: FormData = new FormData();
    formData.append('type', 'portfolio');
    formData.append('file', this.file);

    this.http.upload(formData).subscribe(
      (data: any) => {
        this.update(data);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });

  }

  update(data) {
    let body = {
      "businessType": this.userDetails.userBusinessInfo.businessType,
      "orgType": this.userDetails.userBusinessInfo.orgType,
      "orgName": this.custForm.value.orgName,
      "orgShortName": this.custForm.value.orgShortName,
      "portfoliodoc": this.custForm.value.portfoliodoc,
      "empCount": this.custForm.value.empCount,
      "usersCount": this.custForm.value.usersCount
    }
    for (let i = 0; i < this.location.length; i++) {
      this.location[i].lat = this.location[i].lat.toString();
      this.location[i].lon = this.location[i].lon.toString();
      if (!this.location[i].id) {
        delete this.location[i].contactInfos;
        this.addLocationNew('location', this.location[i]);
        return false;
      }
      for (let j = 0; j < this.location[i].contactInfos.length; j++) {
        this.location[i].contactInfos[j].locationId = this.location[i].id;
        this.updateLocation('contactLocation', this.location[i].contactInfos[j]);
      }
      delete this.location[i].contactInfos;
      this.updateLocation('location', this.location[i]);
    }
    this.http.updateCustomer('basic', body).subscribe(
      (data: any) => {
        this.getDetails();
        // this.update(data);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });

  }

  addLocationNew(type, data) {
    this.http.addCustLocation(type, data).subscribe(
      (data: any) => {
        this.getDetails();
        // this.update(data);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  updateLocation(type, data) {
    console.log(data, type);

    if (type == "contactLocation") {
      delete data.designation;
    }
    this.http.updateCustomer(type, data).subscribe(
      (data: any) => {
        this.getDetails();
        // this.update(data);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  fileSet(e) {
    this.file = e.target.files[0];

  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
