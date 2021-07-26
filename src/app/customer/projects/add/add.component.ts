import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../http.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('target1') private myScrollContainer: ElementRef;
  custForm: FormGroup;
  clientName:any;
  status:any;
  minDate = new Date();
  location: any = [{
    "name": "",
    "area": "",
    "city": "",
    "state": "",
    "zip": "",
    "lat": "15.912899802",
    "lon": "79.7399875",
    "landmark": "",
    
  }];
  contact: any = [{
    "fName": "",
    "lName": "",
    "designation": "",
    "number": "",
    "email": "",
    "directLine":"",
    "ext":"",
    "decisionMaker":"",
    "locationName":"",
    "callbackDate":"",
    "callbackTime":"",
    "remarks":""
  }];
  socialProfile: any = [
    {
      "type": "",
      "link": "",
      "addToPortfolio":""
    }
  ];
  file: any;
  statusArray = [{
    "key":"l","value" : "Lead Generated"
    },
    {
      "key":"f","value" : "Followed up"
    },
    {
      "key":"p","value" : "Prospect"
    },
    {
      "key":"i","value" : "Inactive"
    },
    {
      "key":"a","value" : "Active"
    },
  ];
  serviceModel:any;
  constructor(private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.custForm = new FormGroup({
      //  'Porfolio': new FormControl("", Validators.required),
      'clientName' : new FormControl("", Validators.required),
      // 'fName': new FormControl("", Validators.required),
      // 'lName': new FormControl("", Validators.required),
      // 'designation': new FormControl("", Validators.required),
      // 'propMobile': new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      // 'propEmail': new FormControl("", [Validators.required, Validators.email]),
    //  'remarks': new FormControl(""),
      'location': new FormControl("", Validators.required),
      'socialProfile': new FormControl(""),
       'serviceModel': new FormControl("", Validators.required),
        'status': new FormControl(""),
      //  "callbackDate": new FormControl(""),
      //  "callbackTime": new FormControl(""),
       "contact": new FormControl("")
    });
    // this.activatedRoute.params.subscribe(params => {
    //   let id = params['id'];
    //   if (id != 0) {
    //     this.custForm.controls.orgType.setValue(id)
    //   }
    // });
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
      "landmark": ""
    });
    this.scrollToElement('location-list');
  }
  scrollToElement(el): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }


  addContact() {
   this.contact.push({
    "fName": "",
    "lName": "",
    "designation": "",
    "number": "",
    "email": "",
    "directLine":"",
    "ext":"",
    "decisionMaker":"",
    "locationName":"",
    "callbackDate":"",
    "callbackTime":"",
    "remarks":""
    });
  }

  addSocial() {
    this.socialProfile.push(
      {
        "type": "",
        "link": "",
        "addToPortfolio":""
      });
  }

  add() {
    this.custForm.controls.location.setValue(this.location);
    this.custForm.controls.socialProfile.setValue(this.socialProfile);
    this.custForm.controls.clientName.setValue(this.clientName);
    this.custForm.controls.serviceModel.setValue(this.serviceModel);
    this.custForm.controls.contact.setValue(this.contact);
    // this.custForm.controls.status.setValue(this.status);
    
    //  this.upload();

    if (this.custForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }


    // for (let j = 0; j < this.contact.length; j++) {
      for (let i = 0; i < this.contact.length; i++) {
        if (!this.validateEmail(this.contact[i].email)) {
          this.toastr.error("Contact Email is Not Valid!");
          return false;
        }
        if (this.contact[i].number.length != 10) {
          this.toastr.error("Contact Mobile Number is Not Valid!");
          return false;
        }
      }
    // }

    // this.custForm.controls.portfoliodoc.setValue(this.file.name)
    // this.upload();
    this.addCustomer()
  }

  upload() {
   
    // die();
    // this.http.upload(formData).subscribe(
      // (data: any) => {
      //   console.log(data)
      //   this.addCustomer(data)
      //   //  this.router.navigate(['/customer']);

      // },
      // (error: any) => {
      //   this.toastr.error(error.msg);
      // });

  }

  convertBoolean(val) {
    if (val) {
      return "1";
    } else {
      return "0";
    }
  }

  addCustomer() {
    console.log(this.custForm.value);

    let body = this.custForm.value;

    body.socialProfile.forEach(element => {
      element.addToPortfolio = this.convertBoolean(element.addToPortfolio);
    });

    body.contact.forEach(element => {
      element.decisionMaker = this.convertBoolean(element.decisionMaker);
    });
    

    this.http.add('client', this.custForm.value).subscribe(
      (data: any) => {
        if (data.msg == "Customer Account Already Registered!") {
          alert(data.msg);
        } else {
          this.toastr.success("Added Successfully!");
        }
         this.router.navigate(['/customer/clients/list']);

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

