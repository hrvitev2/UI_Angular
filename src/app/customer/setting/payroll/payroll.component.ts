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
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  searchKey: string;
  editId: any;
  dialogRef: any;
  forms: FormGroup;
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild('viewTemplate') viewTemplate: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  statingValue: number;
  pagers: any = [];
  lists: any = {};
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  firstPageData: any;
  viewDetails: any;

  ngOnInit(): void {
    this.getList(this.searchKey, 1);
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

  getList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.statingValue = added;
    this.http.getListCustomer('payroll', searchKey, pageNo).subscribe(
      (data: any) => {
        this.lists = data.data;
        this.dataSource = new MatTableDataSource(this.lists);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.lists;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  setPage(page: number) {
    if (page < 1 || page > parseInt(this.lists.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.lists.count), page, 5);
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
      this.lists = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.lists.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
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
        this.getList(this.searchKey, 1);
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  view(data) {
    console.log(data)
    this.viewDetails = data;
    this.dialogRef = this.dialog.open(this.viewTemplate);
  }

}
