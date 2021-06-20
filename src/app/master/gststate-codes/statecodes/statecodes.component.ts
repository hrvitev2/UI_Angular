import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService} from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-statecodes',
  templateUrl: './statecodes.component.html',
  styleUrls: ['./statecodes.component.css']
})
export class StatecodesComponent implements OnInit {
  searchKey: any;

  codeList: any;
  dialogRef: any;
  codeForm: FormGroup;
  codeEditForm: FormGroup;

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


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.codeForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'code': new FormControl("", Validators.required),
      'shortCode': new FormControl("", Validators.required)
    });

    this.codeEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'code': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'gstId': new FormControl("", Validators.required),
      'shortCode': new FormControl("", Validators.required)
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
    this.http.getList('gst', searchKey, pageNo).subscribe(
      (data: any) => {
        this.codeList = data.data;
        this.dataSource = new MatTableDataSource(this.codeList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.codeList;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.codeList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.codeList.count), page, 5);
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
      this.codeList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.codeList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addComp() {
    this.codeEditForm.reset();
    this.codeForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.codeForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('gst', this.codeForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.codeForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.codeEditForm.controls.gstId.setValue(data.id);
    this.codeEditForm.controls.name.setValue(data.name);
    this.codeEditForm.controls.code.setValue(data.code);
    this.codeEditForm.controls.shortCode.setValue(data.shortCode);
    this.codeEditForm.controls.status.setValue(data.status);
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
    this.http.update('gst', this.codeEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.codeEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  delete(data) {
    if (confirm("Are you sure want to delete?")) {

      this.codeEditForm.controls.gstId.setValue(data.id);
      this.codeEditForm.controls.name.setValue(data.name);
      this.codeEditForm.controls.code.setValue(data.code);
      this.codeEditForm.controls.shortCode.setValue(data.shortCode);
      this.codeEditForm.controls.status.setValue('d');
      this.http.update('gst', this.codeEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.codeEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }


}
