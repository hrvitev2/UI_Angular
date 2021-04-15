import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {
  industryList: any;
  dialogRef: any;
  industryForm: FormGroup;
  industryEditForm: FormGroup;

  dataSource: MatTableDataSource<any>;
  @ViewChild('template') templateRef: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.industryForm = new FormGroup({
      'name': new FormControl("", Validators.required),
    });

    this.industryEditForm = new FormGroup({
      'name': new FormControl("", Validators.required),
      'lId': new FormControl("", Validators.required),
      'status': new FormControl("", Validators.required),
    });
  }


  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.getList('industry').subscribe(
      (data: any) => {
        this.industryList = data.data.rows;
        this.dataSource = new MatTableDataSource(this.industryList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  addComp() {
    this.industryEditForm.reset();
    this.industryForm.reset();
    this.dialogRef = this.dialog.open(this.templateRef);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  add() {
    if (this.industryForm.invalid) {
      alert("Please Fill the Mandatory Details");
      return false;
    }
    this.http.add('industry', this.industryForm.value).subscribe(
      (data: any) => {
        alert("Added Successfully!");
        this.getList();
        this.industryForm.reset();
        this.dialogRef.close();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

  edit(i) {
    this.industryEditForm.controls.lId.setValue(i);
    for (let i = 0; i < this.industryList.length; i++) {
      if (this.industryEditForm.value.lId == this.industryList[i].id) {
        this.industryEditForm.controls.name.setValue(this.industryList[i].name);
        this.industryEditForm.controls.status.setValue(this.industryList[i].status);
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
    this.http.update('industry', this.industryEditForm.value).subscribe(
      (data: any) => {
        alert("Updated Successfully!");
        this.industryEditForm.reset();
        this.dialogRef.close();
        this.getList();
      },
      (error: any) => {
        alert(error.msg);
      });
  }

}
