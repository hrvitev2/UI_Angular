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
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  searchKey: any;
  universityLists: any;
  dialogRef: any;
  universityForm: FormGroup;
  universityEditForm: FormGroup;

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
    this.universityForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'shortName': new FormControl("", Validators.required),
    });

    this.universityEditForm = new FormGroup({
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
    this.http.getList('university', searchKey, pageNo).subscribe(
      (data: any) => {
        this.universityLists = data.data;
        this.dataSource = new MatTableDataSource(this.universityLists);
        if (pageNo == 1) {
          this.setPage(pageNo);
          this.firstPageData = this.universityLists;
        }

      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  setPage(page: number) {
    if (page < 1 || page > parseInt(this.universityLists.count) + 1 / 5) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.universityLists.count), page, 5);
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
      this.universityLists = this.firstPageData;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(parseInt(this.universityLists.count), page, 5);
    // get current page of items
    this.pagedItems = this.pager.pages.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  addComp() {
    this.universityEditForm.reset();
    this.universityForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });

  }


  add() {
    if (this.universityForm.invalid) {
      this.toastr.error("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('university', this.universityForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Added Successfully!");
        this.getList(this.searchKey, 1);
        this.universityForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  edit(data) {
    this.universityEditForm.controls.cId.setValue(data.id);
    this.universityEditForm.controls.name.setValue(data.name);
    this.universityEditForm.controls.shortName.setValue(data.shortName);
    this.universityEditForm.controls.status.setValue(data.status);
    this.universityEditForm.controls.note.setValue(data.note);
    this.dialogRef = this.dialog.open(this.templateRef);

    console.log(this.universityEditForm.value)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update() {
    this.http.update('university', this.universityEditForm.value).subscribe(
      (data: any) => {
        this.toastr.success("Updated Successfully!");
        this.universityEditForm.reset();
        this.dialogRef.close();
        this.getList(this.searchKey, 1);
      },
      (error: any) => {
        this.toastr.error(error.msg);
      });
  }

  delete(data) {
    if (confirm("Are you sure want to delete?")) {

      this.universityEditForm.controls.cId.setValue(data.id);
      this.universityEditForm.controls.name.setValue(data.name);
      this.universityEditForm.controls.shortName.setValue(data.shortName);
      this.universityEditForm.controls.status.setValue('d');
      this.universityEditForm.controls.note.setValue(data.note);
      this.http.update('university', this.universityEditForm.value).subscribe(
        (data: any) => {
          this.toastr.success("Deleted Successfully!");
          this.universityEditForm.reset();
          this.getList(this.searchKey, 1);
        },
        (error: any) => {
          this.toastr.error(error.msg);
        });
    }
  }

}
