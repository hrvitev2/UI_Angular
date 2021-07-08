import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService } from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css']
})
export class AttendanceManagementComponent implements OnInit {

  searchKey: string;
  editId: any;
  lists: any;
  dialogRef: any;
  forms: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  statingValue: number;
  pagers: any = [];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  firstPageData: any;
  shiftDetails: any = [{
    "name": "",
    "startTime": "",
    "endTime": ""
  }]
  ngOnInit(): void {
    this.getList();
  }


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'autoBreak': new FormControl("", Validators.required),
      'autoLogout': new FormControl("", Validators.required),
      'weekWorkingDays': new FormControl("", Validators.required),
      'workingHours': new FormControl("", Validators.required),
      'halfDayHours': new FormControl("", Validators.required),
      'lopHours': new FormControl("", Validators.required),
      'shiftDetails': new FormControl()
    });
  }

  getList() {
    this.http.getViewCustomer('attendance').subscribe(
      (data: any) => {
        this.lists = data.data;
        this.forms.controls.autoBreak.setValue(this.lists.autoBreak);
        this.forms.controls.autoLogout.setValue(this.lists.autoLogout);
        this.forms.controls.weekWorkingDays.setValue(this.lists.weekWorkingDays);
        this.forms.controls.workingHours.setValue(this.lists.workingHours);
        this.forms.controls.halfDayHours.setValue(this.lists.halfDayHours);
        this.forms.controls.lopHours.setValue(this.lists.lopHours);
        this.shiftDetails = this.lists.shiftTimings;
        console.log(this.lists);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  addShift() {
    this.shiftDetails.push({
      "name": "",
      "startTime": "",
      "endTime": ""
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  add() {

    //  this.forms.controls.status.setValue("a");

    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }

    for (let i = 0; i < this.shiftDetails.length; i++) {
      this.shiftDetails[i].name = this.capitalizeFirstLetter(this.shiftDetails[i].name);
    }

    this.forms.controls.shiftDetails.setValue(this.shiftDetails);

    this.http.addDataCustomer('attendance', this.forms.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
}
