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
  selector: 'app-tax-excemption',
  templateUrl: './tax-excemption.component.html',
  styleUrls: ['./tax-excemption.component.css']
})
export class TaxExcemptionComponent implements OnInit {
  searchKey: any;
  taxList: any;
  dialogRef: any;
  taxForm: FormGroup;
  taxEditForm: FormGroup;

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

  displayedColumns: string[] = ['from', 'to', 'percentage', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.taxForm = new FormGroup({
      'from': new FormControl("", Validators.required),
      'to': new FormControl("", Validators.required),
      'percentage': new FormControl("", Validators.required)
    });

    this.taxEditForm = new FormGroup({
      'from': new FormControl("", Validators.required),
      'to': new FormControl("", Validators.required),
      'percentage': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
      'tId': new FormControl("", Validators.required),
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
    this.http.getList('tax', searchKey, pageNo).subscribe(
      (data: any) => {
        this.taxList = data.data;
        this.dataSource = new MatTableDataSource(this.taxList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.taxList;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  addComp() {
    this.taxEditForm.reset();
    this.taxForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.taxList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.taxList.count), page, 5);
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
      this.taxList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.taxList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  add() {
    if (this.taxForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('tax', this.taxForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.taxForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.taxEditForm.controls.tId.setValue(data.id);
    this.taxEditForm.controls.from.setValue(data.from);
    this.taxEditForm.controls.to.setValue(data.to);
    this.taxEditForm.controls.percentage.setValue(data.percentage);
    this.taxEditForm.controls.status.setValue(data.status);
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
    if (this.taxForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.update('tax', this.taxEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.taxEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      this.taxEditForm.controls.tId.setValue(data.id);
      this.taxEditForm.controls.from.setValue(data.from);
      this.taxEditForm.controls.to.setValue(data.to);
      this.taxEditForm.controls.percentage.setValue(data.percentage);
      this.taxEditForm.controls.status.setValue('d');
      this.http.update('tax', this.taxEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.taxEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
