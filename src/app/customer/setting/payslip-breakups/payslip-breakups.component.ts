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
  selector: 'app-payslip-breakups',
  templateUrl: './payslip-breakups.component.html',
  styleUrls: ['./payslip-breakups.component.css']
})
export class PayslipBreakupsComponent implements OnInit {

  searchKey: string;
  editId: any;
  deptList: any;
  dialogRef: any;
  forms: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  statingValue: number;
  pagers: any = [];
  lists: any = {};
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  firstPageData: any;

  ngOnInit(): void {
    this.getList(this.searchKey, 1);
  }


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'formulaOrPercentage': new FormControl("", Validators.required),
      'headType': new FormControl("", Validators.required),
    });
  }

  getList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.statingValue = added;
    this.http.getListCustomerBreakups('2', searchKey, pageNo).subscribe(
      (data: any) => {
        this.deptList = data.data;
        this.dataSource = new MatTableDataSource(this.deptList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.deptList;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  setPage(page: number) {
    if (page < 1 || page > parseInt(this.deptList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.deptList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addDept() {
    this.editId = null;
    this.forms.reset();
    this.dialogRef = this.dialog.open(this.templateRef);

    this.dialogRef.afterClosed().subscribe(result => {
    });

  }

  assigndata(page) {
    let added = 1;
    if (page != 1) {
      added = page * 5 + 1 - 5;
    }
    this.statingValue = added;

    if (this.statingValue != 1) {
      this.getList(this.searchKey, page);
    } else {
      this.deptList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.deptList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  add() {

    if (this.editId) {
      this.update();
      return false;
    }

    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }

    let body = {
      "type": "2",
      "breakups": [this.forms.value]
    }

    this.http.addDataCustomer('salary', body).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.editId = data.id;
    this.forms.controls.name.setValue(data.name);
    this.forms.controls.headType.setValue(data.headType);
    this.forms.controls.formulaOrPercentage.setValue(data.formulaOrPercentage);
    this.dialogRef = this.dialog.open(this.templateRef);

  }

  update() {
    if (this.forms.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    let body = {
      "id": this.editId.toString(),
      "name": this.forms.value.name,
      "type": "2",
      "formulaOrPercentage": this.forms.value.formulaOrPercentage,
      "headType": this.forms.value.headType,
      "status": "a"
    }

    this.http.updateDataCustomer('salary', body).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.editId = null;
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
}
