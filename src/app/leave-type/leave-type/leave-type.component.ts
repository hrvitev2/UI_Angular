import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {

  customerTypeList: any;
  dialogRef: any;
  typeForm: FormGroup;
  typeEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.typeForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });

    this.typeEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'lId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('leave-type').subscribe(
      (data: any) => {
        this.customerTypeList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.customerTypeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  addComp() {
    this.typeEditForm.reset();
    this.typeForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    if (this.typeForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('leave-type', this.typeForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.typeForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.typeEditForm.controls.lId.setValue(i);
    for (let i = 0; i < this.customerTypeList.length; i++) {
      if (this.typeEditForm.value.lId == this.customerTypeList[i].id) {
        this.typeEditForm.controls.name.setValue(this.customerTypeList[i].name);
        this.typeEditForm.controls.status.setValue(this.customerTypeList[i].status);
        this.dialogRef = this.dialog.open(this.templateRef);
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update() {
    this.http.update('leave-type', this.typeEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.typeEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }
}
