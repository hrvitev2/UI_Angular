import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService} from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';
import { Router, } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  searchKey: string;
  editId: any;
  custList: any;
  dialogRef: any;

  statingValue: number;
  pagers: any = [];
  lists: any = {};
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  firstPageData: any;

  constructor(private http: HttpService, public router: Router, private pagerService: PagerService, private toastr: ToastrService) {


  }

  ngOnInit(): void {
    this.getCustomerList(this.searchKey, 1);
  }


  getCustomerList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.http.getList('customer', searchKey, pageNo).subscribe(
      (data: any) => {
        this.custList = data.data;
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.custList;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      let body = { "cId": data.id, "status": 'd' };
      this.http.update('customer', body).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.getCustomerList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.custList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.custList.count), page, 5);
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
      this.getCustomerList(this.searchKey, page);
    } else {
      this.custList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.custList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  redirect(e) {
    this.router.navigate(['/customer/add', e.value]);

  }

  filter(type, e) {
    this.http.getCustomerFilter(type, e.value).subscribe(
      (data: any) => {
        this.custList = data.data;
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }


  view() {

  }

}
