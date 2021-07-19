import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../http.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {
  remarks:any;
  status:any;
  callbackDate:any;
  callbackTime:any;
  serviceModel:any;
  id:any;
  contactList:any;
  custForm: FormGroup;
  curentPage:any;
  contactPersonId:any;
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

  constructor(private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.custForm = new FormGroup({
      'remarks': new FormControl(""),
       'status': new FormControl("", Validators.required),
       'serviceModel': new FormControl("", Validators.required),
       "callbackDate": new FormControl(""),
       "callbackTime": new FormControl(""),
       'clientId': new FormControl(""),
       "contactPersonId": new FormControl("", Validators.required)
       
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    // alert(this.router.url);
    var route_url = this.router.url;
    var new_route = route_url.split("/");
    // alert(new_route[3]);
    this.getClientContact(this.id);
    this.curentPage = new_route[3];
    if(new_route[3] == "delete")
    {
        this.statusArray = [
          {
            "key":"i","value" : "Inactive"
          }
        ];
    }
  }

  change()
  {
    if (this.custForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    else
    {
      this.custForm.controls.clientId.setValue(this.id);

      this.http.statusChange(this.custForm.value).subscribe(
        (data: any) => {
          if (data.msg == "Client Status Updated Successfully!") {
            // alert(data.msg);
          } else {
            this.toastr.success("Client Status Updated Successfully!");
          }
           this.router.navigate(['/customer/clients/list']);
  
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

  getClientContact(id)
  {
    this.http.getDetails('client', this.id).subscribe(
      (data: any) => {
        var list = data.data;
        list.locations.forEach(element => {
            this.contactList = element.contactInfos;
        });
        console.log(this.contactList);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
}
