import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService} from '../../pager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {
  searchKey: any;

  customerTypeList: any;
  dialogRef: any;
  typeForm: FormGroup;
  typeEditForm: FormGroup;

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


  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.typeForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });

    this.typeEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'lId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.getList(this.searchKey, 1);
  }

  getList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.http.getList('leave-type', searchKey, pageNo).subscribe(
      (data: any) => {
        this.customerTypeList = data.data;
        this.dataSource = new MatTableDataSource(this.customerTypeList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.customerTypeList;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.customerTypeList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.customerTypeList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
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
      this.customerTypeList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.customerTypeList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  addComp() {
    this.typeEditForm.reset();
    this.typeForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    if (this.typeForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('leave-type', this.typeForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.typeForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.typeEditForm.controls.lId.setValue(data.id);
    this.typeEditForm.controls.name.setValue(data.name);
    this.typeEditForm.controls.status.setValue(data.status);
    this.dialogRef = this.dialog.open(this.templateRef);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update() {
    this.http.update('leave-type', this.typeEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.typeEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      this.typeEditForm.controls.lId.setValue(data.id);
      this.typeEditForm.controls.name.setValue(data.name);
      this.typeEditForm.controls.status.setValue('d');
      this.http.update('leave-type', this.typeEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.typeEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
