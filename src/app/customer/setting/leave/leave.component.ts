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
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

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

  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'title': new FormControl("", Validators.required),
      'dateFrom': new FormControl("", Validators.required),
      'dateTo': new FormControl("", Validators.required),
      'type': new FormControl("")
    });
  }

  ngOnInit(): void {
    this.getLists(this.searchKey, 1);
  }

  getLists(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.http.getListCustomer('holiday', searchKey, pageNo).subscribe(
      (data: any) => {
        this.lists = data.data;
        console.log(this.lists)
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.lists;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  addDept() {
    this.editId = null;
    this.forms.reset();
    this.dialogRef = this.dialog.open(this.templateRef);

    this.dialogRef.afterClosed().subscribe(result => {
    });

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

    this.http.addDataCustomer('holiday', this.forms.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getLists(this.searchKey, 1);
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.editId = data.id;
    this.forms.controls.title.setValue(data.title);
    this.forms.controls.dateFrom.setValue(data.dateFrom);
    this.forms.controls.dateTo.setValue(data.dateTo);
    this.forms.controls.type.setValue(data.type);
    this.dialogRef = this.dialog.open(this.templateRef);

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

  update() {
    let body = { "hId": this.editId, "title": this.forms.value.title, "dateFrom": this.forms.value.dateFrom, "dateTo": this.forms.value.dateTo, "type": this.forms.value.type }
    this.http.updateDataCustomer('holiday', body).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.editId = null;
        this.dialogRef.close();
        this.getLists(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  export() {
    this.http.export().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      let body = { "hId": data.id, "status": 'd', 'name': data.name };
      this.http.updateDataCustomer('holiday', body).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.getLists(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }


  assigndata(page) {
    let added = 1;
    if (page != 1) {
      added = page * 5 + 1 - 5;
    }
    this.statingValue = added;

    if (this.statingValue != 1) {
      this.getLists(this.searchKey, page);
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

}
