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
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  lists: any = {};
  searchKey: any;
  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getLists(this.searchKey, 1);
  }

  getLists(searchKey, pageNo) {
    this.http.customerGet('leave').subscribe(
      (data: any) => {
        this.lists = data.data.row;
        console.log(this.lists)
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(value) {
    
  }

}
