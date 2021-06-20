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
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  searchKey: string;
  editId: any;
  deptList: any;
  dialogRef: any;
  deptForm: FormGroup;
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
    this.getDepartmentList(this.searchKey, 1);
  }


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.deptForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });
  }

  getDepartmentList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.statingValue = added;
    this.http.getListCustomer('department', searchKey, pageNo).subscribe(
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
    this.deptForm.reset();
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
      this.getDepartmentList(this.searchKey, page);
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

    if (this.deptForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }

    this.http.addDataCustomer('department', this.deptForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getDepartmentList(this.searchKey, 1);
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.editId = data.id;
    this.deptForm.controls.name.setValue(data.name);
    this.dialogRef = this.dialog.open(this.templateRef);

  }

  update() {
    let body = { "dId": this.editId, "name": this.deptForm.value.name }
    this.http.updateDataCustomer('department', body).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.editId = null;
        this.dialogRef.close();
        this.getDepartmentList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      let body = { "dId": data.id, "status": 'd', 'name': data.name };
      this.http.updateDataCustomer('department', body).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.getDepartmentList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
