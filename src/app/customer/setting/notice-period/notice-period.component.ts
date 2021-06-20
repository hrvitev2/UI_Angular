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
      'name': new FormControl("", Validators.required),
      'calculateFor': new FormControl("", Validators.required),
      'calculateFrom': new FormControl("", Validators.required),
      'calculateTo': new FormControl("", Validators.required),
      'calculationDate': new FormControl("", Validators.required),
      'bankerEmail': new FormControl("", Validators.required),
      'status': new FormControl("a")
    });
  }

  getList() {
    this.http.getViewCustomer('attendance').subscribe(
      (data: any) => {
        this.lists = data.data;
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
  add() {

    this.forms.controls.status.setValue("a");

    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }

    this.http.addDataCustomer('payroll', this.forms.value).subscribe(
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
