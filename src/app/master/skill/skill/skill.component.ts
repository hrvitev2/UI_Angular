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
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  searchKey: any;
  skillList: any;
  industryList: any;
  dialogRef: any;
  skillForm: FormGroup;
  skillEditForm: FormGroup;

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

  displayedColumns: string[] = ['name', 'industry', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog, private pagerService: PagerService, private toastr: ToastrService) {
    this.skillForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'industryId': new FormControl("", Validators.required),
    });

    this.skillEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'industryId': new FormControl("", Validators.required),
      'sId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }


  ngOnInit(): void {
    this.getList(this.searchKey, 1);
  }

  getIndustryList() {
    this.http.getList('industry', '', 1).subscribe(
      (data: any) => {
        this.industryList = data.data.rows;
        for (let i = 0; i < this.industryList.length; i++) {
          for (let j = 0; j < this.skillList.rows.length; j++) {
            if (this.industryList[i].id == this.skillList.rows[j].industryId) {
              this.skillList.rows[j].industry = this.industryList[i].name;
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.skillList);

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  getList(searchKey, pageNo) {
    let added = 1;
    if (pageNo != 1) {
      added = pageNo * 5 + 1 - 5;
    }
    this.http.getList('skill', searchKey, pageNo).subscribe(
      (data: any) => {
        this.skillList = data.data;
        this.getIndustryList();
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.skillList;
        }
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.skillList.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.skillList.count), page, 5);
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
      this.skillList = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.skillList.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  addComp() {
    this.skillEditForm.reset();
    this.skillForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    this.skillForm.controls.industryId.setValue(this.skillForm.value.industryId.toString());
    if (this.skillForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('skill', this.skillForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.skillForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.skillEditForm.controls.sId.setValue(data.id);
    this.skillEditForm.controls.name.setValue(data.name);
    this.skillEditForm.controls.industryId.setValue(data.industryId);
    this.skillEditForm.controls.status.setValue(data.status);
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
    this.skillEditForm.controls.industryId.setValue(this.skillEditForm.value.industryId.toString());
    this.http.update('skill', this.skillEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.skillEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    console.log(data);
    if (confirm("Are you sure want to delete?")) {
      this.skillEditForm.controls.sId.setValue(data.id);
      this.skillEditForm.controls.name.setValue(data.name);
      this.skillEditForm.controls.industryId.setValue(data.industryId.toString());
      this.skillEditForm.controls.status.setValue('d');
      this.http.update('skill', this.skillEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.skillEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }
}
