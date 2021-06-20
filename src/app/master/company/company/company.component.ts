import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService } from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  compList: any;
  dialogRef: any;
  companyForm: FormGroup;
  companyEditForm: FormGroup;
  searchKey: any;
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

  displayedColumns: string[] = ['name', 'shortName', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.companyForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
    });

    this.companyEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'note': new FormControl("", Validators.required),
      'cId': new FormControl("", Validators.required),
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
    this.http.getList('comp', searchKey, pageNo).subscribe(
      (data: any) => {
        this.compList = data.data;
        this.dataSource = new MatTableDataSource(this.compList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.compList;
        }
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.compList;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.compList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.compList.count), page, 5);
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
      this.compList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.compList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addComp() {
    this.companyEditForm.reset();
    this.companyForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.companyEditForm.value.cId) {
      this.update();
      return false;
    }
    if (this.companyForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('comp', this.companyForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.companyForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.companyEditForm.controls.name.setValue(data.name);
    this.companyEditForm.controls.cId.setValue(data.name);
    this.companyEditForm.controls.shortName.setValue(data.shortName);
    this.companyEditForm.controls.status.setValue(data.status);
    this.companyEditForm.controls.note.setValue(data.note);
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
    this.http.update('comp', this.companyEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.companyEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  delete(data) {
    if (confirm("Are you sure want to delete?")) {

      this.companyEditForm.controls.cId.setValue(data.id);
      this.companyEditForm.controls.name.setValue(data.name);
      this.companyEditForm.controls.shortName.setValue(data.shortName);
      this.companyEditForm.controls.status.setValue('d');
      this.companyEditForm.controls.note.setValue(data.note);
      this.http.update('comp', this.companyEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.companyEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
