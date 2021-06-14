import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../http.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  custForm: FormGroup;
  location: any = [{
    "name": "",
    "area": "",
    "city": "",
    "state": "",
    "zip": "",
    "lat": "123.123123",
    "lon": "123.123123",
    "landmark": "",
    contact: [{
      "fName": "",
      "lName": "",
      "designation": "",
      "number": "",
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
  constructor(private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.custForm = new FormGroup({
      'businessType': new FormControl("", Validators.required),
      'orgType': new FormControl("", Validators.required),
      'fName': new FormControl("", Validators.required),
      'lName': new FormControl("", Validators.required),
      'designation': new FormControl("", Validators.required),
      'propMobile': new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'propEmail': new FormControl("", [Validators.required, Validators.email]),
      'portfoliodoc': new FormControl("", Validators.required),
      'orgName': new FormControl("", Validators.required),
      'orgShortName': new FormControl("", Validators.required),
      'location': new FormControl("", Validators.required),
      'socialProfile': new FormControl("", Validators.required),
      'empCount': new FormControl("", Validators.required),
      'usersCount': new FormControl("", Validators.required),
    });
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 0) {
        this.custForm.controls.orgType.setValue(id)
      }
    });
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
      "lat": "",
      "lon": "",
      "landmark": "",
      contact: [{
        "fName": "",
        "lName": "",
        "designation": "",
        "number": "",
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

  add() {
    this.custForm.controls.location.setValue(this.location);
    this.custForm.controls.socialProfile.setValue(this.socialProfile);
    //  this.upload();

    if (this.custForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }


    for (let j = 0; j < this.location.length; j++) {
      for (let i = 0; i < this.location[j].contact.length; i++) {
        if (!this.validateEmail(this.location[j].contact[i].email)) {
          this.toastr.error("Contact Email is Not Valid!");
          return false;
        }
        if (this.location[j].contact[i].number.length != 10) {
          this.toastr.error("Contact Mobile Number is Not Valid!");
          return false;
        }
      }
    }

    this.file = this.custForm.value.portfoliodoc;
    this.custForm.controls.portfoliodoc.setValue(this.file.name)
    this.upload();
  }

  upload() {
    const formData: FormData = new FormData();
    formData.append('type', 'portfolio');
    formData.append('file', this.file);

    this.http.upload(formData).subscribe(
      (data: any) => {
        console.log(data)
        this.addCustomer(data)
        //  this.router.navigate(['/customer']);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });

  }

  addCustomer(data) {

    this.custForm.controls.portfoliodoc.setValue(data.fileInfo.newFile)
    this.http.add('customer', this.custForm.value).subscribe(
      (data: any) => {
        if (data.msg == "Customer Account Already Registered!") {
          alert(data.msg);
        } else {
          this.toastr.success("Added Successfully!");
        }
        //  this.router.navigate(['/customer']);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  fileSet(e) {
    this.file = e.target.files[0];
    console.log(e);
    console.log(this.file);

  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
