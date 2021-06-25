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
  selector: 'app-notice-period',
  templateUrl: './notice-period.component.html',
  styleUrls: ['./notice-period.component.css']
})
export class NoticePeriodComponent implements OnInit {

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
      'id': new FormControl("1"),
      'np': new FormControl(""),
      'adjustLeavetoNp': new FormControl(""),
      'adjustLeaveType': new FormControl(""),
      'waiveOffNp': new FormControl(""),
      'waiveOffNpDuration': new FormControl(""),
      'npVariesToDesignation': new FormControl(""),
      'buyOutNp': new FormControl(""),
      'buyOutNpDuration': new FormControl(""),
      'npApplicableIfTerminated': new FormControl(""),
      'npApplicableForProbation': new FormControl(""),
      'npDurationDuringProbation': new FormControl(""),
      'buyOutNpProbation': new FormControl(""),
      'npAdjustingLeaveProbation': new FormControl("1"),
      'adjustLeavetoNpProbation': new FormControl(""),
      'adjustLeaveTypeProbation': new FormControl(""),
      'buyOutNpProbationFor': new FormControl("")
    });
  }

  getList() {
    this.http.getViewCustomer('notice-period').subscribe(
      (data: any) => {
        this.lists = data.data;
        this.forms.controls.np.setValue(this.lists.np);
        this.forms.controls.adjustLeavetoNp.setValue(this.lists.adjustLeavetoNp);
        this.forms.controls.adjustLeaveType.setValue(this.lists.adjustLeaveType);
        this.forms.controls.waiveOffNp.setValue(this.lists.waiveOffNp);
        this.forms.controls.waiveOffNpDuration.setValue(this.lists.waiveOffNpDuration);
        this.forms.controls.npVariesToDesignation.setValue(this.lists.npVariesToDesignation);
        this.forms.controls.buyOutNp.setValue(this.lists.buyOutNp);
        this.forms.controls.buyOutNpDuration.setValue(this.lists.buyOutNpDuration);
        this.forms.controls.npApplicableIfTerminated.setValue(this.lists.npApplicableIfTerminated);
        this.forms.controls.npApplicableForProbation.setValue(this.lists.npApplicableForProbation);
        this.forms.controls.npDurationDuringProbation.setValue(this.lists.npDurationDuringProbation);
        this.forms.controls.npAdjustingLeaveProbation.setValue(this.lists.npAdjustingLeaveProbation);
        this.forms.controls.adjustLeavetoNpProbation.setValue(this.lists.adjustLeavetoNpProbation);
        this.forms.controls.adjustLeaveTypeProbation.setValue(this.lists.adjustLeaveTypeProbation);
        this.forms.controls.buyOutNpProbationFor.setValue(this.lists.buyOutNpProbationFor);



        this.forms.controls.waiveOffNp.setValue(this.convertOne(this.lists.waiveOffNp));
        this.forms.controls.npVariesToDesignation.setValue(this.convertOne(this.lists.npVariesToDesignation));
        this.forms.controls.buyOutNp.setValue(this.convertOne(this.lists.buyOutNp));
        this.forms.controls.npApplicableIfTerminated.setValue(this.convertOne(this.lists.npApplicableIfTerminated));
        this.forms.controls.npApplicableForProbation.setValue(this.convertOne(this.lists.npApplicableForProbation));
        this.forms.controls.buyOutNpProbation.setValue(this.convertOne(this.lists.buyOutNpProbation));
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  add() {


    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    let body = this.forms.value;


    body.waiveOffNp = this.convertBoolean(body.waiveOffNp);
    body.npVariesToDesignation = this.convertBoolean(body.npVariesToDesignation);
    body.buyOutNp = this.convertBoolean(body.buyOutNp);
    body.npApplicableIfTerminated = this.convertBoolean(body.npApplicableIfTerminated);
    body.npApplicableForProbation = this.convertBoolean(body.npApplicableForProbation);
    body.buyOutNpProbation = this.convertBoolean(body.buyOutNpProbation);

    this.http.addDataCustomer('notice-period', body).subscribe(
      (data: any) => {
        this.toastr.success("Configured Successfully!");
        this.getList();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  convertOne(val) {
    if (val == '1') {
      return true;
    } else {
      return false;
    }
  }

  convertBoolean(val) {
    if (val) {
      return "1";
    } else {
      return "0";
    }
  }
}
