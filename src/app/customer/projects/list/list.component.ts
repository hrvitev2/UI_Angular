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
  projectList: any;
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
  UpdateValues: any = [
    {
      "projectId": "",
      "status": "i"
    }
  ];
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
    this.http.getList('project', searchKey, pageNo).subscribe(
      (data: any) => {
        this.projectList = data.data;
        this.dataSource = new MatTableDataSource(this.projectList);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.projectList;
        }
        console.log(this.projectList);

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
    this.http.getList('project', searchKey, pageNo).subscribe(
      (data: any) => {
        this.projectList = data.data;

     
              console.log(this.projectList);

        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.projectList;
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
    this.router.navigate(['/customer/project/add', e.value]);
  }

  filter(type, e) {
    this.http.getProjectFilter(type, e.value).subscribe(
      (data: any) => {
        this.projectList = data.data;
        if(this.projectList.count > 0)
        {
          this.projectList.rows.forEach(element => {
          });
        }
        console.log(this.projectList);
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
    if (page < 1 || page > parseInt(this.projectList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.projectList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addProject() {
    this.router.navigate(['/customer/projects/add/']);
  }
  edit(id) {
    this.router.navigate(['/customer/projects/update/',id]);
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
      this.projectList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.projectList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }





  delete(id) {
    if (confirm("Are you sure want to delete?")) {
      this.UpdateValues[0]['projectId'] = id.toString();

      this.http.update('project', this.UpdateValues[0]).subscribe(
        (data: any) => {
         
            this.toastr.success(data.msg);
          window.location.reload();
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });

    }
  }

}