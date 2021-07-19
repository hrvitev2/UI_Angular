import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagerService } from '../../../pager.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { count, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  searchKey: string;
  editId: any;
  clientList: any;
  serialNo:any;
  dialogRef: any;
  forms: FormGroup;
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
  serviceModelArray = ["Full Time Staffing","Contract Staffing","Direct Contract","R P O","Development"];

  ngOnInit(): void {
    this.getClientList(this.searchKey, 1);
    this.getLists(this.searchKey, 1);
  }


  constructor(private router: Router,private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.forms = new FormGroup({
      'departmentId': new FormControl("", Validators.required),
      'title': new FormControl("", Validators.required),
      'from': new FormControl("", Validators.required),
      'to': new FormControl("", Validators.required)
    });
  }


  getLists(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.statingValue = added;
    this.http.getList('client', searchKey, pageNo).subscribe(
      (data: any) => {
        this.clientList = data.data;
        this.dataSource = new MatTableDataSource(this.clientList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.clientList;
        }
        console.log(this.clientList);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  
  getClientList(searchKey, pageNo) {
    this.serialNo = 0;

    // console.log(searchKey);
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.http.getList('client', searchKey, pageNo).subscribe(
      (data: any) => {
        this.clientList = data.data;

     
              console.log(this.clientList);

        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.clientList;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }
  changeStatus(id)
  {
    this.router.navigate(['/customer/clients/changeStatus',id]);
    // this.router.navigate(['/customer/clients/add/']);

  }

  redirect(e) {
    this.router.navigate(['/customer/client/add', e.value]);
  }

  filter(type, e) {
    this.http.getClientFilter(type, e.value).subscribe(
      (data: any) => {
        this.clientList = data.data;
        if(this.clientList.count > 0)
        {
          this.clientList.rows.forEach(element => {
            // element.serviceModel = this.getServiceModel(element.serviceModel);
          });
        }
        console.log(this.clientList);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  getServiceModel(value)
  {
    return this.serviceModelArray[value];
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.clientList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.clientList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addClient() {
    this.router.navigate(['/customer/clients/add/']);
  }
  edit(id) {
    this.router.navigate(['/customer/clients/view',id]);
    // this.router.navigate(['/customer/clients/update/'+id]);
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
      this.clientList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.clientList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }





  delete(data) {
    if (confirm("Are you sure want to delete?")) {
      this.router.navigate(['/customer/clients/delete',data.id]);
    }
  }

}
