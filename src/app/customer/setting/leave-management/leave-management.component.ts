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
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

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
  leaveDetails: any = [{
    "leaveTypeId": "",
    "days": ""
  }];
  probValue: boolean = false;
  probationleaveDetails: any = [{
    "leaveTypeId": "",
    "days": ""
  }]
  ngOnInit(): void {
    this.getList();
  }


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'totalLeave': new FormControl(""),
      'leaveAddCycle': new FormControl(""),
      'calendarPeriod': new FormControl("", Validators.required),
      'halfDayLeaveWillBe': new FormControl(""),
      'monthlyCarryForward': new FormControl(false),
      'yearlyCarryForward': new FormControl(false),
      'yearlyEncash': new FormControl(false),
      'carryForwardOrEncashtype': new FormControl(""),
      'availMlPlAfter': new FormControl("", Validators.required),
      'leaveDetails': new FormControl(""),
      'probationTotalLeave': new FormControl(""),
      'probationleaveDetails': new FormControl(""),
      'probationHalfDayLeaveWillBe': new FormControl(""),
      'probationMonthlyCarryForward': new FormControl(""),
      'probToPermanentCarryForward': new FormControl("")
    });

  }

  getList() {
    this.http.getViewCustomer('leave').subscribe(
      (data: any) => {
        this.lists = data.data;
        console.log(data)
        this.forms.controls.totalLeave.setValue(this.lists.totalLeave);
        this.forms.controls.leaveAddCycle.setValue(this.lists.leaveAddCycle);
        this.forms.controls.calendarPeriod.setValue(this.lists.calendarPeriod);
        this.forms.controls.halfDayLeaveWillBe.setValue(this.lists.halfDayLeaveWillBe);
        this.forms.controls.monthlyCarryForward.setValue(this.lists.monthlyCarryForward);
        this.forms.controls.yearlyCarryForward.setValue(this.lists.yearlyCarryForward);
        this.forms.controls.yearlyEncash.setValue(this.lists.yearlyEncash);
        this.forms.controls.carryForwardOrEncashtype.setValue(this.lists.carryForwardOrEncashtype);
        this.forms.controls.probationTotalLeave.setValue(this.lists.probationTotalLeave);
        this.forms.controls.probationHalfDayLeaveWillBe.setValue(this.lists.probationHalfDayLeaveWillBe);
        this.forms.controls.probationMonthlyCarryForward.setValue(this.lists.probationMonthlyCarryForward);
        this.forms.controls.probToPermanentCarryForward.setValue(this.lists.probToPermanentCarryForward);
        this.leaveDetails = this.lists.shiftTimings;
        this.probationleaveDetails = this.lists.probationleaveDetails;
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  addShift() {
    this.leaveDetails.push({
      "leaveTypeId": "",
      "days": ""
    });
  }

  addProbation() {
    this.probationleaveDetails.push({
      "leaveTypeId": "",
      "days": ""
    });
  }
  add() {

    this.forms.controls.probationleaveDetails.setValue(this.leaveDetails);
    this.forms.controls.leaveDetails.setValue(this.probationleaveDetails);

    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    let body = this.forms.value;
    body.probationTotalLeave = body.probationTotalLeave.toString();
    body.totalLeave = body.totalLeave.toString();
    body.monthlyCarryForward = this.convertBoolean(body.monthlyCarryForward);
    body.probToPermanentCarryForward = this.convertBoolean(body.probToPermanentCarryForward);
    body.probationMonthlyCarryForward = this.convertBoolean(body.probationMonthlyCarryForward);
    body.yearlyCarryForward = this.convertBoolean(body.yearlyCarryForward);
    body.yearlyEncash = this.convertBoolean(body.yearlyEncash);

    this.http.addDataCustomer('leave', body).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  convertBoolean(val) {
    if (val) {
      return "1";
    } else {
      return "0";
    }
  }

}
