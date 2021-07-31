import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../http.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild('target1') private myScrollContainer: ElementRef;
  custForm: FormGroup;
  projectName:any;
  status:any;
  from:any;
  to:any;
  platform:any;
  rateCurrency:any;
  rate:any;
  ratePaidBase:any;
  skills:any;
  priority:any;
  desc:any;
  minDate = new Date();
  clientList:any;
  minDateFrom = new Date();
  docs: any;
    team: any = [
    {
      "empId": "",
      "role": ""
    }
  ];
 
  interviewPanelLevel:any;
  file: any;
  id:any;
  deleteEmp = {
    "projectId":"",
    "teamRowId": ""  
  };
      addEmp : any = {
        "projectId":"",
        "team": [
          {
              "empId":"",
              "role": ""
          }]
          };
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
  clientId:any;
  constructor(private http: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.custForm = new FormGroup({
      'clientId' : new FormControl("", Validators.required),
       'team': new FormControl(""),
        'status': new FormControl(""),
     'projectName': new FormControl("", Validators.required),
     'from': new FormControl("", Validators.required),
     'to': new FormControl("", Validators.required),
     'platform': new FormControl("", Validators.required),
     'rateCurrency': new FormControl("", Validators.required),
     'rate': new FormControl("", Validators.required),
     'ratePaidBase': new FormControl("", Validators.required),
     'skills': new FormControl("", Validators.required),
     'priority': new FormControl("", Validators.required),
       "docs": new FormControl(),
       "interviewPanelLevel": new FormControl(""),
       "desc": new FormControl("", Validators.required)
    });
    // this.activatedRoute.params.subscribe(params => {
    //   let id = params['id'];
    //   if (id != 0) {
    //     this.custForm.controls.orgType.setValue(id)
    //   }
    // });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.getClientList();
    this.getProject();
  }

  addTeam() {
    this.team.push({
      "id":"",
      "empId": "",
      "role": ""
    });
    this.scrollToElement('location-list');
  }

  getProject()
  {
    this.http.getDetails('project', this.id).subscribe(
      (data: any) => {
        var list = data.data;
      
        this.team = list.projectTeams;
        this.desc = list.desc;
        this.interviewPanelLevel = list.interviewPanelLevel;
        this.platform = list.platform;
        this.priority = list.priority;
        this.projectName = list.projectName;
        this.rate = list.rate;
        this.rateCurrency = list.rateCurrency;
        this.ratePaidBase = list.ratePaidBase;
        this.skills = list.skills;
        this.status = list.status;
        this.from = list.from;
        this.to = list.to;



        // this.custForm = list;
        // console.log(list);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  deleteEmployee(Rowid)
  {
    this.deleteEmp = {
      'projectId' : this.id,
      "teamRowId": Rowid.toString()
    };
    
    this.http.deleteEmployee(this.deleteEmp).subscribe(
      (data: any) => {
        this.toastr.success(data.msg);
          setTimeout(function(){ window.location.reload(); }, 1000);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  AddEmployee(id,role)
  {
    
    this.addEmp = {
      'projectId' : this.id,
      "team": [
        {
            "empId":id,
            "role": role
        }
    ]
    };

    this.http.AddEmployee(this.addEmp).subscribe(
      (data: any) => {
        this.toastr.success(data.msg);
          setTimeout(function(){ window.location.reload(); }, 1000);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  scrollToElement(el): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  getClientList()
  {
    this.http.getClientList().subscribe(
      (data: any) => {
        var result = data.data;
        // alert(result.count);
        this.clientList = result.rows
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  add() {
    this.docs = [
      {
          "name": "test.doc"
      },
      {
          "name": "test.pdf"
      }
  ],
    this.custForm.controls.docs.setValue(this.docs);
    this.custForm.controls.team.setValue(this.team);

    if (this.custForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
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

    
    body.rate = body.rate.toString();


    this.http.add('project', this.custForm.value).subscribe(
      (data: any) => {
        if (data.msg == "Project Already Registered!") {
          alert(data.msg);
        } else {
          this.toastr.success("Added Successfully!");
        }
         this.router.navigate(['/customer/projects/list']);

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
