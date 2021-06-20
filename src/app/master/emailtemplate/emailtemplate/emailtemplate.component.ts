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
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {
  searchKey: any;
  templateList: any;
  dialogRef: any;
  emailForm: FormGroup;
  emailEditForm: FormGroup;
  @ViewChild('template') templateRef: TemplateRef<any>;

  statingValue: number;
  pagers: any = [];
  lists: any = {};
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  firstPageData: any;


  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.emailForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'subject': new FormControl("", Validators.required),
      'msg': new FormControl("", Validators.required)
    });

    this.emailEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'subject': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'emailTemplateId': new FormControl("", Validators.required),
      'msg': new FormControl("", Validators.required)
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
    this.http.getList('emailTemplate', searchKey, pageNo).subscribe(
      (data: any) => {
        this.templateList = data.data;
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.templateList;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  setPage(page: number) {
    if (page < 1 || page > parseInt(this.templateList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.templateList.count), page, 5);
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
      this.templateList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.templateList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addComp() {
    this.emailEditForm.reset();
    this.emailForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.emailForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('emailTemplate', this.emailForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.emailForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.emailEditForm.controls.gstId.setValue(data.id);
    this.emailEditForm.controls.name.setValue(data.name);
    this.emailEditForm.controls.code.setValue(data.code);
    this.emailEditForm.controls.shortCode.setValue(data.shortCode);
    this.emailEditForm.controls.status.setValue(data.status);
    this.dialogRef = this.dialog.open(this.templateRef);
  }
  update() {
    this.http.update('emailTemplate', this.emailEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.emailEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  delete(data) {
    if (confirm("Are you sure want to delete?")) {

      this.emailEditForm.controls.gstId.setValue(data.id);
      this.emailEditForm.controls.name.setValue(data.name);
      this.emailEditForm.controls.code.setValue(data.code);
      this.emailEditForm.controls.shortCode.setValue(data.shortCode);
      this.emailEditForm.controls.status.setValue('d');
      this.http.update('emailTemplate', this.emailEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.emailEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
